import React from 'react';
import { NavLink } from 'react-router-dom';
import { Bell, ShieldCheck, Home, Users, ShieldAlert, User, PhoneCall } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

/**
 * Responsive Top Header & Desktop Navigation
 * Calibrated for both Mobile and Laptop/Desktop viewports:
 * - On Mobile: Clean brand identity, status badge, notifications & avatar
 * - On Laptop: Inline desktop navigation bar (Home, Community, Support, Profile),
 *   quick helpline shortcut, notifications, and active tab highlights.
 */
export const Header = ({ title, subtitle, showActions = true }) => {
  const { user } = useAuth();

  const navLinks = [
    { to: '/home', label: 'Home', icon: Home },
    { to: '/community', label: 'Community', icon: Users },
    { to: '/support', label: 'Support SOS', icon: ShieldAlert, isSpecial: true },
    { to: '/profile', label: 'Profile', icon: User }
  ];

  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 dark:bg-[#1E121A]/95 backdrop-blur-md border-b border-primary-100 dark:border-[#3A1F2D] transition-colors duration-200">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3 shrink-0">
          <NavLink to="/home" className="flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-primary-300 rounded-xl">
            <div className="w-10 h-10 rounded-brand bg-gradient-to-br from-primary to-accent flex items-center justify-center text-lace font-black shadow-soft">
              <span className="text-sm font-bold tracking-tight">SB</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-ink dark:text-lace">
                  Sakhi<span className="text-primary dark:text-primary-light">Bridge</span>
                </span>
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                  <ShieldCheck size={11} /> Safe
                </span>
              </div>
              <p className="text-[11px] text-ink-muted dark:text-lace/70 leading-tight hidden sm:block">
                {subtitle || 'Together, for every woman'}
              </p>
            </div>
          </NavLink>
        </div>

        {/* Desktop Navigation Links (Calibrated for Laptop / Desktop Viewports) */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2" aria-label="Desktop Primary Navigation">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `
                  inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs lg:text-sm font-semibold transition-all duration-150 select-none min-h-[40px] focus:outline-none focus:ring-2 focus:ring-primary-300
                  ${
                    item.isSpecial
                      ? isActive
                        ? 'bg-sos text-white shadow-sm'
                        : 'bg-red-50 dark:bg-red-950/40 text-sos dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50'
                      : isActive
                        ? 'bg-primary-soft dark:bg-[#281823] text-[#842D1B] dark:text-primary-light font-bold shadow-xs border border-primary-200/60 dark:border-[#4C293C]'
                        : 'text-ink-secondary dark:text-lace/80 hover:text-ink dark:hover:text-lace hover:bg-surface-alt dark:hover:bg-[#331F2D]'
                  }
                `}
              >
                <Icon size={16} />
                <span>{item.label}</span>
                {item.isSpecial && (
                  <span className="w-2 h-2 rounded-full bg-sos animate-ping inline-block" aria-hidden="true" />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Action icons / Quick Helpline / User profile */}
        {showActions && (
          <div className="flex items-center gap-2 sm:gap-3 pr-36 md:pr-40 shrink-0">
            {/* Quick Helpline link on tablet/laptop */}
            <a
              href="tel:1091"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary-soft dark:bg-[#281823] text-[#842D1B] dark:text-primary-light hover:bg-primary-100 dark:hover:bg-[#331F2D] text-xs font-bold border border-primary-200 dark:border-[#3A1F2D] transition-colors"
              title="Call National Women Helpline 1091"
            >
              <PhoneCall size={13} />
              <span>1091 Helpline</span>
            </a>

            {/* Notification button */}
            <button
              type="button"
              className="w-9 h-9 rounded-full flex items-center justify-center text-ink-muted dark:text-lace/70 hover:text-ink dark:hover:text-lace hover:bg-surface-alt dark:hover:bg-[#331F2D] transition-colors relative min-h-touch min-w-touch"
              aria-label="Notifications"
              onClick={() => alert('Notifications: All safety systems and guardian circles are operational.')}
            >
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent ring-2 ring-white dark:ring-[#1E121A]" />
            </button>

            {/* User profile avatar & name chip */}
            {user && (
              <NavLink
                to="/profile"
                className="flex items-center gap-2 pl-2 sm:border-l sm:border-primary-100 dark:sm:border-[#3A1F2D] hover:opacity-90 transition-opacity"
                title={`Logged in as ${user.name}`}
              >
                <div className="w-8 h-8 rounded-full bg-primary-soft dark:bg-[#281823] text-[#842D1B] dark:text-lace font-bold text-xs flex items-center justify-center border border-primary-200 dark:border-[#4C293C] shadow-xs">
                  {user.avatar || 'SB'}
                </div>
                <span className="hidden sm:inline-block text-xs font-semibold text-ink dark:text-lace max-w-[100px] truncate">
                  {user.name}
                </span>
              </NavLink>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
