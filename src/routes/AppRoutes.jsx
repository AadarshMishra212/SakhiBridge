import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicOnlyRoute } from './PublicOnlyRoute';
import { AppLayout } from '../components/AppLayout';

// Pages
import { Login } from '../pages/Login';
import { Signup } from '../pages/Signup';
import { Home } from '../pages/Home';
import { Community } from '../pages/Community';
import { Support } from '../pages/Support';
import { Profile } from '../pages/Profile';
import { NotFound } from '../pages/NotFound';

/**
 * Root index redirector
 * Dispatches to /home if authenticated, or /login if unauthenticated.
 */
const RootRedirect = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-surface-alt p-6">
        <div className="w-12 h-12 rounded-full border-4 border-primary-200 border-t-primary animate-spin mb-4" />
        <p className="text-ink-secondary text-sm font-medium animate-pulse">
          Starting SakhiBridge...
        </p>
      </div>
    );
  }

  return <Navigate to={isAuthenticated ? '/home' : '/login'} replace />;
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Root redirector */}
      <Route path="/" element={<RootRedirect />} />

      {/* Public-only routes: /login and /signup (redirect to /home if already logged in) */}
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Protected routes: /home, /community, /support, /profile (redirect to /login if unauthenticated) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/community" element={<Community />} />
          <Route path="/support" element={<Support />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      {/* 404 Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

