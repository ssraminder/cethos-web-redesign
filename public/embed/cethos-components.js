/**
 * Cethos Components - Embeddable Header/Footer Web Components
 * Version: 1.1.0
 *
 * Usage:
 * <script src="https://cethos.com/embed/cethos-components.js"></script>
 * <cethos-header></cethos-header>
 * <cethos-footer></cethos-footer>
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    version: '1.3.0',
    baseUrl: 'https://cethos.com',
    assets: {
      logoLight: 'https://lmzoyezvsjgsxveoakdr.supabase.co/storage/v1/object/public/web-assets/final_logo_light_bg_cethosAsset%201.svg',
      logoDark: 'https://lmzoyezvsjgsxveoakdr.supabase.co/storage/v1/object/public/web-assets/final_logo_dark_bg_cethosAsset%202.svg'
    },
    contact: {
      phone: '(587) 600-0786',
      email: 'info@cethos.com'
    },
    colors: {
      navy: '#0C2340',
      teal: '#0891B2',
      tealHover: '#06B6D4',
      white: '#FFFFFF',
      gray: '#F8FAFC',
      textDark: '#111827',
      textGray: '#4B5563',
      textLight: '#6B7280',
      border: '#E5E7EB'
    }
  };

  // Navigation Structure (matches main site)
  const NAVIGATION = {
    services: [
      { label: 'Life Sciences Translation', href: '/services/lifesciences', description: 'Clinical trials, regulatory, pharmaceutical' },
      { label: 'Certified Translation', href: '/services/certified', description: 'Immigration, legal documents' },
      { label: 'Business Translation', href: '/services/business', description: 'Corporate and commercial documents' },
      { label: 'Software Localization', href: '/services/software', description: 'Apps, websites, and software' },
      { label: 'Multimedia Translation', href: '/services/multimedia', description: 'Video, audio, and subtitles' },
      { label: 'Interpretation Services', href: '/services/interpretation', description: 'On-site and remote interpretation' },
      { label: 'Transcription Services', href: '/services/transcription', description: 'Audio and video transcription' }
    ],
    industries: [
      { label: 'Pharmaceutical', href: '/industries/pharmaceutical' },
      { label: 'Energy & Mining', href: '/industries/energy-mining' },
      { label: 'Legal', href: '/industries/legal' },
      { label: 'Technology', href: '/industries/technology' },
      { label: 'Finance', href: '/industries/finance' },
      { label: 'Gaming', href: '/industries/gaming' },
      { label: 'E-commerce', href: '/industries/ecommerce' },
      { label: 'Manufacturing', href: '/industries/manufacturing' },
      { label: 'Healthcare', href: '/industries/healthcare' }
    ],
    main: [
      { label: 'Blog', href: '/blog' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' }
    ],
    footer: {
      services: [
        { label: 'Life Sciences', href: '/services/lifesciences' },
        { label: 'Certified Translation', href: '/services/certified' },
        { label: 'Business', href: '/services/business' },
        { label: 'Software', href: '/services/software' },
        { label: 'Multimedia', href: '/services/multimedia' },
        { label: 'Interpretation', href: '/services/interpretation' },
        { label: 'Transcription', href: '/services/transcription' }
      ],
      company: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'News', href: '/blog' },
        { label: 'Contact', href: '/contact' }
      ],
      industries: [
        { label: 'Pharmaceutical', href: '/industries/pharmaceutical' },
        { label: 'Energy & Mining', href: '/industries/energy-mining' },
        { label: 'Legal', href: '/industries/legal' },
        { label: 'Technology', href: '/industries/technology' },
        { label: 'Finance', href: '/industries/finance' },
        { label: 'Healthcare', href: '/industries/healthcare' }
      ],
      locations: [
        { label: 'Calgary', href: '/locations/calgary' },
        { label: 'Edmonton', href: '/locations/edmonton' },
        { label: 'Toronto', href: '/locations/toronto' },
        { label: 'Vancouver', href: '/locations/vancouver' },
        { label: 'Ottawa', href: '/locations/ottawa' },
        { label: 'Montreal', href: '/locations/montreal' },
        { label: 'Winnipeg', href: '/locations/winnipeg' },
        { label: 'Halifax', href: '/locations/halifax' },
        { label: 'Saskatoon', href: '/locations/saskatoon' }
      ],
      legal: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' }
      ]
    }
  };

  // Auto-load Google Fonts if not present
  if (!document.querySelector('link[href*="Plus+Jakarta+Sans"]')) {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }

  // Helper function to resolve URLs
  function resolveUrl(path) {
    if (path.startsWith('http')) return path;
    return CONFIG.baseUrl + path;
  }

  // SVG Icons
  const ICONS = {
    chevronDown: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`,
    menu: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`,
    close: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
    mail: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
    phone: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`,
    linkedin: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>`,
    twitter: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>`,
    mapPin: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`
  };

  /**
   * CethosHeader Web Component
   */
  class CethosHeader extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this._isScrolled = false;
      this._isMobileMenuOpen = false;
      this._openDropdown = null;
      this._boundHandleScroll = this._handleScroll.bind(this);
      this._boundHandleClickOutside = this._handleClickOutside.bind(this);
    }

    static get observedAttributes() {
      return ['current-site', 'hide-cta', 'theme', 'cta-type'];
    }

    connectedCallback() {
      this.render();
      window.addEventListener('scroll', this._boundHandleScroll);
      document.addEventListener('click', this._boundHandleClickOutside);
    }

    disconnectedCallback() {
      window.removeEventListener('scroll', this._boundHandleScroll);
      document.removeEventListener('click', this._boundHandleClickOutside);
    }

    attributeChangedCallback() {
      this.render();
    }

    _handleScroll() {
      const shouldBeScrolled = window.scrollY > 20;
      if (shouldBeScrolled !== this._isScrolled) {
        this._isScrolled = shouldBeScrolled;
        const header = this.shadowRoot.querySelector('.header');
        if (header) {
          header.classList.toggle('scrolled', this._isScrolled);
        }
      }
    }

    _handleClickOutside(event) {
      if (!this.contains(event.target) && this._openDropdown) {
        this._openDropdown = null;
        this._updateDropdowns();
      }
    }

    _toggleDropdown(name) {
      this._openDropdown = this._openDropdown === name ? null : name;
      this._updateDropdowns();
    }

    _updateDropdowns() {
      const dropdowns = this.shadowRoot.querySelectorAll('.dropdown-menu');
      const triggers = this.shadowRoot.querySelectorAll('.dropdown-trigger');

      dropdowns.forEach(dropdown => {
        const isOpen = dropdown.dataset.name === this._openDropdown;
        dropdown.classList.toggle('open', isOpen);
      });

      triggers.forEach(trigger => {
        const isOpen = trigger.dataset.name === this._openDropdown;
        const chevron = trigger.querySelector('.chevron');
        if (chevron) {
          chevron.classList.toggle('rotated', isOpen);
        }
      });
    }

    _toggleMobileMenu() {
      this._isMobileMenuOpen = !this._isMobileMenuOpen;
      const mobileMenu = this.shadowRoot.querySelector('.mobile-menu');
      const overlay = this.shadowRoot.querySelector('.mobile-overlay');

      if (mobileMenu) {
        mobileMenu.classList.toggle('open', this._isMobileMenuOpen);
      }
      if (overlay) {
        overlay.classList.toggle('open', this._isMobileMenuOpen);
      }

      // Prevent body scroll when menu is open
      document.body.style.overflow = this._isMobileMenuOpen ? 'hidden' : '';
    }

    _toggleMobileSection(name) {
      const section = this.shadowRoot.querySelector(`.mobile-section[data-name="${name}"]`);
      const content = section?.querySelector('.mobile-section-content');
      const chevron = section?.querySelector('.chevron');

      if (content && chevron) {
        const isOpen = content.classList.contains('open');
        content.classList.toggle('open', !isOpen);
        chevron.classList.toggle('rotated', !isOpen);
      }
    }

    render() {
      const currentSite = this.getAttribute('current-site') || '';
      const hideCta = this.hasAttribute('hide-cta');
      const theme = this.getAttribute('theme') || 'light';
      const ctaType = this.getAttribute('cta-type') || 'login';
      const isDark = theme === 'dark';

      // CTA configuration
      const ctaConfig = {
        login: { label: 'Login', href: 'https://portal.cethos.com' },
        quote: { label: 'Get a Quote', href: resolveUrl('/get-quote') }
      };
      const cta = ctaConfig[ctaType] || ctaConfig.login;

      const styles = `
        :host {
          display: block;
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 9999;
          background: ${isDark ? CONFIG.colors.navy : CONFIG.colors.white};
          transition: box-shadow 0.3s ease;
          height: 80px;
        }

        .header.scrolled {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .header-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 32px;
          height: 100%;
        }

        .header-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
        }

        .logo {
          display: flex;
          align-items: center;
          text-decoration: none;
        }

        .logo img {
          height: 36px;
          width: auto;
        }

        @media (min-width: 768px) {
          .logo img {
            height: 38px;
          }
        }

        @media (min-width: 1024px) {
          .logo img {
            height: 40px;
          }
        }

        .desktop-nav {
          display: none;
          align-items: center;
          gap: 4px;
        }

        @media (min-width: 768px) {
          .desktop-nav {
            display: flex;
          }
        }

        .nav-item {
          position: relative;
        }

        .nav-link,
        .dropdown-trigger {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 8px 16px;
          font-size: 16px;
          font-weight: 500;
          color: ${isDark ? 'rgba(255,255,255,0.9)' : CONFIG.colors.navy};
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s ease;
          font-family: inherit;
        }

        .nav-link:hover,
        .dropdown-trigger:hover {
          color: ${CONFIG.colors.teal};
        }

        .nav-link.active {
          color: ${CONFIG.colors.teal};
        }

        .chevron {
          transition: transform 0.2s ease;
          display: flex;
        }

        .chevron.rotated {
          transform: rotate(180deg);
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          margin-top: 8px;
          min-width: 280px;
          background: ${CONFIG.colors.white};
          border-radius: 10px;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
          border: 1px solid ${CONFIG.colors.border};
          opacity: 0;
          visibility: hidden;
          transform: translateY(10px);
          transition: all 0.2s ease;
          overflow: hidden;
        }

        .dropdown-menu.open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .dropdown-item {
          display: block;
          padding: 12px 16px;
          color: ${CONFIG.colors.navy};
          text-decoration: none;
          transition: all 0.15s ease;
          border-bottom: 1px solid ${CONFIG.colors.border};
        }

        .dropdown-item:last-child {
          border-bottom: none;
        }

        .dropdown-item:hover {
          background: ${CONFIG.colors.gray};
          color: ${CONFIG.colors.teal};
        }

        .dropdown-item-label {
          font-size: 15px;
          font-weight: 500;
        }

        .dropdown-item-description {
          font-size: 13px;
          color: ${CONFIG.colors.textLight};
          margin-top: 2px;
        }

        .cta-button {
          display: none;
          padding: 12px 24px;
          background: ${CONFIG.colors.teal};
          color: ${CONFIG.colors.white};
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          border-radius: 8px;
          transition: background 0.2s ease;
          margin-left: 16px;
        }

        @media (min-width: 768px) {
          .cta-button {
            display: inline-flex;
          }
        }

        .cta-button:hover {
          background: ${CONFIG.colors.tealHover};
        }

        /* Mobile Menu Button */
        .mobile-menu-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background: none;
          border: none;
          cursor: pointer;
          color: ${isDark ? CONFIG.colors.white : CONFIG.colors.navy};
          border-radius: 8px;
          transition: background 0.2s ease;
        }

        .mobile-menu-button:hover {
          background: ${isDark ? 'rgba(255,255,255,0.1)' : CONFIG.colors.gray};
        }

        @media (min-width: 768px) {
          .mobile-menu-button {
            display: none;
          }
        }

        /* Mobile Menu Overlay */
        .mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 9998;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .mobile-overlay.open {
          opacity: 1;
          visibility: visible;
        }

        /* Mobile Menu */
        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          background: ${CONFIG.colors.white};
          z-index: 10000;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .mobile-menu.open {
          opacity: 1;
          visibility: visible;
        }

        .mobile-menu-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          border-bottom: 1px solid ${CONFIG.colors.border};
        }

        .mobile-menu-header .logo img {
          height: 32px;
        }

        .mobile-close-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: none;
          border: none;
          cursor: pointer;
          color: ${CONFIG.colors.navy};
          border-radius: 8px;
          transition: background 0.2s ease;
        }

        .mobile-close-button:hover {
          background: ${CONFIG.colors.gray};
        }

        .mobile-menu-content {
          flex: 1;
          padding: 24px;
          overflow-y: auto;
        }

        .mobile-section {
          margin-bottom: 0;
        }

        .mobile-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 0;
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 18px;
          font-weight: 500 !important;
          color: ${CONFIG.colors.navy};
          border: none;
          background: none;
          width: 100%;
          cursor: pointer;
          transition: color 0.2s ease;
          border-bottom: 1px solid ${CONFIG.colors.border};
        }

        .mobile-section-header:hover {
          color: ${CONFIG.colors.teal};
        }

        .mobile-section-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .mobile-section-content.open {
          max-height: 500px;
        }

        .mobile-nav-link {
          display: block;
          padding: 12px 0;
          font-size: 16px;
          color: ${CONFIG.colors.navy};
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .mobile-nav-link:hover {
          color: ${CONFIG.colors.teal};
        }

        .mobile-main-link {
          display: block;
          padding: 16px 0;
          font-size: 18px;
          font-weight: 500;
          color: ${CONFIG.colors.navy};
          text-decoration: none;
          border-bottom: 1px solid ${CONFIG.colors.border};
          transition: color 0.2s ease;
        }

        .mobile-main-link:hover {
          color: ${CONFIG.colors.teal};
        }

        .mobile-cta {
          display: block;
          width: 100%;
          padding: 16px;
          margin-top: 24px;
          background: ${CONFIG.colors.teal};
          color: ${CONFIG.colors.white};
          font-size: 16px;
          font-weight: 600;
          text-decoration: none;
          text-align: center;
          border-radius: 10px;
          transition: background 0.2s ease;
        }

        .mobile-cta:hover {
          background: ${CONFIG.colors.tealHover};
        }

        /* Spacer */
        .header-spacer {
          height: 80px;
        }
      `;

      const servicesDropdown = NAVIGATION.services.map(item => `
        <a href="${resolveUrl(item.href)}" class="dropdown-item">
          <div class="dropdown-item-label">${item.label}</div>
          ${item.description ? `<div class="dropdown-item-description">${item.description}</div>` : ''}
        </a>
      `).join('');

      const industriesDropdown = NAVIGATION.industries.map(item => `
        <a href="${resolveUrl(item.href)}" class="dropdown-item">
          <div class="dropdown-item-label">${item.label}</div>
        </a>
      `).join('');

      const mainNavLinks = NAVIGATION.main.map(item => `
        <a href="${resolveUrl(item.href)}" class="nav-link">${item.label}</a>
      `).join('');

      const mobileServicesLinks = NAVIGATION.services.map(item => `
        <a href="${resolveUrl(item.href)}" class="mobile-nav-link">${item.label}</a>
      `).join('');

      const mobileIndustriesLinks = NAVIGATION.industries.map(item => `
        <a href="${resolveUrl(item.href)}" class="mobile-nav-link">${item.label}</a>
      `).join('');

      const mobileMainLinks = NAVIGATION.main.map(item => `
        <a href="${resolveUrl(item.href)}" class="mobile-main-link">${item.label}</a>
      `).join('');

      this.shadowRoot.innerHTML = `
        <style>${styles}</style>

        <header class="header ${this._isScrolled ? 'scrolled' : ''}">
          <div class="header-container">
            <nav class="header-nav">
              <a href="${CONFIG.baseUrl}" class="logo">
                <img src="${isDark ? CONFIG.assets.logoDark : CONFIG.assets.logoLight}" alt="Cethos Solutions Inc.">
              </a>

              <div class="desktop-nav">
                <div class="nav-item">
                  <button class="dropdown-trigger" data-name="services">
                    Services
                    <span class="chevron">${ICONS.chevronDown}</span>
                  </button>
                  <div class="dropdown-menu" data-name="services">
                    ${servicesDropdown}
                  </div>
                </div>

                <div class="nav-item">
                  <button class="dropdown-trigger" data-name="industries">
                    Industries
                    <span class="chevron">${ICONS.chevronDown}</span>
                  </button>
                  <div class="dropdown-menu" data-name="industries">
                    ${industriesDropdown}
                  </div>
                </div>

                ${mainNavLinks}

                ${!hideCta ? `<a href="${cta.href}" class="cta-button">${cta.label}</a>` : ''}
              </div>

              <button class="mobile-menu-button" aria-label="Open menu">
                ${ICONS.menu}
              </button>
            </nav>
          </div>
        </header>

        <div class="mobile-overlay"></div>

        <div class="mobile-menu">
          <div class="mobile-menu-header">
            <a href="${CONFIG.baseUrl}" class="logo">
              <img src="${CONFIG.assets.logoLight}" alt="Cethos Solutions Inc.">
            </a>
            <button class="mobile-close-button" aria-label="Close menu">
              ${ICONS.close}
            </button>
          </div>

          <div class="mobile-menu-content">
            <div class="mobile-section" data-name="services">
              <button class="mobile-section-header">
                Services
                <span class="chevron">${ICONS.chevronDown}</span>
              </button>
              <div class="mobile-section-content">
                ${mobileServicesLinks}
              </div>
            </div>

            <div class="mobile-section" data-name="industries">
              <button class="mobile-section-header">
                Industries
                <span class="chevron">${ICONS.chevronDown}</span>
              </button>
              <div class="mobile-section-content">
                ${mobileIndustriesLinks}
              </div>
            </div>

            <div style="margin-top: 16px;">
              ${mobileMainLinks}
            </div>

            ${!hideCta ? `<a href="${cta.href}" class="mobile-cta">${cta.label}</a>` : ''}
          </div>
        </div>

        <div class="header-spacer"></div>
      `;

      // Attach event listeners
      this._attachEventListeners();
    }

    _attachEventListeners() {
      // Desktop dropdown triggers
      const dropdownTriggers = this.shadowRoot.querySelectorAll('.dropdown-trigger');
      dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
          e.stopPropagation();
          this._toggleDropdown(trigger.dataset.name);
        });
        trigger.addEventListener('mouseenter', () => {
          this._openDropdown = trigger.dataset.name;
          this._updateDropdowns();
        });
      });

      // Desktop dropdown menus - keep open on hover
      const dropdownMenus = this.shadowRoot.querySelectorAll('.dropdown-menu');
      dropdownMenus.forEach(menu => {
        menu.addEventListener('mouseleave', () => {
          this._openDropdown = null;
          this._updateDropdowns();
        });
      });

      // Nav items container - close when leaving
      const navItems = this.shadowRoot.querySelectorAll('.nav-item');
      navItems.forEach(item => {
        item.addEventListener('mouseleave', () => {
          this._openDropdown = null;
          this._updateDropdowns();
        });
      });

      // Mobile menu button
      const mobileMenuButton = this.shadowRoot.querySelector('.mobile-menu-button');
      if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => this._toggleMobileMenu());
      }

      // Mobile close button
      const mobileCloseButton = this.shadowRoot.querySelector('.mobile-close-button');
      if (mobileCloseButton) {
        mobileCloseButton.addEventListener('click', () => this._toggleMobileMenu());
      }

      // Mobile overlay
      const mobileOverlay = this.shadowRoot.querySelector('.mobile-overlay');
      if (mobileOverlay) {
        mobileOverlay.addEventListener('click', () => this._toggleMobileMenu());
      }

      // Mobile section headers
      const mobileSectionHeaders = this.shadowRoot.querySelectorAll('.mobile-section-header');
      mobileSectionHeaders.forEach(header => {
        header.addEventListener('click', () => {
          const section = header.closest('.mobile-section');
          if (section) {
            this._toggleMobileSection(section.dataset.name);
          }
        });
      });
    }
  }

  /**
   * CethosFooter Web Component
   */
  class CethosFooter extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
      return ['minimal', 'hide-industries'];
    }

    connectedCallback() {
      this.render();
    }

    attributeChangedCallback() {
      this.render();
    }

    render() {
      const minimal = this.hasAttribute('minimal');
      const hideIndustries = this.hasAttribute('hide-industries');

      const styles = `
        :host {
          display: block;
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .footer {
          background: ${CONFIG.colors.navy};
          color: ${CONFIG.colors.white};
        }

        .footer-main {
          padding: 64px 0 48px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
        }

        @media (min-width: 640px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .footer-grid {
            grid-template-columns: ${hideIndustries ? '2fr 1fr 1fr 1fr' : '2fr 1fr 1fr 1fr 1fr'};
          }
        }

        /* Brand Column */
        .footer-brand {
          grid-column: 1;
        }

        @media (min-width: 640px) {
          .footer-brand {
            grid-column: span 2;
          }
        }

        @media (min-width: 1024px) {
          .footer-brand {
            grid-column: 1;
          }
        }

        .footer-logo {
          display: inline-block;
          margin-bottom: 24px;
        }

        .footer-logo img {
          height: 40px;
          width: auto;
        }

        @media (min-width: 768px) {
          .footer-logo img {
            width: 180px;
            height: auto;
          }
        }

        .footer-tagline {
          font-size: 16px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 8px;
        }

        .footer-description {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 24px;
          max-width: 320px;
          line-height: 1.6;
        }

        .footer-contact {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 15px;
          transition: color 0.2s ease;
        }

        .footer-contact-item:hover {
          color: ${CONFIG.colors.white};
        }

        .footer-contact-icon {
          display: flex;
          color: rgba(255, 255, 255, 0.5);
        }

        .footer-social {
          display: flex;
          gap: 12px;
          margin-top: 20px;
        }

        .footer-social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.6);
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .footer-social-link:hover {
          background: rgba(255, 255, 255, 0.1);
          color: ${CONFIG.colors.white};
        }

        /* Link Columns */
        .footer-column {
          min-width: 0;
        }

        .footer-column-title {
          font-size: 18px;
          font-weight: 600;
          color: ${CONFIG.colors.white};
          margin-bottom: 16px;
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-link {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-size: 15px;
          transition: color 0.2s ease;
        }

        .footer-link:hover {
          color: ${CONFIG.colors.white};
        }

        /* Bottom Footer */
        .footer-bottom {
          padding: 24px 0;
        }

        .footer-bottom-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        @media (min-width: 768px) {
          .footer-bottom-content {
            flex-direction: row;
            justify-content: space-between;
          }
        }

        .footer-copyright {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
        }

        .footer-legal {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .footer-legal-link {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-legal-link:hover {
          color: ${CONFIG.colors.white};
        }

        /* Minimal Footer */
        .footer-minimal {
          padding: 24px 0;
        }

        .footer-minimal .footer-bottom-content {
          justify-content: center;
          gap: 24px;
        }

        @media (min-width: 768px) {
          .footer-minimal .footer-bottom-content {
            justify-content: space-between;
          }
        }
      `;

      const servicesLinks = NAVIGATION.footer.services.map(item => `
        <li><a href="${resolveUrl(item.href)}" class="footer-link">${item.label}</a></li>
      `).join('');

      const companyLinks = NAVIGATION.footer.company.map(item => `
        <li><a href="${resolveUrl(item.href)}" class="footer-link">${item.label}</a></li>
      `).join('');

      const industriesLinks = NAVIGATION.footer.industries.map(item => `
        <li><a href="${resolveUrl(item.href)}" class="footer-link">${item.label}</a></li>
      `).join('');

      const locationsLinks = NAVIGATION.footer.locations.map(item => `
        <li><a href="${resolveUrl(item.href)}" class="footer-link">${item.label}</a></li>
      `).join('');

      const legalLinks = NAVIGATION.footer.legal.map(item => `
        <a href="${resolveUrl(item.href)}" class="footer-legal-link">${item.label}</a>
      `).join('');

      const currentYear = new Date().getFullYear();

      if (minimal) {
        this.shadowRoot.innerHTML = `
          <style>${styles}</style>

          <footer class="footer footer-minimal">
            <div class="footer-container">
              <div class="footer-bottom-content">
                <p class="footer-copyright">&copy; ${currentYear} Cethos Solutions Inc. All rights reserved.</p>
                <div class="footer-legal">
                  ${legalLinks}
                </div>
              </div>
            </div>
          </footer>
        `;
        return;
      }

      this.shadowRoot.innerHTML = `
        <style>${styles}</style>

        <footer class="footer">
          <div class="footer-main">
            <div class="footer-container">
              <div class="footer-grid">
                <!-- Brand Column -->
                <div class="footer-brand">
                  <a href="${CONFIG.baseUrl}" class="footer-logo">
                    <img src="${CONFIG.assets.logoDark}" alt="Cethos Solutions Inc.">
                  </a>
                  <p class="footer-tagline">Global Communication. Local Precision.</p>
                  <p class="footer-description">
                    Professional translation services in 200+ languages for life sciences, business, and certified documents.
                  </p>
                  <div class="footer-contact">
                    <a href="mailto:${CONFIG.contact.email}" class="footer-contact-item">
                      <span class="footer-contact-icon">${ICONS.mail}</span>
                      <span>${CONFIG.contact.email}</span>
                    </a>
                    <a href="tel:+15876000786" class="footer-contact-item">
                      <span class="footer-contact-icon">${ICONS.phone}</span>
                      <span>${CONFIG.contact.phone}</span>
                    </a>
                  </div>
                  <div class="footer-social">
                    <a href="https://linkedin.com/company/cethos" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="LinkedIn">
                      ${ICONS.linkedin}
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="footer-social-link" aria-label="Twitter">
                      ${ICONS.twitter}
                    </a>
                  </div>
                </div>

                <!-- Company Column -->
                <div class="footer-column">
                  <h4 class="footer-column-title">Company</h4>
                  <ul class="footer-links">
                    ${companyLinks}
                  </ul>
                </div>

                <!-- Services Column -->
                <div class="footer-column">
                  <h4 class="footer-column-title">Services</h4>
                  <ul class="footer-links">
                    ${servicesLinks}
                  </ul>
                </div>

                ${!hideIndustries ? `
                  <!-- Industries Column -->
                  <div class="footer-column">
                    <h4 class="footer-column-title">Industries</h4>
                    <ul class="footer-links">
                      ${industriesLinks}
                    </ul>
                  </div>
                ` : ''}

                <!-- Locations Column -->
                <div class="footer-column">
                  <h4 class="footer-column-title">Locations</h4>
                  <ul class="footer-links">
                    ${locationsLinks}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="footer-bottom">
            <div class="footer-container">
              <div class="footer-bottom-content">
                <p class="footer-copyright">&copy; ${currentYear} Cethos Solutions Inc. All rights reserved.</p>
                <div class="footer-legal">
                  ${legalLinks}
                </div>
              </div>
            </div>
          </div>
        </footer>
      `;
    }
  }

  // Register components
  if (!customElements.get('cethos-header')) {
    customElements.define('cethos-header', CethosHeader);
  }
  if (!customElements.get('cethos-footer')) {
    customElements.define('cethos-footer', CethosFooter);
  }

  // Expose for programmatic access
  window.CethosComponents = {
    version: CONFIG.version,
    config: CONFIG,
    navigation: NAVIGATION
  };

  // Log version on load
  console.log(`%c Cethos Components v${CONFIG.version} %c Loaded `,
    'background: #0C2340; color: white; padding: 2px 8px; border-radius: 3px 0 0 3px;',
    'background: #0891B2; color: white; padding: 2px 8px; border-radius: 0 3px 3px 0;'
  );

})();
