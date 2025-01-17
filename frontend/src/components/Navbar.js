import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav>
      <h1>任务管理系统</h1>
      <ul>
        <li><Link to="/dashboard">任务</Link></li>
        <li><Link to="/login">登录</Link></li>
        <li><button onClick={handleLogout}>登出</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
