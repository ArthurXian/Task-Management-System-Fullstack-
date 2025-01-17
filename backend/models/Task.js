const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, '请提供任务标题'],
    },
    description: {
      type: String,
      required: [true, '请提供任务描述'],
    },
    status: {
      type: String,
      enum: ['待办', '进行中', '完成'],
      default: '待办',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    dueDate: {
      type: Date,
      required: [true, '请提供任务截止日期'],
    },
  },
  {
    timestamps: true, // 自动生成 createdAt 和 updatedAt
  }
);

module.exports = mongoose.model('Task', taskSchema);
