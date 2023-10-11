const bcrypt = require("bcryptjs");

const hashPassword = (input) => {
  return bcrypt.hashSync(input);
};

const comparePassword = (input, hash) => {
  return bcrypt.compareSync(input, hash);
};

module.exports = { hashPassword, comparePassword };
