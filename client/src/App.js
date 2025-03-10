import React, { useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";  // ✅ Added useLocation
import AuthContext, { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";  
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainApp from "./pages/MainApp";
import TaskAnalytics from "./pages/TaskAnalytics";

function PrivateRoute({ element }) {
  const { token } = useContext(AuthContext);
  return token ? element : <Navigate to="/login" />;
}

function App() {
  const location = useLocation();  // ✅ Get current page location
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register";  // ✅ Hide Navbar if on Login/Register

  return (
    <AuthProvider>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<PrivateRoute element={<MainApp />} />} />
        <Route path="/analytics" element={<PrivateRoute element={<TaskAnalytics />} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
