import React, { useState, useEffect } from 'react';
import '../App.css';  // Ensure this is imported if not already

function EditTaskForm({ taskId, updateTask, setEditing }) {
  const [task, setTask] = useState({ title: '', description: '' });

  useEffect(() => {
    const fetchTask = async () => {
      const res = await fetch(`http://localhost:5000/tasks/${taskId}`);
      const data = await res.json();
      setTask({ title: data.title, description: data.description });
    };
    fetchTask();
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask(taskId, task);
  };

  return (
    <div className="edit-form-container">
      <h2 className="edit-form-title">Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="edit-form-group">
          <label className="edit-form-label" htmlFor="title">Title:</label>
          <input
            className="edit-form-input"
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="edit-form-group">
          <label className="edit-form-label" htmlFor="description">Description:</label>
          <input
            className="edit-form-input"
            type="text"
            name="description"
            value={task.description}
            onChange={handleChange}
            required
          />
        </div>
        <button className="edit-form-button" type="submit">Update Task</button>
        <button className="edit-form-button cancel" onClick={() => setEditing(false)}>Cancel</button>
      </form>
    </div>
  );
}

export default EditTaskForm;
