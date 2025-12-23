// Environment configuration for the frontend
// This file provides environment-specific configuration values

// Export the configuration
export const envConfig = {
  apiBaseUrl: typeof process !== 'undefined'
    ? (process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000')
    : 'http://localhost:8000',
};