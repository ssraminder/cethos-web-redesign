'use client';

import Image from 'next/image';
import { useState } from 'react';

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
  const [imgSrc, setImgSrc] = useState(src || PLACEHOLDER_IMAGE);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(PLACEHOLDER_IMAGE);
    }
  };

  // If using Next.js Image fails due to upstream issues, fall back to regular img
  if (hasError) {
    return fill ? (
      <img
        src={imgSrc}
        alt={alt}
        className={`absolute inset-0 w-full h-full ${className}`}
        loading={priority ? 'eager' : 'lazy'}
      />
    ) : (
      <img
        src={imgSrc}
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
      src={imgSrc}
      alt={alt}
      fill
      className={className}
      priority={priority}
      onError={handleError}
    />
  ) : (
    <Image
      src={imgSrc}
      alt={alt}
      width={width || 1200}
      height={height || 630}
      className={className}
      priority={priority}
      onError={handleError}
    />
  );
}
