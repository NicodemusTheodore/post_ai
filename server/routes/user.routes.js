const express = require("express");
const UserController = require("../controllers/userController");
const router = express.Router();
const { multerUploads } = require("../utils/multer");
const authentication = require("../middlewares/authentication");

router.get("/:username", authentication, UserController.fetchUserProfile);
router.patch(
  "/updateImage",
  authentication,
  multerUploads,
  UserController.updateUserProfileImage
);

module.exports = router;
