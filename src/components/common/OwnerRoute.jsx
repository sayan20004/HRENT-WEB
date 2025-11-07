import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const OwnerRoute = () => {
  const { user, userType, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return user && userType === 'owner' ? <Outlet /> : <Navigate to="/" replace />;
};

export default OwnerRoute;