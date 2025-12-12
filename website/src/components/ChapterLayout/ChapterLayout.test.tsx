import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChapterLayout } from './ChapterLayout';

// Mock chapter data
const mockChapter = {
  id: 'chapter-1',
  moduleId: 'module-1',
  title: 'History of Robotics',
  order: 1,
  lessonContent: '<h2>Lesson Content</h2><p>This is detailed lesson content.</p>',
  summaryContent: '<p>This is a brief summary of the chapter.</p>',
  duration: 15,
  imageUrl: '/img/test-image.jpg',
};

describe('ChapterLayout Component', () => {
  test('renders chapter title with module context', () => {
    render(
      <ChapterLayout 
        chapter={mockChapter}
        moduleId="module-1"
        moduleName="Introduction to AI Robotics"
      />
    );

    expect(screen.getByText('History of Robotics')).toBeInTheDocument();
    expect(screen.getByText('Introduction to AI Robotics')).toBeInTheDocument();
  });

  test('renders tab switching functionality', () => {
    render(
      <ChapterLayout 
        chapter={mockChapter}
        moduleId="module-1"
        moduleName="Introduction to AI Robotics"
      />
    );

    // Initially lesson tab should be active
    expect(screen.getByText('Lesson')).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Summary')).toHaveAttribute('aria-selected', 'false');
    
    // Switch to summary tab
    fireEvent.click(screen.getByText('Summary'));
    
    // Now summary tab should be active
    expect(screen.getByText('Lesson')).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByText('Summary')).toHaveAttribute('aria-selected', 'true');
  });

  test('renders lesson and summary content tabs', () => {
    render(
      <ChapterLayout 
        chapter={mockChapter}
        moduleId="module-1"
        moduleName="Introduction to AI Robotics"
      />
    );

    expect(screen.getByText(/lesson content/i)).toBeInTheDocument();
    expect(screen.getByText(/detailed lesson content/i)).toBeInTheDocument();
    
    // Switch to summary tab to verify it's there too
    fireEvent.click(screen.getByText('Summary'));
    expect(screen.getByText(/brief summary/i)).toBeInTheDocument();
  });

  test('renders navigation controls', () => {
    render(
      <ChapterLayout 
        chapter={mockChapter}
        moduleId="module-1"
        moduleName="Introduction to AI Robotics"
        previousChapterId="chapter-6"
        nextChapterId="chapter-2"
      />
    );

    expect(screen.getByText(/previous chapter/i)).toBeInTheDocument();
    expect(screen.getByText(/next chapter/i)).toBeInTheDocument();
  });

  test('renders estimated reading time', () => {
    render(
      <ChapterLayout 
        chapter={mockChapter}
        moduleId="module-1"
        moduleName="Introduction to AI Robotics"
      />
    );

    expect(screen.getByText('Estimated time: 15 min')).toBeInTheDocument();
  });
});