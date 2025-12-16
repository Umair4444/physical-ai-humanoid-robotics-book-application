// themeConfig.ts
// Theme configuration based on research findings and Tailwind config
export const themeConfig = {
  colors: {
    primary: {
      DEFAULT: '#2563EB',    // indigo-blue primary
      light: '#3B82F6',
      lighter: '#60A5FA',
      lightest: '#93C5FD',
      dark: '#1D4ED8',
      darker: '#1A3FBB',
      darkest: '#143199',
    },
    secondary: {
      DEFAULT: '#7C3AED',    // purple secondary
      light: '#A78BFA',
      lighter: '#C4B5FD',
      lightest: '#DDD6FE',
      dark: '#6D28D9',
      darker: '#5B21B6',
      darkest: '#4A1D96',
    },
    accent: {
      DEFAULT: '#0F172A',    // dark gray accent
      light: '#1E293B',
      lighter: '#334155',
      lightest: '#475569',
      dark: '#020617',
      darker: '#0C1120',
      darkest: '#0F172A',
    },
    background: {
      DEFAULT: '#F8FAFC',    // light background
      dark: '#0F172A',       // dark background
      light: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      DEFAULT: '#1E293B',    // dark gray text
      light: '#64748B',      // light gray text
      muted: '#94A3B8',      // muted text
      inverse: '#FFFFFF',    // white text on dark backgrounds
    },
    border: {
      DEFAULT: '#E2E8F0',    // light borders
      light: '#F1F5F9',
      dark: '#94A3B8',
    },
    // Semantic variations
    success: '#10B981',      // green
    warning: '#F59E0B',      // amber
    error: '#EF4444',        // red
    info: '#3B82F6',         // blue
  },
  typography: {
    fontFamily: {
      heading: 'Inter, sans-serif',
      body: 'Inter, sans-serif',
      code: 'JetBrains Mono, monospace',
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  borderRadius: {
    sm: '0.125rem',  // 2px
    md: '0.25rem',   // 4px
    lg: '0.5rem',    // 8px
    xl: '0.75rem',   // 12px
    '2xl': '1rem',   // 16px
    full: '9999px',  // for capsule shapes
  },
  spacing: {
    xs: '0.5rem',    // 8px
    sm: '0.75rem',   // 12px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  transitions: {
    fast: '0.2s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
  },
};

// Export a function to apply theme based on current theme setting
export const applyTheme = (isDarkMode: boolean) => {
  const root = document.documentElement;

  // Apply semantic color variables based on theme
  if (isDarkMode) {
    // Dark mode specific values
    root.style.setProperty('--ifm-color-primary', themeConfig.colors.primary.lighter);
    root.style.setProperty('--ifm-color-primary-dark', themeConfig.colors.primary.light);
    root.style.setProperty('--ifm-color-primary-darker', themeConfig.colors.primary.DEFAULT);
    root.style.setProperty('--ifm-color-primary-darkest', themeConfig.colors.primary.dark);
    root.style.setProperty('--ifm-color-primary-light', themeConfig.colors.primary.lighter);
    root.style.setProperty('--ifm-color-primary-lighter', themeConfig.colors.primary.lightest);
    root.style.setProperty('--ifm-color-primary-lightest', '#BFDBFE'); // lighter blue variant

    root.style.setProperty('--ifm-background-color', themeConfig.colors.background.dark);
    root.style.setProperty('--ifm-color-background', themeConfig.colors.background.dark);

    root.style.setProperty('--ifm-color-text', themeConfig.colors.text.inverse);
    root.style.setProperty('--ifm-color-text-light', themeConfig.colors.text.light);
    root.style.setProperty('--ifm-color-text-muted', themeConfig.colors.text.muted);
    root.style.setProperty('--ifm-color-text-inverse', themeConfig.colors.text.DEFAULT);

    root.style.setProperty('--ifm-color-border', themeConfig.colors.border.dark);
    root.style.setProperty('--ifm-color-border-light', themeConfig.colors.background.light);

    // Additional dark mode specific variables
    root.style.setProperty('--ifm-navbar-background-color', themeConfig.colors.background.dark);
    root.style.setProperty('--ifm-footer-background-color', themeConfig.colors.background.dark);
    root.style.setProperty('--ifm-hero-background-color', themeConfig.colors.accent.darker);
    root.style.setProperty('--ifm-card-background-color', themeConfig.colors.accent.darker);

  } else {
    // Light mode values
    root.style.setProperty('--ifm-color-primary', themeConfig.colors.primary.DEFAULT);
    root.style.setProperty('--ifm-color-primary-dark', themeConfig.colors.primary.dark);
    root.style.setProperty('--ifm-color-primary-darker', themeConfig.colors.primary.darker);
    root.style.setProperty('--ifm-color-primary-darkest', themeConfig.colors.primary.darkest);
    root.style.setProperty('--ifm-color-primary-light', themeConfig.colors.primary.light);
    root.style.setProperty('--ifm-color-primary-lighter', themeConfig.colors.primary.lighter);
    root.style.setProperty('--ifm-color-primary-lightest', themeConfig.colors.primary.lightest);

    root.style.setProperty('--ifm-background-color', themeConfig.colors.background.light);
    root.style.setProperty('--ifm-color-background', themeConfig.colors.background.DEFAULT);

    root.style.setProperty('--ifm-color-text', themeConfig.colors.text.DEFAULT);
    root.style.setProperty('--ifm-color-text-light', themeConfig.colors.text.light);
    root.style.setProperty('--ifm-color-text-muted', themeConfig.colors.text.muted);
    root.style.setProperty('--ifm-color-text-inverse', themeConfig.colors.text.inverse);

    root.style.setProperty('--ifm-color-border', themeConfig.colors.border.DEFAULT);
    root.style.setProperty('--ifm-color-border-light', themeConfig.colors.border.light);

    // Additional light mode specific variables
    root.style.setProperty('--ifm-navbar-background-color', themeConfig.colors.background.light);
    root.style.setProperty('--ifm-footer-background-color', themeConfig.colors.background.light);
    root.style.setProperty('--ifm-hero-background-color', themeConfig.colors.background.light);
    root.style.setProperty('--ifm-card-background-color', themeConfig.colors.background.light);
  }
};