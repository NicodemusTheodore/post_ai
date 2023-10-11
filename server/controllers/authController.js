const { User, Profile } = require("../models");
const { comparePassword } = require("../utils/bcrypt");
const { createToken } = require("../utils/jwt");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

class AuthController {
  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      if (!email || !password) throw new Error("INVALID_INPUT");

      const foundUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!foundUser || !comparePassword(password, foundUser.password))
        throw new Error("INVALID_INPUT");

      if (foundUser.status !== "Active")
        throw new Error("ACCOUNT_NOT_VERIFIED");

      const payload = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        status: foundUser.status,
      };

      const token = createToken(payload);

      res.status(200).json({
        message: `Welcome ${foundUser.username}`,
        access_token: token,
        username: foundUser.username,
      });
    } catch (error) {
      let status = 500;
      let message = "Internal Server Error";

      if (error.message === "INVALID_INPUT") {
        status = 400;
        message = "Invalid email or password";
      }

      if (error.message === "ACCOUNT_NOT_VERIFIED") {
        status = 400;
        message = "Your account status is pending. Please verify your email!";
      }

      res.status(status).json({
        message,
      });
    }
  }

  static async loginViaGoogle(req, res, next) {
    try {
      const { token } = req.body;

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      const userEmail = payload.email;
      const username =
        payload.name.split(" ").join("") +
        Math.floor(Math.random() * (999 - 100 + 1) + 100);
      const profileImg = payload.picture;
      const password = "@ItsASecretOwO6969";
      const status = "Active";
      const newToken = createToken({
        userEmail,
      });

      const [foundUser, isCreated] = await User.findOrCreate({
        where: {
          email: userEmail,
        },
        defaults: {
          username,
          email: userEmail,
          password,
          status,
          verificationCode: newToken,
        },
      });

      let message = "User found";

      if (isCreated) {
        message = "User has been created";
      }

      const foundProfile = await Profile.findOne({
        where: {
          UserId: foundUser.id,
        },
      });

      if (!foundProfile) {
        await Profile.create({
          image: profileImg,
          bio: "Nothing for now",
          UserId: foundUser.id,
        });
      }

      res.status(201).json({
        statusCode: 201,
        message,
        data: {
          email: foundUser.email,
          password: password,
        },
      });
    } catch (error) {
      console.log(error);
      let status = 500;
      let message = "Internal Server Error";

      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        status = 400;
        message = error.errors[0].message;
      }

      if (error.message === "PASSWORD_DOES_NOT_MATCH") {
        status = 400;
        message = "Password does not match";
      }

      res.status(status).json({
        message,
      });
    }
  }

  static async register(req, res, next) {
    const { username, email, password, confirmPassword } = req.body;

    try {
      if (confirmPassword !== password)
        throw new Error("PASSWORD_DOES_NOT_MATCH");

      const token = createToken({
        email,
      });

      const createdUser = await User.create({
        username,
        email,
        password,
        verificationCode: token,
      });

      await Profile.create({
        image:
          "https://res.cloudinary.com/individual-project/image/upload/v1695878452/lxpxwcz40xec41uvnc8n.png",
        bio: "Nothing for now",
        UserId: createdUser.id,
      });

      res.status(201).json({
        message: `Hello ${createdUser.username}, You're almost done but for security purpose, we have sent an email to ${createdUser.email}. Please check your inbox to verify your account.`,
      });
    } catch (error) {
      let status = 500;
      let message = "Internal Server Error";

      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        status = 400;
        message = error.errors[0].message;
      }

      if (error.message === "PASSWORD_DOES_NOT_MATCH") {
        status = 400;
        message = "Password does not match";
      }

      res.status(status).json({
        message,
      });
    }
  }

  static async verifyUser(req, res, next) {
    const { verificationCode } = req.params;

    try {
      const foundUser = await User.findOne({
        where: {
          verificationCode,
        },
      });

      if (!foundUser) throw new Error("USER_NOT_FOUND");

      await User.update({ status: "Active" }, { where: { id: foundUser.id } });
      // https://vast-torus-400415.web.app
      res.redirect("http://localhost:5173/welcome");
    } catch (error) {
      let status = 500;
      let message = "Internal Server Error";

      if (error.message === "USER_NOT_FOUND") {
        status = 400;
        message = "User not found";
      }

      res.status(status).json({
        message,
      });
    }
  }
}

module.exports = AuthController;
