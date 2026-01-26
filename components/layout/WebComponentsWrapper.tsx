'use client';

import { useEffect, useState } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'cethos-header': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        'current-site'?: string;
        'hide-cta'?: boolean | '';
        'theme'?: 'light' | 'dark';
        'cta-type'?: 'login' | 'quote';
      }, HTMLElement>;
      'cethos-footer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        'minimal'?: boolean | '';
        'hide-industries'?: boolean | '';
      }, HTMLElement>;
    }
  }
}

interface CethosHeaderProps {
  currentSite?: string;
  hideCta?: boolean;
  theme?: 'light' | 'dark';
  ctaType?: 'login' | 'quote';
}

interface CethosFooterProps {
  minimal?: boolean;
  hideIndustries?: boolean;
}

export function CethosHeader({ currentSite, hideCta, theme, ctaType = 'login' }: CethosHeaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if already loaded
    if (customElements.get('cethos-header')) {
      setIsLoaded(true);
      return;
    }

    // Check if script already exists
    const existingScript = document.querySelector('script[src*="cethos-components.js"]');
    if (existingScript) {
      if (customElements.get('cethos-header')) {
        setIsLoaded(true);
      } else {
        existingScript.addEventListener('load', () => setIsLoaded(true));
      }
      return;
    }

    // Load the script
    const script = document.createElement('script');
    script.src = '/embed/cethos-components.js';
    script.async = true;
    script.onload = () => setIsLoaded(true);
    document.head.appendChild(script);
  }, []);

  // Show placeholder during SSR and initial load
  if (!isLoaded) {
    return (
      <>
        <header className="fixed top-0 left-0 right-0 h-20 bg-white border-b border-gray-100 z-[9999] flex items-center justify-between px-8">
          <div className="animate-pulse bg-gray-200 h-8 w-32 rounded" />
          <div className="hidden md:flex items-center gap-4">
            <div className="animate-pulse bg-gray-200 h-4 w-16 rounded" />
            <div className="animate-pulse bg-gray-200 h-4 w-16 rounded" />
            <div className="animate-pulse bg-gray-200 h-4 w-16 rounded" />
            <div className="animate-pulse bg-gray-200 h-4 w-16 rounded" />
            <div className="animate-pulse bg-[#0891B2]/20 h-10 w-20 rounded-lg" />
          </div>
        </header>
        <div className="h-20" />
      </>
    );
  }

  return (
    <cethos-header
      current-site={currentSite}
      hide-cta={hideCta ? '' : undefined}
      theme={theme}
      cta-type={ctaType}
    />
  );
}

export function CethosFooter({ minimal, hideIndustries }: CethosFooterProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if already loaded
    if (customElements.get('cethos-footer')) {
      setIsLoaded(true);
      return;
    }

    // Check if script already exists
    const existingScript = document.querySelector('script[src*="cethos-components.js"]');
    if (existingScript) {
      if (customElements.get('cethos-footer')) {
        setIsLoaded(true);
      } else {
        existingScript.addEventListener('load', () => setIsLoaded(true));
      }
      return;
    }

    // Load the script
    const script = document.createElement('script');
    script.src = '/embed/cethos-components.js';
    script.async = true;
    script.onload = () => setIsLoaded(true);
    document.head.appendChild(script);
  }, []);

  // Show placeholder during SSR and initial load
  if (!isLoaded) {
    if (minimal) {
      return (
        <footer className="bg-[#0C2340] py-6">
          <div className="max-w-[1200px] mx-auto px-8 flex items-center justify-between">
            <div className="animate-pulse bg-gray-700 h-4 w-48 rounded" />
            <div className="flex gap-4">
              <div className="animate-pulse bg-gray-700 h-4 w-20 rounded" />
              <div className="animate-pulse bg-gray-700 h-4 w-20 rounded" />
            </div>
          </div>
        </footer>
      );
    }

    return (
      <footer className="bg-[#0C2340] py-16">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-1">
              <div className="animate-pulse bg-gray-700 h-10 w-40 rounded mb-6" />
              <div className="animate-pulse bg-gray-700 h-4 w-48 rounded mb-4" />
              <div className="animate-pulse bg-gray-700 h-4 w-36 rounded" />
            </div>
            <div>
              <div className="animate-pulse bg-gray-700 h-5 w-20 rounded mb-4" />
              <div className="space-y-3">
                <div className="animate-pulse bg-gray-700 h-4 w-24 rounded" />
                <div className="animate-pulse bg-gray-700 h-4 w-28 rounded" />
                <div className="animate-pulse bg-gray-700 h-4 w-20 rounded" />
              </div>
            </div>
            <div>
              <div className="animate-pulse bg-gray-700 h-5 w-20 rounded mb-4" />
              <div className="space-y-3">
                <div className="animate-pulse bg-gray-700 h-4 w-32 rounded" />
                <div className="animate-pulse bg-gray-700 h-4 w-28 rounded" />
                <div className="animate-pulse bg-gray-700 h-4 w-24 rounded" />
              </div>
            </div>
            <div>
              <div className="animate-pulse bg-gray-700 h-5 w-20 rounded mb-4" />
              <div className="space-y-3">
                <div className="animate-pulse bg-gray-700 h-4 w-28 rounded" />
                <div className="animate-pulse bg-gray-700 h-4 w-24 rounded" />
                <div className="animate-pulse bg-gray-700 h-4 w-20 rounded" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <cethos-footer
      minimal={minimal ? '' : undefined}
      hide-industries={hideIndustries ? '' : undefined}
    />
  );
}
