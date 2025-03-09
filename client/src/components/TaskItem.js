import React from "react";

function TaskItem({ task, deleteTask, editTask }) {
  const formattedDate = task.date
    ? new Date(task.date).toLocaleString()
    : "No Date Provided"; // ✅ Fix date format

  return (
    <li className="task-item">
      <div className="task-content">
        <h4>{task.title}</h4>
        <p>{task.description}</p>
        <p>{formattedDate}</p> {/* ✅ Display the formatted date */}
      </div>
      <div className="task-actions">
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
