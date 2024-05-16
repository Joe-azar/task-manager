import React from 'react';
import logo from '../logo.svg';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" />
      <h1>Task Manager</h1>
    </nav>
  );
}

export default Navbar;
