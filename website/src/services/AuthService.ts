interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  themePreference?: 'light' | 'dark';
  languagePreference?: 'en-US' | 'ur-PK' | 'zh-CN';
}

interface RegisterCredentials {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterResponse {
  success: boolean;
  userId: string;
  token: string;
  user: User;
}

interface LoginResponse {
  success: boolean;
  token: string;
  user: User;
}

// Helper function to safely get environment variables
function getEnvVar(varName: string, defaultValue: string): string {
  // In browser environment, process may not be defined
  if (typeof process !== 'undefined' && process.env) {
    return process.env[varName] || defaultValue;
  }
  // For browser environments where process is not available, return default
  return defaultValue;
}

class AuthService {
  private static API_BASE_URL = getEnvVar('REACT_APP_API_BASE_URL', '/api/v1');
  private static TOKEN_KEY = 'userToken';

  static async register(
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
  ): Promise<RegisterResponse> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
        } as RegisterCredentials),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Registration failed: ${response.status} ${errorData.error || ''}`);
      }

      const data: RegisterResponse = await response.json();
      
      // Store the token in localStorage
      if (data.token) {
        localStorage.setItem(this.TOKEN_KEY, data.token);
      }
      
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  static async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        } as LoginCredentials),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Login failed: ${response.status} ${errorData.error || ''}`);
      }

      const data: LoginResponse = await response.json();
      
      // Store the token in localStorage
      if (data.token) {
        localStorage.setItem(this.TOKEN_KEY, data.token);
      }
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  static logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  static getAuthToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  static isAuthenticated(): boolean {
    const token = this.getAuthToken();
    // In a real implementation, you might want to validate the token as well
    return token !== null && token !== '';
  }
}

export { AuthService, type User, type RegisterCredentials, type LoginCredentials };