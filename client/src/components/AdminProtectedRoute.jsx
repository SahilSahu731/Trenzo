import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // Check if user is logged in and if their role is 'admin'
  if (userInfo && userInfo.role === 'admin') {
    return <Outlet />; // If yes, render the nested admin pages
  } else if (userInfo) {
    // If logged in but not an admin, redirect to homepage
    return <Navigate to="/" replace />;
  } else {
    // If not logged in at all, redirect to the admin login page
    return <Navigate to="/admin/login" replace />;
  }
};

export default AdminProtectedRoute;