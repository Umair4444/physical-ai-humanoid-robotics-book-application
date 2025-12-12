import React from 'react';
import { render, screen } from '@testing-library/react';
import { ModuleLayout } from './ModuleLayout';

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

// Mock contexts
jest.mock('../contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: 'light',
    toggleTheme: jest.fn(),
  }),
}));

jest.mock('../contexts/LanguageContext', () => ({
  useLanguage: () => ({
    t: (key: string) => key,
  }),
}));

// Mock data for a module with chapters
const mockModule = {
  id: 'module-1',
  title: 'Introduction to AI Robotics',
  description: 'Basic concepts and foundations',
  order: 1,
  icon: '🤖',
  chapters: [
    {
      id: 'chapter-1',
      moduleId: 'module-1',
      title: 'History of Robotics',
      order: 1,
      lessonContent: 'Full lesson content here...',
      summaryContent: 'Brief summary here...',
      duration: 15,
    },
    {
      id: 'chapter-2',
      moduleId: 'module-1',
      title: 'Basic Components',
      order: 2,
      lessonContent: 'Full lesson content here...',
      summaryContent: 'Brief summary here...',
      duration: 20,
    },
    {
      id: 'chapter-3',
      moduleId: 'module-1',
      title: 'Sensors Overview',
      order: 3,
      lessonContent: 'Full lesson content here...',
      summaryContent: 'Brief summary here...',
      duration: 18,
    },
    {
      id: 'chapter-4',
      moduleId: 'module-1',
      title: 'Actuators and Motors',
      order: 4,
      lessonContent: 'Full lesson content here...',
      summaryContent: 'Brief summary here...',
      duration: 22,
    },
    {
      id: 'chapter-5',
      moduleId: 'module-1',
      title: 'Control Systems',
      order: 5,
      lessonContent: 'Full lesson content here...',
      summaryContent: 'Brief summary here...',
      duration: 25,
    },
    {
      id: 'chapter-6',
      moduleId: 'module-1',
      title: 'Introduction to AI',
      order: 6,
      lessonContent: 'Full lesson content here...',
      summaryContent: 'Brief summary here...',
      duration: 20,
    },
  ],
};

const mockChapters = mockModule.chapters;

describe('ModuleLayout Component', () => {
  test('renders module title and description', () => {
    render(
      <ModuleLayout 
        module={mockModule} 
        chapters={mockChapters}
      >
        <div>Module Content</div>
      </ModuleLayout>
    );

    expect(screen.getByText('Introduction to AI Robotics')).toBeInTheDocument();
    expect(screen.getByText('Basic concepts and foundations')).toBeInTheDocument();
  });

  test('renders all chapters in the sidebar', () => {
    render(
      <ModuleLayout
        module={mockModule}
        chapters={mockChapters}
      >
        <div>Module Content</div>
      </ModuleLayout>
    );

    // Check that all 6 chapters are listed in the sidebar
    expect(screen.getAllByTestId(/^chapter-link-/)).toHaveLength(6);

    // Check specific chapter titles by querying within chapter links
    expect(screen.getByTestId('chapter-link-chapter-1')).toHaveTextContent('History of Robotics');
    expect(screen.getByTestId('chapter-link-chapter-2')).toHaveTextContent('Basic Components');
    expect(screen.getByTestId('chapter-link-chapter-3')).toHaveTextContent('Sensors Overview');
    expect(screen.getByTestId('chapter-link-chapter-4')).toHaveTextContent('Actuators and Motors');
    expect(screen.getByTestId('chapter-link-chapter-5')).toHaveTextContent('Control Systems');
    expect(screen.getByTestId('chapter-link-chapter-6')).toHaveTextContent('Introduction to AI');
  });

  test('renders children content in main area', () => {
    const testContent = 'This is the main module content';

    render(
      <ModuleLayout 
        module={mockModule} 
        chapters={mockChapters}
      >
        <div>{testContent}</div>
      </ModuleLayout>
    );

    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  test('displays module icon', () => {
    render(
      <ModuleLayout 
        module={mockModule} 
        chapters={mockChapters}
      >
        <div>Module Content</div>
      </ModuleLayout>
    );

    expect(screen.getByText('🤖')).toBeInTheDocument();
  });

  test('shows estimated reading time for chapters', () => {
    render(
      <ModuleLayout
        module={mockModule}
        chapters={mockChapters}
      >
        <div>Module Content</div>
      </ModuleLayout>
    );

    // Check that durations are displayed for chapters
    // Using queryAllByText to handle multiple occurrences
    const durationElements = screen.getAllByText(/min/);
    expect(durationElements).toHaveLength(6); // 6 chapters each with a duration

    // Check specific durations are present
    expect(screen.getByText('15 min')).toBeInTheDocument();
    expect(screen.getByText('18 min')).toBeInTheDocument();
    expect(screen.getByText('22 min')).toBeInTheDocument();
    expect(screen.getByText('25 min')).toBeInTheDocument();

    // For chapters with same duration (20 min appears twice), check them differently
    const twentyMinElements = screen.getAllByText('20 min');
    expect(twentyMinElements).toHaveLength(2); // Basic Components and Introduction to AI
  });
});