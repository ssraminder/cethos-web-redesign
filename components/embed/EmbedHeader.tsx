'use client';

import { useEffect, useRef } from 'react';

interface EmbedHeaderProps {
  /**
   * Identifier for the current site to highlight in navigation
   */
  currentSite?: string;
  /**
   * Hide the "Get a Quote" call-to-action button
   */
  hideCta?: boolean;
  /**
   * Color theme for the header
   * @default "light"
   */
  theme?: 'light' | 'dark';
  /**
   * Additional class names
   */
  className?: string;
}

/**
 * React wrapper for the cethos-header Web Component.
 *
 * This component handles loading the embed script and provides
 * a type-safe interface for the Web Component attributes.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <EmbedHeader />
 *
 * // With options
 * <EmbedHeader currentSite="portal" hideCta theme="dark" />
 * ```
 */
export default function EmbedHeader({
  currentSite,
  hideCta,
  theme = 'light',
  className,
}: EmbedHeaderProps) {
  const ref = useRef<HTMLElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    // Load embed script if not already loaded
    if (!scriptLoaded.current && typeof window !== 'undefined' && !window.CethosComponents) {
      const existingScript = document.querySelector(
        'script[src$="cethos-components.js"]'
      );

      if (!existingScript) {
        const script = document.createElement('script');
        script.src = '/embed/cethos-components.js';
        script.async = true;
        document.body.appendChild(script);
      }

      scriptLoaded.current = true;
    }
  }, []);

  // Convert boolean props to attribute format
  const attrs: Record<string, string | undefined> = {};

  if (currentSite) {
    attrs['current-site'] = currentSite;
  }

  if (hideCta) {
    attrs['hide-cta'] = '';
  }

  if (theme && theme !== 'light') {
    attrs.theme = theme;
  }

  return (
    <cethos-header
      ref={ref}
      className={className}
      {...attrs}
    />
  );
}
