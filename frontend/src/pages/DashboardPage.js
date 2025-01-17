import React, { useEffect, useState } from 'react';
import { getTasks, createTask, deleteTask } from '../services/api';
import TaskList from '../components/TaskList';

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const fetchTasks = async () => {
    const { data } = await getTasks();
    setTasks(data);
  };

  const handleCreateTask = async () => {
    await createTask({ title: newTask, description: '描述...', dueDate: new Date() });
    setNewTask('');
    fetchTasks();
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>任务管理</h2>
      <input
        type="text"
        placeholder="新任务标题"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleCreateTask}>添加任务</button>
      <TaskList tasks={tasks} onDelete={handleDeleteTask} />
    </div>
  );
};

export default DashboardPage;
