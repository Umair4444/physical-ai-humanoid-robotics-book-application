import { contentService } from './contentService';

describe('Content Service', () => {
  test('should fetch all modules', async () => {
    const modules = await contentService.getModules();
    
    expect(modules).toHaveLength(10);
    expect(modules[0]).toHaveProperty('id');
    expect(modules[0]).toHaveProperty('title');
    expect(modules[0]).toHaveProperty('description');
    expect(modules[0]).toHaveProperty('order');
    expect(modules[0]).toHaveProperty('icon');
    expect(modules[0]).toHaveProperty('chapters');
  });

  test('should fetch a specific module by ID', async () => {
    const module = await contentService.getModule('module-1');
    
    expect(module).toBeDefined();
    expect(module?.id).toBe('module-1');
    expect(module?.title).toBe('Introduction to AI Robotics');
    expect(module?.chapters).toHaveLength(6);
  });

  test('should return undefined for non-existent module', async () => {
    const module = await contentService.getModule('non-existent');
    
    expect(module).toBeUndefined();
  });

  test('should fetch all chapters for a specific module', async () => {
    const chapters = await contentService.getChapters('module-1');
    
    expect(chapters).toHaveLength(6);
    expect(chapters[0]).toHaveProperty('id');
    expect(chapters[0]).toHaveProperty('moduleId');
    expect(chapters[0]).toHaveProperty('title');
    expect(chapters[0]).toHaveProperty('order');
    expect(chapters[0]).toHaveProperty('lessonContent');
    expect(chapters[0]).toHaveProperty('summaryContent');
    expect(chapters[0]).toHaveProperty('duration');
    expect(chapters[0].moduleId).toBe('module-1');
  });

  test('should fetch a specific chapter by ID', async () => {
    const chapter = await contentService.getChapter('module-1-chapter-1');
    
    expect(chapter).toBeDefined();
    expect(chapter?.id).toBe('module-1-chapter-1');
    expect(chapter?.title).toContain('History and Overview');
    expect(chapter?.moduleId).toBe('module-1');
  });

  test('should return undefined for non-existent chapter', async () => {
    const chapter = await contentService.getChapter('non-existent');
    
    expect(chapter).toBeUndefined();
  });
});