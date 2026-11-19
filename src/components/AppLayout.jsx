import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

/**
 * AppLayout wraps all protected pages with:
 * - Top header (SakhiBridge logo & status)
 * - Main content container (mobile-first 360-430px optimized, centered on desktop)
 * - Fixed bottom navigation bar with 4 tabs
 */
export const AppLayout = () => {
  const location = useLocation();

  // Custom subtitles based on active route
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
    <div className="min-h-screen bg-slate-100 sm:bg-[#F5F2F9] dark:bg-[#08060F] dark:sm:bg-[#08060F] transition-colors duration-200 flex flex-col items-center justify-start sm:py-4">
      {/* Centered mobile shell container */}
      <div className="w-full max-w-md min-h-screen sm:min-h-[844px] bg-surface-alt dark:bg-[#0F0C1B] flex flex-col relative sm:rounded-3xl sm:border sm:border-purple-100/80 dark:sm:border-purple-900/40 sm:shadow-float overflow-hidden transition-colors duration-200">
        {/* Top Header */}
        <Header subtitle={getSubtitle()} />

        {/* Scrollable Page Content */}
        <main className="flex-1 px-4 pt-4 pb-24 overflow-y-auto overscroll-contain">
          <Outlet />
        </main>

        {/* Fixed Bottom Navigation (4 tabs) */}
        <BottomNav />
      </div>
    </div>
  );
};

