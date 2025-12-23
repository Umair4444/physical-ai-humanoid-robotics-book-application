import { themeConfig, applyTheme } from '../contexts/themeConfig';

/**
 * Applies the correct theme classes to the document root
 * @param isDarkMode Whether the dark theme should be active
 */
export const updateDocumentTheme = (isDarkMode: boolean) => {
  const root = document.documentElement;
  
  if (isDarkMode) {
    root.classList.add('dark');
    root.setAttribute('data-theme', 'dark');
  } else {
    root.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
  }
  
  // Apply the theme-specific CSS variables
  applyTheme(isDarkMode);
};

/**
 * Gets the current theme from localStorage or system preference
 * @returns The current theme: 'light' or 'dark'
 */
export const getCurrentTheme = (): 'light' | 'dark' => {
  // Check if we're in the browser environment
  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      return savedTheme;
    }
  }

  // Check system preference
  if (typeof window !== 'undefined' && window.matchMedia) {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemPrefersDark ? 'dark' : 'light';
  }

  return 'light'; // Default fallback
};

/**
 * Gets the current language from localStorage
 * @returns The current language as a string
 */
export const getCurrentLanguage = (): string => {
  // Check if we're in the browser environment
  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'en-US'; // Default to English
  }

  return 'en-US'; // Default to English when not in browser
};

/**
 * Saves the theme preference to localStorage
 * @param theme The theme to save ('light' or 'dark')
 */
export const saveThemePreference = (theme: 'light' | 'dark'): void => {
  // Check if we're in the browser environment
  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    localStorage.setItem('theme', theme);
  }
};

/**
 * Saves the language preference to localStorage
 * @param language The language to save
 */
export const saveLanguagePreference = (language: string): void => {
  // Check if we're in the browser environment
  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    localStorage.setItem('language', language);
  }
};