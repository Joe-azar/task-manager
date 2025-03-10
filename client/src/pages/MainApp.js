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
      const token = localStorage.getItem("token");
  
      if (!token) throw new Error("No token found");
  
      const response = await fetch("http://localhost:5000/tasks", {
        headers: { Authorization: `Bearer ${token}` }, // ✅ Ensure token is prefixed with "Bearer "
      });
  
      if (!response.ok) throw new Error("Failed to fetch tasks");
  
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
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
      const token = localStorage.getItem("token");  // ✅ Get token
  
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token  // ✅ Send token
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
    try {
      const token = localStorage.getItem("token");  // ✅ Get token
  
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token  // ✅ Send token
        }
      });
  
      if (!response.ok) {
        throw new Error("Unauthorized: Token missing or invalid");
      }
  
      setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };  

  const editTask = (id) => {
    setCurrentTaskId(id);
    setEditing(true);
  };

  const toggleCompletion = async (id) => {
    try {
      const token = localStorage.getItem("token"); // ✅ Get token
  
      const response = await fetch(`http://localhost:5000/tasks/toggle/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // ✅ Send token
        }
      });
  
      if (!response.ok) {
        throw new Error(`Failed to toggle task completion: ${response.statusText}`);
      }
  
      const updatedTask = await response.json();
  
      // ✅ Update the task list
      setTasks(prevTasks =>
        prevTasks.map(task => (task._id === id ? updatedTask : task))
      );
    } catch (error) {
      console.error("Failed to toggle task completion:", error);
    }
  };
  
  return (
    <div className="app-container">
      <div className="tasks-section">
        {editing ? (
          <EditTaskForm taskId={currentTaskId} updateTask={updateTask} setEditing={setEditing} />
        ) : (
          <div>
            <AddTaskForm addTask={addTask} />
            {/* ✅ Updated TaskList with toggleCompletion */}
            <TaskList 
              tasks={tasks} 
              deleteTask={deleteTask} 
              editTask={editTask} 
              toggleCompletion={toggleCompletion} 
            />
          </div>
        )}
      </div>
    </div>
  );  
}

export default MainApp;
