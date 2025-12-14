import { APICache, apiCache } from './APICache';

interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  icon: string;
  chaptersCount: number;
}

interface Chapter {
  id: string;
  moduleId: string;
  title: string;
  order: number;
  duration: number;
  imageUrl?: string;
}

interface ChapterContent {
  id: string;
  moduleId: string;
  title: string;
  lessonContent: string;
  summaryContent: string;
  duration: number;
  images: string[];
  previousChapterId: string | null;
  nextChapterId: string | null;
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

class ContentService {
  private static API_BASE_URL = getEnvVar('REACT_APP_API_BASE_URL', '/api/v1');
  private static cache = apiCache;

  private static async apiCall<T>(url: string, options: RequestInit = {}, useCache: boolean = true, cacheTTL: number = 5 * 60 * 1000): Promise<T> {
    // Check cache first if caching is enabled
    if (useCache && this.cache.has(url)) {
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
        
        const response = await fetch(url, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Cache successful response if caching is enabled
        if (useCache) {
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

  static async getModules(): Promise<Module[]> {
    const url = `${this.API_BASE_URL}/content/modules`;
    
    try {
      const data = await this.apiCall<{ modules: Module[] }>(url, { method: 'GET' });
      return data.modules;
    } catch (error) {
      console.error('Error fetching modules:', error);
      throw new Error(`Failed to fetch modules: ${(error as Error).message}`);
    }
  }

  static async getChapters(moduleId: string): Promise<Chapter[]> {
    const url = `${this.API_BASE_URL}/content/modules/${moduleId}/chapters`;
    
    try {
      const data = await this.apiCall<{ moduleId: string, chapters: Chapter[] }>(url, { method: 'GET' });
      return data.chapters;
    } catch (error) {
      console.error(`Error fetching chapters for module ${moduleId}:`, error);
      throw new Error(`Failed to fetch chapters for module ${moduleId}: ${(error as Error).message}`);
    }
  }

  static async getChapter(chapterId: string): Promise<ChapterContent> {
    const url = `${this.API_BASE_URL}/content/chapters/${chapterId}`;
    
    // Use a longer cache TTL for chapter content since it's less likely to change
    try {
      const data = await this.apiCall<ChapterContent>(url, { method: 'GET' }, true, 10 * 60 * 1000); // 10 minutes TTL
      return data;
    } catch (error) {
      console.error(`Error fetching chapter ${chapterId}:`, error);
      throw new Error(`Failed to fetch chapter ${chapterId}: ${(error as Error).message}`);
    }
  }
  
  // Method to clear content cache
  static clearCache(): void {
    this.cache.clear();
  }
  
  // Method to clear specific cache entries
  static clearCacheEntry(key: string): void {
    this.cache.delete(key);
  }
}

export { ContentService, type Module, type Chapter, type ChapterContent };