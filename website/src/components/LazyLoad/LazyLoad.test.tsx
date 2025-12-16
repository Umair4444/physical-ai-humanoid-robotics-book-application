import React from 'react';
import { render, screen } from '@testing-library/react';
import { LazyLoad } from './LazyLoad';

// Mock IntersectionObserver
class MockIntersectionObserver {
  callback: Function;

  constructor(callback: Function) {
    this.callback = callback;
  }

  observe = jest.fn(() => {
    // Simulate the element becoming visible immediately for testing
    this.callback([{ isIntersecting: true, target: document.createElement('div') }]);
  });

  unobserve = jest.fn();
  disconnect = jest.fn();
}

describe('LazyLoad Component', () => {
  beforeAll(() => {
    (global as any).IntersectionObserver = MockIntersectionObserver;
  });

  afterAll(() => {
    delete (global as any).IntersectionObserver;
  });

  it('renders children when element is visible', () => {
    render(
      <LazyLoad>
        <div data-testid="test-child">Content</div>
      </LazyLoad>
    );

    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies correct className', () => {
    render(
      <LazyLoad className="test-class">
        <div>Content</div>
      </LazyLoad>
    );

    expect(screen.getByText('Content').parentElement).toHaveClass('test-class');
  });

  it('renders placeholder initially when not visible', () => {
    const mockObserver = jest.fn();
    (global as any).IntersectionObserver = class {
      constructor(callback: Function) {
        // Don't immediately trigger the callback to simulate element not being visible
        mockObserver(callback);
      }
      observe = jest.fn();
      unobserve = jest.fn();
      disconnect = jest.fn();
    };

    render(
      <LazyLoad>
        <div data-testid="test-child">Content</div>
      </LazyLoad>
    );

    // Without triggering the observer, we should still see the placeholder div
    const placeholder = screen.getByText('Content').parentElement;
    expect(placeholder).toHaveClass('opacity-0');
  });
});