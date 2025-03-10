import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "../styles/TaskAnalytics.css";

const TaskAnalytics = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/tasks", {
        headers: { Authorization: `Bearer ${token}` }, // ✅ Ensure Bearer token
      });

      const data = await response.json();
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      setLoading(false);
    }
  };

  // ✅ Count completed & pending tasks
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  const chartData = [
    { name: "Completed Tasks", value: completedTasks },
    { name: "Pending Tasks", value: pendingTasks },
  ];

  const COLORS = ["#00C49F", "#FF8042"];

  return (
    <div className="analytics-container">
      <h2 className="analytics-title">📊 Task Analytics</h2>
      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <div className="chart-wrapper">
          <PieChart width={400} height={300}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      )}
    </div>
  );
};

export default TaskAnalytics;
