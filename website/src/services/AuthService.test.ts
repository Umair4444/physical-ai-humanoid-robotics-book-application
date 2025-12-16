import { AuthService } from './AuthService';

// Mock the fetch API
global.fetch = jest.fn();

describe('AuthService', () => {
  const mockUser = {
    id: 'user-123',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
  };
  
  const mockCredentials = {
    email: 'test@example.com',
    password: 'Password123!',
  };

  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const response = {
        success: true,
        userId: 'user-123',
        token: 'test-jwt-token',
        user: mockUser,
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => response,
      });

      const result = await AuthService.register(mockCredentials.email, mockCredentials.password);

      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify({
            email: mockCredentials.email,
            password: mockCredentials.password,
          }),
        })
      );
      expect(result).toEqual(response);
    });

    it('should handle registration errors', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({ error: 'Email already in use' }),
      });

      await expect(
        AuthService.register(mockCredentials.email, mockCredentials.password)
      ).rejects.toThrow('Registration failed: 400');
    });
  });

  describe('login', () => {
    it('should log in a user successfully', async () => {
      const response = {
        success: true,
        token: 'test-jwt-token',
        user: mockUser,
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => response,
      });

      const result = await AuthService.login(mockCredentials.email, mockCredentials.password);

      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
          body: JSON.stringify({
            email: mockCredentials.email,
            password: mockCredentials.password,
          }),
        })
      );
      expect(result).toEqual(response);
    });

    it('should handle login errors', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 401,
        json: async () => ({ error: 'Invalid credentials' }),
      });

      await expect(
        AuthService.login(mockCredentials.email, mockCredentials.password)
      ).rejects.toThrow('Login failed: 401');
    });
  });

  describe('logout', () => {
    it('should log out the user', () => {
      // Mock localStorage
      const localStorageMock = {
        removeItem: jest.fn(),
      };
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
      });

      AuthService.logout();

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('userToken');
    });
  });

  describe('getAuthToken', () => {
    it('should return the auth token if available', () => {
      // Mock localStorage
      const localStorageMock = {
        getItem: jest.fn(() => 'stored-jwt-token'),
      };
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
      });

      const token = AuthService.getAuthToken();

      expect(localStorageMock.getItem).toHaveBeenCalledWith('userToken');
      expect(token).toBe('stored-jwt-token');
    });

    it('should return null if no token available', () => {
      // Mock localStorage
      const localStorageMock = {
        getItem: jest.fn(() => null),
      };
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
      });

      const token = AuthService.getAuthToken();

      expect(token).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    it('should return true if token exists', () => {
      // Mock localStorage
      const localStorageMock = {
        getItem: jest.fn(() => 'stored-jwt-token'),
      };
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
      });

      const authenticated = AuthService.isAuthenticated();

      expect(authenticated).toBe(true);
    });

    it('should return false if no token exists', () => {
      // Mock localStorage
      const localStorageMock = {
        getItem: jest.fn(() => null),
      };
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
      });

      const authenticated = AuthService.isAuthenticated();

      expect(authenticated).toBe(false);
    });
  });
});