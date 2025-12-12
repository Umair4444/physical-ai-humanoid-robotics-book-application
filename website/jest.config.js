module.exports = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/.docusaurus/'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '@docusaurus/(.*)': '<rootDir>/__mocks__/@docusaurus/$1',
    '@docusaurus/Link': '<rootDir>/__mocks__/@docusaurus/Link.js',
    '@docusaurus/router': '<rootDir>/__mocks__/@docusaurus/router.js',
    '@docusaurus/Translate': '<rootDir>/__mocks__/@docusaurus/Translate.js',
    '@docusaurus/core': '<rootDir>/__mocks__/@docusaurus/core.js',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { configFile: './babel.config.js' }],
  },
  transformIgnorePatterns: [
    "/node_modules/(?!@docusaurus|@theme-ui|@emotion)/"
  ],
};