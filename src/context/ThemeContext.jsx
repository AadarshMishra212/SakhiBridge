import React, { useState, useEffect, useCallback } from 'react';
import { ThemeContext } from './themeContextDef';
export { useTheme } from './useTheme';

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  const applyTheme = useCallback((targetTheme) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const body = document.body;
    const metaColorScheme = document.querySelector('meta[name="color-scheme"]');

    if (targetTheme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      if (body) {
        body.classList.add('dark');
        body.setAttribute('data-theme', 'dark');
      }
      if (metaColorScheme) metaColorScheme.content = 'dark';
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      if (body) {
        body.classList.remove('dark');
        body.setAttribute('data-theme', 'light');
      }
      if (metaColorScheme) metaColorScheme.content = 'light';
    }
  }, []);

  // Apply on mount and whenever theme changes
  useEffect(() => {
    applyTheme(theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {}
  }, [theme, applyTheme]);

  // Sync across tabs via storage event
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'theme' && (e.newValue === 'dark' || e.newValue === 'light')) {
        setThemeState(e.newValue);
        applyTheme(e.newValue);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [applyTheme]);

  const toggleTheme = useCallback(() => {
    setThemeState((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next); // Instant synchronous DOM switch
      try {
        localStorage.setItem('theme', next);
      } catch {}
      return next;
    });
  }, [applyTheme]);

  const setTheme = useCallback((mode) => {
    if (mode === 'dark' || mode === 'light') {
      applyTheme(mode);
      try {
        localStorage.setItem('theme', mode);
      } catch {}
      setThemeState(mode);
    }
  }, [applyTheme]);

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === 'dark', toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
