-- About page missing namespaces seeding
-- Seeds English translations for: about.services, about.industries, about.quality
-- These namespaces must already exist in cethosweb_i18n_namespaces.

DO $$
DECLARE
  ns_services_id UUID;
  ns_industries_id UUID;
  ns_quality_id UUID;
BEGIN
  SELECT id INTO ns_services_id FROM cethosweb_i18n_namespaces WHERE name = 'about.services';
  SELECT id INTO ns_industries_id FROM cethosweb_i18n_namespaces WHERE name = 'about.industries';
  SELECT id INTO ns_quality_id FROM cethosweb_i18n_namespaces WHERE name = 'about.quality';

  -- about.services
  INSERT INTO cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status)
  VALUES
    (ns_services_id, 'heading', 0, 'en', 'Expert Translation Across Industries', 'published'),
    (ns_services_id, 'lifesci_title', 0, 'en', 'Life Sciences Translation', 'published'),
    (ns_services_id, 'lifesci_desc', 0, 'en', 'For pharmaceutical, biotech, and medical device companies conducting global clinical trials and regulatory submissions.', 'published'),
    (ns_services_id, 'lifesci_item1', 0, 'en', 'Linguistic Validation (ISPOR methodology)', 'published'),
    (ns_services_id, 'lifesci_item2', 0, 'en', 'Cognitive Debriefing', 'published'),
    (ns_services_id, 'lifesci_item3', 0, 'en', 'Clinician Review', 'published'),
    (ns_services_id, 'lifesci_item4', 0, 'en', 'Clinical Trial Documentation', 'published'),
    (ns_services_id, 'lifesci_item5', 0, 'en', 'Regulatory Affairs Translation', 'published'),
    (ns_services_id, 'lifesci_item6', 0, 'en', 'Pharmacovigilance & Safety', 'published'),
    (ns_services_id, 'lifesci_item7', 0, 'en', 'eCOA/ePRO Migration', 'published'),
    (ns_services_id, 'lifesci_item8', 0, 'en', 'Medical Device IFUs', 'published'),
    (ns_services_id, 'lifesci_link', 0, 'en', 'Learn More', 'published'),
    (ns_services_id, 'certified_title', 0, 'en', 'Certified Translation', 'published'),
    (ns_services_id, 'certified_desc', 0, 'en', 'For individuals and businesses needing official document translation accepted by IRCC, Government of Alberta, and institutions worldwide.', 'published'),
    (ns_services_id, 'certified_item1', 0, 'en', 'Immigration Documents (IRCC approved)', 'published'),
    (ns_services_id, 'certified_item2', 0, 'en', 'Birth & Marriage Certificates', 'published'),
    (ns_services_id, 'certified_item3', 0, 'en', 'Academic Transcripts & Diplomas', 'published'),
    (ns_services_id, 'certified_item4', 0, 'en', 'Driver''s License Translation', 'published'),
    (ns_services_id, 'certified_item5', 0, 'en', 'Legal Documents & Contracts', 'published'),
    (ns_services_id, 'certified_item6', 0, 'en', 'Business Documents', 'published'),
    (ns_services_id, 'certified_badge1', 0, 'en', 'Government of Alberta Approved', 'published'),
    (ns_services_id, 'certified_badge2', 0, 'en', 'Same-day service available', 'published'),
    (ns_services_id, 'certified_link', 0, 'en', 'Get a Quote', 'published')
  ON CONFLICT (namespace_id, key, segment_index, locale) DO NOTHING;

  -- about.industries
  INSERT INTO cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status)
  VALUES
    (ns_industries_id, 'heading', 0, 'en', 'Industries We Serve', 'published'),
    (ns_industries_id, 'description', 0, 'en', 'Deep expertise across regulated industries worldwide.', 'published'),
    (ns_industries_id, 'pharma', 0, 'en', 'Pharmaceutical & Biotech', 'published'),
    (ns_industries_id, 'medical_devices', 0, 'en', 'Medical Devices', 'published'),
    (ns_industries_id, 'oil_gas', 0, 'en', 'Oil & Gas', 'published'),
    (ns_industries_id, 'healthcare', 0, 'en', 'Healthcare', 'published'),
    (ns_industries_id, 'legal', 0, 'en', 'Legal', 'published'),
    (ns_industries_id, 'immigration', 0, 'en', 'Immigration', 'published'),
    (ns_industries_id, 'technology', 0, 'en', 'Technology', 'published'),
    (ns_industries_id, 'finance', 0, 'en', 'Finance & Banking', 'published'),
    (ns_industries_id, 'energy_mining', 0, 'en', 'Energy & Mining', 'published'),
    (ns_industries_id, 'government', 0, 'en', 'Government', 'published')
  ON CONFLICT (namespace_id, key, segment_index, locale) DO NOTHING;

  -- about.quality
  INSERT INTO cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status)
  VALUES
    (ns_quality_id, 'heading', 0, 'en', 'Quality Without Compromise', 'published'),
    (ns_quality_id, 'description', 0, 'en', 'Our processes align with international standards for translation quality, data security, and regulatory compliance.', 'published'),
    (ns_quality_id, 'status_compliant', 0, 'en', 'Compliant', 'published'),
    (ns_quality_id, 'status_followed', 0, 'en', 'Followed', 'published'),
    (ns_quality_id, 'iso17100_desc', 0, 'en', 'Translation services quality standard', 'published'),
    (ns_quality_id, 'iso9001_desc', 0, 'en', 'Quality management systems', 'published'),
    (ns_quality_id, 'gcp_desc', 0, 'en', 'Good Clinical Practice', 'published'),
    (ns_quality_id, 'ispor_name', 0, 'en', 'ISPOR Guidelines', 'published'),
    (ns_quality_id, 'ispor_desc', 0, 'en', 'Linguistic validation standards', 'published'),
    (ns_quality_id, 'gdpr_desc', 0, 'en', 'European data protection', 'published'),
    (ns_quality_id, 'pipeda_desc', 0, 'en', 'Canadian privacy legislation', 'published'),
    (ns_quality_id, 'hipaa_desc', 0, 'en', 'US healthcare data protection', 'published'),
    (ns_quality_id, 'bbb_label', 0, 'en', 'Accredited Business', 'published'),
    (ns_quality_id, 'ailia_label', 0, 'en', 'Corporate Member', 'published'),
    (ns_quality_id, 'gov_alberta_name', 0, 'en', 'Gov. of Alberta', 'published'),
    (ns_quality_id, 'gov_alberta_label', 0, 'en', 'Approved Provider', 'published')
  ON CONFLICT (namespace_id, key, segment_index, locale) DO NOTHING;

END $$;
