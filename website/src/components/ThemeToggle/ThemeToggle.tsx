import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, isDarkMode } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center h-6 rounded-full w-11 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2"
      style={{
        backgroundColor: isDarkMode
          ? 'var(--ifm-color-text-muted)'
          : 'var(--ifm-color-border)',
      }}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDarkMode}
    >
      {/* Sun Icon */}
      <span
        className={`absolute left-12 flex items-center justify-center text-base transition-all duration-300 ${
          isDarkMode ? 'opacity-0' : 'opacity-100'
        }`}
      >
        ☀️
      </span>

      {/* Moon Icon */}
      <span
        className={`absolute right-12 flex items-center justify-center text-xs transition-all duration-300 ${
          isDarkMode ? 'opacity-100' : 'opacity-0'
        }`}
      >
        🌙
      </span>

      {/* Toggle knob */}
      <span
        className={`relative inline-block w-5 h-5 rounded-full shadow transform transition-transform duration-300 ease-in-out`}
        style={{
          backgroundColor: 'var(--ifm-color-background)',
          transform: isDarkMode ? 'translateX(20px)' : 'translateX(0)',
          boxShadow: isDarkMode
            ? '0 2px 4px rgba(0, 0, 0, 0.2)'
            : '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      />
    </button>
  );
};
