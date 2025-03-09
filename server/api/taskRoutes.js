const express = require('express');
const { getTasks, addTask, updateTask, deleteTask } = require('./taskController');  // ✅ Ensure correct import
const authMiddleware = require('../middleware/authMiddleware');  // ✅ Protect routes

const router = express.Router();

router.get('/', authMiddleware, getTasks);  // ✅ Secure endpoint
router.post('/', authMiddleware, addTask);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;