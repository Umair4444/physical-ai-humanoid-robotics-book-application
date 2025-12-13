import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { ThemeToggle } from './ThemeToggle/ThemeToggle';

const Navigation: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();

  // Navigation items
  const navItems = [
    { label: t('Home') || 'Home', href: '/' },
    { label: t('Books') || 'Books', href: '/books' },
    { label: t('Modules') || 'Modules', href: '/modules' },
    { label: t('About') || 'About', href: '/about' },
    { label: t('Contact') || 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md shadow-md py-4 bg-background/80 dark:bg-background-dark/80 border-b border-border dark:border-border-dark`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo / Title */}
          <a href="/">
            <div className="text-xl font-bold text-primary">
              AI Robotics Textbook
            </div>
          </a>

          {/* Navigation */}
          <nav>
            <ul className="flex space-x-6">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="font-medium text-text hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
