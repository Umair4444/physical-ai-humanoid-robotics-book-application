import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <footer
      className={`mt-auto py-12 ${
        theme === 'dark' 
          ? 'bg-[var(--ifm-color-background)] text-[var(--ifm-color-text-light)]' 
          : 'bg-[var(--ifm-color-background)] text-[var(--ifm-color-text)]'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3
              className={`text-lg font-bold mb-4 text-[var(--ifm-color-primary)]`}
            >
              AI Robotics Textbook
            </h3>
            <p className="text-sm text-[var(--ifm-color-primary)]/90">{ 'Educating the next generation of roboticists'}</p>
          </div>

          <div>
            <h4
              className={`font-semibold mb-4 ${
                theme === 'dark' ? 'text-[var(--ifm-color-primary)]' : 'text-[var(--ifm-color-text)]'
              }`}
            >
              {t('footer.navigation') || 'Navigation'}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className={`hover:underline ${
                    theme === 'dark' 
                      ? 'text-[var(--ifm-color-text-light)] hover:text-[var(--ifm-color-text)]' 
                      : 'text-[var(--ifm-color-text-light)] hover:text-[var(--ifm-color-text)]'
                  }`}
                >
                  {t('home') || 'Home'}
                </a>
              </li>
              <li>
                <a
                  href="/modules"
                  className={`hover:underline ${
                    theme === 'dark' 
                      ? 'text-[var(--ifm-color-text-light)] hover:text-[var(--ifm-color-text)]' 
                      : 'text-[var(--ifm-color-text-light)] hover:text-[var(--ifm-color-text)]'
                  }`}
                >
                  {t('modules') || 'Modules'}
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className={`hover:underline ${
                    theme === 'dark' 
                      ? 'text-[var(--ifm-color-text-light)] hover:text-[var(--ifm-color-text)]' 
                      : 'text-[var(--ifm-color-text-light)] hover:text-[var(--ifm-color-text)]'
                  }`}
                >
                  {t('about') || 'About'}
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className={`hover:underline ${
                    theme === 'dark' 
                      ? 'text-[var(--ifm-color-text-light)] hover:text-[var(--ifm-color-text)]' 
                      : 'text-[var(--ifm-color-text-light)] hover:text-[var(--ifm-color-text)]'
                  }`}
                >
                  {t('contact') || 'Contact'}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4
              className={`font-semibold mb-4 ${
                theme === 'dark' ? 'text-[var(--ifm-color-primary)]' : 'text-[var(--ifm-color-text)]'
              }`}
            >
              {t('footer.resources') || 'Resources'}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/docs"
                  className={`hover:underline ${
                    theme === 'dark' 
                      ? 'text-[var(--ifm-color-text-light)] hover:text-[var(--ifm-color-text)]' 
                      : 'text-[var(--ifm-color-text-light)] hover:text-[var(--ifm-color-text)]'
                  }`}
                >
                  {t('documentation') || 'Documentation'}
                </a>
              </li>
              <li>
                <a
                  href="/tutorials"
                  className={`hover:underline ${
                    theme === 'dark' 
                      ? 'text-[var(--ifm-color-text-light)] hover:text-[var(--ifm-color-text)]' 
                      : 'text-[var(--ifm-color-text-light)] hover:text-[var(--ifm-color-text)]'
                  }`}
                >
                  {t('tutorials') || 'Tutorials'}
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className={`hover:underline ${
                    theme === 'dark' 
                      ? 'text-[var(--ifm-color-text-light)] hover:text-[var(--ifm-color-text)]' 
                      : 'text-[var(--ifm-color-text-light)] hover:text-[var(--ifm-color-text)]'
                  }`}
                >
                  {t('blog') || 'Blog'}
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className={`hover:underline ${
                    theme === 'dark' 
                      ? 'text-[var(--ifm-color-text-light)] hover:text-[var(--ifm-color-text)]' 
                      : 'text-[var(--ifm-color-text-light)] hover:text-[var(--ifm-color-text)]'
                  }`}
                >
                  {t('faq') || 'FAQ'}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4
              className={`font-semibold mb-4 ${
                theme === 'dark' ? 'text-[var(--ifm-color-primary)]' : 'text-[var(--ifm-color-text)]'
              }`}
            >
              {t('footer.contact') || 'Contact'}
            </h4>
            <ul className="space-y-2">
              <li className="text-sm">contact@airoboticstextbook.com</li>
              <li className="text-sm">+1 (555) 123-4567</li>
              <li className="text-sm">123 Tech Street, AI City</li>
            </ul>
          </div>
        </div>

        <div
          className={`border-t mt-8 pt-8 text-center text-sm ${
            theme === 'dark' ? 'border-[var(--ifm-color-border)]' : 'border-[var(--ifm-color-border)]'
          }`}
        >
          <p>
            © {new Date().getFullYear()} AI Robotics Textbook.{' '}
            {t('footer.copyright') || 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;