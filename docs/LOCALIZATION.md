# Cethos Website Localization & Content Structure

Single reference document for all internationalization (i18n) work on the Cethos main website.

**Stack:** next-intl v4.9.1 + Next.js 14.2.20 App Router + Supabase (database-driven translations)

---

## 1. Architecture Overview

The site uses **next-intl** with database-backed translations stored in Supabase. There are no JSON translation files on disk -- all content is fetched from the database at request time.

### URL Strategy

| Locale  | URL Pattern                         | Example                          |
|---------|-------------------------------------|----------------------------------|
| English | No prefix (default)                 | `cethos.com/services`            |
| French  | `/fr/` prefix                       | `cethos.com/fr/services`         |

This is configured via `localePrefix: 'as-needed'` in the routing config, meaning the default locale (English) gets clean URLs with no prefix.

### Key Configuration

```ts
// i18n/routing.ts
export const routing = defineRouting({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
})
```

### Middleware

The middleware (`middleware.ts`) intercepts all public routes and handles locale detection/redirection. It uses `createMiddleware` from next-intl.

**Excluded paths** (not processed by i18n middleware):
- `/_next` -- Next.js internals
- `/embed` -- embeddable web components
- `/api` -- API routes
- `/admin` -- admin panel (has its own layout, not localized)
- `/favicon` and all static files (`.*\..*`)

```ts
// middleware.ts
export const config = {
  matcher: ['/((?!_next|embed|api|admin|favicon|.*\\..*).*)'],
}
```

### App Router Structure

All public pages live under `app/[locale]/`. The locale segment is a dynamic route parameter that next-intl resolves automatically.

```
app/
  [locale]/
    layout.tsx          # Root locale layout (NextIntlClientProvider, metadata)
    page.tsx            # Homepage
    about/
    blog/
    careers/
    contact/
    services/
    industries/
    locations/
    ...
  admin/                # NOT localized -- separate layout
  layout.tsx            # Root layout (fonts, global styles only)
```

The `[locale]/layout.tsx` wraps all localized pages with `NextIntlClientProvider` and calls `setRequestLocale()` for static rendering support. It also generates static params for all supported locales:

```ts
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
```

---

## 2. Database Schema

All tables are defined in `supabase/migrations/003_i18n_tables.sql`. RLS is enabled on every table -- anon users can only read `published` content; the service role has full CRUD.

### 2.1 `cethosweb_i18n_namespaces`

Organizes content into named sections. Each namespace typically maps to a page or section of a page.

| Column       | Type          | Notes                                    |
|-------------|---------------|------------------------------------------|
| `id`        | UUID (PK)     | Auto-generated                           |
| `name`      | TEXT UNIQUE   | Dot-separated identifier (e.g. `homepage.hero`) |
| `description` | TEXT        | Human-readable description               |
| `page_path` | TEXT          | Associated URL path (for admin reference) |
| `sort_order` | INT          | Display ordering in admin UI             |
| `created_at` | TIMESTAMPTZ  |                                          |

**Current scale:** ~201 namespaces

### 2.2 `cethosweb_i18n_translations`

All translatable text segments. Follows a CAT-tool (Computer-Aided Translation) style where long texts can be split into multiple segments.

| Column          | Type          | Notes                                        |
|----------------|---------------|----------------------------------------------|
| `id`           | UUID (PK)     |                                              |
| `namespace_id` | UUID (FK)     | References `cethosweb_i18n_namespaces.id`    |
| `key`          | TEXT          | Dot-separated key within namespace           |
| `segment_index`| INT           | 0-based; allows multi-segment translations   |
| `locale`       | TEXT          | `'en'` or `'fr'` (CHECK constraint)         |
| `value`        | TEXT          | The translated text                          |
| `is_html`      | BOOLEAN       | Whether value contains HTML markup           |
| `status`       | TEXT          | Workflow status (see below)                  |
| `context_note` | TEXT          | Context for translators                      |
| `translator_note` | TEXT       | Notes from translators                       |
| `screenshot_url` | TEXT        | Visual context screenshot                    |
| `max_length`   | INT           | Character limit constraint                   |
| `confirmed_at` | TIMESTAMPTZ   |                                              |
| `confirmed_by` | TEXT          |                                              |
| `updated_by`   | TEXT          |                                              |
| `updated_at`   | TIMESTAMPTZ   | Auto-updated via trigger                     |
| `created_at`   | TIMESTAMPTZ   |                                              |

**Unique constraint:** `(namespace_id, key, segment_index, locale)`

**Status workflow:**
```
untranslated --> draft --> confirmed --> published
```
- `untranslated` -- placeholder, no real translation yet
- `draft` -- AI-translated or first-pass human translation
- `confirmed` -- reviewed and approved by translator/editor
- `published` -- live on the website (only this status is fetched by the frontend)

**Current scale:** ~4,678 English strings

**Key indexes:**
- Covering index on `(namespace_id, locale)` including `key, segment_index, value, status, is_html`
- Index on `(locale, status)` for bulk loading

### 2.3 `cethosweb_i18n_metadata`

Per-page SEO metadata for each locale.

| Column          | Type          | Notes                                    |
|----------------|---------------|------------------------------------------|
| `id`           | UUID (PK)     |                                          |
| `page_path`    | TEXT          | URL path (e.g. `/services/certified`)    |
| `locale`       | TEXT          | `'en'` or `'fr'`                         |
| `title`        | TEXT          | Page title                               |
| `description`  | TEXT          | Meta description                         |
| `keywords`     | TEXT[]        | Array of keywords                        |
| `og_title`     | TEXT          | OpenGraph title                          |
| `og_description` | TEXT        | OpenGraph description                    |
| `status`       | TEXT          | `draft` / `review` / `published`         |

**Unique constraint:** `(page_path, locale)`

### 2.4 `cethosweb_i18n_structured`

Complex JSON content objects for services, locations, and industries that don't fit the key-value translation model.

| Column        | Type          | Notes                                      |
|--------------|---------------|--------------------------------------------|
| `id`         | UUID (PK)     |                                            |
| `content_type` | TEXT         | e.g. `'service'`, `'location'`, `'industry'` |
| `content_key` | TEXT          | e.g. `'certified'`, `'calgary'`            |
| `locale`     | TEXT           | `'en'` or `'fr'`                           |
| `data`       | JSONB          | Full content object                        |
| `status`     | TEXT           | `draft` / `review` / `published`           |

**Unique constraint:** `(content_type, content_key, locale)`

### RLS Policies

All four tables share the same pattern:
- **Anon (public):** `SELECT` only, restricted to `status = 'published'` (namespaces are fully readable)
- **Service role:** Full CRUD access for admin operations and seeding

### Auto-update Triggers

`updated_at` is automatically set to `now()` on `UPDATE` for translations, metadata, and structured content tables.

---

## 3. Namespace Convention

### Naming Pattern

Namespaces use **dot-separated hierarchical names** that mirror the site structure:

```
homepage.hero
homepage.services
homepage.stats
service.business
service.business.cta
certified.immigration
lifesciences.clinical-trials
industry.pharmaceutical
location.calgary
contact.form
```

### Namespace Groups

The first segment determines the group (used for categorization in the admin UI):

| Group          | Label                    | Examples                                     |
|---------------|--------------------------|----------------------------------------------|
| `homepage`    | Homepage                 | `homepage.hero`, `homepage.whyus`            |
| `about`       | About                    | `about.hero`, `about.team`                   |
| `service`     | Services                 | `service.business`, `service.legal`          |
| `certified`   | Certified Translations   | `certified.immigration`, `certified.wes`     |
| `lifesciences`| Life Sciences            | `lifesciences.clinical-trials`               |
| `industry`    | Industries               | `industry.pharmaceutical`, `industry.gaming` |
| `location`    | Locations                | `location.calgary`, `location.toronto`       |
| `contact`     | Contact                  | `contact.form`, `contact.submitted`          |
| `quote`       | Quote Forms              | `quote.form`, `quote.submitted`              |
| `careers`     | Careers                  | `careers.hero`                               |
| `legal`       | Legal Pages              | `legal.privacy`, `legal.terms`               |
| `common`      | Common / Shared          | `common.cta`, `common.buttons`               |
| `nav`         | Navigation               | `nav.header`, `nav.footer`                   |
| `blog`        | Blog                     | `blog.sidebar`                               |

### Key Convention

Within a namespace, keys are also **dot-separated** and get expanded into nested objects:

```
Namespace: homepage.hero
Keys: title, subtitle, cta.primary, cta.secondary

Result in next-intl messages:
{
  homepage: {
    hero: {
      title: "...",
      subtitle: "...",
      cta: {
        primary: "...",
        secondary: "..."
      }
    }
  }
}
```

In components, access with: `useTranslations('homepage.hero')` then `t('title')` or `t('cta.primary')`.

---

## 4. Content Loading

### Request Flow

```
Browser request
  --> middleware.ts (detect/redirect locale)
  --> i18n/request.ts (getRequestConfig)
  --> lib/i18n.ts loadMessages(locale)
  --> Supabase bulk query (paginated, 1000 rows per page)
  --> Build nested message object
  --> NextIntlClientProvider receives messages
  --> Components use useTranslations() / t()
```

### `loadMessages(locale)` -- The Core Function

Located in `lib/i18n.ts`. This is the primary function that feeds all translations into next-intl.

**How it works:**

1. Fetches all namespace records from `cethosweb_i18n_namespaces` (ordered by `sort_order`)
2. Performs a **paginated bulk query** of all translations for the requested locale where `status = 'published'`
   - Page size: 1000 rows (Supabase default limit)
   - Paginates with `.range(offset, offset + pageSize - 1)` until no more rows
3. If locale is not English, also fetches all English translations as **fallback**
   - Missing keys in the target locale are filled with English values
4. Groups rows by namespace, concatenates multi-segment keys (by `segment_index` order)
5. Converts flat dot-separated keys into nested objects
6. Converts dot-separated namespace names into nested objects

**Important:** `loadMessages()` does NOT use `unstable_cache`. Earlier attempts to cache it caused development server hangs. Individual namespace fetches via `getNamespaceMessages()` do use `unstable_cache` with 60-second revalidation.

### `getNamespaceMessages(namespace, locale)`

Cached wrapper (`unstable_cache`, 60s TTL, `translations` tag) for fetching a single namespace. Used for targeted fetches outside the main message loading flow.

### `getPageMetadata(pagePath, locale)`

Fetches SEO metadata from `cethosweb_i18n_metadata`. Cached with 60s TTL. Falls back to English if target locale metadata is missing.

### `getStructuredContent(contentType, contentKey, locale)`

Fetches complex JSON content from `cethosweb_i18n_structured`. Cached with 60s TTL. Falls back to English.

### `i18n/request.ts`

The next-intl request configuration. Validates the requested locale, calls `loadMessages()`, and configures error handling:
- `MISSING_MESSAGE` errors are silently ignored (expected during translation rollout)
- Missing keys display as `[namespace.key]` in the UI (visible but non-breaking)

### English Fallback Strategy

Every data-fetching function follows the same pattern:
1. Query for the target locale with `status = 'published'`
2. If locale is not `'en'`, also query English
3. Merge: target locale values take priority, English fills gaps

This means **untranslated pages render in English** -- they never show blank content or break.

### Cache Invalidation

All cached functions use the `translations` tag. To bust the cache after publishing translations:
```ts
revalidateTag('translations')
```

---

## 5. Translation Admin UI

### Dashboard: `/admin/translations`

The namespace list view with per-locale progress tracking.

**Features:**
- Lists all namespaces grouped by prefix (homepage, service, certified, etc.)
- Shows per-namespace stats: English count, translated count, published count, percentage
- Color-coded status: complete (green), in-progress (yellow), not-started (gray)
- Locale selector dropdown (filtered by `assigned_locales` for translator role)
- Export button (CSV/JSON) -- downloads translations for external tools
- Import button -- uploads translated content (admin/super_admin only)

**Locale options in admin UI:**
```ts
const ALL_LOCALES = ['fr', 'es', 'de', 'ja', 'zh', 'ko', 'pt', 'it', 'ar', 'ru'];
```
Note: The admin UI lists more locales than are currently active. Only `en` and `fr` are in `PUBLIC_LOCALES` and the routing config. The extra locales exist for future expansion.

### Namespace Editor: `/admin/translations/[namespace]`

Side-by-side editor with English source on the left and target locale on the right.

**Features:**
- CAT-tool-style segment editing (one row per key/segment)
- Status indicators: colored dots (gray = untranslated, yellow = draft, green = confirmed, blue = published)
- Inline editing of target text
- Save individual segments or batch save all dirty segments
- Status workflow buttons (mark as confirmed, etc.)
- "Sync to Live" button: bulk-publishes all confirmed translations in the namespace (admin/super_admin only)
- Context notes and translator notes per segment
- Character limit indicators (`max_length`)

### Export / Import

**Export** (translator, editor, admin, super_admin):
- Downloads namespace translations as CSV or JSON
- Useful for sending to external translation agencies

**Import** (admin, super_admin only):
- Uploads CSV/JSON with translations
- Inserts as `draft` status for review

---

## 6. Roles & Permissions

### Admin Roles

```ts
type AdminRole = 'super_admin' | 'admin' | 'editor' | 'author' | 'viewer' | 'translator'
```

### AdminUser Type

```ts
interface AdminUser {
  // ... standard fields ...
  role: AdminRole
  assigned_locales: string[] | null  // null = all locales, array = restricted
}
```

### Translation Permissions

| Action    | Allowed Roles                                  |
|-----------|------------------------------------------------|
| `read`    | super_admin, admin, editor, translator         |
| `update`  | super_admin, admin, editor, translator         |
| `export`  | super_admin, admin, editor, translator         |
| `import`  | super_admin, admin                             |
| `publish` | super_admin, admin                             |

### Translator Role Restrictions

- **Sidebar visibility:** Translators only see Dashboard + Translations (no Blog, SEO, Users, etc.)
- **Locale filtering:** The locale dropdown in the translation UI is filtered by `assigned_locales`
  - `null` (unset) = can see all locales
  - `['fr']` = can only work on French translations
- **Cannot import** -- prevents uploading untrusted files
- **Cannot publish** -- translations must be reviewed and synced by an admin

---

## 7. Language Selector

The language switcher is built into the `<cethos-header>` web component (`public/embed/cethos-components.js`).

### How It Works

**Locale Detection** (`_getCurrentLocale()`):
1. Check the `locale` attribute on the `<cethos-header>` element
2. If not set, detect from URL path (check if path starts with `/fr/` or equals `/fr`)
3. Default to `'en'`

**URL Switching** (`_getLanguageSwitchUrl(targetLocale)`):
1. Get current path from `window.location.pathname`
2. Strip current locale prefix if present (e.g. `/fr/services` --> `/services`)
3. If target is English, return the bare path
4. Otherwise, prepend target locale prefix (e.g. `/services` --> `/fr/services`)

### UI

**Desktop:** Globe icon button in the header nav bar. Clicking it opens a dropdown with language options. Each option shows the flag emoji and language name.

**Mobile:** Pill-style toggle in the mobile menu (e.g. `EN | FR`).

### Configuration

```js
const LANGUAGES = [
  { code: 'en', label: 'English', shortLabel: 'EN', flag: '...' },
  { code: 'fr', label: 'Francais', shortLabel: 'FR', flag: '...' }
];
```

### WebComponentsWrapper Integration

The `CethosHeader` and `CethosFooter` React wrapper components (`components/layout/WebComponentsWrapper.tsx`) accept a `locale` prop and pass it as an attribute to the web components:

```tsx
<cethos-header locale={locale} />
<cethos-footer locale={locale} />
```

---

## 8. Translation Script

### `scripts/translate-to-french.mjs`

Automated AI translation script designed for cron execution. Translates **one namespace per run** to avoid API timeouts and rate limits.

### How It Works

1. Reads Supabase credentials from `.env.local`
2. Gets all namespaces, ordered by name
3. For each namespace, checks if there are English keys missing French translations
4. Picks the **first** namespace with missing translations
5. Translates missing keys in batches of 30 using Claude API
6. Inserts results as `draft` status
7. Exits after completing one namespace

### Configuration

| Variable                    | Source          | Purpose                                |
|-----------------------------|-----------------|----------------------------------------|
| `NEXT_PUBLIC_SUPABASE_URL`  | `.env.local`    | Supabase project URL                   |
| `SUPABASE_SERVICE_ROLE_KEY` | `.env.local`    | Service role key (full DB access)      |
| `CLAUDE_CODE_OAUTH_TOKEN`   | Environment     | Anthropic API authentication           |
| `ANTHROPIC_API_KEY`         | Environment     | Fallback API key                       |
| `ANTHROPIC_BASE_URL`        | Environment     | API base URL (default: api.anthropic.com) |

### AI Translation Details

- **Model:** `claude-3-haiku-20240307`
- **Batch size:** 30 strings per API call
- **Retry logic:** 3 attempts per batch, 30s wait on rate limit (429/529)
- **Fallback:** If translation fails after retries, English text is used
- **Acceptance threshold:** 80% of batch must be translated to accept the response
- **Canadian French:** Prompt specifies Canadian French where applicable

### Translation Rules (from prompt)

- Maintain professional business tone
- Keep HTML tags unchanged (`<strong>`, `<br/>`, `<span>`, etc.)
- Keep brand names unchanged (Cethos, IRCC, IQAS, WES, ISO, etc.)
- Keep common English technical terms used in French contexts
- Do not translate placeholders like `{count}`, `{name}`

### Idempotency

The script is idempotent -- it checks for existing French translations before translating and skips already-translated namespaces. Safe to run repeatedly.

### Post-Translation Workflow

After the script runs:
1. Translations are in `draft` status (not visible on the live site)
2. A translator/editor reviews them in `/admin/translations/[namespace]`
3. Reviewer marks segments as `confirmed`
4. An admin clicks "Sync to Live" to publish them

---

## 9. Adding a New Language

Step-by-step process for adding a new locale (e.g. Spanish `es`):

### Step 1: Update Core Config

**`lib/i18n.ts`** -- Add to the `PUBLIC_LOCALES` array:
```ts
export const PUBLIC_LOCALES = ['en', 'fr', 'es'] as const
```

**`i18n/routing.ts`** -- Add to the `locales` array:
```ts
export const routing = defineRouting({
  locales: ['en', 'fr', 'es'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
})
```

### Step 2: Update Database Constraints

The `cethosweb_i18n_translations`, `cethosweb_i18n_metadata`, and `cethosweb_i18n_structured` tables have CHECK constraints limiting locale values. Create a migration to update them:

```sql
ALTER TABLE cethosweb_i18n_translations
  DROP CONSTRAINT cethosweb_i18n_translations_locale_check,
  ADD CONSTRAINT cethosweb_i18n_translations_locale_check
    CHECK (locale IN ('en', 'fr', 'es'));

-- Repeat for cethosweb_i18n_metadata and cethosweb_i18n_structured
```

### Step 3: Update Admin UI

**`app/admin/(dashboard)/translations/page.tsx`** and **`app/admin/(dashboard)/translations/[namespace]/page.tsx`** -- Add to `ALL_LOCALES`:
```ts
const ALL_LOCALES = ['fr', 'es', ...];
```
(Note: `es` may already be present since the admin UI pre-lists future locales.)

### Step 4: Update Web Components

**`public/embed/cethos-components.js`** -- Add to the `LANGUAGES` array:
```js
const LANGUAGES = [
  { code: 'en', label: 'English', shortLabel: 'EN', flag: '...' },
  { code: 'fr', label: 'Francais', shortLabel: 'FR', flag: '...' },
  { code: 'es', label: 'Espanol', shortLabel: 'ES', flag: '...' }
];
```

### Step 5: Translate Content

Option A -- **AI Translation Script:**
Adapt `scripts/translate-to-french.mjs` for the new locale (change target locale from `'fr'` to `'es'`, update the prompt language).

Option B -- **Admin UI Export/Import:**
1. Export English translations as CSV/JSON from `/admin/translations`
2. Send to translators
3. Import completed translations via admin UI
4. Review and confirm

### Step 6: Review and Publish

1. Review translations in `/admin/translations/[namespace]` for the new locale
2. Mark segments as `confirmed`
3. Click "Sync to Live" per namespace to publish

### Step 7: Test

- Visit `/es/` routes and verify content renders
- Check that the language selector shows the new option
- Verify English fallback works for untranslated pages
- Test SEO metadata via `/es/` routes
- Confirm sitemap includes new locale URLs

---

## 10. File Structure

### Core i18n Files

| File                                  | Role                                                    |
|---------------------------------------|--------------------------------------------------------|
| `i18n/routing.ts`                     | Locale list, default locale, prefix strategy            |
| `i18n/request.ts`                     | next-intl request config; calls `loadMessages()`        |
| `middleware.ts`                        | Locale detection, redirection, path exclusions          |
| `lib/i18n.ts`                         | All Supabase data fetching: `loadMessages()`, `getNamespaceMessages()`, `getPageMetadata()`, `getStructuredContent()`, `localizedHref()` |
| `lib/admin/permissions.ts`            | Role definitions, translation permissions               |

### Layout & Components

| File                                           | Role                                              |
|------------------------------------------------|--------------------------------------------------|
| `app/[locale]/layout.tsx`                      | Locale layout: `NextIntlClientProvider`, metadata |
| `components/layout/WebComponentsWrapper.tsx`   | React wrappers for `<cethos-header>` and `<cethos-footer>` with `locale` prop |

### Admin UI

| File                                                        | Role                                  |
|------------------------------------------------------------|---------------------------------------|
| `app/admin/(dashboard)/translations/page.tsx`              | Translation dashboard (namespace list) |
| `app/admin/(dashboard)/translations/[namespace]/page.tsx`  | Namespace segment editor               |

### Web Components

| File                                    | Role                                               |
|-----------------------------------------|---------------------------------------------------|
| `public/embed/cethos-components.js`     | Embeddable header/footer with language selector     |

### Scripts & Migrations

| File                                        | Role                                          |
|---------------------------------------------|----------------------------------------------|
| `scripts/translate-to-french.mjs`           | AI translation script (Claude API, 1 ns/run) |
| `supabase/migrations/003_i18n_tables.sql`   | Database schema for all i18n tables            |

### Page Files

All localized pages are under `app/[locale]/`. Most pages follow a pattern of a thin `page.tsx` (server component for metadata + data fetching) and a `*Content.tsx` (client component using `useTranslations()`).

```
app/[locale]/
  page.tsx                          # Homepage
  about/page.tsx                    # About
  blog/page.tsx                     # Blog index
  blog/[slug]/page.tsx              # Blog post
  careers/page.tsx                  # Careers
  contact/page.tsx                  # Contact
  get-quote/page.tsx                # Quote form
  locations/page.tsx                # Locations index
  locations/calgary/page.tsx        # (and other cities)
  services/page.tsx                 # Services index
  services/[slug]/page.tsx          # Dynamic service pages
  services/certified/page.tsx       # Certified translation
  services/certified/*/page.tsx     # Certified sub-pages (20+)
  services/lifesciences/page.tsx    # Life sciences
  services/lifesciences/*/page.tsx  # Life sciences sub-pages
  industries/*/page.tsx             # Industry pages (9)
  privacy/page.tsx                  # Legal pages
  terms/page.tsx
  cookies/page.tsx
```

---

## Appendix: Quick Reference

### Using Translations in Components

```tsx
import { useTranslations } from 'next-intl'

export default function HeroSection() {
  const t = useTranslations('homepage.hero')
  return (
    <h1>{t('title')}</h1>
    <p>{t('subtitle')}</p>
  )
}
```

### Using the Localized Link

```tsx
import { Link } from '@/i18n/routing'

// Automatically prefixed for current locale
<Link href="/services">Services</Link>
```

### Using `localizedHref()` in Server Components

```tsx
import { localizedHref } from '@/lib/i18n'

const href = localizedHref('/services', locale)
// 'en' --> '/services'
// 'fr' --> '/fr/services'
```

### Revalidating Translation Cache

```ts
import { revalidateTag } from 'next/cache'
revalidateTag('translations')
```

### Running the Translation Script

```bash
# Set API key and run
ANTHROPIC_API_KEY=sk-... node scripts/translate-to-french.mjs
```

### Checking Translation Progress

Visit `/admin/translations` and select a locale to see per-namespace completion percentages.
