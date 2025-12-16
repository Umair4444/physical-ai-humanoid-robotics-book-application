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
        // AI Robotics theme colors
        'ai-primary': '#2563EB',  // indigo-blue
        'ai-secondary': '#7C3AED', // purple
        'ai-accent': '#0F172A',    // dark gray
      }
    },
  },
  plugins: [],
}