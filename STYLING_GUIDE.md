# Cethos Website Styling Guide

A comprehensive styling guide extracted from the Cethos website (cethosweb.netlify.app) for building pixel-perfect embedded forms and components.

---

## 1. Typography

### Font Family

**Primary Font:** Plus Jakarta Sans (Google Fonts)

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
```

**Font Stack:**
```css
font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
```

### Font Sizes

| Element | Desktop | Mobile | Weight | Line Height |
|---------|---------|--------|--------|-------------|
| H1 | 56px | 40px | 700 (bold) | 1.1 |
| H2 | 40px | 32px | 700 (bold) | 1.15-1.2 |
| H3 | 20px | 20px | 600 (semibold) | 1.4 |
| H4 | 18px | 18px | 600 (semibold) | 1.4 |
| Body Large | 20px | 20px | 400 | 1.6 |
| Body | 16px | 16px | 400 | 1.6 |
| Body Small | 14px | 14px | 400 | 1.5 |
| Eyebrow | 14px | 14px | 600 | normal |
| Form Label | 14px | 14px | 500 (medium) | normal |
| Form Input | 16px | 16px | 400 | normal |
| Button Text | 16px | 16px | 600 (semibold) | normal |

### Font Weights

| Purpose | Weight Value |
|---------|--------------|
| Regular (body) | 400 |
| Medium (labels) | 500 |
| Semibold (H3, H4, buttons) | 600 |
| Bold (H1, H2) | 700 |

### Letter Spacing

| Element | Letter Spacing |
|---------|---------------|
| Eyebrow text | `tracking-widest` (0.1em) |
| Uppercase labels | `tracking-widest` |
| Normal text | normal |

---

## 2. Colors

### Brand Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Cethos Navy** | `#0C2340` | rgb(12, 35, 64) | Primary brand, headings, dark text |
| **Cethos Teal** | `#0891B2` | rgb(8, 145, 178) | Primary accent, CTAs, links |
| **Cethos Teal Light** | `#06B6D4` | rgb(6, 182, 212) | Hover states, highlights |

### Text Colors

| Purpose | Hex | CSS Variable |
|---------|-----|--------------|
| Headings | `#0C2340` | `--cethos-navy` |
| Body text | `#4B5563` | `--cethos-gray` |
| Muted/secondary | `#717182` | `--cethos-gray-light` |
| Placeholder text | `#94A3B8` | `text-slate-400` |
| Links | `#0891B2` | `--cethos-teal` |
| Link hover | `#06B6D4` | `--cethos-teal-light` |
| Error text | `#EF4444` | `text-red-500` |
| Success text | `#10B981` | `text-green-600` |
| Helper text | `#64748B` | `text-slate-500` |

### Background Colors

| Purpose | Hex | Usage |
|---------|-----|-------|
| Page background | `#FFFFFF` | Main content |
| Light section | `#F8FAFC` | Alternating sections |
| Blue tint section | `#E0F2FE` | Hero gradients, highlights |
| Card background | `#FFFFFF` | Cards, forms |
| Input background | `#FFFFFF` | Form inputs |
| Input disabled | `#F8FAFC` | Disabled inputs |
| Success background | `#ECFDF5` | Success states |
| Selection highlight | `#E0F2FE` | Text selection |

### Border Colors

| Purpose | Hex |
|---------|-----|
| Default border | `#E5E7EB` |
| Input border | `#E2E8F0` (slate-200) or `#CBD5E1` (slate-300) |
| Input border (focus) | `#0891B2` |
| Input border (error) | `#EF4444` |
| Card border | `#E5E7EB` |
| Divider | `#F1F5F9` (slate-100) |

### Status Colors

| Status | Background | Text | Border |
|--------|------------|------|--------|
| Error | `#FEF2F2` | `#EF4444` | `#EF4444` |
| Success | `#ECFDF5` | `#10B981` | `#10B981` |
| Warning | `#FFFBEB` | `#F59E0B` | `#F59E0B` |
| Info | `#E0F2FE` | `#0891B2` | `#0891B2` |

---

## 3. Spacing

### Container

| Property | Value |
|----------|-------|
| Max-width (content) | 1200px |
| Max-width (full section) | 1440px |
| Padding (desktop) | 32px (px-8) |
| Padding (tablet) | 24px (sm:px-6) |
| Padding (mobile) | 16px (px-4) |

### Section Spacing

| Property | Value |
|----------|-------|
| Section vertical padding | 96px (py-24) |
| Heading margin-bottom | 24px-32px |
| Subheading margin-bottom | 32px-48px |

### Component Spacing

| Component | Value |
|-----------|-------|
| Form field margin-bottom | 24px (space-y-6) or 16px (space-y-4) |
| Label to input gap | 4-6px (mb-1 to mb-1.5) |
| Card padding (sm) | 16px |
| Card padding (md) | 24px |
| Card padding (lg) | 32px |
| Button padding (sm) | 8px 16px |
| Button padding (md) | 12px 24px |
| Button padding (lg) | 16px 32px |
| Input padding | 12px 16px |
| Grid gap (cards) | 16px-24px |
| Grid gap (form fields) | 16px (gap-4) |

---

## 4. Form Elements

### Input Fields

```css
/* Base Input Styles */
.form-input {
  width: 100%;
  padding: 12px 16px;                    /* py-3 px-4 */
  border-radius: 8px;                    /* rounded-lg */
  border: 1px solid #E2E8F0;             /* border-slate-200 */
  background-color: #FFFFFF;
  color: #0C2340;
  font-size: 16px;
  line-height: 1.5;
  transition: colors 200ms;
}

.form-input::placeholder {
  color: #94A3B8;                        /* text-slate-400 */
}

.form-input:focus {
  border-color: #0891B2;                 /* border-teal-500 */
  outline: none;
  box-shadow: 0 0 0 3px rgba(8, 145, 178, 0.2);  /* ring-2 ring-teal-500/20 */
}

.form-input:disabled {
  background-color: #F8FAFC;             /* bg-slate-50 */
  cursor: not-allowed;
}

.form-input.error {
  border-color: #EF4444;                 /* border-red-500 */
}

.form-input.error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);  /* ring-red-500/20 */
}
```

### Labels

```css
.form-label {
  display: block;
  font-size: 14px;                       /* text-sm */
  font-weight: 500;                      /* font-medium */
  color: #0C2340;                        /* text-navy */
  margin-bottom: 4px;                    /* mb-1 */
}

.form-label .required {
  color: #EF4444;                        /* text-red-500 */
  margin-left: 4px;
}
```

### Textarea

```css
.form-textarea {
  /* Same as input base styles */
  min-height: 120px;
  resize: vertical;
}
```

### Select/Dropdown

```css
.form-select {
  /* Same as input base styles */
  background-color: #FFFFFF;
  background-image: url("data:image/svg+xml,..."); /* Custom chevron */
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 40px;
  cursor: pointer;
}
```

### Radio Buttons (Custom Card Style)

```css
.radio-card {
  flex: 1;
  padding: 16px;
  border-radius: 8px;
  border: 2px solid #CBD5E1;             /* border-slate-300 */
  cursor: pointer;
  transition: all 200ms;
  text-align: center;
}

.radio-card:hover {
  border-color: #94A3B8;                 /* border-slate-400 */
}

.radio-card.selected {
  border-color: #0891B2;                 /* border-teal */
  background-color: #E0F2FE;             /* bg-blue tint */
}

.radio-card .title {
  font-weight: 600;
  color: #0C2340;
}

.radio-card .subtitle {
  font-size: 14px;
  color: #64748B;
}
```

### File Upload

```css
.file-upload {
  border: 2px dashed #CBD5E1;            /* border-slate-300 */
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  transition: border-color 200ms;
}

.file-upload:hover {
  border-color: #0891B2;
}

.file-upload .icon {
  width: 32px;
  height: 32px;
  color: #94A3B8;
  margin: 0 auto 8px;
}

.file-upload .text {
  color: #64748B;
}

.file-upload .subtext {
  font-size: 14px;
  color: #94A3B8;
}

.file-upload .filename {
  color: #0891B2;
  font-weight: 500;
}
```

### Helper/Error Text

```css
.helper-text {
  font-size: 14px;
  color: #64748B;                        /* text-slate-500 */
  margin-top: 4px;
}

.error-text {
  font-size: 14px;
  color: #EF4444;                        /* text-red-500 */
  margin-top: 4px;
}
```

---

## 5. Buttons

### Primary Button

```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 24px;                    /* py-4 px-6 */
  background-color: #0891B2;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;                    /* rounded-lg */
  border: none;
  cursor: pointer;
  transition: all 200ms;
}

.btn-primary:hover {
  background-color: #06B6D4;
}

.btn-primary:focus-visible {
  outline: 2px solid #0891B2;
  outline-offset: 2px;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### Secondary Button

```css
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 24px;
  background-color: #FFFFFF;
  color: #0C2340;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  border: 2px solid #0C2340;
  cursor: pointer;
  transition: all 200ms;
}

.btn-secondary:hover {
  background-color: #F8FAFC;
}
```

### Button Sizes

| Size | Padding | Font Size |
|------|---------|-----------|
| Small (sm) | 8px 16px | 14px |
| Medium (md) | 12px 24px | 16px |
| Large (lg) | 16px 32px | 18px |

### Loading Spinner

```css
.btn-loading .spinner {
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

---

## 6. Cards & Containers

### Card

```css
.card {
  background-color: #FFFFFF;
  border-radius: 16px;                   /* rounded-2xl */
  padding: 24px;                         /* p-6 default */
  border: 1px solid #E5E7EB;
  box-shadow: 0 2px 15px -3px rgba(0, 0, 0, 0.07),
              0 10px 20px -2px rgba(0, 0, 0, 0.04);
}

.card-hover {
  transition: all 300ms;
}

.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 25px -5px rgba(0, 0, 0, 0.1),
              0 10px 30px -5px rgba(0, 0, 0, 0.04);
}
```

### Form Card (No padding variant)

```css
.form-card {
  background-color: #FFFFFF;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 15px -3px rgba(0, 0, 0, 0.07),
              0 10px 20px -2px rgba(0, 0, 0, 0.04);
}

.form-card-header {
  padding: 24px 32px;
  background-color: #F8FAFC;
  border-bottom: 1px solid #F1F5F9;
}

.form-card-body {
  padding: 32px;
}
```

---

## 7. Effects & Transitions

### Box Shadows

```css
/* Soft shadow (default card) */
box-shadow: 0 2px 15px -3px rgba(0, 0, 0, 0.07),
            0 10px 20px -2px rgba(0, 0, 0, 0.04);

/* Medium shadow (hover) */
box-shadow: 0 4px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 30px -5px rgba(0, 0, 0, 0.04);

/* Card shadow */
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

/* Card hover shadow */
box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);

/* Focus ring (inputs/buttons) */
box-shadow: 0 0 0 3px rgba(8, 145, 178, 0.2);
```

### Border Radius

| Element | Value |
|---------|-------|
| Buttons | 8px (rounded-lg) |
| Inputs | 8px (rounded-lg) |
| Cards | 16px (rounded-2xl) |
| Modals | 16px |
| Tags/Badges | 9999px (rounded-full) |
| Progress circles | 50% |

### Transitions

```css
/* Default transition */
transition: all 200ms ease;

/* Color transition */
transition: colors 200ms ease;

/* Transform transition */
transition: transform 300ms ease;

/* Hover animation */
transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
```

### Animations

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

---

## 8. Responsive Breakpoints

| Breakpoint | Width | Tailwind Class |
|------------|-------|----------------|
| Mobile | < 640px | (default) |
| Small tablet (sm) | >= 640px | `sm:` |
| Tablet (md) | >= 768px | `md:` |
| Desktop (lg) | >= 1024px | `lg:` |
| Large desktop (xl) | >= 1280px | `xl:` |
| Extra large (2xl) | >= 1536px | `2xl:` |

---

## 9. Icons

### Icon System

The site uses a combination of:
1. **Custom SVG icons** - Line-style icons with `stroke="currentColor"` and `strokeWidth="2"`
2. **Lucide React** - For some components (Upload, CheckCircle, ArrowRight, etc.)

### Icon Sizes

| Size | Pixels | Usage |
|------|--------|-------|
| Small | 16px | Inline with text |
| Medium | 20px | Buttons |
| Default | 24px | Standard icons |
| Large | 32px | Feature icons |
| XL | 40px | Success states |

### Icon Styling

```css
.icon {
  width: 24px;
  height: 24px;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}

.icon-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  color: #0891B2;
}
```

---

## 10. CSS Variables

```css
:root {
  /* Brand Colors */
  --cethos-navy: #0C2340;
  --cethos-teal: #0891B2;
  --cethos-teal-light: #06B6D4;
  --cethos-gray: #4B5563;
  --cethos-gray-light: #717182;
  --cethos-border: #E5E7EB;
  --cethos-bg-light: #F8FAFC;
  --cethos-bg-blue: #E0F2FE;

  /* Text Colors */
  --color-heading: #0C2340;
  --color-body: #4B5563;
  --color-muted: #64748B;
  --color-placeholder: #94A3B8;
  --color-link: #0891B2;
  --color-error: #EF4444;
  --color-success: #10B981;

  /* Background Colors */
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #F8FAFC;
  --color-bg-blue-tint: #E0F2FE;

  /* Border Colors */
  --color-border-default: #E5E7EB;
  --color-border-input: #E2E8F0;
  --color-border-focus: #0891B2;
  --color-border-error: #EF4444;

  /* Typography */
  --font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;

  /* Font Sizes */
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  --font-size-2xl: 24px;
  --font-size-3xl: 32px;
  --font-size-4xl: 40px;
  --font-size-5xl: 48px;
  --font-size-6xl: 56px;

  /* Spacing */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-6: 24px;
  --spacing-8: 32px;
  --spacing-12: 48px;
  --spacing-16: 64px;
  --spacing-24: 96px;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-2xl: 16px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-soft: 0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04);
  --shadow-medium: 0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 30px -5px rgba(0, 0, 0, 0.04);
  --shadow-card: 0 4px 6px rgba(0, 0, 0, 0.05);
  --shadow-card-hover: 0 10px 25px rgba(0, 0, 0, 0.1);
  --shadow-focus: 0 0 0 3px rgba(8, 145, 178, 0.2);
  --shadow-focus-error: 0 0 0 3px rgba(239, 68, 68, 0.2);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;

  /* Container */
  --container-max-width: 1200px;
  --container-full-width: 1440px;
}
```

---

## 11. Tailwind Config Extension

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'cethos-navy': '#0C2340',
        'cethos-teal': '#0891B2',
        'cethos-teal-light': '#06B6D4',
        'cethos-gray': '#4B5563',
        'cethos-gray-light': '#717182',
        'cethos-border': '#E5E7EB',
        'cethos-bg-light': '#F8FAFC',
        'cethos-bg-blue': '#E0F2FE',
        navy: {
          DEFAULT: '#0C2340',
          50: '#E0F2FE',
          100: '#BAE6FD',
          500: '#0891B2',
          600: '#0C2340',
          700: '#0A1C33',
        },
        teal: {
          DEFAULT: '#0891B2',
          50: '#ECFEFF',
          100: '#CFFAFE',
          500: '#06B6D4',
          600: '#0891B2',
          700: '#0E7490',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['56px', { lineHeight: '1.1', fontWeight: '700' }],
        'display-lg': ['48px', { lineHeight: '1.1', fontWeight: '700' }],
        'display': ['40px', { lineHeight: '1.15', fontWeight: '700' }],
        'heading-xl': ['32px', { lineHeight: '1.2', fontWeight: '600' }],
        'heading-lg': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'heading': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['20px', { lineHeight: '1.6' }],
        'body': ['16px', { lineHeight: '1.6' }],
        'body-sm': ['14px', { lineHeight: '1.5' }],
      },
      maxWidth: {
        'content': '1200px',
        'full-section': '1440px',
      },
      boxShadow: {
        'card': '0 4px 6px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 10px 25px rgba(0, 0, 0, 0.1)',
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 30px -5px rgba(0, 0, 0, 0.04)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to bottom right, #FFFFFF, #F8FAFC, #E0F2FE)',
        'cta-gradient': 'linear-gradient(to right, #0C2340, #1A365D, #0891B2)',
      },
    },
  },
}
```

---

## 12. Complete Form Component Example

Here's a complete example of a styled form matching the Cethos design system:

```html
<form class="space-y-6">
  <!-- Two-column row -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label class="block text-sm font-medium text-[#0C2340] mb-1">
        Full Name <span class="text-red-500">*</span>
      </label>
      <input
        type="text"
        class="w-full px-4 py-3 rounded-lg border border-slate-300
               focus:outline-none focus:ring-2 focus:ring-[#0891B2]
               focus:border-transparent bg-white text-[#0C2340]
               placeholder:text-slate-400"
        placeholder="Your full name"
        required
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-[#0C2340] mb-1">
        Email <span class="text-red-500">*</span>
      </label>
      <input
        type="email"
        class="w-full px-4 py-3 rounded-lg border border-slate-300
               focus:outline-none focus:ring-2 focus:ring-[#0891B2]
               focus:border-transparent bg-white text-[#0C2340]
               placeholder:text-slate-400"
        placeholder="your@email.com"
        required
      />
    </div>
  </div>

  <!-- Select dropdown -->
  <div>
    <label class="block text-sm font-medium text-[#0C2340] mb-1">
      Document Type <span class="text-red-500">*</span>
    </label>
    <select
      class="w-full px-4 py-3 rounded-lg border border-slate-300
             focus:outline-none focus:ring-2 focus:ring-[#0891B2]
             focus:border-transparent bg-white text-[#0C2340]"
      required
    >
      <option value="">Select document type</option>
      <option value="birth-certificate">Birth Certificate</option>
      <option value="marriage-certificate">Marriage Certificate</option>
    </select>
  </div>

  <!-- File upload -->
  <div>
    <label class="block text-sm font-medium text-[#0C2340] mb-1">
      Upload Document <span class="text-red-500">*</span>
    </label>
    <div class="border-2 border-dashed border-slate-300 rounded-lg p-6
                text-center hover:border-[#0891B2] transition-colors cursor-pointer">
      <svg class="w-8 h-8 text-slate-400 mx-auto mb-2"><!-- Upload icon --></svg>
      <p class="text-slate-600">Click to upload or drag and drop</p>
      <p class="text-sm text-slate-400">JPG, PNG, PDF (max 10MB)</p>
    </div>
  </div>

  <!-- Radio card group -->
  <div>
    <label class="block text-sm font-medium text-[#0C2340] mb-2">
      Service Speed <span class="text-red-500">*</span>
    </label>
    <div class="flex gap-4">
      <label class="flex-1 p-4 rounded-lg border-2 border-[#0891B2]
                    bg-[#E0F2FE] cursor-pointer text-center">
        <input type="radio" name="speed" class="sr-only" checked />
        <div class="font-semibold text-[#0C2340]">Standard</div>
        <div class="text-sm text-slate-600">2-3 Business Days</div>
      </label>
      <label class="flex-1 p-4 rounded-lg border-2 border-slate-300
                    hover:border-slate-400 cursor-pointer text-center">
        <input type="radio" name="speed" class="sr-only" />
        <div class="font-semibold text-[#0C2340]">Same-Day Rush</div>
        <div class="text-sm text-slate-600">+$25</div>
      </label>
    </div>
  </div>

  <!-- Textarea -->
  <div>
    <label class="block text-sm font-medium text-[#0C2340] mb-1">
      Additional Notes (Optional)
    </label>
    <textarea
      rows="3"
      class="w-full px-4 py-3 rounded-lg border border-slate-300
             focus:outline-none focus:ring-2 focus:ring-[#0891B2]
             focus:border-transparent bg-white text-[#0C2340]
             placeholder:text-slate-400 resize-none"
      placeholder="Any special instructions..."
    ></textarea>
  </div>

  <!-- Submit button -->
  <button
    type="submit"
    class="w-full py-4 bg-[#0891B2] text-white rounded-lg font-semibold
           hover:bg-[#06B6D4] transition-colors disabled:opacity-50
           disabled:cursor-not-allowed"
  >
    Get Free Quote
  </button>

  <!-- Footer text -->
  <p class="text-xs text-center text-slate-500">
    By submitting, you agree to our privacy policy. We respond within 2 hours during business hours.
  </p>
</form>
```

---

## 13. Success State Example

```html
<div class="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
  <div class="w-16 h-16 rounded-full bg-green-100 flex items-center
              justify-center mx-auto mb-4">
    <svg class="w-8 h-8 text-green-600"><!-- Check icon --></svg>
  </div>
  <h3 class="text-2xl font-bold text-[#0C2340] mb-2">
    Quote Request Received!
  </h3>
  <p class="text-slate-600 mb-4">
    We'll review your document and send you a quote within 2 hours.
  </p>
  <p class="text-sm text-slate-500">
    Need it faster? Call us at
    <a href="tel:5876000786" class="text-[#0891B2] font-semibold">
      (587) 600-0786
    </a>
  </p>
</div>
```

---

## Quick Reference

### Key Colors
- **Primary (Teal):** `#0891B2`
- **Primary Hover:** `#06B6D4`
- **Navy (Headings):** `#0C2340`
- **Body Text:** `#4B5563`
- **Border:** `#E5E7EB` or `#E2E8F0`
- **Error:** `#EF4444`
- **Success:** `#10B981`

### Key Dimensions
- **Input Height:** 48px (py-3)
- **Input Border Radius:** 8px
- **Card Border Radius:** 16px
- **Button Padding:** 16px 24px
- **Form Field Gap:** 16px-24px
- **Focus Ring:** 3px with 20% opacity

### Font Import
```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```
