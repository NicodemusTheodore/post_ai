var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "individual-project",
  api_key: "927592415522561",
  api_secret: "k3j0UZqUunYFu8MSuNftXTObha0",
});

module.exports = { cloudinary };
