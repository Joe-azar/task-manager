import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, deleteTask, editTask  }) {
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem key={task._id} task={task} deleteTask={deleteTask} editTask={editTask} />
      ))}
    </ul>
  );
}

export default TaskList;
