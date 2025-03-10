import React from "react";

function TaskItem({ task, deleteTask, editTask, toggleCompletion }) {
  const formattedDate = task.date
    ? new Date(task.date).toLocaleString()
    : "No Date Provided"; // ✅ Fix date format

  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-content">
        <h4>{task.title}</h4>
        <p>{task.description}</p>
        <p><strong>Due Date:</strong> {formattedDate}</p>
        <p><strong>Status:</strong> {task.completed ? "✅ Completed" : "⏳ Pending"}</p>
      </div>
      <div className="task-actions">
        <button onClick={() => toggleCompletion(task._id)} className="button button-small button-complete">
          {task.completed ? "Undo" : "Complete"}
        </button>
        <button onClick={() => editTask(task._id)} className="button button-small button-edit">
          Edit
        </button>
        <button onClick={() => deleteTask(task._id)} className="button button-small button-delete">
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
