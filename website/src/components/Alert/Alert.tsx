import React, { useState } from 'react';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
  type?: AlertType;
  message: string;
  title?: string;
  dismissible?: boolean;
  showIcon?: boolean;
  onClose?: () => void;
  className?: string;
}

const typeConfig: Record<AlertType, { icon: string; background: string; border: string; text: string }> = {
  success: {
    icon: '✓',
    background: 'bg-green-100 dark:bg-green-900/30',
    border: 'border-green-500',
    text: 'text-green-700 dark:text-green-300',
  },
  error: {
    icon: '✕',
    background: 'bg-red-100 dark:bg-red-900/30',
    border: 'border-red-500',
    text: 'text-red-700 dark:text-red-300',
  },
  warning: {
    icon: '⚠',
    background: 'bg-yellow-100 dark:bg-yellow-900/30',
    border: 'border-yellow-500',
    text: 'text-yellow-700 dark:text-yellow-300',
  },
  info: {
    icon: 'ℹ',
    background: 'bg-blue-100 dark:bg-blue-900/30',
    border: 'border-blue-500',
    text: 'text-blue-700 dark:text-blue-300',
  },
};

export const Alert: React.FC<AlertProps> = ({
  type = 'info',
  message,
  title,
  dismissible = false,
  showIcon = false,
  onClose,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const config = typeConfig[type];

  if (!isVisible) {
    return null;
  }

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  const alertClasses = [
    'p-4 rounded-lg border-l-4',
    config.background,
    config.border,
    config.text,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={alertClasses}>
      <div className="flex items-start">
        {showIcon && (
          <span className="flex-shrink-0 text-xl mr-3" aria-hidden="true">
            {config.icon}
          </span>
        )}
        <div className="flex-1">
          {title && (
            <h3 className="font-bold text-lg mb-1">
              {title}
            </h3>
          )}
          <p>{message}</p>
        </div>
        {dismissible && (
          <button
            type="button"
            className="ml-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
            onClick={handleClose}
            aria-label="Close"
          >
            <span className="text-lg">×</span>
          </button>
        )}
      </div>
    </div>
  );
};