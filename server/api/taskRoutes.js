const express = require('express');
const { getTasks, addTask, updateTask, deleteTask, getTaskById } = require('./taskController');
const authMiddleware = require('../middleware/authMiddleware'); // ✅ Protect routes

const router = express.Router();

router.get('/', authMiddleware, getTasks);
router.get('/:id', authMiddleware, getTaskById); // ✅ Add this route
router.post('/', authMiddleware, addTask);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;