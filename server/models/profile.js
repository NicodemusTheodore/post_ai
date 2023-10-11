"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profile.belongsTo(models.User);
    }
  }
  Profile.init(
    {
      image: DataTypes.STRING,
      bio: DataTypes.TEXT,
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
      modelName: "Profile",
    }
  );
  return Profile;
};
