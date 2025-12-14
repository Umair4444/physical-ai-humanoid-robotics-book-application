import React, { useState, useEffect, useRef } from 'react';

interface LazyLoadProps {
  children: React.ReactNode;
  className?: string;
  rootMargin?: string;
  threshold?: number;
}

export const LazyLoad: React.FC<LazyLoadProps> = ({ 
  children, 
  className = '',
  rootMargin = '100px',
  threshold = 0.1
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [rootMargin, threshold]);

  return (
    <div 
      ref={elementRef} 
      className={`${className} ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ transition: 'opacity 0.3s ease-in-out' }}
    >
      {isVisible ? children : <div style={{ height: '100px' }} />} {/* Placeholder to maintain space */}
    </div>
  );
};