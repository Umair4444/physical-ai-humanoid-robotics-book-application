/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './static/**/*.{js,jsx,ts,tsx}',
    '../node_modules/@docusaurus/core/lib/**/*.{js,jsx,ts,tsx}',
    './node_modules/@docusaurus/core/lib/**/*.{js,jsx,ts,tsx}',
    '../docs/**/*.{md,mdx}',
    './docs/**/*.{md,mdx}',
    './*.{js,jsx,ts,tsx,md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Semantic color system following constitution design rules
        'primary': {
          DEFAULT: '#2563EB',      // indigo-blue primary
          light: '#3B82F6',
          lighter: '#60A5FA',
          lightest: '#93C5FD',
          dark: '#1D4ED8',
          darker: '#1A3FBB',
          darkest: '#143199',
        },
        'secondary': {
          DEFAULT: '#7C3AED',      // purple secondary
          light: '#A78BFA',
          lighter: '#C4B5FD',
          lightest: '#DDD6FE',
          dark: '#6D28D9',
          darker: '#5B21B6',
          darkest: '#4A1D96',
        },
        'accent': {
          DEFAULT: '#0F172A',      // dark gray accent
          light: '#1E293B',
          lighter: '#334155',
          lightest: '#475569',
          dark: '#020617',
          darker: '#0C1120',
          darkest: '#0F172A',
        },
        'background': {
          DEFAULT: '#F8FAFC',      // light background
          dark: '#0F172A',         // dark background
          light: '#FFFFFF',
          paper: '#FFFFFF',
        },
        'text': {
          DEFAULT: '#1E293B',      // dark gray text
          light: '#64748B',        // light gray text
          muted: '#94A3B8',        // muted text
          inverse: '#FFFFFF',      // white text on dark backgrounds
        },
        'border': {
          DEFAULT: '#E2E8F0',      // light borders
          light: '#F1F5F9',
          dark: '#94A3B8',
        },
        // AI Robotics theme colors (deprecated - use semantic colors instead)
        'ai-primary': '#2563EB',  // indigo-blue
        'ai-secondary': '#7C3AED', // purple
        'ai-accent': '#0F172A',    // dark gray
      },
      fontFamily: {
        heading: ['Inter', 'system-ui', 'sans-serif'], // Consistent heading font
        body: ['Inter', 'system-ui', 'sans-serif'],    // Consistent body font
      },
    },
  },
  plugins: [],
}