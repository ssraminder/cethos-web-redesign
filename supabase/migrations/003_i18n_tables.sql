-- i18n tables for database-driven localization
-- Supports CAT-tool-style segmentation (Trados/Wordfast/XTM workflow)

-- Namespaces: organize translatable content by page section
CREATE TABLE IF NOT EXISTS cethosweb_i18n_namespaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  page_path TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_i18n_namespaces_page_path ON cethosweb_i18n_namespaces(page_path);

-- Translations: all translatable segments (one row per segment per locale)
CREATE TABLE IF NOT EXISTS cethosweb_i18n_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  namespace_id UUID NOT NULL REFERENCES cethosweb_i18n_namespaces(id) ON DELETE CASCADE,
  key TEXT NOT NULL,
  segment_index INT NOT NULL DEFAULT 0,
  locale TEXT NOT NULL DEFAULT 'en'
    CHECK (locale IN ('en', 'fr')),
  value TEXT NOT NULL,
  is_html BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'published'
    CHECK (status IN ('untranslated', 'draft', 'confirmed', 'published')),
  context_note TEXT,
  translator_note TEXT,
  screenshot_url TEXT,
  max_length INT,
  confirmed_at TIMESTAMPTZ,
  confirmed_by TEXT,
  updated_by TEXT,
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(namespace_id, key, segment_index, locale)
);

-- Covering index for the hot read path
CREATE INDEX idx_i18n_translations_namespace_locale
  ON cethosweb_i18n_translations(namespace_id, locale)
  INCLUDE (key, segment_index, value, status, is_html);
CREATE INDEX idx_i18n_translations_locale_status
  ON cethosweb_i18n_translations(locale, status);

-- Page-level SEO metadata per locale
CREATE TABLE IF NOT EXISTS cethosweb_i18n_metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT 'en'
    CHECK (locale IN ('en', 'fr')),
  title TEXT NOT NULL,
  description TEXT,
  keywords TEXT[],
  og_title TEXT,
  og_description TEXT,
  status TEXT NOT NULL DEFAULT 'published'
    CHECK (status IN ('draft', 'review', 'published')),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(page_path, locale)
);

CREATE INDEX idx_i18n_metadata_path_locale
  ON cethosweb_i18n_metadata(page_path, locale);

-- Structured content (services, locations, industries) as JSONB per locale
CREATE TABLE IF NOT EXISTS cethosweb_i18n_structured (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type TEXT NOT NULL,
  content_key TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT 'en'
    CHECK (locale IN ('en', 'fr')),
  data JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'published'
    CHECK (status IN ('draft', 'review', 'published')),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(content_type, content_key, locale)
);

CREATE INDEX idx_i18n_structured_type_key_locale
  ON cethosweb_i18n_structured(content_type, content_key, locale);

-- Enable RLS on all i18n tables
ALTER TABLE cethosweb_i18n_namespaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE cethosweb_i18n_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE cethosweb_i18n_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE cethosweb_i18n_structured ENABLE ROW LEVEL SECURITY;

-- Anon (public) read access for published content only
CREATE POLICY "Anon can read namespaces"
  ON cethosweb_i18n_namespaces FOR SELECT TO anon
  USING (true);

CREATE POLICY "Anon can read published translations"
  ON cethosweb_i18n_translations FOR SELECT TO anon
  USING (status = 'published');

CREATE POLICY "Anon can read published metadata"
  ON cethosweb_i18n_metadata FOR SELECT TO anon
  USING (status = 'published');

CREATE POLICY "Anon can read published structured content"
  ON cethosweb_i18n_structured FOR SELECT TO anon
  USING (status = 'published');

-- Service role has full CRUD access (for admin/seeding operations)
CREATE POLICY "Service role full access on namespaces"
  ON cethosweb_i18n_namespaces FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access on translations"
  ON cethosweb_i18n_translations FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access on metadata"
  ON cethosweb_i18n_metadata FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access on structured"
  ON cethosweb_i18n_structured FOR ALL TO service_role
  USING (true) WITH CHECK (true);

-- Trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION update_i18n_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_i18n_translations_updated_at
  BEFORE UPDATE ON cethosweb_i18n_translations
  FOR EACH ROW EXECUTE FUNCTION update_i18n_updated_at();

CREATE TRIGGER tr_i18n_metadata_updated_at
  BEFORE UPDATE ON cethosweb_i18n_metadata
  FOR EACH ROW EXECUTE FUNCTION update_i18n_updated_at();

CREATE TRIGGER tr_i18n_structured_updated_at
  BEFORE UPDATE ON cethosweb_i18n_structured
  FOR EACH ROW EXECUTE FUNCTION update_i18n_updated_at();
