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
    faq: 'FAQ',
    books: 'Books',
    pricing: 'Pricing',
    'footer.navigation': 'Quick Links',
    'footer.resources': 'Resources',
    'footer.contact': 'Stay Updated',
    'footer.copyright': 'All rights reserved.',
    home: 'Home',
    modules: 'Modules',
    about: 'About',
    contact: 'Contact',
    documentation: 'Documentation',
    tutorials: 'Tutorials',
    blog: 'Blog'
  },
  'ur': {
    welcome: 'خوش آمدید',
    themeToggle: 'تھیم تبدیل کریں',
    languageSwitch: 'زبان تبدیل کریں',
    faq: 'عمومی سوالات',
    books: 'کتابیں',
    pricing: 'قیمتیں',
    'footer.navigation': 'فوری روابط',
    'footer.resources': 'وسائل',
    'footer.contact': 'تازہ ترین رہیں',
    'footer.copyright': 'تمام حقوق محفوظ ہیں۔',
    home: 'ہوم',
    modules: 'ماڈیولز',
    about: 'ہمارے بارے میں',
    contact: 'رابطہ',
    documentation: 'دستاویزات',
    tutorials: 'ٹیوٹوریلز',
    blog: 'بلاگ'
  },
  'zh': {
    welcome: '欢迎',
    themeToggle: '切换主题',
    languageSwitch: '切换语言',
    faq: '常见问题',
    books: '书籍',
    pricing: '定价',
    'footer.navigation': '快速链接',
    'footer.resources': '资源',
    'footer.contact': '保持更新',
    'footer.copyright': '版权所有。',
    home: '主页',
    modules: '模块',
    about: '关于我们',
    contact: '联系',
    documentation: '文档',
    tutorials: '教程',
    blog: '博客'
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Check for saved language in localStorage
  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language | null;
      if (savedLanguage) {
        setLanguage(savedLanguage);
      }
    }
  }, []);

  // Update localStorage when language changes
  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      localStorage.setItem('language', language);
    }
  }, [language]);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const t = (key: string) => {
    const langTranslations = translations[language];
    if (!langTranslations) {
      return key;
    }
    const translation = langTranslations[key];
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