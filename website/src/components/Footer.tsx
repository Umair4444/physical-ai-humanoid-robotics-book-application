import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();

  // Social media links
  const socialLinks = [
    { name: 'Twitter', url: '#', icon: '🐦' },
    { name: 'GitHub', url: '#', icon: '🐙' },
    { name: 'LinkedIn', url: '#', icon: '👔' },
    { name: 'YouTube', url: '#', icon: '📺' },
  ];

  // Newsletter signup function
  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
  };

  return (
    <footer
      className={`mt-auto pt-16 pb-8 ${
        theme === 'dark'
          ? 'bg-gradient-to-t from-gray-900 to-gray-800 text-[var(--ifm-color-text-light)]'
          : 'bg-gradient-to-t from-gray-100 to-white text-[var(--ifm-color-text)]'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand and Description */}
          <div>
            <h3 className={`text-xl font-bold mb-4 flex items-center`}>
              <span className={`text-2xl mr-2`}>🤖</span>
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                AI Robotics
              </span>
            </h3>
            <p className="text-sm mb-6 opacity-80">
              Educating the next generation of roboticists with cutting-edge resources and interactive learning tools.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  aria-label={social.name}
                  className="text-lg hover:opacity-80 transition-opacity duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className={`font-semibold mb-6 text-lg ${
                theme === 'dark' ? 'text-[var(--ifm-color-primary)]' : 'text-[var(--ifm-color-text)]'
              }`}
            >
              {t('footer.navigation') || 'Quick Links'}
            </h4>
            <ul className="space-y-4">
              {[
                { name: t('home') || 'Home', path: '/' },
                { name: t('modules') || 'Modules', path: '/modules' },
                { name: 'Pricing', path: '/pricing' },
                { name: t('about') || 'About', path: '/about' },
                { name: t('contact') || 'Contact', path: '/contact' },
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href={item.path}
                    className={`hover:underline transition-all duration-300 ${
                      theme === 'dark'
                        ? 'text-[var(--ifm-color-text-light)] hover:text-[var(--ifm-color-primary)]'
                        : 'text-[var(--ifm-color-text-light)] hover:text-[var(--ifm-color-primary)]'
                    }`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4
              className={`font-semibold mb-6 text-lg ${
                theme === 'dark' ? 'text-[var(--ifm-color-primary)]' : 'text-[var(--ifm-color-text)]'
              }`}
            >
              {t('footer.resources') || 'Resources'}
            </h4>
            <ul className="space-y-4">
              {[
                { name: t('documentation') || 'Documentation', path: '/docs' },
                { name: t('tutorials') || 'Tutorials', path: '/tutorials' },
                { name: t('blog') || 'Blog', path: '/blog' },
                { name: t('faq') || 'FAQ', path: '/faq' },
                { name: 'Community', path: '/community' },
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href={item.path}
                    className={`hover:underline transition-all duration-300 ${
                      theme === 'dark'
                        ? 'text-[var(--ifm-color-text-light)] hover:text-[var(--ifm-color-primary)]'
                        : 'text-[var(--ifm-color-text-light)] hover:text-[var(--ifm-color-primary)]'
                    }`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter and Contact */}
          <div>
            <h4
              className={`font-semibold mb-6 text-lg ${
                theme === 'dark' ? 'text-[var(--ifm-color-primary)]' : 'text-[var(--ifm-color-text)]'
              }`}
            >
              {t('footer.contact') || 'Stay Updated'}
            </h4>
            <p className="text-sm mb-4 opacity-80">
              Subscribe to our newsletter for the latest updates and resources.
            </p>
            <form onSubmit={handleNewsletterSignup} className="mb-6">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  required
                  className={`flex-grow px-4 py-2 rounded-lg border ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-800'
                  } focus:outline-none focus:ring-2 focus:ring-[var(--ifm-color-primary)]`}
                />
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-lg bg-[var(--ifm-color-primary)] text-white hover:opacity-90 transition-opacity duration-300`}
                >
                  Subscribe
                </button>
              </div>
            </form>
            <div className="space-y-3">
              <p className="flex items-start">
                <span className="mr-2">📧</span>
                <span className="text-sm">contact@airoboticstextbook.com</span>
              </p>
              <p className="flex items-start">
                <span className="mr-2">📞</span>
                <span className="text-sm">+1 (555) 123-4567</span>
              </p>
              <p className="flex items-start">
                <span className="mr-2">📍</span>
                <span className="text-sm">123 Tech Street, AI City</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className={`border-t ${
            theme === 'dark' ? 'border-[var(--ifm-color-border)]' : 'border-[var(--ifm-color-border)]'
          } pt-8`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-center md:text-left mb-4 md:mb-0">
              © {new Date().getFullYear()} AI Robotics Textbook.{' '}
              {t('footer.copyright') || 'All rights reserved.'}
            </p>
            <div className="flex space-x-6">
              {[
                { name: 'Privacy Policy', path: '/privacy' },
                { name: 'Terms of Service', path: '/terms' },
                { name: 'Cookie Policy', path: '/cookies' },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.path}
                  className={`text-sm hover:underline ${
                    theme === 'dark'
                      ? 'text-[var(--ifm-color-text-light)] hover:text-[var(--ifm-color-primary)]'
                      : 'text-[var(--ifm-color-text-light)] hover:text-[var(--ifm-color-primary)]'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;