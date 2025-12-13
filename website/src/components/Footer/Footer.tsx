import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <footer
      className={`mt-auto py-12 ${theme === 'dark' ? 'bg-gray-900 text-gray-400' : 'bg-gray-100 text-gray-600'}`}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3
              className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
            >
              AI Robotics Textbook
            </h3>
            <p className="text-sm">{t('footer.description')}</p>
          </div>

          <div>
            <h4
              className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
            >
              {t('footer.navigation')}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className={`hover:underline ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {t('home')}
                </a>
              </li>
              <li>
                <a
                  href="/modules"
                  className={`hover:underline ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {t('modules')}
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  className={`hover:underline ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {t('pricing')}
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className={`hover:underline ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {t('contact')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4
              className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
            >
              {t('footer.resources')}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/docs"
                  className={`hover:underline ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {t('documentation')}
                </a>
              </li>
              <li>
                <a
                  href="/tutorials"
                  className={`hover:underline ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {t('tutorials')}
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className={`hover:underline ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {t('blog')}
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className={`hover:underline ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {t('faq')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4
              className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
            >
              {t('footer.contact')}
            </h4>
            <ul className="space-y-2">
              <li className="text-sm">contact@airoboticstextbook.com</li>
              <li className="text-sm">+1 (555) 123-4567</li>
              <li className="text-sm">123 Tech Street, AI City</li>
            </ul>
          </div>
        </div>

        <div
          className={`border-t mt-8 pt-8 text-center text-sm ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}
        >
          <p>
            © {new Date().getFullYear()} AI Robotics Textbook.{' '}
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
