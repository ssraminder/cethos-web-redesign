'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface BlogImageProps {
  src: string | null;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

const PLACEHOLDER_IMAGE = '/images/blog-placeholder.svg';

export default function BlogImage({
  src,
  alt,
  fill,
  width,
  height,
  className = '',
  priority = false,
}: BlogImageProps) {
  const [hasError, setHasError] = useState(false);

  // Reset error state when src changes
  useEffect(() => {
    setHasError(false);
  }, [src]);

  // Derive image source directly from prop - don't store in state
  const imageSrc = src && !hasError ? src : PLACEHOLDER_IMAGE;

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
    }
  };

  // If using Next.js Image fails due to upstream issues, fall back to regular img
  if (hasError) {
    return fill ? (
      <img
        src={PLACEHOLDER_IMAGE}
        alt={alt}
        className={`absolute inset-0 w-full h-full ${className}`}
        loading={priority ? 'eager' : 'lazy'}
      />
    ) : (
      <img
        src={PLACEHOLDER_IMAGE}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
      />
    );
  }

  return fill ? (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      className={className}
      priority={priority}
      onError={handleError}
    />
  ) : (
    <Image
      src={imageSrc}
      alt={alt}
      width={width || 1200}
      height={height || 630}
      className={className}
      priority={priority}
      onError={handleError}
    />
  );
}
