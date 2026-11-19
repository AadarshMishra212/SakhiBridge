import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Route guard for protected pages (Home, Community, Support, Profile, etc.)
 * Redirects unauthenticated users to /login and prevents access after logout.
 */
export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-surface-alt p-6">
        <div className="w-12 h-12 rounded-full border-4 border-primary-200 border-t-primary animate-spin mb-4" />
        <p className="text-ink-secondary text-sm font-medium animate-pulse">
          Connecting to SakhiBridge...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Unauthenticated user is redirected to /login with replace so protected page isn't in back-history
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

