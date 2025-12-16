import React from 'react';
import { render, screen } from '@testing-library/react';
import { ModuleList } from './ModuleList';

// Mock the module data as it would come from the content service
const mockModules = [
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

describe('ModuleList Component', () => {
  test('renders all 10 modules correctly', () => {
    render(<ModuleList modules={mockModules} />);

    // Check that all 10 modules are rendered
    expect(screen.getAllByTestId(/^module-card-/)).toHaveLength(10);
    
    // Check that specific module titles are present
    expect(screen.getByText('Introduction to AI Robotics')).toBeInTheDocument();
    expect(screen.getByText('Robotics Hardware')).toBeInTheDocument();
    expect(screen.getByText('Sensors and Perception')).toBeInTheDocument();
    expect(screen.getByText('Motion Planning')).toBeInTheDocument();
    expect(screen.getByText('Control Systems')).toBeInTheDocument();
    expect(screen.getByText('Machine Learning in Robotics')).toBeInTheDocument();
    expect(screen.getByText('Human-Robot Interaction')).toBeInTheDocument();
    expect(screen.getByText('Robotics Applications')).toBeInTheDocument();
    expect(screen.getByText('Ethics in AI Robotics')).toBeInTheDocument();
    expect(screen.getByText('Future of Robotics')).toBeInTheDocument();
  });

  test('displays module descriptions', () => {
    render(<ModuleList modules={mockModules} />);

    // Check that descriptions are present
    expect(screen.getByText('Basic concepts and foundations')).toBeInTheDocument();
    expect(screen.getByText('Understanding physical components')).toBeInTheDocument();
  });

  test('displays module icons', () => {
    render(<ModuleList modules={mockModules} />);

    // Check that icons are present
    expect(screen.getByText('🤖')).toBeInTheDocument(); // Introduction module
    expect(screen.getByText('⚙️')).toBeInTheDocument(); // Hardware module
  });

  test('displays the correct number of modules', () => {
    render(<ModuleList modules={mockModules} />);

    // Count the number of module elements
    const moduleCards = screen.getAllByTestId(/^module-card-/);
    expect(moduleCards).toHaveLength(10);
  });
});