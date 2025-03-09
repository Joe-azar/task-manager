import React, { useState, useEffect } from 'react';
import '../styles/App.css';

function EditTaskForm({ taskId, updateTask, setEditing }) {
  const [task, setTask] = useState({ title: '', description: '', date: '' });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem("token"); // ✅ Get token
        const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
          headers: { 'Authorization': token }
        });

        if (!response.ok) {
          throw new Error("Task not found or unauthorized access");
        }

        const data = await response.json();

        // ✅ Convert UTC date to "YYYY-MM-DDTHH:MM" format
        const formattedDate = data.date ? new Date(data.date).toISOString().slice(0, 16) : '';

        setTask({ title: data.title, description: data.description, date: formattedDate });
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    if (taskId) fetchTask();
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Update Task Submitted: ", task);
    updateTask(taskId, task);
  };

  return (
    <div className="edit-form-container">
      <h2 className="edit-form-title">Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="edit-form-group">
          <label className="edit-form-label">Title:</label>
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
          <label className="edit-form-label">Description:</label>
          <input
            className="edit-form-input"
            type="text"
            name="description"
            value={task.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="edit-form-group">
          <label className="edit-form-label">Date:</label>
          <input
            className="edit-form-input"
            type="datetime-local"
            name="date"
            value={task.date}
            onChange={handleChange}
            required
          />
        </div>
        <button className="edit-form-button" type="submit">Update Task</button>
        <button type="button" className="edit-form-button cancel" onClick={() => setEditing(false)}>Cancel</button>
      </form>
    </div>
  );
}

export default EditTaskForm;
