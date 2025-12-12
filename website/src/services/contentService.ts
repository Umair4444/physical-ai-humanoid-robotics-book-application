import { Module, Chapter } from '../types/module';

// Mock data for modules and chapters
const mockModules: Module[] = [
  {
    id: 'module-1',
    title: 'Introduction to AI Robotics',
    description: 'Basic concepts and foundations',
    order: 1,
    icon: '🤖',
    chapters: [],
  },
  {
    id: 'module-2',
    title: 'Robotics Hardware',
    description: 'Understanding physical components',
    order: 2,
    icon: '⚙️',
    chapters: [],
  },
  {
    id: 'module-3',
    title: 'Sensors and Perception',
    description: 'How robots perceive their environment',
    order: 3,
    icon: '👁️',
    chapters: [],
  },
  {
    id: 'module-4',
    title: 'Motion Planning',
    description: 'Navigating through space',
    order: 4,
    icon: '🧭',
    chapters: [],
  },
  {
    id: 'module-5',
    title: 'Control Systems',
    description: 'Managing robot behavior',
    order: 5,
    icon: '🎮',
    chapters: [],
  },
  {
    id: 'module-6',
    title: 'Machine Learning in Robotics',
    description: 'AI algorithms for robotic systems',
    order: 6,
    icon: '🧠',
    chapters: [],
  },
  {
    id: 'module-7',
    title: 'Human-Robot Interaction',
    description: 'Designing collaborative systems',
    order: 7,
    icon: '🤝',
    chapters: [],
  },
  {
    id: 'module-8',
    title: 'Robotics Applications',
    description: 'Real-world use cases',
    order: 8,
    icon: '🏢',
    chapters: [],
  },
  {
    id: 'module-9',
    title: 'Ethics in AI Robotics',
    description: 'Responsible development practices',
    order: 9,
    icon: '⚖️',
    chapters: [],
  },
  {
    id: 'module-10',
    title: 'Future of Robotics',
    description: 'Emerging trends and technologies',
    order: 10,
    icon: '🚀',
    chapters: [],
  },
];

// Generate mock chapters for each module
const generateMockChapters = (moduleId: string): Chapter[] => {
  const chapterTitles = [
    'History and Overview',
    'Basic Components',
    'Sensors and Perception',
    'Actuators and Movement',
    'Control Systems',
    'Future Trends'
  ];

  return chapterTitles.map((title, index) => ({
    id: `${moduleId}-chapter-${index + 1}`,
    moduleId: moduleId,
    title: `${title}`,
    order: index + 1,
    lessonContent: `<h2>${title} Lesson</h2><p>This is the detailed lesson content for ${title}. It contains comprehensive information about the topic with examples and illustrations.</p><p>Students will learn fundamental concepts, practical applications, and emerging trends related to this subject area.</p>`,
    summaryContent: `<p>This is a brief summary of ${title}. Key points include fundamental concepts and practical applications.</p>`,
    duration: Math.floor(Math.random() * 15) + 10, // Random duration between 10-25 minutes
    imageUrl: `/img/chapter-${moduleId}-${index + 1}.jpg`
  }));
};

// Update modules with chapters
const modulesWithChapters = mockModules.map(module => ({
  ...module,
  chapters: generateMockChapters(module.id)
}));

// Simple in-memory cache
const cache = new Map<string, any>();

export const contentService = {
  /**
   * Fetch all modules with caching
   */
  getModules: async (): Promise<Module[]> => {
    const cacheKey = 'all-modules';
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    const result = await new Promise<Module[]>((resolve) => {
      setTimeout(() => {
        resolve(modulesWithChapters);
      }, 50); // Reduced network delay to simulate better performance
    });

    cache.set(cacheKey, result);
    return result;
  },

  /**
   * Fetch a specific module by ID with caching
   */
  getModule: async (moduleId: string): Promise<Module | undefined> => {
    const cacheKey = `module-${moduleId}`;
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    const result = await new Promise<Module | undefined>((resolve) => {
      setTimeout(() => {
        const module = modulesWithChapters.find(m => m.id === moduleId);
        cache.set(cacheKey, module);
        resolve(module);
      }, 30); // Reduced network delay to simulate better performance
    });

    return result;
  },

  /**
   * Fetch all chapters for a specific module with caching
   */
  getChapters: async (moduleId: string): Promise<Chapter[]> => {
    const cacheKey = `chapters-${moduleId}`;
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    const result = await new Promise<Chapter[]>((resolve) => {
      setTimeout(() => {
        const module = modulesWithChapters.find(m => m.id === moduleId);
        const chapters = module?.chapters || [];
        cache.set(cacheKey, chapters);
        resolve(chapters);
      }, 30); // Reduced network delay to simulate better performance
    });

    return result;
  },

  /**
   * Fetch a specific chapter by ID with caching
   */
  getChapter: async (chapterId: string): Promise<Chapter | undefined> => {
    const cacheKey = `chapter-${chapterId}`;
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }

    const result = await new Promise<Chapter | undefined>((resolve) => {
      // Find chapter across all modules
      for (const module of modulesWithChapters) {
        const chapter = module.chapters.find(c => c.id === chapterId);
        if (chapter) {
          cache.set(cacheKey, chapter);
          resolve(chapter);
          return;
        }
      }
      resolve(undefined);
    });

    return result;
  }
};