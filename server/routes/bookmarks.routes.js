const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");
const BookmarkController = require("../controllers/bookmarkController");

// GET ALL POSTS
router.get("/bookmarks", authentication, BookmarkController.getBookmarkList);
router.post(
  "/bookmarks/:postId",
  authentication,
  BookmarkController.addPostToBookmarkList
);
router.patch(
  "/bookmarks/:postId",
  authentication,
  BookmarkController.removePostFromBookmarkList
);

module.exports = router;
