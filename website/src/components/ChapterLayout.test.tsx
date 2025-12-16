import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChapterLayout } from './ChapterLayout';

// Mock contexts
jest.mock('../contexts/ThemeContext', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useTheme: () => ({
    theme: 'light',
    toggleTheme: jest.fn(),
  }),
}));

jest.mock('../contexts/LanguageContext', () => ({
  LanguageProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useLanguage: () => ({
    t: (key: string) => key,
  }),
}));

// Mock child components that use Docusaurus router
jest.mock('./Navigation', () => ({
  Navigation: () => <nav data-testid="navigation">Navigation</nav>
}));

jest.mock('./Header', () => ({
  Header: () => <header data-testid="header">Header</header>
}));

jest.mock('./Footer', () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>
}));

// Mock data for a chapter
const mockChapter = {
  id: 'chapter-1',
  moduleId: 'module-1',
  title: 'History of Robotics',
  order: 1,
  lessonContent: '<h1>Full lesson content here...</h1><p>This is detailed lesson content.</p>',
  summaryContent: '<p>This is a brief summary of the chapter content.</p>',
  duration: 15,
  imageUrl: '/img/test-image.jpg',
};

describe('ChapterLayout Component', () => {
  test('renders chapter title', () => {
    render(
      <ChapterLayout
        chapter={mockChapter}
        moduleId="module-1"
        moduleName="Introduction to AI Robotics"
      />
    );

    // Check for the main chapter title (in the h1)
    expect(screen.getByRole('heading', { name: /History of Robotics/i })).toBeInTheDocument();

    // Check for the module name in navigation
    expect(screen.getByText('Introduction to AI Robotics')).toBeInTheDocument();
  });

  test('displays lesson and summary tabs', () => {
    render(
      <ChapterLayout
        chapter={mockChapter}
        moduleId="module-1"
        moduleName="Introduction to AI Robotics"
      />
    );

    // Check that both tabs are present
    expect(screen.getByRole('tab', { name: /lesson/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /summary/i })).toBeInTheDocument();

    // Check that lesson tab is selected by default
    const lessonTab = screen.getByRole('tab', { name: /lesson/i });
    expect(lessonTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Full lesson content');
  });

  test('switches between lesson and summary tabs', () => {
    render(
      <ChapterLayout
        chapter={mockChapter}
        moduleId="module-1"
        moduleName="Introduction to AI Robotics"
      />
    );

    // Initially lesson tab should be active
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Full lesson content');
    expect(screen.getByRole('tabpanel')).not.toHaveTextContent('brief summary');

    // Switch to summary tab
    const summaryTab = screen.getByRole('tab', { name: /summary/i });
    fireEvent.click(summaryTab);

    // Now summary tab should be active
    expect(screen.getByRole('tabpanel')).not.toHaveTextContent('Full lesson content');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('brief summary');
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

    // Check that navigation controls are present
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