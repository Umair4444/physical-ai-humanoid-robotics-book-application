import React, { ChangeEvent } from 'react';

interface InputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: string;
  error?: boolean;
  errorMessage?: string;
  className?: string;
  disabled?: boolean;
}

interface TextareaProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  className?: string;
  rows?: number;
  disabled?: boolean;
}

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value?: string;
  onChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  className?: string;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  value = '',
  onChange,
  placeholder,
  type = 'text',
  error = false,
  errorMessage,
  className = '',
  disabled = false,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const baseClasses = 'border rounded px-3 py-2 w-full focus:outline-none focus:ring-2';
  const errorClasses = error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-ai-primary focus:border-ai-primary';
  const disabledClasses = disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : '';

  const inputClasses = [
    baseClasses,
    errorClasses,
    disabledClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="w-full">
      <input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={inputClasses}
        disabled={disabled}
      />
      {error && errorMessage && (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
};

export const Textarea: React.FC<TextareaProps> = ({
  value = '',
  onChange,
  placeholder,
  error = false,
  errorMessage,
  className = '',
  rows = 4,
  disabled = false,
}) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const baseClasses = 'border rounded p-3 w-full focus:outline-none focus:ring-2';
  const errorClasses = error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-ai-primary focus:border-ai-primary';
  const disabledClasses = disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : '';

  const textareaClasses = [
    baseClasses,
    errorClasses,
    disabledClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="w-full">
      <textarea
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        className={textareaClasses}
        disabled={disabled}
      />
      {error && errorMessage && (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
};

export const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  options,
  placeholder,
  error = false,
  errorMessage,
  className = '',
  disabled = false,
}) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const baseClasses = 'border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 appearance-none bg-white bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjYgOSAxMiAxNSAxOCA5Ij48L3BvbHlsaW5lPjwvc3ZnPg==")] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1rem_1rem]';
  const errorClasses = error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-ai-primary focus:border-ai-primary';
  const disabledClasses = disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : '';

  const selectClasses = [
    baseClasses,
    errorClasses,
    disabledClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="w-full">
      <select
        value={value}
        onChange={handleChange}
        className={selectClasses}
        disabled={disabled}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && errorMessage && (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
};