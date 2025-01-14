const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      lowercase: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
    },
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    profileImage: {
      type: String,
      default: "https://res.cloudinary.com/dpkqselpi/image/upload/v1733561049/androgynous-avatar-non-binary-queer-person_23-2151100270_zjfy1q.avif",
    },
    bio: {
      type: String,
      maxlength: [500, "Bio must not exceed 500 characters"],
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordExpiresAt: {
      type: Date,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: null,
    },
    verificationTokenExpiresAt: {
      type: Date,
      default: null,
    },

    joinedAt: {
      type: Date,
      default: Date.now,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    preferences: {
      notifications: { type: Boolean, default: true },
    }
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", function (next) {
  this.username = this.username.replace(/\s+/g, "");
  next();
});
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
