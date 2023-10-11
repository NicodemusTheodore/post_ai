const express = require("express");
const router = express.Router();
const PostController = require("../controllers/postController");
const authentication = require("../middlewares/authentication");

// GET ALL POSTS
router.get("/", authentication, PostController.getAllPost);
router.post("/", authentication, PostController.createPost);
router.get("/:postId", authentication, PostController.getPostById);
router.get("/:postId/like", authentication, PostController.likePost);
router.get("/:postId/view", authentication, PostController.increaseViews);
router.get("/:postId/comments", authentication, PostController.getComments);
router.post("/:postId/comments", authentication, PostController.addComments);

module.exports = router;
