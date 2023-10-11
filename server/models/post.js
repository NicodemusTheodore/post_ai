"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User);
      Post.hasMany(models.Comment);
      Post.hasMany(models.Bookmark);
    }
  }
  Post.init(
    {
      prompt: DataTypes.STRING,
      image: DataTypes.STRING,
      caption: DataTypes.TEXT,
      views: DataTypes.BIGINT,
      likes: DataTypes.BIGINT,
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCASDE",
        onDelete: "CASCASDE",
      },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
