import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useNavigation } from '../../contexts/NavigationContext';

const Navigation: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { currentModule, currentChapter } = useNavigation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll behavior for navbar visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY && currentScrollY > 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    // Throttle scroll events to ~60fps for performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll);

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        theme === 'dark'
          ? 'bg-gray-900/80 backdrop-blur-md border-b border-gray-700'
          : 'bg-white/80 backdrop-blur-md border-b border-gray-200'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">AI</span>
          </div>
          <h1
            className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          >
            AI Robotics Textbook
          </h1>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <a
            href="/"
            className={`font-medium ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
          >
            {t('home')}
          </a>
          <a
            href="/modules"
            className={`font-medium ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
          >
            {t('modules')}
          </a>
          <a
            href="/pricing"
            className={`font-medium ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
          >
            {t('pricing')}
          </a>
          <a
            href="/contact"
            className={`font-medium ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
          >
            {t('contact')}
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-sm">
            {currentModule && (
              <span
                className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}
              >
                {currentModule.title}
                {currentChapter && ` > ${currentChapter.title}`}
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
