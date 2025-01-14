const { Router } = require("express");
const multer = require("multer");
const { getUserProfile, updateUserProfile, uploadProfileImage, changePassword, deleteUserProfile } = require("../controllers/profile.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
const { multerErrorHandler } = require("../utils/responseUtils");

const router = Router();
// Get user profile
router.get("/profile", authMiddleware, getUserProfile);
// Update user profile (including name, bio, and profile image)
router.put("/profile", authMiddleware, upload.single("profileImage"), multerErrorHandler, updateUserProfile);
// Upload only profile image
router.post("/profile/image", authMiddleware, upload.single("profileImage"), multerErrorHandler, uploadProfileImage);
// Change user password
router.put("/profile/password", authMiddleware, changePassword);
// Delete user profile
router.delete("/profile", authMiddleware, deleteUserProfile);
module.exports = router;
