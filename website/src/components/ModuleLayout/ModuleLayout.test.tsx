import React from 'react';
import { render, screen } from '@testing-library/react';
import { ModuleLayout } from './ModuleLayout';

// Mock data for module and chapters
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
  ],
};

describe('ModuleLayout Component', () => {
  test('renders module title and description', () => {
    render(
      <ModuleLayout 
        module={mockModule} 
        chapters={mockModule.chapters}
      >
        <div>Module Content</div>
      </ModuleLayout>
    );

    expect(screen.getByText('Introduction to AI Robotics')).toBeInTheDocument();
    expect(screen.getByText('Basic concepts and foundations')).toBeInTheDocument();
  });

  test('renders sidebar navigation with chapters', () => {
    render(
      <ModuleLayout 
        module={mockModule} 
        chapters={mockModule.chapters}
      >
        <div>Module Content</div>
      </ModuleLayout>
    );

    expect(screen.getByText('History of Robotics')).toBeInTheDocument();
    expect(screen.getByText('Basic Components')).toBeInTheDocument();
    expect(screen.getByText('15 min')).toBeInTheDocument();
    expect(screen.getByText('20 min')).toBeInTheDocument();
  });

  test('renders children content', () => {
    const testContent = 'This is the main module content';

    render(
      <ModuleLayout 
        module={mockModule} 
        chapters={mockModule.chapters}
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
        chapters={mockModule.chapters}
      >
        <div>Module Content</div>
      </ModuleLayout>
    );

    expect(screen.getByText('🤖')).toBeInTheDocument();
  });

  test('renders responsive sidebar layout', () => {
    render(
      <ModuleLayout 
        module={mockModule} 
        chapters={mockModule.chapters}
      >
        <div>Module Content</div>
      </ModuleLayout>
    );

    const sidebar = screen.getByRole('navigation', { hidden: true }); // sidebar might not have explicit role
    expect(sidebar).toBeInTheDocument();
  });
});