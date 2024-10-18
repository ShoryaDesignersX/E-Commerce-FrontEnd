import React from "react";
import { Navigate,Outlet } from "react-router-dom";

// Example of a ProtectedRoute component
const ProtectedRoute = () => {
  const token = localStorage.getItem("jwttoken");

  if (!token) {
    return <Navigate to="/login"  />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
