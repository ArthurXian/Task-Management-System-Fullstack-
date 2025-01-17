import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// 设置请求头
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

// 用户认证相关
export const login = (data) => axios.post(`${API_URL}/auth/login`, data);
export const register = (data) => axios.post(`${API_URL}/auth/register`, data);

// 任务管理相关
export const getTasks = () => axios.get(`${API_URL}/tasks`, getAuthHeaders());
export const createTask = (data) =>
  axios.post(`${API_URL}/tasks`, data, getAuthHeaders());
export const updateTask = (id, data) =>
  axios.put(`${API_URL}/tasks/${id}`, data, getAuthHeaders());
export const deleteTask = (id) =>
  axios.delete(`${API_URL}/tasks/${id}`, getAuthHeaders());
