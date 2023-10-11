const { User, Profile, Post, Comment } = require("../models");
const { cloudinary } = require("../utils/cloudinary");

class UserController {
  static async fetchUserProfile(req, res, next) {
    const { username } = req.params;
    try {
      const foundUser = await User.findOne({
        where: {
          username,
        },
        attributes: {
          exclude: ["password", "verificationCode"],
        },
        include: [
          {
            model: Profile,
          },
          {
            model: Post,
            include: {
              model: Comment,
            },
          },
        ],
      });

      res.status(200).json({
        data: foundUser,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async updateUserProfileImage(req, res, next) {
    const { id } = req.userInformation;
    try {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const imageUrl = await cloudinary.uploader.upload(dataURI);

      await Profile.update(
        { image: imageUrl.url },
        {
          where: {
            UserId: id,
          },
        }
      );
      res.status(200).json({
        imageUrl: imageUrl.url,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserController;
