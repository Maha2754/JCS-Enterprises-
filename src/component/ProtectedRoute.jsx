    //Only logged-in users can access certain pages 
    
    import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    // If not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If logged in, render the children (Home)
  return children;
};

export default ProtectedRoute;
