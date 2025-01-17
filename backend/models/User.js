const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, '请提供用户名'],
  },
  email: {
    type: String,
    required: [true, '请提供邮箱'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, '请提供密码'],
  },
});

// 密码加密中间件
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);
