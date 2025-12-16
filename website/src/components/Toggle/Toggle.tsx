import React from 'react';

type ToggleSize = 'sm' | 'md' | 'lg';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: ToggleSize;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-4',
    md: 'w-10 h-5',
    lg: 'w-12 h-6',
  };

  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  const toggleClasses = [
    'relative inline-flex items-center rounded-full cursor-pointer transition-colors',
    sizeClasses[size],
    checked 
      ? 'bg-ai-primary' 
      : 'bg-gray-300 dark:bg-gray-600',
    disabled 
      ? 'opacity-50 cursor-not-allowed' 
      : 'cursor-pointer',
    className,
  ].filter(Boolean).join(' ');

  const thumbSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const thumbPosition = checked 
    ? size === 'sm' ? 'translate-x-4' 
      : size === 'md' ? 'translate-x-5' 
      : 'translate-x-6' 
    : 'translate-x-0';

  return (
    <div className="flex items-center">
      <label className={toggleClasses} onClick={handleToggle}>
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={() => {}} // We handle the change in the label click
          disabled={disabled}
        />
        <span 
          className={`inline-block transform transition-transform ${thumbSizeClasses[size]} ${thumbPosition} rounded-full bg-white shadow-md`}
        />
      </label>
      {label && (
        <span 
          className={`ml-2 text-sm ${disabled ? 'text-gray-500 dark:text-gray-400' : 'text-gray-700 dark:text-gray-300'}`}
          onClick={handleToggle}
        >
          {label}
        </span>
      )}
    </div>
  );
};