-- ISO 17100:2015 certification (ATC Certification Ltd, certificate ATCISO2567, 11 Nov 2026 – 10 Nov 2029)
-- Seeds en + fr copy for the homepage band (`homepage.iso`) and the About page quality section,
-- and updates existing trust strings that used to say "TEP Quality Process".
-- Applied to prod on 2026-11-12 via the Supabase MCP (DML only; re-runnable).

INSERT INTO cethosweb_i18n_namespaces (name, description, page_path, sort_order)
VALUES ('homepage.iso', 'Homepage ISO 17100:2015 certification band', '/', 0)
ON CONFLICT (name) DO NOTHING;

DO $$
DECLARE
  ns_iso UUID;
  ns_quality UUID;
  ns_hero UUID;
  ns_about_hero UUID;
  ns_whyus UUID;
BEGIN
  SELECT id INTO ns_iso FROM cethosweb_i18n_namespaces WHERE name = 'homepage.iso';
  SELECT id INTO ns_quality FROM cethosweb_i18n_namespaces WHERE name = 'about.quality';
  SELECT id INTO ns_hero FROM cethosweb_i18n_namespaces WHERE name = 'homepage.hero';
  SELECT id INTO ns_about_hero FROM cethosweb_i18n_namespaces WHERE name = 'about.hero';
  SELECT id INTO ns_whyus FROM cethosweb_i18n_namespaces WHERE name = 'homepage.whyus';

  -- homepage.iso
  DELETE FROM cethosweb_i18n_translations WHERE namespace_id = ns_iso;
  INSERT INTO cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status) VALUES
    (ns_iso, 'eyebrow', 0, 'en', 'ISO 17100:2015 Certified', 'published'),
    (ns_iso, 'eyebrow', 0, 'fr', 'Certifiée ISO 17100:2015', 'published'),
    (ns_iso, 'heading', 0, 'en', 'Independently certified to the international standard for translation services', 'published'),
    (ns_iso, 'heading', 0, 'fr', 'Une certification indépendante selon la norme internationale des services de traduction', 'published'),
    (ns_iso, 'body', 0, 'en', 'Cethos Solutions Inc. is certified to ISO 17100:2015 by ATC Certification. Every project in scope is translated and revised by separately qualified linguists, managed by a trained project manager, and documented end to end.', 'published'),
    (ns_iso, 'body', 0, 'fr', 'Cethos Solutions Inc. est certifiée ISO 17100:2015 par ATC Certification. Chaque projet visé est traduit puis révisé par des linguistes qualifiés distincts, géré par un chef de projet formé et documenté de bout en bout.', 'published'),
    (ns_iso, 'cert_label', 0, 'en', 'Certificate', 'published'),
    (ns_iso, 'cert_label', 0, 'fr', 'Certificat', 'published'),
    (ns_iso, 'valid_label', 0, 'en', 'Valid', 'published'),
    (ns_iso, 'valid_label', 0, 'fr', 'Validité', 'published'),
    (ns_iso, 'valid_value', 0, 'en', '11 Nov 2026 – 10 Nov 2029', 'published'),
    (ns_iso, 'valid_value', 0, 'fr', '11 nov. 2026 – 10 nov. 2029', 'published'),
    (ns_iso, 'issuer_label', 0, 'en', 'Certification body', 'published'),
    (ns_iso, 'issuer_label', 0, 'fr', 'Organisme de certification', 'published'),
    (ns_iso, 'scope_label', 0, 'en', 'Scope', 'published'),
    (ns_iso, 'scope_label', 0, 'fr', 'Portée', 'published'),
    (ns_iso, 'scope_value', 0, 'en', 'All translation and revision services unless agreed otherwise with the client.', 'published'),
    (ns_iso, 'scope_value', 0, 'fr', 'Tous les services de traduction et de révision, sauf accord contraire avec le client.', 'published'),
    (ns_iso, 'verify', 0, 'en', 'Verify our certificate with ATC Certification', 'published'),
    (ns_iso, 'verify', 0, 'fr', 'Vérifier notre certificat auprès d''ATC Certification', 'published'),
    (ns_iso, 'mark_alt', 0, 'en', 'ATC Certification mark: ISO 17100:2015 Certified, Translation Services', 'published'),
    (ns_iso, 'mark_alt', 0, 'fr', 'Marque ATC Certification : Certifié ISO 17100:2015, services de traduction', 'published');

  -- about.quality (new keys only; iso17100_desc already exists)
  DELETE FROM cethosweb_i18n_translations WHERE namespace_id = ns_quality AND key IN
    ('status_certified','iso_banner_title','iso_banner_body','iso_cert_label','iso_valid_label','iso_valid_value','iso_scope_label','iso_scope_value','iso_verify','iso_mark_alt','atc_label');
  INSERT INTO cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status) VALUES
    (ns_quality, 'status_certified', 0, 'en', 'Certified', 'published'),
    (ns_quality, 'status_certified', 0, 'fr', 'Certifiée', 'published'),
    (ns_quality, 'iso_banner_title', 0, 'en', 'ISO 17100:2015 certified by ATC Certification', 'published'),
    (ns_quality, 'iso_banner_title', 0, 'fr', 'Certifiée ISO 17100:2015 par ATC Certification', 'published'),
    (ns_quality, 'iso_banner_body', 0, 'en', 'Following Stage 1 and Stage 2 audits in October and November 2026, Cethos Solutions Inc. was certified to ISO 17100:2015, the international standard for translation services. The certification covers linguist qualification, project management, the translation and revision process, and client feedback handling.', 'published'),
    (ns_quality, 'iso_banner_body', 0, 'fr', 'À l''issue des audits d''étape 1 et 2 d''octobre et de novembre 2026, Cethos Solutions Inc. a été certifiée ISO 17100:2015, la norme internationale des services de traduction. La certification couvre la qualification des linguistes, la gestion de projet, le processus de traduction et de révision ainsi que le traitement des retours clients.', 'published'),
    (ns_quality, 'iso_cert_label', 0, 'en', 'Certificate', 'published'),
    (ns_quality, 'iso_cert_label', 0, 'fr', 'Certificat', 'published'),
    (ns_quality, 'iso_valid_label', 0, 'en', 'Valid', 'published'),
    (ns_quality, 'iso_valid_label', 0, 'fr', 'Validité', 'published'),
    (ns_quality, 'iso_valid_value', 0, 'en', '11 Nov 2026 – 10 Nov 2029', 'published'),
    (ns_quality, 'iso_valid_value', 0, 'fr', '11 nov. 2026 – 10 nov. 2029', 'published'),
    (ns_quality, 'iso_scope_label', 0, 'en', 'Scope', 'published'),
    (ns_quality, 'iso_scope_label', 0, 'fr', 'Portée', 'published'),
    (ns_quality, 'iso_scope_value', 0, 'en', 'All translation and revision services unless agreed otherwise with the client.', 'published'),
    (ns_quality, 'iso_scope_value', 0, 'fr', 'Tous les services de traduction et de révision, sauf accord contraire avec le client.', 'published'),
    (ns_quality, 'iso_verify', 0, 'en', 'Verify certificate ATCISO2567', 'published'),
    (ns_quality, 'iso_verify', 0, 'fr', 'Vérifier le certificat ATCISO2567', 'published'),
    (ns_quality, 'iso_mark_alt', 0, 'en', 'ATC Certification mark: ISO 17100:2015 Certified, Translation Services', 'published'),
    (ns_quality, 'iso_mark_alt', 0, 'fr', 'Marque ATC Certification : Certifié ISO 17100:2015, services de traduction', 'published'),
    (ns_quality, 'atc_label', 0, 'en', 'ISO 17100:2015 Certified', 'published'),
    (ns_quality, 'atc_label', 0, 'fr', 'Certifiée ISO 17100:2015', 'published');

  -- Existing trust strings
  UPDATE cethosweb_i18n_translations SET value = 'ISO 17100:2015 Certified • Rigorous TEP Quality Process • Trusted by 500+ Global Enterprises', updated_at = now()
    WHERE namespace_id = ns_hero AND key = 'trust_badge' AND locale = 'en';
  UPDATE cethosweb_i18n_translations SET value = 'Certifiée ISO 17100:2015 • Processus qualité TEP rigoureux • Approuvé par plus de 500 entreprises mondiales', updated_at = now()
    WHERE namespace_id = ns_hero AND key = 'trust_badge' AND locale = 'fr';
  UPDATE cethosweb_i18n_translations SET value = 'ISO 17100:2015 Certified', updated_at = now()
    WHERE namespace_id = ns_about_hero AND key = 'trust_iso' AND locale = 'en';
  UPDATE cethosweb_i18n_translations SET value = 'Certifiée ISO 17100:2015', updated_at = now()
    WHERE namespace_id = ns_about_hero AND key = 'trust_iso' AND locale = 'fr';
  UPDATE cethosweb_i18n_translations SET value = 'ISO 17100:2015 certified quality process', updated_at = now()
    WHERE namespace_id = ns_whyus AND key = 'qa_highlight1' AND locale = 'en';
  UPDATE cethosweb_i18n_translations SET value = 'Processus qualité certifié ISO 17100:2015', updated_at = now()
    WHERE namespace_id = ns_whyus AND key = 'qa_highlight1' AND locale = 'fr';
END $$;
