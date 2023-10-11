const { verifyToken } = require("../utils/jwt");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) throw new Error("UNAUTHORIZED");

    const verifiedToken = verifyToken(access_token);
    const { id, username, email, status } = verifiedToken;
    req.userInformation = {
      id,
      username,
      email,
      status,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
