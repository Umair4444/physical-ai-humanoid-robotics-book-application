// Environment configuration for the frontend
// This file provides environment-specific configuration values

// Export the configuration
export const envConfig = {
  apiBaseUrl: typeof window !== 'undefined' && window.location.hostname !== 'localhost'
    ? 'https://umair44-ai-textbook-backend.hf.space'  // Production URL when not on localhost
    : (typeof process !== 'undefined'
        ? (process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000')  // Use env var or localhost for dev
        : 'http://localhost:8000'),
};