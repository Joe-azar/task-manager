const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true }, 
  status: { type: String, default: 'pending' }
});

module.exports = mongoose.model('Task', taskSchema);
