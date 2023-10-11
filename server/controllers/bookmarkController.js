const { Bookmark, Post, Comment, User } = require("../models");

class BookmarkController {
  static async getBookmarkList(req, res, next) {
    const { id } = req.userInformation;
    try {
      const foundBookmarks = await Bookmark.findAll({
        where: {
          UserId: id,
          status: "Bookmarked",
        },
        include: {
          model: Post,
          include: [
            {
              model: Comment,
            },
            {
              model: User,
              attributes: ["username"],
            },
            {
              model: Bookmark,
            },
          ],
        },
        order: [["updatedAt", "DESC"]],
      });

      res.status(200).json({
        data: foundBookmarks,
      });
    } catch (error) {
      console.log(error);
    }
  }
  static async addPostToBookmarkList(req, res, next) {
    const { postId } = req.params;
    const { id } = req.userInformation;
    try {
      const [foundBookmark, createdUser] = await Bookmark.findOrCreate({
        where: {
          UserId: id,
          PostId: postId,
        },
        defaults: {
          status: "Bookmarked",
          UserId: id,
          PostId: postId,
        },
      });

      if (foundBookmark.status !== "Bookmarked") {
        await Bookmark.update(
          { status: "Bookmarked" },
          {
            where: {
              UserId: id,
              PostId: postId,
            },
          }
        );
      }

      res.status(201).json({
        message: "Success",
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async removePostFromBookmarkList(req, res, next) {
    const { postId } = req.params;
    const { id } = req.userInformation;
    try {
      const foundBookmark = await Bookmark.findOne({
        where: {
          UserId: id,
          PostId: postId,
        },
      });

      if (foundBookmark.status === "Bookmarked") {
        await Bookmark.update(
          { status: "Unbookmarked" },
          {
            where: {
              UserId: id,
              PostId: postId,
            },
          }
        );
      }

      res.status(201).json({
        message: "Success",
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = BookmarkController;
