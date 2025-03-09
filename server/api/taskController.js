const Task = require('../models/taskModel');
const mongoose = require('mongoose');

// ✅ Fetch only the tasks of the logged-in user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Create a task and link it to the user
exports.addTask = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const task = new Task({ title, description, date, user: req.user.id });

    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Update a task - Only if the user owns it
exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Invalid Task ID format" });
    }

    const task = await Task.findOne({ _id: taskId, user: req.user.id });
    if (!task) {
      return res.status(403).json({ message: "Unauthorized: You can only update your own tasks" });
    }

    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Delete a task - Only if the user owns it
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Invalid Task ID format" });
    }

    const task = await Task.findOne({ _id: taskId, user: req.user.id });
    if (!task) {
      return res.status(403).json({ message: "Unauthorized: You can only delete your own tasks" });
    }

    await Task.findByIdAndDelete(taskId);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
