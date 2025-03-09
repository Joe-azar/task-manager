import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, deleteTask, editTask }) {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task._id}  // ✅ Ensure each task has a unique key
          task={task}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ))}
    </div>
  );
}

export default TaskList;
