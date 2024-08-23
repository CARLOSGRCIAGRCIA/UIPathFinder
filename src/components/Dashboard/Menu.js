import React from 'react';
import { Link } from 'react-router-dom';
import './StylesDashboard/Menu.css';

const Menu = () => {
  return (
    <nav className="dashboard-menu">
      <ul>
        <li><Link to="/dashboard">Home</Link></li>
        <li><Link to="/dashboard/history">History</Link></li>
        <li><Link to="/dashboard/settings">Settings</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </nav>
  );
};

export default Menu;