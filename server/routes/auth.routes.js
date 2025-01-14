const { Router } = require("express");
const { signup, verifyEmail, login, forgotPassword, resetPassword, getUser, logout, googleAuth } = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/authMiddleware");
const { APP_NAME } = require('../config/envConfig');
const router = Router();
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: `Welcome to ${APP_NAME} Auth API`,
    statusCode: 200,
    path: req.path,
    timestamp: Date.now(),
  });
});

router.get("/check-auth", authMiddleware, getUser);
// Signup route
router.post("/signup", signup);
// Verify email route
router.post("/verify-email", verifyEmail);
// Login route
router.post("/login", login);
// Forgot password route
router.post("/forgot-password", forgotPassword);
// Reset password route
router.post("/reset-password/:token", resetPassword);
// Logout route
router.post("/logout", logout);
// Google auth route
router.post("/google", googleAuth); // POST route for handling Google login/signup

module.exports = router;
