import React from 'react';
import { render, screen } from '@testing-library/react';
import { Breadcrumb } from './Breadcrumb';

describe('Breadcrumb Component', () => {
  test('renders breadcrumb trail with multiple items', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Modules', href: '/modules' },
      { label: 'Module 1', href: '/modules/module-1' },
      { label: 'Chapter 1', href: '/modules/module-1/chapter-1' },
    ];

    render(<Breadcrumb items={items} />);

    items.forEach(item => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  test('renders with separator', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Modules', href: '/modules' },
    ];

    render(<Breadcrumb items={items} separator=">" />);

    expect(screen.getByText('>')).toBeInTheDocument();
  });

  test('renders current page without link', () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Current Page', isCurrentPage: true },
    ];

    render(<Breadcrumb items={items} />);

    // The current page should be a span, not a link
    expect(screen.getByText('Current Page')).not.toHaveAttribute('href');
  });

  test('renders with custom className', () => {
    const items = [{ label: 'Home', href: '/' }];
    
    render(<Breadcrumb items={items} className="custom-breadcrumb" />);
    
    expect(screen.getByRole('navigation')).toHaveClass('custom-breadcrumb');
  });

  test('renders with aria-label', () => {
    const items = [{ label: 'Home', href: '/' }];
    
    render(<Breadcrumb items={items} />);
    
    expect(screen.getByRole('navigation', { name: /breadcrumb/i })).toBeInTheDocument();
  });
});