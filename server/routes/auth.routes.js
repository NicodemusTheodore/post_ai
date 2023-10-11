const express = require("express");
const AuthController = require("../controllers/authController");
const router = express.Router();

router.post("/login", AuthController.login);
router.post("/login-google", AuthController.loginViaGoogle);
router.post("/register", AuthController.register);
router.get("/verify/:verificationCode", AuthController.verifyUser);

module.exports = router;
