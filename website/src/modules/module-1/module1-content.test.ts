import { getModule1Content } from './module1-content';

describe('Module 1 Content', () => {
  test('returns content for all 6 chapters', () => {
    const content = getModule1Content();
    
    expect(content).toHaveLength(6);
    expect(content[0]).toHaveProperty('id');
    expect(content[0]).toHaveProperty('title');
    expect(content[0]).toHaveProperty('lessonContent');
    expect(content[0]).toHaveProperty('summaryContent');
    expect(content[0]).toHaveProperty('duration');
  });

  test('has proper content structure', () => {
    const content = getModule1Content();
    const firstChapter = content[0];
    
    expect(firstChapter.title).toContain('History');
    expect(firstChapter.lessonContent).toContain('<h2>');
    expect(firstChapter.summaryContent).toContain('<p>');
    expect(firstChapter.duration).toBeGreaterThan(0);
  });

  test('has different content for each chapter', () => {
    const content = getModule1Content();
    
    const titles = content.map(chapter => chapter.title);
    const uniqueTitles = new Set(titles);
    
    expect(uniqueTitles.size).toBe(6); // All titles should be unique
  });

  test('has properly formatted lesson and summary content', () => {
    const content = getModule1Content();
    
    content.forEach(chapter => {
      expect(chapter.lessonContent).toMatch(/<h2>.*<\/h2>/); // Should have heading
      expect(chapter.summaryContent).toMatch(/<p>.*<\/p>/); // Should have paragraph
    });
  });
});