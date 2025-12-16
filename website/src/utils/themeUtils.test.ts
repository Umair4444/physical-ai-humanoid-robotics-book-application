import { 
  updateDocumentTheme,
  getCurrentTheme,
  getCurrentLanguage,
  saveThemePreference,
  saveLanguagePreference 
} from './themeUtils';

describe('Theme Utilities', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    
    // Mock window.matchMedia to return light theme by default
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  test('updateDocumentTheme adds dark class when dark mode is enabled', () => {
    document.documentElement.classList.remove('dark'); // Remove if already there
    updateDocumentTheme(true);

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  test('updateDocumentTheme removes dark class when dark mode is disabled', () => {
    document.documentElement.classList.add('dark');
    document.documentElement.setAttribute('data-theme', 'dark');
    
    updateDocumentTheme(false);

    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  test('getCurrentTheme returns saved theme from localStorage if available', () => {
    localStorage.setItem('theme', 'dark');
    
    const theme = getCurrentTheme();
    expect(theme).toBe('dark');
  });

  test('getCurrentTheme returns system preference if no saved theme exists', () => {
    // Mock system preferring dark theme
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: true, // System prefers dark
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    localStorage.removeItem('theme'); // Remove saved theme
    
    const theme = getCurrentTheme();
    expect(theme).toBe('dark');
  });

  test('getCurrentTheme defaults to light if no saved theme or system preference', () => {
    localStorage.removeItem('theme'); // Remove saved theme
    
    const theme = getCurrentTheme();
    expect(theme).toBe('light');
  });

  test('getCurrentLanguage returns saved language from localStorage if available', () => {
    localStorage.setItem('language', 'zh-CN');
    
    const language = getCurrentLanguage();
    expect(language).toBe('zh-CN');
  });

  test('getCurrentLanguage defaults to en-US if no saved language exists', () => {
    localStorage.removeItem('language'); // Remove saved language
    
    const language = getCurrentLanguage();
    expect(language).toBe('en-US');
  });

  test('saveThemePreference saves theme to localStorage correctly', () => {
    saveThemePreference('dark');
    
    expect(localStorage.getItem('theme')).toBe('dark');
    
    saveThemePreference('light');
    expect(localStorage.getItem('theme')).toBe('light');
  });

  test('saveLanguagePreference saves language to localStorage correctly', () => {
    saveLanguagePreference('ur-PK');
    
    expect(localStorage.getItem('language')).toBe('ur-PK');
    
    saveLanguagePreference('zh-CN');
    expect(localStorage.getItem('language')).toBe('zh-CN');
  });
});