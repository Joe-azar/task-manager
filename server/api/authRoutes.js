const express = require('express');
const { registerUser, loginUser } = require('./authController'); // ✅ Ensure this is correct

const router = express.Router();

// Define authentication routes
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
