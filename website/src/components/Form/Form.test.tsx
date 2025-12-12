import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input, Textarea, Select } from './Form';

describe('Form Components', () => {
  describe('Input Component', () => {
    test('renders input with default props', () => {
      render(<Input placeholder="Enter text" />);

      const input = screen.getByPlaceholderText(/enter text/i);
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('border', 'rounded', 'px-3', 'py-2');
    });

    test('renders with value and onChange', () => {
      const handleChange = jest.fn();
      render(<Input value="test value" onChange={handleChange} />);

      const input = screen.getByDisplayValue(/test value/i);
      expect(input).toBeInTheDocument();

      fireEvent.change(input, { target: { value: 'new value' } });
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    test('shows error state', () => {
      render(<Input error={true} errorMessage="This field is required" />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-red-500');
      expect(screen.getByText(/this field is required/i)).toBeInTheDocument();
    });

    test('renders different types', () => {
      render(<Input type="email" placeholder="Email" />);

      const input = screen.getByPlaceholderText(/email/i);
      expect(input).toHaveAttribute('type', 'email');
    });
  });

  describe('Textarea Component', () => {
    test('renders textarea with default props', () => {
      render(<Textarea placeholder="Enter your message" />);

      const textarea = screen.getByPlaceholderText(/enter your message/i);
      expect(textarea).toBeInTheDocument();
      expect(textarea).toHaveClass('border', 'rounded', 'p-3');
    });

    test('renders with value and onChange', () => {
      const handleChange = jest.fn();
      render(<Textarea value="test text" onChange={handleChange} />);

      const textarea = screen.getByDisplayValue(/test text/i);
      expect(textarea).toBeInTheDocument();

      fireEvent.change(textarea, { target: { value: 'new text' } });
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    test('shows error state', () => {
      render(<Textarea error={true} errorMessage="Message is required" />);

      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('border-red-500');
      expect(screen.getByText(/message is required/i)).toBeInTheDocument();
    });

    test('respects rows prop', () => {
      render(<Textarea rows={5} />);

      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('rows', '5');
    });
  });

  describe('Select Component', () => {
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ];

    test('renders select with options', () => {
      render(<Select options={options} />);

      const select = screen.getByRole('combobox');
      expect(select).toBeInTheDocument();

      options.forEach(option => {
        expect(screen.getByText(option.label)).toBeInTheDocument();
      });
    });

    test('renders with default value', () => {
      render(<Select options={options} value="option2" />);

      const select = screen.getByRole('combobox');
      expect(select).toHaveValue('option2');
    });

    test('calls onChange when value changes', () => {
      const handleChange = jest.fn();
      render(<Select options={options} onChange={handleChange} />);

      const select = screen.getByRole('combobox');
      fireEvent.change(select, { target: { value: 'option2' } });
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    test('shows error state', () => {
      render(<Select options={options} error={true} errorMessage="Please select an option" />);

      const select = screen.getByRole('combobox');
      expect(select).toHaveClass('border-red-500');
      expect(screen.getByText(/please select an option/i)).toBeInTheDocument();
    });
  });
});