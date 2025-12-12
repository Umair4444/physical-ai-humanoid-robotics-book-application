import React, { useState } from 'react';
import { Image } from '../Image/Image';

interface SummaryImageProps {
  src: string;
  alt: string;
  caption?: string;
  responsive?: boolean;
  className?: string;
  showPlaceholder?: boolean;
}

export const SummaryImage: React.FC<SummaryImageProps> = ({
  src,
  alt,
  caption,
  responsive = false,
  className = '',
  showPlaceholder = false,
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleLoad = () => {
    setImgLoaded(true);
  };

  const handleError = () => {
    setImgError(true);
  };

  if (imgError) {
    return (
      <div className={`bg-gray-200 border-2 border-dashed rounded-xl flex items-center justify-center ${className}`} 
           style={responsive ? {} : { width: 400, height: 225 }}>
        <div className="text-gray-500 p-4 text-center">
          <p>Image could not be loaded</p>
          <p className="text-sm mt-1">{alt}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className={`${responsive ? 'w-full' : 'w-[400px]'} mx-auto`}>
        <Image 
          src={src}
          alt={alt}
          size="summary"
          responsive={responsive}
          showPlaceholder={showPlaceholder}
          onLoad={handleLoad}
          onError={handleError}
        />
        {caption && (
          <p className="text-gray-600 dark:text-gray-400 text-sm text-center mt-2 italic">
            {caption}
          </p>
        )}
      </div>
    </div>
  );
};