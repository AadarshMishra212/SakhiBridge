import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, ShieldAlert, User } from 'lucide-react';

/**
 * Mobile-First Fixed Bottom Navigation Bar
 * 4 Core tabs: Home, Community, Support, Profile
 * Active tab highlighted with primary purple, accessible labels and touch-friendly padding.
 */
export const BottomNav = () => {
  const navItems = [
    {
      to: '/home',
      label: 'Home',
      icon: Home
    },
    {
      to: '/community',
      label: 'Community',
      icon: Users
    },
    {
      to: '/support',
      label: 'Support',
      icon: ShieldAlert,
      isSpecial: true // SOS indicator emphasis
    },
    {
      to: '/profile',
      label: 'Profile',
      icon: User
    }
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 dark:bg-[#191426]/95 backdrop-blur-lg border-t border-purple-100 dark:border-purple-900/40 shadow-nav transition-colors duration-200"
      aria-label="Mobile Navigation"
    >
      <div className="max-w-md mx-auto px-4 py-2 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `
                flex flex-col items-center justify-center min-h-[48px] min-w-[56px] px-2 py-1 rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary-200 select-none
                ${
                  isActive
                    ? 'text-primary dark:text-primary-light font-semibold'
                    : 'text-ink-muted dark:text-purple-300/60 hover:text-ink-secondary dark:hover:text-purple-200'
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <div className="relative flex items-center justify-center">
                    {item.isSpecial ? (
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform ${
                          isActive
                            ? 'bg-sos text-white shadow-soft scale-105'
                            : 'bg-red-50 dark:bg-red-950/50 text-sos dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/60'
                        }`}
                      >
                        <Icon size={19} />
                        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-sos ring-2 ring-white dark:ring-[#191426]" />
                      </div>
                    ) : (
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                          isActive ? 'bg-primary-soft dark:bg-[#2A2242] text-primary dark:text-primary-light' : ''
                        }`}
                      >
                        <Icon size={20} strokeWidth={isActive ? 2.3 : 1.8} />
                      </div>
                    )}
                  </div>
                  <span
                    className={`text-[11px] mt-0.5 tracking-tight ${
                      isActive ? 'text-primary dark:text-primary-light font-semibold' : 'text-ink-muted dark:text-purple-300/60'
                    }`}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

