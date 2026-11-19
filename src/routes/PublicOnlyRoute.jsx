import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Route guard for auth pages (/login, /signup).
 * Logged-in users who visit /login or /signup are redirected to /home.
 */
export const PublicOnlyRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-surface-alt p-6">
        <div className="w-12 h-12 rounded-full border-4 border-primary-200 border-t-primary animate-spin mb-4" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

