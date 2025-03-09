const express = require('express');
const { getTasks, getTaskById, addTask, updateTask, deleteTask } = require('./taskController');
const router = express.Router();

router.get('/', getTasks);
router.get('/:id', getTaskById); 
router.post('/', addTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;