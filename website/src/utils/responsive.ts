/**
 * Responsive utility functions for the AI Robotics Textbook application
 * These functions help ensure responsive design across different screen sizes
 */

export const responsive = {
  /**
   * Breakpoints for responsive design
   */
  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  /**
   * Media query helper functions
   */
  media: {
    xs: `(min-width: ${480 / 16}rem)`,
    sm: `(min-width: ${640 / 16}rem)`,
    md: `(min-width: ${768 / 16}rem)`,
    lg: `(min-width: ${1024 / 16}rem)`,
    xl: `(min-width: ${1280 / 16}rem)`,
    '2xl': `(min-width: ${1536 / 16}rem)`,

    // Max-width versions
    xsMax: `(max-width: ${(480 - 1) / 16}rem)`,
    smMax: `(max-width: ${(639) / 16}rem)`,
    mdMax: `(max-width: ${(767) / 16}rem)`,
    lgMax: `(max-width: ${(1023) / 16}rem)`,
    xlMax: `(max-width: ${(1279) / 16}rem)`,
  },

  /**
   * Container widths for different screen sizes
   */
  containerMaxWidths: {
    sm: '540px',
    md: '720px',
    lg: '960px',
    xl: '1140px',
    '2xl': '1320px',
  }
};

/**
 * Get responsive class names based on screen size
 */
export const getResponsiveClasses = (base: string, responsiveConfig?: {
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}): string => {
  const classes = [base];

  if (responsiveConfig?.sm) {
    classes.push(responsiveConfig.sm);
  }
  if (responsiveConfig?.md) {
    classes.push(responsiveConfig.md);
  }
  if (responsiveConfig?.lg) {
    classes.push(responsiveConfig.lg);
  }
  if (responsiveConfig?.xl) {
    classes.push(responsiveConfig.xl);
  }

  return classes.join(' ');
};