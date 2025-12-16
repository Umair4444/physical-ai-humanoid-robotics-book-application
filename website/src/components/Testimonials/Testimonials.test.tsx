import React from 'react';
import { render, screen } from '@testing-library/react';
import Testimonials from './Testimonials';

describe('Testimonials Component', () => {
  it('renders testimonial information', () => {
    render(<Testimonials />);

    expect(screen.getByText('Dr. Sarah Johnson')).toBeInTheDocument();
    expect(screen.getByText('Lead Robotics Engineer')).toBeInTheDocument();
    expect(screen.getByText('This textbook transformed my understanding of AI robotics.')).toBeInTheDocument();
  });

  it('renders multiple testimonials', () => {
    render(<Testimonials />);

    const testimonialNames = screen.getAllByText(/Dr\. Sarah Johnson|Prof\. Ahmed Khan|Alex Chen/);
    expect(testimonialNames).toHaveLength(3);
  });

  it('shows star ratings', () => {
    render(<Testimonials />);

    // Check for star ratings display
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});