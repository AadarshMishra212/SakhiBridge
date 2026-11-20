import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, ShieldAlert, User } from 'lucide-react';

/**
 * Mobile-First Glassmorphic Fixed Bottom Navigation Bar
 * - Frosted glass bar with top hairline and specular highlight
 * - Tactile active tab indicator
 * - Prominent Emergency SOS button
 * - 44px+ touch targets
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
      isSpecial: true
    },
    {
      to: '/profile',
      label: 'Profile',
      icon: User
    }
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/75 dark:bg-[#150C10]/80 backdrop-blur-2xl backdrop-saturate-150 border-t border-white/60 dark:border-white/[0.08] shadow-[0_-8px_32px_rgba(74,14,23,0.06),inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[0_-8px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] transition-colors duration-200"
      aria-label="Mobile Navigation"
    >
      <div className="max-w-md mx-auto px-4 py-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `
                relative flex flex-col items-center justify-center min-h-[50px] min-w-[58px] px-2 py-1 rounded-2xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary select-none
                ${
                  isActive
                    ? 'text-primary-800 dark:text-primary-light font-bold'
                    : 'text-ink-muted dark:text-lace/60 hover:text-ink-secondary dark:hover:text-lace'
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <div className="relative flex items-center justify-center">
                    {item.isSpecial ? (
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          isActive
                            ? 'bg-gradient-to-tr from-[#E52E2E] to-[#C11E1E] text-white shadow-sos scale-105 border border-white/30'
                            : 'bg-red-500/10 dark:bg-red-950/60 text-sos dark:text-red-400 border border-red-500/25 backdrop-blur-sm'
                        }`}
                      >
                        <Icon size={20} />
                        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-sos ring-2 ring-white dark:ring-[#150C10]" />
                      </div>
                    ) : (
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                          isActive
                            ? 'bg-white/80 dark:bg-white/[0.08] backdrop-blur-md text-[#5A121F] dark:text-lace shadow-xs scale-105 border border-white/60 dark:border-white/10'
                            : 'opacity-80'
                        }`}
                      >
                        <Icon size={19} strokeWidth={isActive ? 2.4 : 1.8} />
                      </div>
                    )}
                  </div>
                  <span
                    className={`text-[10px] mt-0.5 font-medium tracking-tight ${
                      isActive ? 'text-[#5A121F] dark:text-lace font-bold' : 'text-ink-muted dark:text-lace/60'
                    }`}
                  >
                    {item.label}
                  </span>
                  {isActive && !item.isSpecial && (
                    <span className="absolute bottom-1 w-1 h-1 rounded-full bg-primary" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
