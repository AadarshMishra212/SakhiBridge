import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/useTheme';

/**
 * High-Contrast Corner Theme Switcher
 * Features a dual-pill segmented toggle switch:
 * - Shows both "Light" and "Dark" states clearly
 * - Actively highlights the current theme
 * - Instant one-tap switching with minimum 44px touch height
 * - Fixed safely in the corner with high z-index
 */
export const ThemeToggle = ({ className = '' }) => {
  const { isDark, toggleTheme, setTheme } = useTheme();

  return (
    <div
      role="region"
      aria-label="Color scheme switcher"
      className={`fixed top-3 right-3 sm:top-4 sm:right-4 z-50 pointer-events-auto select-none ${className}`}
    >
      <div
        className={`flex items-center p-1 rounded-full border shadow-float backdrop-blur-md transition-all duration-200 min-h-[44px] ${
          isDark
            ? 'bg-[#1E121A]/95 border-primary/40 shadow-[0_4px_24px_rgba(0,0,0,0.6)]'
            : 'bg-white/95 border-primary-200 shadow-[0_4px_20px_rgba(254,145,121,0.2)]'
        }`}
      >
        {/* Light Mode Button */}
        <button
          type="button"
          onClick={() => setTheme('light')}
          aria-pressed={!isDark}
          aria-label="Switch to light mode"
          title="Switch to light mode"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 min-h-[36px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400 ${
            !isDark
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-[#1E121A] shadow-sm scale-100'
              : 'text-lace/80 hover:text-lace opacity-80 hover:opacity-100'
          }`}
        >
          <Sun size={15} className={!isDark ? 'rotate-0' : '-rotate-45'} aria-hidden="true" />
          <span>Light</span>
        </button>

        {/* Dark Mode Button */}
        <button
          type="button"
          onClick={() => setTheme('dark')}
          aria-pressed={isDark}
          aria-label="Switch to dark mode"
          title="Switch to dark mode"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 min-h-[36px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400 ${
            isDark
              ? 'bg-gradient-to-r from-primary to-[#C55A44] text-[#140C12] font-black shadow-sm scale-100'
              : 'text-ink-secondary hover:text-ink opacity-70 hover:opacity-100'
          }`}
        >
          <Moon size={15} className={isDark ? '-rotate-12' : 'rotate-0'} aria-hidden="true" />
          <span>Dark</span>
        </button>
      </div>
    </div>
  );
};
