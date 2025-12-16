import React, { useState, useEffect } from 'react';
import { useLocation } from '@docusaurus/router';

// This component will be implemented to match the design requirements from the research
export const Navigation: React.FC = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll behavior for navbar visibility
  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', controlNavbar, { passive: true });

    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  // Navigation items
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Modules', href: '/docs/modules' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav 
      className={`transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'} bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-md rounded-full px-4 py-2 shadow-lg`}
      style={{ position: 'fixed', top: '1rem', left: '50%', transform: 'translateX(-50%)' }}
    >
      <ul className="flex space-x-1">
        {navItems.map((item, index) => (
          <li key={index}>
            <a
              href={item.href}
              className={`px-4 py-2 rounded-full transition-colors ${
                location.pathname === item.href
                  ? 'bg-ai-primary text-white'
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};