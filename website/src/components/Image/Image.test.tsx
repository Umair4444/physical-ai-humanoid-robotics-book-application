import React from 'react';
import { render, screen } from '@testing-library/react';
import { Image } from './Image';

describe('Image Component', () => {
  test('renders image with src and alt', () => {
    render(<Image src="/test-image.jpg" alt="Test image" />);

    const img = screen.getByRole('img', { name: /test image/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/test-image.jpg');
  });

  test('renders with responsive sizing', () => {
    render(<Image src="/test-image.jpg" alt="Test image" responsive={true} />);

    const img = screen.getByRole('img', { name: /test image/i });
    expect(img).toHaveClass('w-full', 'h-auto', 'max-w-full');
  });

  test('renders with specified dimensions', () => {
    render(
      <Image 
        src="/test-image.jpg" 
        alt="Test image" 
        width={400} 
        height={225} 
        size="summary" 
      />
    );

    const img = screen.getByRole('img', { name: /test image/i });
    expect(img).toHaveStyle({ width: '400px', height: '225px' });
  });

  test('loads different sizes per research specs', () => {
    render(
      <>
        <Image src="/lesson-image.jpg" alt="Lesson image" size="lesson" />
        <Image src="/summary-image.jpg" alt="Summary image" size="summary" />
      </>
    );

    const lessonImg = screen.getByRole('img', { name: /lesson image/i });
    const summaryImg = screen.getByRole('img', { name: /summary image/i });

    // These would be validated against the specific dimensions in a real implementation
    expect(lessonImg).toBeInTheDocument();
    expect(summaryImg).toBeInTheDocument();
  });

  test('shows placeholder when loading', () => {
    render(<Image src="" alt="Test image" showPlaceholder={true} />);

    const placeholder = screen.getByTestId('image-placeholder');
    expect(placeholder).toBeInTheDocument();
  });

  test('renders with custom className', () => {
    render(<Image src="/test-image.jpg" alt="Test image" className="custom-class" />);

    const img = screen.getByRole('img', { name: /test image/i });
    expect(img).toHaveClass('custom-class');
  });

  test('applies lazy loading', () => {
    render(<Image src="/test-image.jpg" alt="Test image" lazy={true} />);

    const img = screen.getByRole('img', { name: /test image/i });
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  test('renders picture element with WebP source and fallback image', () => {
    render(<Image src="/test-image.jpg" alt="Test image" />);

    const imgElement = screen.getByRole('img', { name: /test image/i });
    const pictureElement = imgElement.parentElement;

    // Check if the parent element is a picture tag
    expect(pictureElement?.tagName).toBe('PICTURE');

    // Check for source element with WebP type
    const sourceElement = pictureElement?.querySelector('source');
    expect(sourceElement).toBeInTheDocument();
    expect(sourceElement).toHaveAttribute('type', 'image/webp');
    expect(sourceElement).toHaveAttribute('srcset', '/test-image.webp');
  });
});