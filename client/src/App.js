import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainApp from "./pages/MainApp";
import TaskAnalytics from "./pages/TaskAnalytics";  // ✅ Import Analytics Page

function PrivateRoute({ element }) {
  const { token } = useContext(AuthContext);
  return token ? element : <Navigate to="/login" />;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tasks" element={<PrivateRoute element={<MainApp />} />} />
      <Route path="/analytics" element={<PrivateRoute element={<TaskAnalytics />} />} />  {/* ✅ Added Route */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
