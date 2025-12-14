import React, { useState, useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { ThemeToggle } from './../ThemeToggle/ThemeToggle';
import Link from '@docusaurus/Link';
import styles from './Navigation.module.css';

const Navigation: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigationItems = [
    { title: 'Home', path: '/' },
    { title: 'Modules', path: '/modules' },
    { title: 'Pricing', path: '/pricing' },
    { title: 'Contact', path: '/contact' },
    { title: '👤', path: '/login' },
  ];

  // Check if the current path matches the navigation item
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className={`${styles.navContainer} ${isScrolled ? styles.navScrolled : ''}`}
      aria-label="Main navigation"
    >
      <div
        className={`${styles.navCapsule} space-x-6 ${isMenuOpen ? styles.navCapsuleOpen : ''}`}
      >
        {/* Logo - Always visible */}
        <div className={styles.navLogo}>
          <Link to="/" aria-label="Home">
            <span className={styles.logoText}>AI Robotics</span>
          </Link>
        </div>

        {/* Desktop Navigation - Hidden on mobile when menu is open */}
        <div
          className={`${styles.navDesktop} ${isMenuOpen ? styles.navDesktopHidden : ''}`}
        >
          <ul className={`${styles.navList} flex items-center`}>
            {navigationItems.map((item, index) => (
              <li key={index} className={styles.navItem}>
                <Link
                  to={item.path}
                  className={`${styles.navLink} ${isActive(item.path) ? styles.navLinkActive : ''}`}
                  onClick={closeMenu}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                >
                  {item.title}
                </Link>
              </li>
            ))}           
          </ul>
        </div>

        {/* Theme Toggle and Auth Links - Always visible */}
        <div className={`${styles.navActions} space-x-4`}>
          <ThemeToggle />

          <button
            className={styles.navToggle}
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label={
              isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                toggleMenu();
              }
            }}
          >
            <span
              className={`${styles.navHamburger} ${isMenuOpen ? styles.navHamburgerOpen : ''}`}
            >
              <span className={styles.navHamburgerLine}></span>
              <span className={styles.navHamburgerLine}></span>
              <span className={styles.navHamburgerLine}></span>
            </span>
          </button>
        </div>

        {/* Mobile Navigation - Only visible when menu is open */}
        <div
          className={`${styles.navMobile} ${isMenuOpen ? styles.navMobileOpen : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <ul className={styles.navMobileList}>
            {navigationItems.map((item, index) => (
              <li key={index} className={styles.navMobileItem}>
                <Link
                  to={item.path}
                  className={`${styles.navMobileLink} ${isActive(item.path) ? styles.navMobileLinkActive : ''}`}
                  onClick={closeMenu}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      closeMenu();
                    }
                  }}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                >
                  {item.title}
                </Link>
              </li>
            ))}
            {/* Auth links for mobile */}
            <li className={styles.navMobileItem}>
              <Link
                to="/login"
                className={styles.navMobileLink}
                onClick={closeMenu}
              >
                👤 Log In
              </Link>
            </li>
            <li className={styles.navMobileItem}>
              <Link
                to="/signup"
                className={`${styles.navMobileLink} bg-indigo-600 text-white rounded-lg px-4 py-2`}
                onClick={closeMenu}
              >
                ✍️ Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
