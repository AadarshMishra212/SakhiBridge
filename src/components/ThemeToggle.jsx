import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

/**
 * Corner Dark/Light Mode Toggle Button
 * Positioned in the corner with smooth transitions, 44px+ touch target,
 * and high-contrast accessible feedback.
 */
export const ThemeToggle = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`fixed top-3.5 right-3.5 sm:top-4 sm:right-4 z-50 flex items-center justify-center min-h-[44px] min-w-[44px] p-2.5 rounded-full backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-400 select-none shadow-soft hover:shadow-float active:scale-90 cursor-pointer ${
        isDark
          ? 'bg-[#221C35]/90 border border-purple-500/40 text-amber-300 hover:text-amber-200 hover:bg-[#2A2342] shadow-[0_0_15px_rgba(245,158,11,0.2)]'
          : 'bg-white/90 border border-purple-100 text-primary-dark hover:text-primary hover:bg-white shadow-[0_4px_20px_rgba(123,79,214,0.12)]'
      } ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Sun
            size={20}
            className="transition-transform duration-300 rotate-0 hover:rotate-45 text-amber-400"
            aria-hidden="true"
          />
        ) : (
          <Moon
            size={19}
            className="transition-transform duration-300 -rotate-12 hover:rotate-0 text-primary"
            aria-hidden="true"
          />
        )}
      </div>
      <span className="sr-only">
        {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
    </button>
  );
};

