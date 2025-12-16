import React from 'react';
import { render, screen } from '@testing-library/react';
import { LessonImage } from './LessonImage';

describe('LessonImage Component', () => {
  test('renders image with lesson dimensions (800x450)', () => {
    render(<LessonImage src="/lesson-image.jpg" alt="Lesson image" />);

    const img = screen.getByRole('img', { name: /lesson image/i });
    expect(img).toHaveStyle({ width: '800px', height: '450px' });
  });

  test('renders with responsive behavior', () => {
    render(<LessonImage src="/lesson-image.jpg" alt="Lesson image" responsive={true} />);

    const img = screen.getByRole('img', { name: /lesson image/i });
    expect(img).toHaveClass('w-full', 'h-auto');
  });

  test('renders with custom caption', () => {
    render(<LessonImage src="/lesson-image.jpg" alt="Lesson image" caption="This is a lesson image" />);

    expect(screen.getByText(/this is a lesson image/i)).toBeInTheDocument();
  });

  test('renders with placeholder while loading', () => {
    render(<LessonImage src="" alt="Lesson image" showPlaceholder={true} />);

    expect(screen.getByTestId('image-placeholder')).toBeInTheDocument();
  });

  test('applies proper aspect ratio', () => {
    render(<LessonImage src="/lesson-image.jpg" alt="Lesson image" />);

    const img = screen.getByRole('img', { name: /lesson image/i });
    // Check that the aspect ratio is 16:9 (800:450)
    expect(img).toHaveStyle({ 'aspect-ratio': '16 / 9' });
  });
});