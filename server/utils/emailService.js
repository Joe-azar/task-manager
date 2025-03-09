const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (email, token) => {
  const baseUrl = process.env.BASE_URL || "http://localhost:5000";  // ✅ Default if missing
  const verificationLink = `${baseUrl}/auth/verify/${token}`;  // ✅ Fixed URL

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify Your Email - Task Manager",
    html: `
      <h2>Welcome to Task Manager</h2>
      <p>Click the link below to verify your email:</p>
      <a href="${verificationLink}">${verificationLink}</a>
      <p>If you did not sign up, you can ignore this email.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent to:", email);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendVerificationEmail;
