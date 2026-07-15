-- 014_i18n_locale_add_nl.sql
--
-- The /research/<lang> page ships standalone language variants (th, ja, pl, de,
-- cs, it, and now nl) whose copy is stored in cethosweb_i18n_translations under
-- the `research` namespace, without those languages being site-wide locales.
-- Dutch (nl) needs to be an allowed value for the table's locale CHECK before
-- its translations can be inserted.

alter table public.cethosweb_i18n_translations
  drop constraint if exists cethosweb_i18n_translations_locale_check;

alter table public.cethosweb_i18n_translations
  add constraint cethosweb_i18n_translations_locale_check
  check (locale = any (array[
    'en', 'fr', 'es', 'de', 'ja', 'zh', 'ko', 'pt', 'it', 'ar', 'ru', 'th', 'pl', 'cs', 'nl'
  ]));
