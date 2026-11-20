import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Bell, ShieldCheck, Home, Users, ShieldAlert, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

/**
 * Glassmorphic Sticky Header & Navigation
 * - Multi-layer frosted glass (backdrop-blur-xl + specular hairline highlights)
 * - Translucent floating nav capsule with inner-glow and glass bevel
 * - Illuminated active tab pill with spring transition
 * - Glassmorphic 1091 Helpline pill, Notification button, and User chip
 */
export const Header = ({ title, subtitle, showActions = true }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/home', label: 'Home', icon: Home },
    { to: '/community', label: 'Community', icon: Users },
    { to: '/support', label: 'Support SOS', icon: ShieldAlert, isSpecial: true }
  ];

  return (
    <header
      className={`sticky top-0 z-30 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/75 dark:bg-[#150C10]/80 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/60 dark:border-white/[0.08] shadow-[0_4px_30px_rgba(74,14,23,0.06)] py-2 sm:py-2.5'
          : 'bg-white/65 dark:bg-[#150C10]/70 backdrop-blur-xl backdrop-saturate-150 border-b border-white/50 dark:border-white/[0.06] shadow-[0_2px_20px_rgba(74,14,23,0.03)] py-3'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3 shrink-0">
          <NavLink
            to="/home"
            className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
          >
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-[#8E2131] via-[#5A121F] to-[#360911] flex items-center justify-center text-lace font-black shadow-md border border-white/20 group-hover:scale-105 transition-transform duration-200">
              <span className="text-sm font-bold tracking-tight text-[#FFEDD1]">SB</span>
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-[#FE9179] to-[#FF6B5E] opacity-0 group-hover:opacity-30 blur-xs transition-opacity" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-ink dark:text-lace font-serif">
                  Sakhi<span className="text-primary dark:text-primary-light font-sans font-extrabold">Bridge</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25 shadow-xs backdrop-blur-sm">
                  <ShieldCheck size={11} className="text-emerald-600 dark:text-emerald-400" /> Safe
                </span>
              </div>
              <p className="text-[11px] text-ink-muted dark:text-lace/60 font-medium tracking-tight hidden sm:block">
                {subtitle || 'Together, for every woman'}
              </p>
            </div>
          </NavLink>
        </div>

        {/* Desktop Navigation Links — Premium Frosted Glass Capsule */}
        <nav
          className="hidden md:flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/70 dark:bg-white/[0.05] backdrop-blur-2xl backdrop-saturate-150 border border-white/80 dark:border-white/10 shadow-[0_8px_32px_0_rgba(74,14,23,0.06),inset_0_1px_1px_0_rgba(255,255,255,0.9)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.45),inset_0_1px_1px_0_rgba(255,255,255,0.12)] transition-all"
          aria-label="Desktop Primary Navigation"
        >
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs lg:text-sm font-semibold transition-all duration-200 select-none min-h-[38px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  item.isSpecial
                    ? isActive
                      ? 'bg-gradient-to-r from-[#E52E2E] to-[#C11E1E] text-white shadow-sos font-bold border border-white/20'
                      : 'bg-red-500/[0.08] dark:bg-red-950/40 text-sos dark:text-red-400 hover:bg-red-500/[0.15] border border-red-500/20 backdrop-blur-sm'
                    : isActive
                      ? 'bg-white/95 dark:bg-[#281820]/95 text-ink dark:text-lace font-bold shadow-[0_2px_10px_rgba(74,14,23,0.08),inset_0_1px_0_rgba(255,255,255,1)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)] border border-burgundy-900/[0.06] dark:border-lace/[0.12]'
                      : 'text-ink-secondary dark:text-lace/75 hover:text-ink dark:hover:text-lace hover:bg-white/50 dark:hover:bg-white/[0.06]'
                }`}
              >
                {item.isSpecial ? (
                  <span className="relative flex h-2 w-2 mr-0.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sos opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sos" />
                  </span>
                ) : (
                  <Icon size={16} className={isActive ? 'text-primary' : 'opacity-70'} />
                )}
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Action icons / User profile — Glassmorphic Group */}
        {showActions && (
          <div className="flex items-center gap-2.5 sm:gap-3 pr-20 sm:pr-24 shrink-0">
            {/* Notification Glass Button */}
            <button
              type="button"
              className="w-9 h-9 rounded-full flex items-center justify-center text-ink-secondary dark:text-lace/75 hover:text-ink dark:hover:text-lace bg-white/60 dark:bg-white/[0.05] backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-[0_4px_16px_rgba(74,14,23,0.04),inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:bg-white/90 dark:hover:bg-white/[0.12] transition-all relative min-h-touch min-w-touch cursor-pointer active:scale-95"
              aria-label="Notifications"
              onClick={() => alert('Notifications: All safety systems and guardian circles are operational.')}
            >
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent ring-2 ring-white dark:ring-[#150C10]" />
            </button>

            {/* User profile Glass Chip — Click directly to visit Profile */}
            {user && (
              <NavLink
                to="/profile"
                className={({ isActive }) => `group flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full backdrop-blur-xl transition-all cursor-pointer active:scale-95 ${
                  isActive
                    ? 'bg-white/95 dark:bg-[#281820]/95 text-ink dark:text-lace font-bold shadow-[0_2px_12px_rgba(74,14,23,0.1),inset_0_1px_0_rgba(255,255,255,1)] border border-primary/40 dark:border-primary/50 ring-2 ring-primary/25'
                    : 'bg-white/60 dark:bg-white/[0.05] border border-white/80 dark:border-white/10 shadow-[0_4px_16px_rgba(74,14,23,0.04),inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:bg-white/90 dark:hover:bg-white/[0.12]'
                }`}
                title={`Logged in as ${user.name} — Click to visit Profile`}
              >
                <div className="relative w-7 h-7 rounded-full bg-gradient-to-tr from-[#5A121F] to-[#8E2131] text-lace font-bold text-xs flex items-center justify-center border-2 border-white dark:border-[#281820] shadow-xs group-hover:scale-105 transition-transform">
                  {user.avatar || 'SB'}
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#150C10]" />
                </div>
                <span className="hidden sm:inline-block text-xs font-bold text-ink dark:text-lace max-w-[130px] truncate tracking-tight">
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
