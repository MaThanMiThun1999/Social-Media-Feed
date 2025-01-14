const userModel = require("../models/user.model");
const cloudinary = require("../config/cloudinary");
const { sendSuccessResponse, handleError } = require("../utils/responseUtils");
const streamifier = require("streamifier");
const { comparePassword, hashPassword } = require("../utils/passwordUtils");
const { sendDeleteAccountEmail } = require("../services/emailService");
const { default: mongoose } = require("mongoose");

module.exports = {
  getUserProfile: async (req, res, next) => {
    try {
      const user = await userModel.findById(req.userID).select("-password");
      if (!user) {
        return handleError(next, "User not found", 404);
      }
      return sendSuccessResponse(res, "User profile fetched successfully", user);
    } catch (error) {
      return handleError(next, "Error fetching user profile", 500);
    }
  },

  updateUserProfile: async (req, res, next) => {
    const { name, bio, phoneNumber, preferences } = req.body;
    let profileImage;

    try {
      if (req.file) {
        console.log(`req.file.buffer: ${req.file.buffer}`);
        if (!req.file.buffer) {
          return handleError(next, "File buffer is undefined", 400);
        }

        const user = await userModel.findById(req.userID);
        console.log(`user: ${user}`);
        if (!user) {
          return handleError(next, "User not found", 404);
        }

        const uploadedImage = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: `profile_images/${user.username}`,
              public_id: `${user.username}_${user._id}_profile`,
              overwrite: true,
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

        profileImage = uploadedImage.secure_url;
      }

      const updatedUser = await userModel
        .findByIdAndUpdate(req.userID, { name, bio, phoneNumber, profileImage: profileImage || undefined, preferences }, { new: true, runValidators: true })
        .select("-password");

      if (!updatedUser) {
        return handleError(next, "User not found", 404);
      }

      return sendSuccessResponse(res, "User profile updated successfully", updatedUser);
    } catch (error) {
      console.error("Error in updateUserProfile:", error);
      return handleError(next, error.message || "Error updating user profile", 500);
    }
  },
  uploadProfileImage: async (req, res, next) => {
    try {
      if (!req.file) {
        return handleError(next, "No file uploaded", 400);
      }

      if (!req.file.buffer) {
        return handleError(next, "File buffer is undefined", 400);
      }

      const user = await userModel.findById(req.userID);
      console.log("user: ", user);
      if (!user) {
        return handleError(next, "User not found", 404);
      }

      const uploadedImage = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: `profile_images/${user.username}`,
            public_id: `${user.username}_${user._id}_profile`,
            overwrite: true,
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

      const updatedUser = await userModel.findByIdAndUpdate(req.userID, { profileImage: uploadedImage.secure_url }, { new: true }).select("-password");
      if (!updatedUser) {
        return handleError(next, "User not found", 404);
      }
      return sendSuccessResponse(res, "Profile image updated successfully", updatedUser);
    } catch (error) {
      console.error("Error in uploadProfileImage:", error);
      return handleError(next, "Error uploading profile image", 500);
    }
  },
  changePassword: async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    try {
      const user = await userModel.findById(req.userID);
      if (!user) {
        return handleError(next, "User not found", 404);
      }

      const isMatch = await comparePassword(oldPassword, user.password);
      if (!isMatch) {
        return handleError(next, "Old password is incorrect", 400);
      }

      user.password = await hashPassword(newPassword);
      await user.save();

      return sendSuccessResponse(res, "Password updated successfully", {});
    } catch (error) {
      return handleError(next, error.message || "Error changing password", 500);
    }
  },
  deleteUserProfile: async (req, res, next) => {
    const { password } = req.body;
    try {
      const user = await userModel.findById(req.userID);
      if (!user) {
        return handleError(next, "User not found", 404);
      }
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        return handleError(next, "Incorrect password", 400);
      }
      const parts = user.profileImage.split("/");
      if (parts.length > 1) {
        const lastPart = parts?.pop();
        if (lastPart) {
          const publicId = lastPart.split(".")[0];
          await cloudinary.uploader.destroy(`profile_images/${publicId}`);
        }
      }
      await sendDeleteAccountEmail(user.email);
      await userModel.findByIdAndDelete(req.userID);
      return sendSuccessResponse(res, "User account and associated image deleted successfully", {});
    } catch (error) {
      return handleError(next, error.message || "Error deleting user account", 500);
    }
  },
};
