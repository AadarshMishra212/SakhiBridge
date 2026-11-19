import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

/**
 * Corner Dark/Light Mode Toggle Button
 * Features a high-contrast accessible pill with instant visual feedback,
 * 44px+ touch target, and smooth icon/text transition.
 */
export const ThemeToggle = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`fixed top-3 right-3 sm:top-4 sm:right-4 z-50 pointer-events-auto flex items-center gap-2 px-3.5 py-2 rounded-full backdrop-blur-md transition-all duration-200 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400 min-h-[44px] shadow-soft hover:shadow-float active:scale-95 border ${
        isDark
          ? 'bg-[#221B35]/95 border-purple-500/50 text-amber-300 hover:text-amber-200 hover:bg-[#2C2344] shadow-[0_0_15px_rgba(245,158,11,0.25)]'
          : 'bg-white/95 border-purple-200 text-ink hover:text-primary hover:bg-white shadow-[0_4px_20px_rgba(123,79,214,0.14)]'
      } ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Sun
            size={18}
            className="text-amber-400 transition-transform duration-300 rotate-0"
            aria-hidden="true"
          />
        ) : (
          <Moon
            size={18}
            className="text-primary transition-transform duration-300 -rotate-12"
            aria-hidden="true"
          />
        )}
      </div>

      <span className="text-xs font-semibold tracking-wide">
        {isDark ? 'Light' : 'Dark'}
      </span>
    </button>
  );
};
