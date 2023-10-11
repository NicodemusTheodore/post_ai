const express = require("express");
const router = express.Router();
const OpenAIController = require("../controllers/openaiController");
const authentication = require("../middlewares/authentication");

router.get("/", (req, res, next) => {
  res.send("Hello from OpenAI");
});

router.post("/", authentication, OpenAIController.generateImage);

module.exports = router;
