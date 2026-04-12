-- Seed remaining About page i18n namespaces and English translations
-- Run against Supabase project: lmzoyezvsjgsxveoakdr
--
-- New namespaces: about.services, about.industries, about.quality
-- Additional keys for existing namespace: about.offices, about.faq

-- 1. Create new namespaces
INSERT INTO cethosweb_i18n_namespaces (name, page_path, sort_order)
VALUES ('about.services', '/about', 16)
ON CONFLICT (name) DO NOTHING;

INSERT INTO cethosweb_i18n_namespaces (name, page_path, sort_order)
VALUES ('about.industries', '/about', 17)
ON CONFLICT (name) DO NOTHING;

INSERT INTO cethosweb_i18n_namespaces (name, page_path, sort_order)
VALUES ('about.quality', '/about', 18)
ON CONFLICT (name) DO NOTHING;

-- 2. Insert about.faq heading
WITH ns AS (
  SELECT id FROM cethosweb_i18n_namespaces WHERE name = 'about.faq'
)
INSERT INTO cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status)
VALUES
  ((SELECT id FROM ns), 'heading', 0, 'en', 'Frequently Asked Questions', 'published')
ON CONFLICT (namespace_id, key, segment_index, locale) DO NOTHING;

-- 3. Insert about.offices detail card translations
WITH ns AS (
  SELECT id FROM cethosweb_i18n_namespaces WHERE name = 'about.offices'
)
INSERT INTO cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status)
VALUES
  ((SELECT id FROM ns), 'detail_calgary_region', 0, 'en', 'North America', 'published'),
  ((SELECT id FROM ns), 'detail_calgary_city', 0, 'en', 'Calgary, Canada', 'published'),
  ((SELECT id FROM ns), 'detail_calgary_badge', 0, 'en', 'CORPORATE HEADQUARTERS', 'published'),
  ((SELECT id FROM ns), 'detail_calgary_address', 0, 'en', '421 7 Avenue SW, Floor 30<br/>Calgary, AB T2P 4K9, Canada', 'published'),
  ((SELECT id FROM ns), 'detail_calgary_hours', 0, 'en', 'Mon–Fri, 9:00 AM – 5:00 PM MST', 'published'),
  ((SELECT id FROM ns), 'detail_calgary_phone', 0, 'en', '(587) 600-0786', 'published'),
  ((SELECT id FROM ns), 'detail_calgary_svc1', 0, 'en', 'Executive Leadership', 'published'),
  ((SELECT id FROM ns), 'detail_calgary_svc2', 0, 'en', 'Life Sciences Division', 'published'),
  ((SELECT id FROM ns), 'detail_calgary_svc3', 0, 'en', 'Enterprise Sales', 'published'),
  ((SELECT id FROM ns), 'detail_calgary_svc4', 0, 'en', 'Quality Assurance', 'published'),
  ((SELECT id FROM ns), 'detail_services_label', 0, 'en', 'SERVICES', 'published'),
  ((SELECT id FROM ns), 'detail_dubai_region', 0, 'en', 'EMEA', 'published'),
  ((SELECT id FROM ns), 'detail_dubai_city', 0, 'en', 'Dubai, UAE', 'published'),
  ((SELECT id FROM ns), 'detail_dubai_badge', 0, 'en', 'EUROPE, MIDDLE EAST & AFRICA HUB', 'published'),
  ((SELECT id FROM ns), 'detail_dubai_address', 0, 'en', 'Building A1, Dubai Digital Park<br/>Dubai Silicon Oasis, Dubai, UAE', 'published'),
  ((SELECT id FROM ns), 'detail_dubai_hours', 0, 'en', 'Sun–Thu, 9:00 AM – 6:00 PM GST', 'published'),
  ((SELECT id FROM ns), 'detail_dubai_svc1', 0, 'en', 'European Coordination', 'published'),
  ((SELECT id FROM ns), 'detail_dubai_svc2', 0, 'en', 'EMA Submissions', 'published'),
  ((SELECT id FROM ns), 'detail_dubai_svc3', 0, 'en', 'Arabic Languages', 'published'),
  ((SELECT id FROM ns), 'detail_dubai_svc4', 0, 'en', 'EMEA Support', 'published'),
  ((SELECT id FROM ns), 'detail_india_region', 0, 'en', 'Asia-Pacific', 'published'),
  ((SELECT id FROM ns), 'detail_india_city', 0, 'en', 'Patiala, India', 'published'),
  ((SELECT id FROM ns), 'detail_india_badge', 0, 'en', 'PRODUCTION CENTER', 'published'),
  ((SELECT id FROM ns), 'detail_india_address', 0, 'en', '158/3, Dharampura Bazaar<br/>Patiala 147001, Punjab, India', 'published'),
  ((SELECT id FROM ns), 'detail_india_hours', 0, 'en', 'Mon–Fri, 9:00 AM – 6:00 PM IST', 'published'),
  ((SELECT id FROM ns), 'detail_india_svc1', 0, 'en', '24/7 Support', 'published'),
  ((SELECT id FROM ns), 'detail_india_svc2', 0, 'en', 'Production Operations', 'published'),
  ((SELECT id FROM ns), 'detail_india_svc3', 0, 'en', 'Asian Languages', 'published'),
  ((SELECT id FROM ns), 'detail_india_svc4', 0, 'en', 'Linguist Network', 'published'),
  ((SELECT id FROM ns), 'follow_sun_label', 0, 'en', 'FOLLOW-THE-SUN OPERATIONS', 'published')
ON CONFLICT (namespace_id, key, segment_index, locale) DO NOTHING;

-- 4. Insert about.services translations
WITH ns AS (
  SELECT id FROM cethosweb_i18n_namespaces WHERE name = 'about.services'
)
INSERT INTO cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status)
VALUES
  ((SELECT id FROM ns), 'heading', 0, 'en', 'Expert Translation Across Industries', 'published'),
  ((SELECT id FROM ns), 'lifesci_title', 0, 'en', 'Life Sciences Translation', 'published'),
  ((SELECT id FROM ns), 'lifesci_desc', 0, 'en', 'For pharmaceutical, biotech, and medical device companies conducting global clinical trials and regulatory submissions.', 'published'),
  ((SELECT id FROM ns), 'lifesci_item1', 0, 'en', 'Linguistic Validation (ISPOR methodology)', 'published'),
  ((SELECT id FROM ns), 'lifesci_item2', 0, 'en', 'Cognitive Debriefing', 'published'),
  ((SELECT id FROM ns), 'lifesci_item3', 0, 'en', 'Clinician Review', 'published'),
  ((SELECT id FROM ns), 'lifesci_item4', 0, 'en', 'Clinical Trial Documentation', 'published'),
  ((SELECT id FROM ns), 'lifesci_item5', 0, 'en', 'Regulatory Affairs Translation', 'published'),
  ((SELECT id FROM ns), 'lifesci_item6', 0, 'en', 'Pharmacovigilance & Safety', 'published'),
  ((SELECT id FROM ns), 'lifesci_item7', 0, 'en', 'eCOA/ePRO Migration', 'published'),
  ((SELECT id FROM ns), 'lifesci_item8', 0, 'en', 'Medical Device IFUs', 'published'),
  ((SELECT id FROM ns), 'lifesci_link', 0, 'en', 'Learn More', 'published'),
  ((SELECT id FROM ns), 'certified_title', 0, 'en', 'Certified Translation', 'published'),
  ((SELECT id FROM ns), 'certified_desc', 0, 'en', 'For individuals and businesses needing official document translation accepted by IRCC, Government of Alberta, and institutions worldwide.', 'published'),
  ((SELECT id FROM ns), 'certified_item1', 0, 'en', 'Immigration Documents (IRCC approved)', 'published'),
  ((SELECT id FROM ns), 'certified_item2', 0, 'en', 'Birth & Marriage Certificates', 'published'),
  ((SELECT id FROM ns), 'certified_item3', 0, 'en', 'Academic Transcripts & Diplomas', 'published'),
  ((SELECT id FROM ns), 'certified_item4', 0, 'en', 'Driver''s License Translation', 'published'),
  ((SELECT id FROM ns), 'certified_item5', 0, 'en', 'Legal Documents & Contracts', 'published'),
  ((SELECT id FROM ns), 'certified_item6', 0, 'en', 'Business Documents', 'published'),
  ((SELECT id FROM ns), 'certified_badge1', 0, 'en', 'Government of Alberta Approved', 'published'),
  ((SELECT id FROM ns), 'certified_badge2', 0, 'en', 'Same-day service available', 'published'),
  ((SELECT id FROM ns), 'certified_link', 0, 'en', 'Get a Quote', 'published')
ON CONFLICT (namespace_id, key, segment_index, locale) DO NOTHING;

-- 5. Insert about.industries translations
WITH ns AS (
  SELECT id FROM cethosweb_i18n_namespaces WHERE name = 'about.industries'
)
INSERT INTO cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status)
VALUES
  ((SELECT id FROM ns), 'heading', 0, 'en', 'Industries We Serve', 'published'),
  ((SELECT id FROM ns), 'description', 0, 'en', 'Deep expertise across regulated industries worldwide.', 'published'),
  ((SELECT id FROM ns), 'pharma', 0, 'en', 'Pharmaceutical & Biotech', 'published'),
  ((SELECT id FROM ns), 'medical_devices', 0, 'en', 'Medical Devices', 'published'),
  ((SELECT id FROM ns), 'oil_gas', 0, 'en', 'Oil & Gas', 'published'),
  ((SELECT id FROM ns), 'healthcare', 0, 'en', 'Healthcare', 'published'),
  ((SELECT id FROM ns), 'legal', 0, 'en', 'Legal', 'published'),
  ((SELECT id FROM ns), 'immigration', 0, 'en', 'Immigration', 'published'),
  ((SELECT id FROM ns), 'technology', 0, 'en', 'Technology', 'published'),
  ((SELECT id FROM ns), 'finance', 0, 'en', 'Finance & Banking', 'published'),
  ((SELECT id FROM ns), 'energy_mining', 0, 'en', 'Energy & Mining', 'published'),
  ((SELECT id FROM ns), 'government', 0, 'en', 'Government', 'published')
ON CONFLICT (namespace_id, key, segment_index, locale) DO NOTHING;

-- 6. Insert about.quality translations
WITH ns AS (
  SELECT id FROM cethosweb_i18n_namespaces WHERE name = 'about.quality'
)
INSERT INTO cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status)
VALUES
  ((SELECT id FROM ns), 'heading', 0, 'en', 'Quality Without Compromise', 'published'),
  ((SELECT id FROM ns), 'description', 0, 'en', 'Our processes align with international standards for translation quality, data security, and regulatory compliance.', 'published'),
  ((SELECT id FROM ns), 'status_compliant', 0, 'en', 'Compliant', 'published'),
  ((SELECT id FROM ns), 'status_followed', 0, 'en', 'Followed', 'published'),
  ((SELECT id FROM ns), 'iso17100_desc', 0, 'en', 'Translation services quality standard', 'published'),
  ((SELECT id FROM ns), 'iso9001_desc', 0, 'en', 'Quality management systems', 'published'),
  ((SELECT id FROM ns), 'gcp_desc', 0, 'en', 'Good Clinical Practice', 'published'),
  ((SELECT id FROM ns), 'ispor_name', 0, 'en', 'ISPOR Guidelines', 'published'),
  ((SELECT id FROM ns), 'ispor_desc', 0, 'en', 'Linguistic validation standards', 'published'),
  ((SELECT id FROM ns), 'gdpr_desc', 0, 'en', 'European data protection', 'published'),
  ((SELECT id FROM ns), 'pipeda_desc', 0, 'en', 'Canadian privacy legislation', 'published'),
  ((SELECT id FROM ns), 'hipaa_desc', 0, 'en', 'US healthcare data protection', 'published'),
  ((SELECT id FROM ns), 'bbb_label', 0, 'en', 'Accredited Business', 'published'),
  ((SELECT id FROM ns), 'ailia_label', 0, 'en', 'Corporate Member', 'published'),
  ((SELECT id FROM ns), 'gov_alberta_name', 0, 'en', 'Gov. of Alberta', 'published'),
  ((SELECT id FROM ns), 'gov_alberta_label', 0, 'en', 'Approved Provider', 'published')
ON CONFLICT (namespace_id, key, segment_index, locale) DO NOTHING;
