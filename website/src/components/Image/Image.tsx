import React, { useState, useEffect } from 'react';

type ImageSize = 'lesson' | 'summary' | 'card' | 'testimonial' | 'custom';

interface ImageProps {
  src: string;
  alt: string;
  size?: ImageSize;
  width?: number;
  height?: number;
  responsive?: boolean;
  className?: string;
  lazy?: boolean;
  showPlaceholder?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

// Default dimensions based on research specs
const sizeDimensions = {
  lesson: { width: 800, height: 450 },    // 16:9 aspect ratio
  summary: { width: 400, height: 225 },   // 16:9 aspect ratio
  card: { width: 300, height: 200 },      // Standard card size
  testimonial: { width: 80, height: 80 }, // Circular profile picture
};

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  size = 'custom',
  width,
  height,
  responsive = false,
  className = '',
  lazy = true,
  showPlaceholder = false,
  onLoad,
  onError,
}) => {
  const [imgWidth, setImgWidth] = useState<number | undefined>(width);
  const [imgHeight, setImgHeight] = useState<number | undefined>(height);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (size !== 'custom' && !width && !height) {
      setImgWidth(sizeDimensions[size].width);
      setImgHeight(sizeDimensions[size].height);
    }
  }, [size, width, height]);

  const handleLoad = () => {
    setIsLoading(false);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    if (onError) onError();
  };

  if (hasError) {
    return (
      <div className={`bg-gray-200 border-2 border-dashed rounded-xl ${className}`} style={{ width: imgWidth, height: imgHeight }}>
        <div className="flex items-center justify-center h-full text-gray-500">
          <span>Image not available</span>
        </div>
      </div>
    );
  }

  if (isLoading && showPlaceholder) {
    return (
      <div
        className={`bg-gray-200 animate-pulse rounded-xl ${className}`}
        style={{ width: imgWidth, height: imgHeight }}
        data-testid="image-placeholder"
      >
        <div className="flex items-center justify-center h-full text-gray-500">
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  const responsiveClasses = responsive ? 'w-full h-auto max-w-full' : '';
  const baseClasses = 'object-cover rounded-lg';

  const imageClasses = [
    baseClasses,
    responsiveClasses,
    className,
  ].filter(Boolean).join(' ');

  // Generate WebP source from original source if not already WebP
  const getWebPSource = (source: string): string => {
    if (source.endsWith('.webp')) {
      return source; // Already WebP
    }
    return source.replace(/\.(jpg|jpeg|png|gif)$/, '.webp');
  };

  const webpSrc = getWebPSource(src);

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={src}
        alt={alt}
        width={imgWidth}
        height={imgHeight}
        className={imageClasses}
        loading={lazy ? 'lazy' : 'eager'}
        onLoad={handleLoad}
        onError={handleError}
      />
    </picture>
  );
};