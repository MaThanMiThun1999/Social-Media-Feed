const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    likePost,
    addComment,
    deleteComment
} = require("../controllers/post.controller");
const upload = require("../middlewares/multerMiddleware");


const router = Router();

// Post routes
// Create a new post
router.post("/", authMiddleware, createPost);

// Get all posts
router.get("/", authMiddleware, getAllPosts);
// Get a post by ID
router.get("/:id", authMiddleware, getPostById);
// Update a post
router.put("/:id", authMiddleware, updatePost);
// Delete a post
router.delete("/:id", authMiddleware, deletePost);
// Like a post and Unlike a post
router.post("/:id/like", authMiddleware, likePost);
// Comment on a post
router.post("/:id/comment", authMiddleware, addComment);
// Delete a comment
router.delete("/:id/comment/:commentId", authMiddleware, deleteComment);

module.exports = router;