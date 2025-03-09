const express = require("express");
const { register, verifyEmail } = require("./authController");

const router = express.Router();

router.post("/register", register);
router.get("/verify/:token", verifyEmail);  // ✅ Verification Route

module.exports = router;
