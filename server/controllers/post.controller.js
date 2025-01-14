const Post = require("../models/post.model");
const { sendSuccessResponse, handleError } = require("../utils/responseUtils");
const upload = require("../middlewares/multerMiddleware");
const cloudinary = require("cloudinary").v2;
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = require('../config/envConfig');

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});


const uploadMedia = async (buffer, resourceType = "auto") => {
    return new Promise((resolve, reject) => {
      if (!buffer || buffer.length === 0) {
            reject(new Error("File buffer is empty"));
            return;
      }
        cloudinary.uploader.upload_stream({
            resource_type: resourceType
        }, (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
               reject(new Error(`Cloudinary upload failed: ${error.message || 'Unknown error'}`));
            }
            else if (!result || !result.secure_url) {
                  console.error("Cloudinary upload result is missing secure_url:", result);
                   reject(new Error("Cloudinary upload failed: Secure URL is missing"));
           } else {
                resolve(result.secure_url);
            }
        }).end(buffer);
    });
};


const createPost = async (req, res, next) => {
    try {
        upload.fields([
            { name: 'images', maxCount: 5 },
            { name: 'videos', maxCount: 2 },
        ])(req, res, async (err) => {
            if (err) {
                return handleError(next, err.message, 400);
            }

            const { content } = req.body;
              if (!content) {
                return handleError(next, "Content is required", 400);
            }

             const media = { images: [], videos: [] };

             if (req.files) {
                   if (req.files.images) {
                     try {
                       const imageUploadPromises = req.files.images.map(file => uploadMedia(file.buffer));
                        media.images = await Promise.all(imageUploadPromises);
                     } catch (error) {
                       return handleError(next, `Failed to upload images: ${error.message}`, 500);
                     }
                  }

                if (req.files.videos) {
                    try {
                      const videoUploadPromises = req.files.videos.map(file => uploadMedia(file.buffer, 'video'));
                      media.videos = await Promise.all(videoUploadPromises);
                    } catch (error) {
                      return handleError(next, `Failed to upload videos: ${error.message}`, 500);
                    }
                }
            }

             try {
                 const newPost = await Post.create({
                     user: req.userID,
                     content,
                     media: media,
                 });
                 sendSuccessResponse(res, "Post created successfully", { post: newPost });
             } catch (postError) {
                 console.error("Database error:", postError);
                 return handleError(next, "Failed to create post", 500);
             }
         });
    } catch (error) {
        console.error("Unexpected error in createPost:", error);
        handleError(next, "An unexpected error occurred", 500);
    }
};

const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().populate({
            path: 'user',
            select: 'name _id',
        }).sort({ createdAt: -1 });
        sendSuccessResponse(res, "Posts retrieved successfully", { posts });
    } catch (error) {
        handleError(next, error.message, 500);
    }
};

const getPostById = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id).populate({
            path: 'user',
            select: 'name _id',
        }).populate({
            path: 'comments.user',
            select: 'name _id',
        });
        if (!post) {
            return handleError(next, "Post not found", 404);
        }
        sendSuccessResponse(res, "Post retrieved successfully", { post });
    } catch (error) {
        handleError(next, error.message, 500);
    }
};

const updatePost = async (req, res, next) => {
    try {
        const { content } = req.body;
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { content },
            { new: true, runValidators: true }
        ).populate({
            path: 'user',
            select: 'name _id',
        }).populate({
            path: 'comments.user',
            select: 'name _id',
        });
        if (!updatedPost) {
            return handleError(next, "Post not found", 404);
        }
        sendSuccessResponse(res, "Post updated successfully", { post: updatedPost });
    } catch (error) {
        handleError(next, error.message, 500);
    }
};

const deletePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return handleError(next, "Post not found", 404);
        }
        sendSuccessResponse(res, "Post deleted successfully", { post });
    } catch (error) {
        handleError(next, error.message, 500);
    }
};


const likePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return handleError(next, "Post not found", 404);
        }

        const userLiked = post.likes.includes(req.userID);
        if (userLiked) {
            post.likes = post.likes.filter((id) => id.toString() !== req.userID);
        } else {
            post.likes.push(req.userID);
        }

        await post.save();
        sendSuccessResponse(res, userLiked ? "Post unliked successfully" : "Post liked successfully", { post: post });
    } catch (error) {
        handleError(next, error.message, 500);
    }
};

const addComment = async (req, res, next) => {
    try {
        const { text } = req.body;
        if (!text) {
            return handleError(next, "Comment text is required", 400);
        }
        const post = await Post.findById(req.params.id);
        if (!post) {
            return handleError(next, "Post not found", 404);
        }

        const newComment = {
            user: req.userID,
            text,
        };
        post.comments.push(newComment);
        await post.save();
        const populatedPost = await Post.findById(req.params.id).populate({
            path: 'comments.user',
            select: 'name _id',
        });
        sendSuccessResponse(res, "Comment added successfully", { post: populatedPost });
    } catch (error) {
        handleError(next, error.message, 500);
    }
};

const deleteComment = async (req, res, next) => {
    try {
        const { commentId } = req.params;
        const post = await Post.findById(req.params.id);
        if (!post) {
            return handleError(next, "Post not found", 404);
        }
        const commentIndex = post.comments.findIndex(
            (comment) => comment._id.toString() === commentId
        );

        if (commentIndex === -1) {
            return handleError(next, "Comment not found", 404);
        }
        if (post.comments[commentIndex].user.toString() !== req.userID) {
            return handleError(next, "Unauthorized to delete this comment", 403);
        }
        post.comments.splice(commentIndex, 1);
        await post.save();

        const populatedPost = await Post.findById(req.params.id).populate({
            path: 'comments.user',
            select: 'name _id',
        });

        sendSuccessResponse(res, "Comment deleted successfully", { post: populatedPost });
    } catch (error) {
        handleError(next, error.message, 500);
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    likePost,
    addComment,
    deleteComment,
};