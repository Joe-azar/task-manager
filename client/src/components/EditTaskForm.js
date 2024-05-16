import React, { useState, useEffect } from 'react';

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
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={task.title}
        onChange={handleChange}
        required
      />
      <label>Description:</label>
      <input
        type="text"
        name="description"
        value={task.description}
        onChange={handleChange}
        required
      />
      <button type="submit">Update Task</button>
      <button onClick={() => setEditing(false)}>Cancel</button>
    </form>
  );
}

export default EditTaskForm;
