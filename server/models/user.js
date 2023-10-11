"use strict";
const { Model } = require("sequelize");
const sendConfirmationEmail = require("../utils/nodemailer");
const { hashPassword } = require("../utils/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Profile);
      User.hasMany(models.Post);
      User.hasMany(models.Comment);
      User.hasMany(models.Bookmark);
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "An account using this username already exist",
        },
        validate: {
          notNull: {
            msg: "Username cannot be empty",
          },
          notEmpty: {
            msg: "Username cannot be empty",
          },
          checkSpaces(value) {
            for (let i = 0; i <= value.length; i++) {
              if (value[i] === " ") {
                throw new Error("Username can't contain spaces");
              }
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "An account using this email address already exist",
        },
        validate: {
          notNull: {
            msg: "Email cannot be empty",
          },
          notEmpty: {
            msg: "Email cannot be empty",
          },
          isEmail: {
            msg: "Invalid email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password cannot be empty",
          },
          notEmpty: {
            msg: "Password cannot be empty",
          },
          is: {
            args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/,
            msg: "Password must contain atleast 8 characters including at least 1 uppercase, 1 lowercase and one digit.",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "Pending",
      },
      verificationCode: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((user, options) => {
    user.password = hashPassword(user.password);
  });

  User.afterCreate((user, options) => {
    sendConfirmationEmail(user.username, user.email, user.verificationCode);
  });

  return User;
};
