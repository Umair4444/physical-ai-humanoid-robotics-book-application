import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import styles from './Footer/Footer.module.css';

// SVG Icons for social media
const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
  </svg>
);

const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
  </svg>
);

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();

  // Social media links - using actual social platforms
  const socialLinks = [
    { name: 'Twitter', url: 'https://twitter.com', icon: <TwitterIcon /> },
    { name: 'GitHub', url: 'https://github.com', icon: <GitHubIcon /> },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: <LinkedInIcon /> },
    { name: 'YouTube', url: 'https://youtube.com', icon: <YouTubeIcon /> },
  ];

  // Actual pages in the site
  const quickLinks = [
    { name: t('home'), path: '/' },
    { name: t('books'), path: '/books' },
    { name: t('pricing'), path: '/pricing' },
    { name: t('contact'), path: '/contact' },
  ];

  const resourceLinks = [
    { name: t('documentation'), path: '/docs/books/physical-ai-humanoid-robotics-book/intro' },
    { name: t('blog'), path: '/blog' },
    { name: t('faq') || 'FAQ', path: '/contact' }, // Using contact as FAQ since there's no specific FAQ page
  ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '/' }, // Placeholder - would need actual page
    { name: 'Terms of Service', path: '/' }, // Placeholder - would need actual page
    { name: 'Cookie Policy', path: '/' }, // Placeholder - would need actual page
  ];

  return (
    <footer
      className={`
        ${styles.footerContainer}
        ${theme === 'dark' ? styles.footerContainerDark : ''}
      `}
    >
      <div className="container mx-auto px-4">
        <div className={`${styles.footerGrid} mb-12`}>
          {/* Brand and Description */}
          <div className={styles.footerBrandSection}>
            <h3 className={styles.footerBrandTitle}>
              <span className="mr-2">🤖</span>
              <span className={styles.footerBrandTitleGradient}>
                AI Robotics
              </span>
            </h3>
            <p className={styles.footerBrandDescription}>
              Educating the next generation of roboticists with cutting-edge resources and interactive learning tools.
            </p>
            <div className={styles.footerSocialLinks}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={styles.footerSocialLink}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.footerSection}>
            <h4
              className={`
                ${styles.footerSectionTitle}
                ${theme === 'dark' ? styles.footerSectionTitleDark : ''}
              `}
            >
              {t('footer.navigation') || 'Quick Links'}
            </h4>
            <ul className={styles.footerLinksList}>
              {quickLinks.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.path}
                    className={`
                      ${styles.footerLink}
                      ${theme === 'dark' ? styles.footerLinkDark : ''}
                    `}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className={styles.footerSection}>
            <h4
              className={`
                ${styles.footerSectionTitle}
                ${theme === 'dark' ? styles.footerSectionTitleDark : ''}
              `}
            >
              {t('footer.resources') || 'Resources'}
            </h4>
            <ul className={styles.footerLinksList}>
              {resourceLinks.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.path}
                    className={`
                      ${styles.footerLink}
                      ${theme === 'dark' ? styles.footerLinkDark : ''}
                    `}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className={styles.footerSection}>
            <h4
              className={`
                ${styles.footerSectionTitle}
                ${theme === 'dark' ? styles.footerSectionTitleDark : ''}
              `}
            >
              {t('footer.contact') || 'Contact Us'}
            </h4>
            <div className={styles.contactInfo}>
              <p className={styles.contactInfoItem}>
                <span>📧</span>
                <span className={styles.contactInfoText}>contact@airoboticstextbook.com</span>
              </p>
              <p className={styles.contactInfoItem}>
                <span>📞</span>
                <span className={styles.contactInfoText}>+1 (555) 123-4567</span>
              </p>
              <p className={styles.contactInfoItem}>
                <span>📍</span>
                <span className={styles.contactInfoText}>123 Tech Street, AI City</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`${styles.footerBottom} ${theme === 'dark' ? styles.footerBottomDark : ''}`}>
          <p className={styles.copyrightText}>
            © {new Date().getFullYear()} AI Robotics Textbook.{' '}
            {t('footer.copyright') || 'All rights reserved.'}
          </p>
          <div className={styles.legalLinks}>
            {legalLinks.map((item, index) => (
              <a
                key={index}
                href={item.path}
                className={`
                  ${styles.footerLink}
                  ${theme === 'dark' ? styles.footerLinkDark : ''}
                `}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;