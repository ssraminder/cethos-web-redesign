-- 016_i18n_locale_add_hi_kn_ta_te.sql
--
-- The /research/<lang> page ships standalone language variants (th, ja, pl, de,
-- cs, it, nl, sk, ar, and now hi, kn, ta, te) whose copy is stored in
-- cethosweb_i18n_translations under the `research` namespace, without those
-- languages being site-wide locales. The four Indic languages — Hindi (hi),
-- Kannada (kn), Tamil (ta) and Telugu (te) — need to be allowed values for the
-- table's locale CHECK before their translations can be inserted.
--
-- This CHECK is the gate for ANY new content locale — widen it first.

alter table public.cethosweb_i18n_translations
  drop constraint if exists cethosweb_i18n_translations_locale_check;

alter table public.cethosweb_i18n_translations
  add constraint cethosweb_i18n_translations_locale_check
  check (locale = any (array[
    'en', 'fr', 'es', 'de', 'ja', 'zh', 'ko', 'pt', 'it', 'ar', 'ru', 'th', 'pl', 'cs', 'nl', 'sk',
    'hi', 'kn', 'ta', 'te'
  ]));
