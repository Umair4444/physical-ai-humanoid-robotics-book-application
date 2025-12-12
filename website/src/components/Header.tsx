import React from 'react';
import { Navigation } from './Navigation';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-md shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-ai-primary">
            AI Robotics Textbook
          </div>
          
          <Navigation />
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={t('themeToggle')}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};