const Task = require('../models/taskModel');

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new task
// POST a new task
exports.addTask = async (req, res) => {
  console.log("Attempting to add task:", req.body);  // Log the incoming request body
  try {
    const { title, description, status } = req.body;
    const task = new Task({
      title,
      description,
      status
    });

    const savedTask = await task.save();
    console.log("Task added:", savedTask);  // Log the saved task
    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error adding task:", error);  // Log any errors
    res.status(400).json({ message: error.message });
  }
};



// Update an existing task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
