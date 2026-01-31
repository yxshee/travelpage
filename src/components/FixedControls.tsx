'use client';

import { useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';

// Theme store for syncing with localStorage
const themeStore = {
  getSnapshot: () => {
    if (typeof window === 'undefined') return false;
    return document.body.classList.contains('dark-mode');
  },
  getServerSnapshot: () => false,
  subscribe: (callback: () => void) => {
    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          callback();
        }
      });
    });
    if (typeof document !== 'undefined') {
      observer.observe(document.body, { attributes: true });
    }
    return () => observer.disconnect();
  },
};

export function FixedControls() {
  const isDarkMode = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    themeStore.getServerSnapshot
  );

  // Initialize theme on mount (only runs once, doesn't call setState)
  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initDark = currentTheme === 'dark' || (!currentTheme && isSystemDark);

    if (initDark) {
      document.body.classList.add('dark-mode');
    }
  }, []);

  const handleToggleTheme = () => {
    document.body.classList.toggle('dark-mode');
    const isNowDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isNowDark ? 'dark' : 'light');
    // useSyncExternalStore will automatically pick up the class change
  };

  const handleMouseEnter = () => {
    const cursor = document.querySelector('.cursor-dot');
    if (cursor) cursor.classList.add('is-active');
  };

  const handleMouseLeave = () => {
    const cursor = document.querySelector('.cursor-dot');
    if (cursor) cursor.classList.remove('is-active');
  };

  return (
    <div className="fixed-controls">
      {/* Home Button */}
      <Link
        href="/"
        className="home-btn fMedium"
        aria-label="Go Home"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        HOME
      </Link>

      {/* Theme Toggle */}
      <button
        id="theme-toggle"
        className="theme-toggle"
        aria-label="Toggle Dark Mode"
        onClick={handleToggleTheme}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className="theme-text fMedium">{isDarkMode ? 'LIGHT' : 'DARK'}</span>
      </button>
    </div>
  );
}
