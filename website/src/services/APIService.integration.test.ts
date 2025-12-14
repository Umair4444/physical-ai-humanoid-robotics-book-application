import { ContentService } from './ContentService';
import { UserService } from './UserService';
import { ChatService } from './ChatService';

// Mock the fetch API
global.fetch = jest.fn();

describe('API Integration Tests for Service Layers', () => {
  const mockModules = [
    {
      id: 'module-1',
      title: 'Introduction to AI Robotics',
      description: 'Basic concepts and principles',
      order: 1,
      icon: '🤖',
      chaptersCount: 6,
    }
  ];

  const mockChapters = [
    {
      id: 'module-1-chapter-1',
      title: 'What is AI Robotics?',
      order: 1,
      duration: 15,
      imageUrl: '/img/chapter1.jpg',
    }
  ];

  const mockChapterContent = {
    id: 'module-1-chapter-1',
    moduleId: 'module-1',
    title: 'What is AI Robotics?',
    lessonContent: '# Lesson content here',
    summaryContent: 'Summary of the lesson',
    duration: 15,
    images: ['/img/lesson1.jpg'],
    previousChapterId: null,
    nextChapterId: 'module-1-chapter-2',
  };

  const mockUserPreferences = {
    theme: 'dark',
    language: 'en-US',
    lastAccessedModule: 'module-1',
    lastAccessedChapter: 'module-1-chapter-1',
    completedChapters: ['module-1-chapter-1'],
  };

  const mockChatResponse = {
    id: 'response-1',
    response: 'This is a response to your query',
    sources: ['source1'],
    timestamp: new Date().toISOString(),
    sessionId: 'test-session',
  };

  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  describe('ContentService Integration', () => {
    it('should successfully fetch modules using ContentService', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({ modules: mockModules }),
      });

      const modules = await ContentService.getModules();

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/content/modules'),
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(modules).toEqual(mockModules);
    });

    it('should successfully fetch chapters using ContentService', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({ moduleId: 'module-1', chapters: mockChapters }),
      });

      const chapters = await ContentService.getChapters('module-1');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/content/modules/module-1/chapters'),
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(chapters).toEqual(mockChapters);
    });

    it('should successfully fetch chapter content using ContentService', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockChapterContent,
      });

      const chapterContent = await ContentService.getChapter('module-1-chapter-1');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/content/chapters/module-1-chapter-1'),
        expect.objectContaining({
          method: 'GET',
        })
      );
      expect(chapterContent).toEqual(mockChapterContent);
    });
  });

  describe('UserService Integration', () => {
    it('should successfully get user preferences using UserService', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockUserPreferences,
      });

      const preferences = await UserService.getUserPreferences('user-123');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/user/preferences'),
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            Authorization: expect.stringContaining('Bearer'),
          }),
        })
      );
      expect(preferences).toEqual(mockUserPreferences);
    });

    it('should successfully update user preferences using UserService', async () => {
      const updateData = { theme: 'light' as const };
      const response = { success: true, updatedPreferences: { ...mockUserPreferences, theme: 'light' } };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => response,
      });

      const result = await UserService.updateUserPreferences('user-123', updateData);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/user/preferences'),
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(updateData),
        })
      );
      expect(result).toEqual(response);
    });
  });

  describe('ChatService Integration', () => {
    it('should successfully send a message using ChatService', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockChatResponse,
      });

      const result = await ChatService.sendMessage('Test query', 'session-123');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/chat/query'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            query: 'Test query',
            context: '',
            sessionId: 'session-123',
          }),
        })
      );
      expect(result.id).toBe('response-1');
      expect(result.response).toBe('This is a response to your query');
    });
  });
});