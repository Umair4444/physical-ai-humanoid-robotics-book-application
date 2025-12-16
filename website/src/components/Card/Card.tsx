import React from 'react';

type CardPadding = 'small' | 'medium' | 'large';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  responsive?: boolean;
  padding?: CardPadding;
}

interface CardComposition {
  Header: React.FC<{ children: React.ReactNode; className?: string }>;
  Body: React.FC<{ children: React.ReactNode; className?: string }>;
  Footer: React.FC<{ children: React.ReactNode; className?: string }>;
}

const Card: React.FC<CardProps> & CardComposition = ({
  children,
  className = '',
  responsive = true,
  padding = 'medium',
}) => {
  const paddingClasses = {
    small: 'p-3',
    medium: 'p-4',
    large: 'p-6',
  };

  const responsiveClasses = responsive ? 'w-full max-w-full' : '';

  const cardClasses = [
    'bg-white dark:bg-gray-800 rounded-lg shadow-md',
    responsiveClasses,
    paddingClasses[padding],
    className,
  ].filter(Boolean).join(' ');

  return <div className={cardClasses}>{children}</div>;
};

// Card sub-components
const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  const headerClasses = [
    'text-xl font-semibold pb-3 border-b border-gray-200 dark:border-gray-700',
    className,
  ].filter(Boolean).join(' ');

  return <div className={headerClasses}>{children}</div>;
};

const CardBody: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  const bodyClasses = [
    'py-4',
    className,
  ].filter(Boolean).join(' ');

  return <div className={bodyClasses}>{children}</div>;
};

const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  const footerClasses = [
    'pt-3 border-t border-gray-200 dark:border-gray-700',
    className,
  ].filter(Boolean).join(' ');

  return <div className={footerClasses}>{children}</div>;
};

// Attach sub-components to Card
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export { Card };