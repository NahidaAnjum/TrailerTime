import React from "react";
import { useAuth } from '../context/AuthContext';
// import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");  // After logout, send back to login
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "8px 16px",
        fontSize: "14px",
        backgroundColor: "#e53935",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        position: "absolute",
        top: "20px",
        right: "20px",
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
