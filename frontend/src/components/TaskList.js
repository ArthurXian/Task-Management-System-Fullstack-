import React from 'react';

const TaskList = ({ tasks, onDelete }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button onClick={() => onDelete(task._id)}>删除</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
