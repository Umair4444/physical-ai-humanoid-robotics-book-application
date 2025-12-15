import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'en' | 'ur' | 'zh';
type LanguageContextType = {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// Simple translation object - would be expanded in real implementation
const translations: Record<Language, Record<string, string>> = {
  'en': {
    welcome: 'Welcome',
    themeToggle: 'Toggle Theme',
    languageSwitch: 'Switch Language',
  },
  'ur': {
    welcome: 'خوش آمدید',
    themeToggle: 'تھیم تبدیل کریں',
    languageSwitch: 'زبان تبدیل کریں',
  },
  'zh': {
    welcome: '欢迎',
    themeToggle: '切换主题',
    languageSwitch: '切换语言',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en-US');

  // Check for saved language in localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const t = (key: string) => {
    const translation = translations[language][key];
    return translation || key; // Return the key itself if translation not found
  };

  const value = {
    language,
    changeLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};