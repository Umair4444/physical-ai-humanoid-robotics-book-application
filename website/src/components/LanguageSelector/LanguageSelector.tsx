import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

type Language = 'en-US' | 'ur-PK' | 'zh-CN';

const LANGUAGES: { value: Language; label: string; flag: string }[] = [
  { value: 'en-US', label: 'English', flag: '🇺🇸' },
  { value: 'ur-PK', label: 'اردو', flag: '🇵🇰' },
  { value: 'zh-CN', label: '中文', flag: '🇨🇳' },
];

export const LanguageSelector: React.FC = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="relative">
      <select
        value={language}
        onChange={(e) => changeLanguage(e.target.value as Language)}
        className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-ai-primary focus:border-transparent"
        aria-label="Select language"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.value} value={lang.value}>
          {lang.flag} {lang.label}
        </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};