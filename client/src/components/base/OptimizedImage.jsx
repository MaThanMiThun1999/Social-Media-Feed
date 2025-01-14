import React, { useState } from 'react';
import clsx from 'clsx'; 
import { getOptimizedImageUrl } from '../../utils/imageOptimizer';

const defaultTransformations = {
  f: 'auto',
  q: 'auto',
  w: 300,
  h: 300, 
  c: 'fill',
  g: 'auto',
};

// OptimizedImage Component
const OptimizedImage = ({
  src,
  alt,
  className,
  transformations = {},
  fallbackImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
}) => {
  const [isLoading, setIsLoading] = useState(true); 
  const [hasError, setHasError] = useState(false); 

  const imageTransformations = {
    ...defaultTransformations,
    ...transformations,
  };

  const optimizedImageUrl = getOptimizedImageUrl(src, imageTransformations);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setHasError(true);
    setIsLoading(false);
  };
  const imageClasses = clsx(
    'transition-opacity duration-500 ease-in-out', 
    'object-cover shadow-2xl', 
    className, 
    {
      'opacity-50': isLoading, 
      'blur-sm': isLoading,
      'bg-gray-300': hasError,
    }
  );

  return (
    <div className="relative">
      <img
        src={isLoading || hasError ? fallbackImage : optimizedImageUrl}
        alt={alt}
        className={imageClasses}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="lazy" 
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white">Loading...</span>{' '}
        </div>
      )}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-red-500 shadow-2xl font-extralight text-center text-[0.89rem]">
            Error loading image
          </span>{' '}
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
