import React from 'react';
import { render, screen } from '@testing-library/react';
import { SummaryImage } from './SummaryImage';

describe('SummaryImage Component', () => {
  test('renders image with summary dimensions (400x225)', () => {
    render(<SummaryImage src="/summary-image.jpg" alt="Summary image" />);

    const img = screen.getByRole('img', { name: /summary image/i });
    expect(img).toHaveStyle({ width: '400px', height: '225px' });
  });

  test('renders with responsive behavior', () => {
    render(<SummaryImage src="/summary-image.jpg" alt="Summary image" responsive={true} />);

    const img = screen.getByRole('img', { name: /summary image/i });
    expect(img).toHaveClass('w-full', 'h-auto');
  });

  test('renders with custom caption', () => {
    render(<SummaryImage src="/summary-image.jpg" alt="Summary image" caption="This is a summary image" />);

    expect(screen.getByText(/this is a summary image/i)).toBeInTheDocument();
  });

  test('renders with placeholder while loading', () => {
    render(<SummaryImage src="" alt="Summary image" showPlaceholder={true} />);

    expect(screen.getByTestId('image-placeholder')).toBeInTheDocument();
  });

  test('applies proper aspect ratio', () => {
    render(<SummaryImage src="/summary-image.jpg" alt="Summary image" />);

    const img = screen.getByRole('img', { name: /summary image/i });
    // Check that the aspect ratio is 16:9 (400:225)
    expect(img).toHaveStyle({ 'aspect-ratio': '16 / 9' });
  });
});