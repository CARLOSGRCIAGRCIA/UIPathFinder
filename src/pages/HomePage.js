import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div>
    <h1>Welcome to Path Finder</h1>
    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>
  </div>
);

export default HomePage;
