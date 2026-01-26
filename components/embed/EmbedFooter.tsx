'use client';

import { useEffect, useRef } from 'react';

interface EmbedFooterProps {
  /**
   * Show minimal footer with just copyright and legal links
   */
  minimal?: boolean;
  /**
   * Hide the locations column in the footer
   */
  hideLocations?: boolean;
  /**
   * Additional class names
   */
  className?: string;
}

/**
 * React wrapper for the cethos-footer Web Component.
 *
 * This component handles loading the embed script and provides
 * a type-safe interface for the Web Component attributes.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <EmbedFooter />
 *
 * // Minimal footer
 * <EmbedFooter minimal />
 *
 * // Without locations
 * <EmbedFooter hideLocations />
 * ```
 */
export default function EmbedFooter({
  minimal,
  hideLocations,
  className,
}: EmbedFooterProps) {
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

  if (minimal) {
    attrs.minimal = '';
  }

  if (hideLocations) {
    attrs['hide-locations'] = '';
  }

  return (
    <cethos-footer
      ref={ref}
      className={className}
      {...attrs}
    />
  );
}
