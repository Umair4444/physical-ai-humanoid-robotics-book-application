/**
 * Utility functions to generate consistent theme-based CSS classes
 * These functions ensure consistent styling across light and dark modes
 */

export const getThemeClasses = {
  /**
   * Get background classes for theme consistency
   */
  background: (theme: 'light' | 'dark'): string => {
    return theme === 'dark' 
      ? 'bg-[var(--ifm-color-background)]' 
      : 'bg-[var(--ifm-color-background)]';
  },

  /**
   * Get text color classes for theme consistency
   */
  text: (theme: 'light' | 'dark'): string => {
    return theme === 'dark' 
      ? 'text-[var(--ifm-color-text)]' 
      : 'text-[var(--ifm-color-text)]';
  },

  /**
   * Get text muted classes for theme consistency
   */
  textMuted: (theme: 'light' | 'dark'): string => {
    return theme === 'dark' 
      ? 'text-[var(--ifm-color-text-light)]' 
      : 'text-[var(--ifm-color-text-light)]';
  },

  /**
   * Get border classes for theme consistency
   */
  border: (theme: 'light' | 'dark'): string => {
    return theme === 'dark' 
      ? 'border-[var(--ifm-color-border)]' 
      : 'border-[var(--ifm-color-border)]';
  },

  /**
   * Get primary color classes for theme consistency
   */
  primary: (theme: 'light' | 'dark'): string => {
    return theme === 'dark' 
      ? 'text-[var(--ifm-color-primary-lighter)]' 
      : 'text-[var(--ifm-color-primary)]';
  },

  /**
   * Get hover classes for theme consistency
   */
  hover: (theme: 'light' | 'dark'): string => {
    return theme === 'dark' 
      ? 'hover:text-[var(--ifm-color-text)]' 
      : 'hover:text-[var(--ifm-color-text)]';
  },
};

/**
 * Get theme styles using CSS variables for more precise control
 */
export const getThemeStyles = {
  /**
   * Get background style using CSS variables
   */
  background: (theme: 'light' | 'dark') => ({
    backgroundColor: 'var(--ifm-color-background)',
  }),

  /**
   * Get text style using CSS variables
   */
  text: (theme: 'light' | 'dark') => ({
    color: 'var(--ifm-color-text)',
  }),

  /**
   * Get primary color style using CSS variables
   */
  primary: (theme: 'light' | 'dark') => ({
    color: theme === 'dark' 
      ? 'var(--ifm-color-primary-lighter)' 
      : 'var(--ifm-color-primary)',
  }),

  /**
   * Get border style using CSS variables
   */
  border: (theme: 'light' | 'dark') => ({
    borderColor: 'var(--ifm-color-border)',
  }),
};