// themeConfig.ts
// Theme configuration based on research findings
export const themeConfig = {
  colors: {
    // AI Robotics theme colors
    primary: '#2563EB',      // indigo-blue
    secondary: '#7C3AED',    // purple
    accent: '#0F172A',       // dark gray
    background: {
      light: '#FFFFFF',
      dark: '#0F172A',
    },
    text: {
      light: '#0F172A',
      dark: '#CBD5E1',
    },
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
  
  if (isDarkMode) {
    root.style.setProperty('--ifm-color-primary', themeConfig.colors.primary);
    root.style.setProperty('--ifm-color-primary-dark', '#1D4ED8');
    root.style.setProperty('--ifm-color-primary-darker', '#1A3FBB');
    root.style.setProperty('--ifm-color-primary-darkest', '#143199');
    root.style.setProperty('--ifm-color-primary-light', '#3B82F6');
    root.style.setProperty('--ifm-color-primary-lighter', '#60A5FA');
    root.style.setProperty('--ifm-color-primary-lightest', '#93C5FD');
    root.style.setProperty('--ifm-background-color', themeConfig.colors.background.dark);
  } else {
    root.style.setProperty('--ifm-color-primary', themeConfig.colors.primary);
    root.style.setProperty('--ifm-color-primary-dark', '#1D4ED8');
    root.style.setProperty('--ifm-color-primary-darker', '#1A3FBB');
    root.style.setProperty('--ifm-color-primary-darkest', '#143199');
    root.style.setProperty('--ifm-color-primary-light', '#3B82F6');
    root.style.setProperty('--ifm-color-primary-lighter', '#60A5FA');
    root.style.setProperty('--ifm-color-primary-lightest', '#93C5FD');
    root.style.setProperty('--ifm-background-color', themeConfig.colors.background.light);
  }
};