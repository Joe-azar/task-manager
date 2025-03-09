const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendVerificationEmail = require("../utils/emailService");
require("dotenv").config();

// ✅ User Signup & Send Verification Email
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, isVerified: false });

    // ✅ Save user
    await user.save();

    // ✅ Generate Verification Token
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // ✅ Send Verification Email
    await sendVerificationEmail(email, token);

    res.status(201).json({ message: "Signup successful! Check your email to verify your account." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Verify User Email
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // ✅ Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).send("<h2>User not found</h2>");
    }

    // ✅ Check if already verified
    if (user.isVerified) {
      return res.redirect(`${process.env.FRONTEND_URL}/login?verified=already`);
    }

    // ✅ Mark user as verified & save to database
    await User.updateOne({ email: decoded.email }, { $set: { isVerified: true } });

    // ✅ Redirect to Login Page After Successful Verification
    return res.redirect(`${process.env.FRONTEND_URL}/login?verified=success`);
  } catch (error) {
    return res.redirect(`${process.env.FRONTEND_URL}/login?verified=failed`);
  }
};



// Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Check if user is verified
    if (!user.isVerified) {
      return res.status(403).json({ message: "Please verify your email before logging in." });
    }

    // ✅ Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

