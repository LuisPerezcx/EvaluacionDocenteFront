import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedUserIds }) => {
  const userData = JSON.parse(localStorage.getItem('userData'));

  if (!userData) {
    // Si no está logueado, redirigir al login
    return <Navigate to="/" />;
  }

  if (!allowedUserIds.includes(userData.rol)) {
    // Si el ID no es uno de los permitidos, redirigir al login
    return <Navigate to="/principal" />;
  }

  return children;
};

export default ProtectedRoute;
