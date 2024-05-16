import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import EditTaskForm from './components/EditTaskForm';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [editing, setEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/tasks');
      const data = await response.json();
      const sortedTasks = data.sort((a, b) => new Date(a.date) - new Date(b.date));  // Sort tasks by date
      setTasks(sortedTasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const addTask = async (task) => {
    const response = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    const newTask = await response.json();
    setTasks([...tasks, newTask].sort((a, b) => new Date(a.date) - new Date(b.date)));  // Add and sort tasks
  };

  const updateTask = async (id, updatedTask) => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    });
    if (response.ok) {
      const updatedItem = await response.json();
      setTasks(tasks.map(task => (task._id === id ? { ...task, ...updatedItem } : task)).sort((a, b) => new Date(a.date) - new Date(b.date)));
      setEditing(false);
    } else {
      console.error('Failed to update task');
    }
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    });
    setTasks(tasks.filter(task => task._id !== id).sort((a, b) => new Date(a.date) - new Date(b.date)));
  };

  const editTask = (id) => {  // Define the editTask function
    setCurrentTaskId(id);
    setEditing(true);
  };

  return (
    <div className="app-container">
      <Navbar />
      <header className="app-header">
        <h1>Welcome To Our App</h1>
      </header>
      <div className="tasks-section">
        {editing ? (
          <EditTaskForm taskId={currentTaskId} updateTask={updateTask} setEditing={setEditing} />
        ) : (
          <div>
            <AddTaskForm addTask={addTask} />
            <TaskList tasks={tasks} deleteTask={deleteTask} editTask={editTask} />  {/* Pass editTask */}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
