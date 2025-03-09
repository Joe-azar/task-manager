const Task = require("../models/taskModel");
const mongoose = require("mongoose");

// ✅ Fetch only the tasks of the logged-in user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }); // ✅ Ensure only user's tasks are fetched
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get a single task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Create a task and link it to the user
exports.addTask = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const task = new Task({ title, description, date, userId: req.user.id }); // ✅ Ensure userId is linked

    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Toggle Task Completion
exports.toggleTaskCompletion = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id, userId: req.user.id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.completed = !task.completed;
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating task completion" });
  }
};

// ✅ Update a task - Only if the user owns it
exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: "Invalid Task ID format" });
    }

    const task = await Task.findOne({ _id: taskId, userId: req.user.id });
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

    const task = await Task.findOne({ _id: taskId, userId: req.user.id });
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
