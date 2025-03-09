import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";  // ✅ Updated CSS path

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>Task Manager</h2>
      <div className="navbar-right">
        {user && <span className="user-name">👤 {user.name}</span>} {/* ✅ Show User Name */}
        <button onClick={() => navigate("/analytics")} className="analytics-btn">📊 Analytics</button>  {/* ✅ New Button */}
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
