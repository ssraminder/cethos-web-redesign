-- Fix locale constraints to support all 10 locales
-- This migration updates the CHECK constraints for existing i18n tables

-- Drop existing constraints
ALTER TABLE cethosweb_i18n_translations
  DROP CONSTRAINT IF EXISTS cethosweb_i18n_translations_locale_check;

ALTER TABLE cethosweb_i18n_metadata
  DROP CONSTRAINT IF EXISTS cethosweb_i18n_metadata_locale_check;

ALTER TABLE cethosweb_i18n_structured
  DROP CONSTRAINT IF EXISTS cethosweb_i18n_structured_locale_check;

-- Add updated constraints with all supported locales
ALTER TABLE cethosweb_i18n_translations
  ADD CONSTRAINT cethosweb_i18n_translations_locale_check
  CHECK (locale IN ('en', 'fr', 'es', 'de', 'ja', 'zh', 'ko', 'pt', 'it', 'ar', 'ru'));

ALTER TABLE cethosweb_i18n_metadata
  ADD CONSTRAINT cethosweb_i18n_metadata_locale_check
  CHECK (locale IN ('en', 'fr', 'es', 'de', 'ja', 'zh', 'ko', 'pt', 'it', 'ar', 'ru'));

ALTER TABLE cethosweb_i18n_structured
  ADD CONSTRAINT cethosweb_i18n_structured_locale_check
  CHECK (locale IN ('en', 'fr', 'es', 'de', 'ja', 'zh', 'ko', 'pt', 'it', 'ar', 'ru'));
