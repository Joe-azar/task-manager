import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import AddTaskForm from '../components/AddTaskForm';
import EditTaskForm from '../components/EditTaskForm';
import Navbar from '../components/Navbar';
import '../styles/App.css';

function MainApp() {
  const [editing, setEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");  // ✅ Get token from localStorage
      const response = await fetch('http://localhost:5000/tasks', {
        headers: {
          "Authorization": token  // ✅ Send token in headers
        }
      });
  
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error("Invalid response format");
  
      const sortedTasks = data.sort((a, b) => new Date(a.date) - new Date(b.date));
      setTasks(sortedTasks);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };  

  const addTask = async (task) => {
    try {
      const token = localStorage.getItem("token");  // ✅ Get JWT token from localStorage
  
      const response = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token  // ✅ Send token in headers
        },
        body: JSON.stringify(task)
      });
  
      if (!response.ok) {
        throw new Error("Unauthorized: Token missing or invalid");
      }
  
      const newTask = await response.json();
      setTasks([...tasks, newTask].sort((a, b) => new Date(a.date) - new Date(b.date)));
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };  

  const updateTask = async (id, updatedTask) => {
    try {
      console.log("Updating Task:", id, updatedTask);

      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
      });

      if (!response.ok) {
        throw new Error(`Failed to update task: ${response.statusText}`);
      }

      const updatedItem = await response.json();

      setTasks(prevTasks => {
        const updatedTasks = prevTasks.map(task => 
          task._id === id ? { ...task, ...updatedItem } : task
        );

        return updatedTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
      });

      setEditing(false);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    });
    setTasks(tasks.filter(task => task._id !== id).sort((a, b) => new Date(a.date) - new Date(b.date)));
  };

  const editTask = (id) => {
    setCurrentTaskId(id);
    setEditing(true);
  };

  return (
    <div className="app-container">
      <Navbar />
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

export default MainApp;
