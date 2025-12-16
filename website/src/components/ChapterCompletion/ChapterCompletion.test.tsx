import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChapterCompletion } from './ChapterCompletion';

describe('ChapterCompletion Component', () => {
  test('renders completion indicator in unchecked state', () => {
    render(<ChapterCompletion chapterId="chapter-1" isCompleted={false} onToggleCompletion={jest.fn()} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    expect(checkbox).toHaveAccessibleName(/mark chapter as completed/i);
  });

  test('renders completion indicator in checked state', () => {
    render(<ChapterCompletion chapterId="chapter-1" isCompleted={true} onToggleCompletion={jest.fn()} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
    expect(checkbox).toHaveAccessibleName(/mark chapter as not completed/i);
  });

  test('calls onToggleCompletion when clicked', () => {
    const handleToggle = jest.fn();
    render(<ChapterCompletion chapterId="chapter-1" isCompleted={false} onToggleCompletion={handleToggle} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(handleToggle).toHaveBeenCalledTimes(1);
  });

  test('renders with custom className', () => {
    render(<ChapterCompletion 
      chapterId="chapter-1" 
      isCompleted={false} 
      onToggleCompletion={jest.fn()} 
      className="custom-completion" 
    />);

    expect(screen.getByRole('checkbox').closest('div')).toHaveClass('custom-completion');
  });

  test('renders completion text', () => {
    render(<ChapterCompletion chapterId="chapter-1" isCompleted={true} onToggleCompletion={jest.fn()} />);

    expect(screen.getByText(/completed/i)).toBeInTheDocument();
  });
});