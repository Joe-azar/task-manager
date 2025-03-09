const express = require("express");
const { register, login, verifyEmail } = require("./authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);  // ✅ Make sure this line exists
router.get("/verify/:token", verifyEmail);

module.exports = router;
