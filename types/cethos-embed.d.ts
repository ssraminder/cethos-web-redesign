/**
 * TypeScript declarations for Cethos Embed Components
 *
 * These declarations enable TypeScript support when using
 * the Cethos Web Components in a TypeScript/React project.
 */

import React from 'react';

/**
 * Configuration object for Cethos Components
 */
interface CethosConfig {
  version: string;
  baseUrl: string;
  assets: {
    logoLight: string;
    logoDark: string;
  };
  contact: {
    phone: string;
    email: string;
  };
  colors: {
    navy: string;
    teal: string;
    tealHover: string;
    white: string;
    gray: string;
    textDark: string;
    textGray: string;
    textLight: string;
    border: string;
  };
}

/**
 * Navigation item structure
 */
interface CethosNavItem {
  label: string;
  href: string;
  description?: string;
}

/**
 * Location structure
 */
interface CethosLocation {
  city: string;
  country: string;
  type?: string;
}

/**
 * Navigation structure for Cethos Components
 */
interface CethosNavigation {
  services: CethosNavItem[];
  industries: CethosNavItem[];
  main: CethosNavItem[];
  footer: {
    services: CethosNavItem[];
    company: CethosNavItem[];
    legal: CethosNavItem[];
    locations: CethosLocation[];
  };
}

/**
 * Cethos Components global object interface
 */
interface CethosComponentsGlobal {
  version: string;
  config: CethosConfig;
  navigation: CethosNavigation;
}

/**
 * Custom element class for cethos-header
 */
interface CethosHeaderElement extends HTMLElement {
  render(): void;
}

/**
 * Custom element class for cethos-footer
 */
interface CethosFooterElement extends HTMLElement {
  render(): void;
}

// Extend the global Window interface
declare global {
  interface Window {
    CethosComponents?: CethosComponentsGlobal;
  }

  interface HTMLElementTagNameMap {
    'cethos-header': CethosHeaderElement;
    'cethos-footer': CethosFooterElement;
  }
}

// Extend React's JSX namespace for custom elements
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'cethos-header': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'current-site'?: string;
          'hide-cta'?: string | boolean;
          theme?: 'light' | 'dark';
          ref?: React.Ref<HTMLElement>;
        },
        HTMLElement
      >;
      'cethos-footer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          minimal?: string | boolean;
          'hide-locations'?: string | boolean;
          ref?: React.Ref<HTMLElement>;
        },
        HTMLElement
      >;
    }
  }
}

export {};
