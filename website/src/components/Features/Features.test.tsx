import React from 'react';
import { render, screen } from '@testing-library/react';
import Features from './Features';

describe('Features Component', () => {
  it('renders all feature sections', () => {
    render(<Features />);

    expect(screen.getByText('Cutting-Edge Content')).toBeInTheDocument();
    expect(screen.getByText('AI-Powered Learning')).toBeInTheDocument();
    expect(screen.getByText('Expert Instructors')).toBeInTheDocument();
    expect(screen.getByText('Flexible Access')).toBeInTheDocument();
  });

  it('renders feature descriptions', () => {
    render(<Features />);

    expect(screen.getByText(/Comprehensive coverage of physical AI and humanoid robotics/i)).toBeInTheDocument();
    expect(screen.getByText(/Personalized learning paths using advanced AI/i)).toBeInTheDocument();
  });
});