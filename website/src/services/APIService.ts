import { apiCache } from './APICache';
import { envConfig } from '../utils/envConfig';

interface APIConfig {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
}

class APIService {
  private config: APIConfig;
  private cache: typeof apiCache;

  constructor(config?: Partial<APIConfig>) {
    // Use environment variable if available, otherwise default to localhost
    // For browser environments, we check if process is defined
    const apiBaseUrl = config?.baseURL || envConfig.apiBaseUrl;

    this.config = {
      baseURL: apiBaseUrl,
      timeout: config?.timeout || 30000, // 30 seconds
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
    };
    this.cache = apiCache;
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.config.baseURL}${endpoint}`;
    const cacheKey = `${options.method || 'GET'}:${url}:${JSON.stringify(options.body || '')}`;

    // Try to get from cache first (for GET requests)
    if (options.method === 'GET' || !options.method) {
      const cached = this.cache.get<T>(cacheKey);
      if (cached) {
        return cached;
      }
    }

    // Set up request options
    const requestOptions: RequestInit = {
      headers: {
        ...this.config.headers,
        ...options.headers,
      },
      ...options,
      // Ensure credentials are handled properly for cross-origin requests
      credentials: 'omit', // Explicitly set to 'omit' for cross-origin requests
    };

    try {
      // Create an AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

      requestOptions.signal = controller.signal;

      const response = await fetch(url, requestOptions);
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Cache GET requests
      if (requestOptions.method === 'GET' || !requestOptions.method) {
        this.cache.set(cacheKey, data);
      }

      return data;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('AbortError')) {
        throw new Error('Request timeout');
      }
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Failed to fetch data from server. Please check your connection.');
      }
      // Handle CORS and network errors more specifically
      if (error instanceof TypeError && (error.message.includes('NetworkError') || error.message.includes('CORS'))) {
        throw new Error('Network error occurred. This might be due to CORS restrictions or server connectivity issues.');
      }
      throw error;
    }
  }

  get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
    return this.request<T>(`${endpoint}${queryString}`, { method: 'GET' });
  }

  post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

// Singleton instance
const apiService = new APIService();

export { APIService, apiService };