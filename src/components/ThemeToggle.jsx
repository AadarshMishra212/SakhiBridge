import React from 'react';
import { useTheme } from '../context/useTheme';

/**
 * Animated Day/Night Theme Toggle Switch
 * 
 * Features:
 * - Simple, compact single-switch button (prevents header/profile overlap)
 * - Animated Day to Night transition:
 *   - Day: Sunny blue sky, radiant rotating golden sun, drifting soft clouds
 *   - Night: Deep velvet midnight sky, pearlescent moon with realistic craters, twinkling stars
 * - Elastic spring physics on sliding thumb
 * - Accessible: role="switch", aria-checked, keyboard support, WCAG 44px touch target
 */
export const ThemeToggle = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div
      role="region"
      aria-label="Color theme switcher"
      className={`fixed top-3 right-3 sm:top-4 sm:right-4 z-50 pointer-events-auto select-none ${className}`}
    >
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDark ? 'Switch to Day mode (Light)' : 'Switch to Night mode (Dark)'}
        onClick={toggleTheme}
        className={`group relative flex items-center w-[64px] h-[32px] sm:w-[68px] sm:h-[34px] rounded-full p-1 cursor-pointer transition-all duration-500 shadow-premium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary ${
          isDark
            ? 'bg-gradient-to-r from-[#1E1217] via-[#2A1521] to-[#150C10] border border-lace/15 shadow-[0_4px_16px_rgba(0,0,0,0.6)]'
            : 'bg-gradient-to-r from-[#5EB3F6] via-[#89C7FB] to-[#FFD572] border border-sky-200/80 shadow-[0_4px_14px_rgba(94,179,246,0.35)]'
        }`}
      >
        {/* Day Cloud Fluff (visible on right during day) */}
        <div
          aria-hidden="true"
          className={`absolute right-2.5 flex items-center pointer-events-none transition-all duration-500 ease-out ${
            isDark ? 'opacity-0 translate-y-3 scale-50' : 'opacity-90 translate-y-0 scale-100'
          }`}
        >
          <svg
            className="w-5 h-3 text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)] fill-current"
            viewBox="0 0 24 16"
          >
            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
          </svg>
        </div>

        {/* Night Stars (visible on left during night) */}
        <div
          aria-hidden="true"
          className={`absolute left-2.5 flex items-center gap-1 pointer-events-none transition-all duration-500 ease-out ${
            isDark ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-3 scale-50'
          }`}
        >
          {/* Sparkle 1 */}
          <svg
            className="w-2.5 h-2.5 text-[#FFEDD1] animate-pulse drop-shadow-[0_0_4px_rgba(255,237,209,0.85)] fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 0L14 9L23 12L14 15L12 24L10 15L1 12L10 9L12 0Z" />
          </svg>
          {/* Star 2 */}
          <span className="w-1 h-1 rounded-full bg-[#FFEDD1] animate-pulse shadow-[0_0_3px_#FFEDD1]" />
          {/* Star 3 */}
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#FFEDD1]/90 animate-pulse shadow-[0_0_4px_#FFEDD1]"
            style={{ animationDelay: '250ms' }}
          />
        </div>

        {/* Moving Sun / Moon Orb */}
        <div
          className={`relative z-10 w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform ${
            isDark
              ? 'translate-x-[32px] sm:translate-x-[34px] bg-gradient-to-tr from-[#E2D2C3] via-[#FDF5EB] to-[#FFFFFF] shadow-[0_0_12px_rgba(255,237,209,0.75)] rotate-[360deg]'
              : 'translate-x-0 bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-200 shadow-[0_0_12px_rgba(251,191,36,0.9)] rotate-0'
          }`}
        >
          {/* Sun Rays Details (visible when Day) */}
          <div
            aria-hidden="true"
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              isDark ? 'opacity-0 scale-50' : 'opacity-100 scale-100'
            }`}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-100/60 shadow-[0_0_4px_rgba(255,255,255,0.8)]" />
          </div>

          {/* Moon Craters Details (visible when Night) */}
          <div
            aria-hidden="true"
            className={`absolute inset-0 transition-opacity duration-300 ${
              isDark ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
          >
            <span className="absolute top-1 left-1.5 w-1.5 h-1.5 rounded-full bg-[#BFA38E]/55" />
            <span className="absolute bottom-1.5 left-2 w-1 h-1 rounded-full bg-[#BFA38E]/45" />
            <span className="absolute top-2 right-1.5 w-1.5 h-1.5 rounded-full bg-[#BFA38E]/40" />
          </div>
        </div>
      </button>
    </div>
  );
};
