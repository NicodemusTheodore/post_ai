const { cloudinary } = require("../utils/cloudinary");
const { Post, User, Comment, Bookmark, Profile } = require("../models");
const axios = require("axios");
const { Op } = require("sequelize");

class PostController {
  static async getAllPost(req, res, next) {
    const { prompt } = req.query;

    let promptSearch = "";

    if (prompt) {
      promptSearch = prompt;
    }
    try {
      const allPosts = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ["username"],
            include: {
              model: Profile,
            },
          },
          {
            model: Comment,
          },
          {
            model: Bookmark,
          },
        ],
        where: {
          prompt: {
            [Op.iLike]: `%${promptSearch}%`,
          },
        },
        order: [["createdAt", "DESC"]],
      });

      res.status(200).json({ data: allPosts });
    } catch (error) {
      console.log(error);
      let status = 500;
      let message = "Internal Server Error";

      res.status(status).json({
        message,
      });
    }
  }

  static async getPostById(req, res, next) {
    const { postId } = req.params;
    try {
      const foundPost = await Post.findOne({
        where: {
          id: postId,
        },
        include: [
          {
            model: User,
            attributes: ["username"],
            include: {
              model: Profile,
            },
          },
          {
            model: Comment,
          },
          {
            model: Bookmark,
          },
        ],
      });

      if (!foundPost) throw new Error("POST_NOT_FOUND");

      const { data } = await axios({
        url: "https://api.qr-code-generator.com/v1/create",
        methods: "GET",
        params: {
          "access-token":
            "ATrBKM3-qvJncYT6rlY_iSNM_dSdzVRG__s0_Rkh36Z_8aoWvqge0DGPFBDeMrJz",
          qr_code_text: `http://localhost:5173/${foundPost.User.username}/${postId}`,
          image_format: "PNG",
          image_width: 300,
          download: 1,
        },
        responseType: "arraybuffer",
      });

      const base64 = btoa(
        new Uint8Array(data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );

      const image = "data:image/svg+xml;base64," + base64;
      const imageUrl = await cloudinary.uploader.upload(image);

      res.status(200).json({
        data: foundPost,
        qrcode: imageUrl.url,
        bookmark: foundPost.Bookmarks[0],
      });
    } catch (error) {
      console.log(error);
      let status = 500;
      let message = "Internal Server Error";

      res.status(status).json({
        message,
      });
    }
  }

  static async likePost(req, res, next) {
    const { postId } = req.params;
    try {
      await Post.increment("likes", {
        by: 1,
        where: {
          id: postId,
        },
      });

      const foundPostLike = await Post.findOne({
        where: { id: postId },
        attributes: ["likes"],
      });

      res.status(200).json({
        data: foundPostLike,
      });
    } catch (error) {
      let status = 500;
      let message = "Internal Server Error";

      res.status(status).json({
        message,
      });
    }
  }

  static async increaseViews(req, res, next) {
    const { postId } = req.params;
    try {
      await Post.increment("views", {
        by: 1,
        where: {
          id: postId,
        },
      });

      res.status(200).json({
        message: "Success",
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async createPost(req, res, next) {
    const { prompt, image, caption } = req.body;
    const { id } = req.userInformation;
    try {
      const data = "data:image/svg+xml;base64," + image;
      const imageUrl = await cloudinary.uploader.upload(data);

      const newPost = await Post.create({
        prompt,
        image: imageUrl.url,
        caption,
        views: 0,
        likes: 0,
        UserId: id,
      });
      res.status(201).json({
        data: newPost,
      });
    } catch (error) {
      console.log(error);
      let status = 500;
      let message = "Internal Server Error";

      res.status(status).json({
        message,
      });
    }
  }

  static async getComments(req, res, next) {
    const { postId } = req.params;
    try {
      const foundComments = await Comment.findAndCountAll({
        where: {
          PostId: postId,
        },
        include: {
          model: User,
          attributes: ["username"],
        },
        order: [["createdAt", "DESC"]],
      });

      res.status(200).json({
        data: foundComments,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async addComments(req, res, next) {
    const { postId } = req.params;
    const { id } = req.userInformation;
    const { comment } = req.body;
    try {
      await Comment.create({ comment, UserId: id, PostId: postId });
      res.status(200).json({
        message: "Success",
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = PostController;
