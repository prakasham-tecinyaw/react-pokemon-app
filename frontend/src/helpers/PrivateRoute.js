import React from 'react';
import { Navigate , Route } from 'react-router-dom';


export const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};