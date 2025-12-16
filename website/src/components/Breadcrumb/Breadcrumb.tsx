import React from 'react';
import Link from '@docusaurus/Link';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: string;
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = '/',
  className = ''
}) => {
  const breadcrumbClasses = [
    'text-sm text-gray-500 dark:text-gray-400 mb-4',
    className
  ].filter(Boolean).join(' ');

  return (
    <nav className={breadcrumbClasses} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span className="mx-2" aria-hidden="true">
                {separator}
              </span>
            )}
            {item.isCurrentPage ? (
              <span className="text-gray-800 dark:text-gray-200" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link 
                to={item.href || '#'}
                className="hover:underline text-ai-primary"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};