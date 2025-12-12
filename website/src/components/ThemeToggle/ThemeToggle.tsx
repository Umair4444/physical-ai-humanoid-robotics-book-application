import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, isDarkMode } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center h-6 rounded-full w-11 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ai-primary"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDarkMode}
    >
      {/* Background based on theme */}
      <span className={`absolute inset-0 flex items-center justify-center w-full h-full rounded-md transition-opacity duration-300 ${
        isDarkMode ? 'bg-gray-700 opacity-100' : 'bg-gray-200 opacity-100'
      }`} />
      
      {/* Sun Icon */}
      <span className={`absolute left-1 flex items-center justify-center text-xs transition-all duration-300 ${
        isDarkMode ? 'opacity-0' : 'opacity-100'
      }`}>
        ☀️
      </span>
      
      {/* Moon Icon */}
      <span className={`absolute right-1 flex items-center justify-center text-xs transition-all duration-300 ${
        isDarkMode ? 'opacity-100' : 'opacity-0'
      }`}>
        🌙
      </span>
      
      {/* Toggle knob */}
      <span className={`relative inline-block w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-300 ease-in-out ${
        isDarkMode ? 'translate-x-5' : 'translate-x-0'
      }`} />
    </button>
  );
};