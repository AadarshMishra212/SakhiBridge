import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

/**
 * Responsive AppLayout:
 * - On Mobile: Full mobile-first interface with sticky header and fixed bottom navigation bar
 * - On Laptop/Desktop: Spacious, calibrated web application with top desktop navigation,
 *   full-width responsive container (max-w-7xl), multi-column grids, and clean layout hierarchy.
 */
export const AppLayout = () => {
  const location = useLocation();

  const getSubtitle = () => {
    switch (location.pathname) {
      case '/home':
        return 'Personal Safety Dashboard';
      case '/community':
        return 'Peer Circles & Stories';
      case '/support':
        return '24/7 SOS & Emergency Hub';
      case '/profile':
        return 'Account & Circle Settings';
      default:
        return 'Together, for every woman';
    }
  };

  return (
    <div className="min-h-screen bg-surface-alt dark:bg-[#150C10] transition-colors duration-200 flex flex-col font-sans">
      {/* Top Header & Desktop Navigation */}
      <Header subtitle={getSubtitle()} />

      {/* Main Responsive Content Area (Spacious ~1280px container with consistent rhythm) */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 pb-28 md:pb-12">
        <Outlet />
      </main>

      {/* Fixed Bottom Navigation (Mobile Viewports Only: hidden on md and above) */}
      <BottomNav />
    </div>
  );
};
