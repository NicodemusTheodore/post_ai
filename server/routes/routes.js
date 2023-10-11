const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const postRoutes = require("./post.routes");
const openaiRoutes = require("./openai.routes");
const bookmarkRoutes = require("./bookmarks.routes");

router.get("/", (req, res, next) => {
  res.send("Hello!");
});
router.use("/auth", authRoutes);

router.use(bookmarkRoutes);
router.use("/api/v1/post", postRoutes);
router.use("/api/v1/openai", openaiRoutes);
router.use(userRoutes);

module.exports = router;
