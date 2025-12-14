import { UserService } from './UserService';

// Mock the fetch API
global.fetch = jest.fn();

describe('UserService', () => {
  const mockUserPreferences = {
    theme: 'dark' as const,
    language: 'en-US' as const,
    lastAccessedModule: 'module-1',
    lastAccessedChapter: 'module-1-chapter-1',
    completedChapters: ['module-1-chapter-1'],
  };

  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  describe('getUserPreferences', () => {
    it('should fetch user preferences successfully', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({ ...mockUserPreferences }),
      });

      const result = await UserService.getUserPreferences('user-123');

      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            Authorization: 'Bearer null', // No token by default in mock
          }),
        })
      );
      expect(result).toEqual(mockUserPreferences);
    });

    it('should handle errors when fetching user preferences', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 404,
        json: async () => ({ error: 'User not found' }),
      });

      await expect(UserService.getUserPreferences('user-123')).rejects.toThrow(
        'Failed to get user preferences: 404'
      );
    });
  });

  describe('updateUserPreferences', () => {
    it('should update user preferences successfully', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({ success: true, updatedPreferences: { ...mockUserPreferences } }),
      });

      const result = await UserService.updateUserPreferences('user-123', mockUserPreferences);

      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'PUT',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            Authorization: 'Bearer null',
          }),
          body: JSON.stringify(mockUserPreferences),
        })
      );
      expect(result).toEqual({ success: true, updatedPreferences: { ...mockUserPreferences } });
    });

    it('should handle errors when updating user preferences', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 400,
        json: async () => ({ error: 'Invalid preferences' }),
      });

      await expect(
        UserService.updateUserPreferences('user-123', mockUserPreferences)
      ).rejects.toThrow('Failed to update user preferences: 400');
    });
  });

  describe('updateChapterProgress', () => {
    it('should update chapter progress successfully', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      });

      const result = await UserService.updateChapterProgress('user-123', 'chapter-1', true);

      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            Authorization: 'Bearer null',
          }),
          body: JSON.stringify({
            userId: 'user-123',
            chapterId: 'chapter-1',
            isCompleted: true,
          }),
        })
      );
      expect(result).toBe(true);
    });

    it('should handle errors when updating chapter progress', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({ error: 'Server error' }),
      });

      await expect(
        UserService.updateChapterProgress('user-123', 'chapter-1', false)
      ).rejects.toThrow('Failed to update chapter progress: 500');
    });
  });
});