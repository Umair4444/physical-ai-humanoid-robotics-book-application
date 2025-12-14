import { AuthService } from './AuthService';
import { APICache, apiCache } from './APICache';

interface UserPreferences {
  theme: 'light' | 'dark';
  language: 'en-US' | 'ur-PK' | 'zh-CN';
  lastAccessedModule: string;
  lastAccessedChapter: string;
  completedChapters: string[];
}

interface UpdateChapterProgressRequest {
  userId: string;
  chapterId: string;
  isCompleted: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Same helper function for environment variables
function getEnvVar(varName: string, defaultValue: string): string {
  // In browser environment, process may not be defined
  if (typeof process !== 'undefined' && process.env) {
    return process.env[varName] || defaultValue;
  }
  // For browser environments where process is not available, return default
  return defaultValue;
}

class UserService {
  private static API_BASE_URL = getEnvVar('REACT_APP_API_BASE_URL', '/api/v1');
  private static cache = apiCache;

  private static async apiCall<T>(url: string, options: RequestInit = {}, useCache: boolean = true, cacheTTL: number = 2 * 60 * 1000): Promise<T> {
    // Add auth token to headers
    const token = AuthService.getAuthToken();
    const authOptions = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    };

    // For GET requests, check cache first if caching is enabled
    const isGetRequest = authOptions.method === 'GET';
    if (isGetRequest && useCache && this.cache.has(url)) {
      const cached = this.cache.get<T>(url);
      if (cached) {
        console.log(`Cache hit for ${url}`);
        return cached;
      }
    }

    // Implement retry mechanism
    const maxRetries = 3;
    let lastError: any;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`API call attempt ${attempt} for ${url}`);

        const response = await fetch(url, authOptions);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        // Cache successful response for GET requests
        if (isGetRequest && useCache) {
          this.cache.set(url, data, cacheTTL);
        }

        return data as T;
      } catch (error: any) {
        console.error(`API call attempt ${attempt} failed for ${url}:`, error.message);
        lastError = error;

        // Don't wait after the last attempt
        if (attempt < maxRetries) {
          // Exponential backoff: wait 1s, 2s, 4s between retries
          const waitTime = Math.pow(2, attempt) * 1000;
          console.log(`Waiting ${waitTime}ms before retry ${attempt + 1}`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
        }
      }
    }

    // If all retries failed, throw the last error
    throw lastError;
  }

  static async getUserPreferences(userId: string): Promise<UserPreferences> {
    const url = `${this.API_BASE_URL}/user/preferences`;

    try {
      const data = await this.apiCall<UserPreferences>(url, { method: 'GET' });
      return data;
    } catch (error) {
      console.error('Error getting user preferences:', error);
      throw new Error(`Failed to get user preferences: ${(error as Error).message}`);
    }
  }

  static async updateUserPreferences(
    userId: string,
    preferences: Partial<UserPreferences>
  ): Promise<ApiResponse<UserPreferences>> {
    const url = `${this.API_BASE_URL}/user/preferences`;

    try {
      const data = await this.apiCall<ApiResponse<UserPreferences>>(url, {
        method: 'PUT',
        body: JSON.stringify(preferences),
      }, false); // Don't cache PUT requests
      return data;
    } catch (error) {
      console.error('Error updating user preferences:', error);
      throw new Error(`Failed to update user preferences: ${(error as Error).message}`);
    }
  }

  static async updateChapterProgress(
    userId: string,
    chapterId: string,
    isCompleted: boolean
  ): Promise<boolean> {
    const url = `${this.API_BASE_URL}/user/chapter-progress`;

    try {
      const data = await this.apiCall<ApiResponse<null>>(url, {
        method: 'POST',
        body: JSON.stringify({
          userId,
          chapterId,
          isCompleted,
        } as UpdateChapterProgressRequest),
      }, false); // Don't cache POST requests
      return data.success;
    } catch (error) {
      console.error('Error updating chapter progress:', error);
      throw new Error(`Failed to update chapter progress: ${(error as Error).message}`);
    }
  }

  // Method to clear user preferences cache
  static clearCache(): void {
    // In a real implementation, you might want to be more selective about what to clear
    // For now, we'll clear the entire cache
    this.cache.clear();
  }
}

export { UserService, type UserPreferences };