/**
 * TypeScript declarations for Cethos Embed Components
 *
 * These declarations enable TypeScript support when using
 * the Cethos Web Components in a TypeScript/React project.
 */

declare namespace JSX {
  interface IntrinsicElements {
    /**
     * Cethos Header Web Component
     *
     * @example
     * <cethos-header current-site="portal" />
     * <cethos-header hide-cta theme="dark" />
     */
    'cethos-header': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        /**
         * Identifier for the current site to highlight in navigation
         */
        'current-site'?: string;
        /**
         * Hide the "Get a Quote" call-to-action button
         * Use empty string or "true" to enable
         */
        'hide-cta'?: string | boolean;
        /**
         * Color theme for the header
         * @default "light"
         */
        theme?: 'light' | 'dark';
        /**
         * React ref for the element
         */
        ref?: React.Ref<HTMLElement>;
      },
      HTMLElement
    >;
    /**
     * Cethos Footer Web Component
     *
     * @example
     * <cethos-footer />
     * <cethos-footer minimal />
     * <cethos-footer hide-locations />
     */
    'cethos-footer': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        /**
         * Show minimal footer with just copyright and legal links
         * Use empty string or "true" to enable
         */
        minimal?: string | boolean;
        /**
         * Hide the locations column in the footer
         * Use empty string or "true" to enable
         */
        'hide-locations'?: string | boolean;
        /**
         * React ref for the element
         */
        ref?: React.Ref<HTMLElement>;
      },
      HTMLElement
    >;
  }
}

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
 * Global window interface extension for Cethos Components
 */
interface Window {
  /**
   * Cethos Components global object
   * Available after the embed script loads
   */
  CethosComponents?: {
    /**
     * Current version of the embed components
     */
    version: string;
    /**
     * Configuration object
     */
    config: CethosConfig;
    /**
     * Navigation structure
     */
    navigation: CethosNavigation;
  };
}

/**
 * Custom element class for cethos-header
 */
interface CethosHeaderElement extends HTMLElement {
  /**
   * Re-render the component
   */
  render(): void;
}

/**
 * Custom element class for cethos-footer
 */
interface CethosFooterElement extends HTMLElement {
  /**
   * Re-render the component
   */
  render(): void;
}

declare global {
  interface HTMLElementTagNameMap {
    'cethos-header': CethosHeaderElement;
    'cethos-footer': CethosFooterElement;
  }
}

export {};
