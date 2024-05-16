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
const editTask = (id) => {
  setCurrentTaskId(id);
  setEditing(true);
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
    setTasks(tasks.map(task => (task._id === id ? { ...task, ...updatedItem } : task)));
    setEditing(false);
  } else {
    console.error('Failed to update task');
  }
};



  

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/tasks');  // Adjust this if your API is at a different base URL
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const addTask = async (task) => {
    console.log("Sending to server:", task); // Confirm this is executed
    const response = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    const newTask = await response.json();
    setTasks([...tasks, newTask]);
    console.log("Received from server:", newTask); // Check server response
  };
  
  

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    });
    setTasks(tasks.filter(task => task._id !== id));
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
            <TaskList tasks={tasks} deleteTask={deleteTask} editTask={editTask} />
          </div>
        )}
      </div>
    </div>
  );
  
}

export default App;
