const Task = require('../models/Task');

// 获取用户的任务列表
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: '获取任务失败' });
  }
};

// 创建新任务
exports.createTask = async (req, res) => {
  const { title, description, status, dueDate } = req.body;

  if (!title || !description || !dueDate) {
    return res.status(400).json({ message: '所有字段都是必填的' });
  }

  try {
    const task = await Task.create({
      title,
      description,
      status,
      dueDate,
      user: req.user.id,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: '创建任务失败' });
  }
};

// 更新任务
exports.updateTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (!task || task.user.toString() !== req.user.id) {
      return res.status(404).json({ message: '任务不存在或无权限' });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      req.body,
      { new: true } // 返回更新后的任务
    );
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: '更新任务失败' });
  }
};

// 删除任务
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (!task || task.user.toString() !== req.user.id) {
      return res.status(404).json({ message: '任务不存在或无权限' });
    }

    await task.remove();
    res.status(200).json({ message: '任务已删除' });
  } catch (error) {
    res.status(500).json({ message: '删除任务失败' });
  }
};
