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
exports.addTask = async (req, res) => {
  try {
    const { title, description, date, status } = req.body;  // Include date in the request body
    const task = new Task({
      title,
      description,
      date: new Date(date),  // Convert to Date object
      status
    });

    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};




// Update an existing task
exports.updateTask = async (req, res) => {
  try {
    const { title, description, date, status } = req.body;  // Include date in the request body
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, date: new Date(date), status },
      { new: true }
    );

    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
    res.json(updatedTask);
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
