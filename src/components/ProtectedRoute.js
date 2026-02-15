import React from 'react';
import { Navigate } from 'react-router-dom';
import { useMarketplace } from '../hooks/useMarketplace';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useMarketplace();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
