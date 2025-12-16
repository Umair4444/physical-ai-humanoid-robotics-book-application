import { ContentService } from './ContentService';

// Mock the fetch API
global.fetch = jest.fn();

describe('ContentService', () => {
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

  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  describe('getModules', () => {
    it('should fetch modules successfully', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({ modules: mockModules }),
      });

      const result = await ContentService.getModules();

      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
      expect(result).toEqual(mockModules);
    });

    it('should handle errors when fetching modules', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({ error: 'Server error' }),
      });

      await expect(ContentService.getModules()).rejects.toThrow(
        'Failed to fetch modules: 500'
      );
    });
  });

  describe('getChapters', () => {
    it('should fetch chapters for a module successfully', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => ({ moduleId: 'module-1', chapters: mockChapters }),
      });

      const result = await ContentService.getChapters('module-1');

      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
      expect(result).toEqual(mockChapters);
    });

    it('should handle errors when fetching chapters', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 404,
        json: async () => ({ error: 'Module not found' }),
      });

      await expect(ContentService.getChapters('invalid-module')).rejects.toThrow(
        'Failed to fetch chapters: 404'
      );
    });
  });

  describe('getChapter', () => {
    it('should fetch chapter content successfully', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockChapterContent,
      });

      const result = await ContentService.getChapter('module-1-chapter-1');

      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
      expect(result).toEqual(mockChapterContent);
    });

    it('should handle errors when fetching chapter content', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 404,
        json: async => ({ error: 'Chapter not found' }),
      });

      await expect(ContentService.getChapter('invalid-chapter')).rejects.toThrow(
        'Failed to fetch chapter: 404'
      );
    });
  });
});