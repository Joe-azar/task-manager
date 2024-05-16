require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./api/taskRoutes');
const uri = process.env.MONGODB_URI;
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors()); // Use this before your route handlers


// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(uri)
.then(() => console.log('MongoDB connected 🔐🌐'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/tasks', taskRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT} 🌍`));
