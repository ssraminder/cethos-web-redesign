-- Seed i18n namespaces and translations for: careers, privacy, terms, cookies
-- Target tables: cethosweb_i18n_namespaces, cethosweb_i18n_translations
-- DO NOT execute blindly — review first.

DO $$
DECLARE
  ns_id UUID;
BEGIN
  -- ============================================================
  -- CAREERS.HERO
  -- ============================================================
  INSERT INTO cethosweb_i18n_namespaces (id, name, description)
  VALUES (gen_random_uuid(), 'careers.hero', 'Careers page hero section')
  ON CONFLICT (name) DO NOTHING;
  SELECT id INTO ns_id FROM cethosweb_i18n_namespaces WHERE name = 'careers.hero';

  INSERT INTO cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status)
  VALUES
    (ns_id, 'label', 0, 'en', 'Careers', 'published'),
    (ns_id, 'heading', 0, 'en', 'Join Our Global Team', 'published'),
    (ns_id, 'description', 0, 'en', 'Be part of a team that bridges languages and cultures. At Cethos, we connect the world through expert translation and localization services.', 'published'),
    (ns_id, 'cta_positions', 0, 'en', 'View Open Positions', 'published'),
    (ns_id, 'cta_freelance', 0, 'en', 'Freelance Opportunities', 'published')
  ON CONFLICT (namespace_id, key, segment_index, locale) DO NOTHING;

  -- ============================================================
  -- CAREERS.BENEFITS
  -- ============================================================
  INSERT INTO cethosweb_i18n_namespaces (id, name, description)
  VALUES (gen_random_uuid(), 'careers.benefits', 'Careers page benefits section')
  ON CONFLICT (name) DO NOTHING;
  SELECT id INTO ns_id FROM cethosweb_i18n_namespaces WHERE name = 'careers.benefits';

  INSERT INTO cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status)
  VALUES
    (ns_id, 'heading', 0, 'en', 'Why Work With Us', 'published'),
    (ns_id, 'description', 0, 'en', 'We offer more than just jobs—we offer careers built on growth, flexibility, and meaningful work.', 'published'),
    (ns_id, 'benefit1_title', 0, 'en', 'Remote Flexibility', 'published'),
    (ns_id, 'benefit1_desc', 0, 'en', 'Work from anywhere in the world. We embrace remote work and flexible schedules to support your work-life balance.', 'published'),
    (ns_id, 'benefit2_title', 0, 'en', 'Professional Growth', 'published'),
    (ns_id, 'benefit2_desc', 0, 'en', 'Access continuous learning opportunities, certifications, and career advancement paths in the language industry.', 'published'),
    (ns_id, 'benefit3_title', 0, 'en', 'Health & Wellness', 'published'),
    (ns_id, 'benefit3_desc', 0, 'en', 'Comprehensive health benefits, wellness programs, and mental health support for full-time employees.', 'published'),
    (ns_id, 'benefit4_title', 0, 'en', 'Diverse Projects', 'published'),
    (ns_id, 'benefit4_desc', 0, 'en', 'Work on exciting projects across industries including life sciences, legal, technology, and more.', 'published')
  ON CONFLICT (namespace_id, key, segment_index, locale) DO NOTHING;

  -- ============================================================
  -- CAREERS.POSITIONS
  -- ============================================================
  INSERT INTO cethosweb_i18n_namespaces (id, name, description)
  VALUES (gen_random_uuid(), 'careers.positions', 'Careers page open positions')
  ON CONFLICT (name) DO NOTHING;
  SELECT id INTO ns_id FROM cethosweb_i18n_namespaces WHERE name = 'careers.positions';

  INSERT INTO cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status)
  VALUES
    (ns_id, 'heading', 0, 'en', 'Open Positions', 'published'),
    (ns_id, 'description', 0, 'en', 'Explore our current openings and find the perfect opportunity to advance your career.', 'published'),
    (ns_id, 'apply_now', 0, 'en', 'Apply Now', 'published'),
    (ns_id, 'pos1_title', 0, 'en', 'Senior Medical Translator (German)', 'published'),
    (ns_id, 'pos1_department', 0, 'en', 'Life Sciences', 'published'),
    (ns_id, 'pos1_location', 0, 'en', 'Remote', 'published'),
    (ns_id, 'pos1_type', 0, 'en', 'Contract', 'published'),
    (ns_id, 'pos2_title', 0, 'en', 'Project Manager', 'published'),
    (ns_id, 'pos2_department', 0, 'en', 'Operations', 'published'),
    (ns_id, 'pos2_location', 0, 'en', 'Calgary, AB', 'published'),
    (ns_id, 'pos2_type', 0, 'en', 'Full-time', 'published'),
    (ns_id, 'pos3_title', 0, 'en', 'Linguistic Validator (Spanish)', 'published'),
    (ns_id, 'pos3_department', 0, 'en', 'Life Sciences', 'published'),
    (ns_id, 'pos3_location', 0, 'en', 'Remote', 'published'),
    (ns_id, 'pos3_type', 0, 'en', 'Contract', 'published'),
    (ns_id, 'pos4_title', 0, 'en', 'Quality Assurance Specialist', 'published'),
    (ns_id, 'pos4_department', 0, 'en', 'Quality', 'published'),
    (ns_id, 'pos4_location', 0, 'en', 'Dubai, UAE', 'published'),
    (ns_id, 'pos4_type', 0, 'en', 'Full-time', 'published')
  ON CONFLICT (namespace_id, key, segment_index, locale) DO NOTHING;

  -- ============================================================
  -- CAREERS.FREELANCE
  -- ============================================================
  INSERT INTO cethosweb_i18n_namespaces (id, name, description)
  VALUES (gen_random_uuid(), 'careers.freelance', 'Careers page freelance section')
  ON CONFLICT (name) DO NOTHING;
  SELECT id INTO ns_id FROM cethosweb_i18n_namespaces WHERE name = 'careers.freelance';

  INSERT INTO cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status)
  VALUES
    (ns_id, 'heading', 0, 'en', 'Freelance Linguists', 'published'),
    (ns_id, 'description', 0, 'en', 'Are you a professional translator, interpreter, or language specialist? Join our network of freelance linguists and work on diverse projects from clients around the world.', 'published'),
    (ns_id, 'cta', 0, 'en', 'Join Our Network', 'published'),
    (ns_id, 'note', 0, 'en', 'Send your CV and language combinations to linguists@cethos.com', 'published')
  ON CONFLICT (namespace_id, key, segment_index, locale) DO NOTHING;

  -- ============================================================
  -- CAREERS.CONTACT
  -- ============================================================
  INSERT INTO cethosweb_i18n_namespaces (id, name, description)
  VALUES (gen_random_uuid(), 'careers.contact', 'Careers page contact section')
  ON CONFLICT (name) DO NOTHING;
  SELECT id INTO ns_id FROM cethosweb_i18n_namespaces WHERE name = 'careers.contact';

  INSERT INTO cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status)
  VALUES
    (ns_id, 'heading', 0, 'en', 'Have Questions?', 'published'),
    (ns_id, 'description', 0, 'en', 'Our HR team is here to help you with any questions about careers at Cethos.', 'published'),
    (ns_id, 'label', 0, 'en', 'Contact our careers team:', 'published')
  ON CONFLICT (namespace_id, key, segment_index, locale) DO NOTHING;

  -- ============================================================
  -- PRIVACY
  -- ============================================================
  INSERT INTO cethosweb_i18n_namespaces (id, name, description)
  VALUES (gen_random_uuid(), 'privacy', 'Privacy policy page')
  ON CONFLICT (name) DO NOTHING;
  SELECT id INTO ns_id FROM cethosweb_i18n_namespaces WHERE name = 'privacy';

  INSERT INTO cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status)
  VALUES
    (ns_id, 'label', 0, 'en', 'Legal', 'published'),
    (ns_id, 'heading', 0, 'en', 'Privacy Policy', 'published'),
    (ns_id, 'hero_description', 0, 'en', 'Your privacy is important to us. This policy explains how we collect, use, and protect your information.', 'published'),
    (ns_id, 'highlight_title', 0, 'en', 'Your Privacy Matters', 'published'),
    (ns_id, 'highlight_desc', 0, 'en', 'Cethos Solutions Inc. is committed to protecting your privacy and ensuring the security of your personal information. We comply with applicable privacy laws including PIPEDA (Canada) and GDPR (European Union).', 'published'),
    (ns_id, 'last_updated_label', 0, 'en', 'Last Updated:', 'published'),
    (ns_id, 'last_updated_date', 0, 'en', 'January 1, 2026', 'published'),
    -- Section 1: Information We Collect
    (ns_id, 'section1_title', 0, 'en', '1. Information We Collect', 'published'),
    (ns_id, 'section1_sub1_title', 0, 'en', 'Personal Information', 'published'),
    (ns_id, 'section1_sub1_intro', 0, 'en', 'We collect personal information that you provide directly to us, including:', 'published'),
    (ns_id, 'section1_sub1_item1', 0, 'en', 'Name and contact information (email address, phone number, mailing address)', 'published'),
    (ns_id, 'section1_sub1_item2', 0, 'en', 'Company name and job title', 'published'),
    (ns_id, 'section1_sub1_item3', 0, 'en', 'Account credentials', 'published'),
    (ns_id, 'section1_sub1_item4', 0, 'en', 'Payment and billing information', 'published'),
    (ns_id, 'section1_sub1_item5', 0, 'en', 'Communication preferences', 'published'),
    (ns_id, 'section1_sub2_title', 0, 'en', 'Documents and Content', 'published'),
    (ns_id, 'section1_sub2_intro', 0, 'en', 'When you use our translation services, we collect:', 'published'),
    (ns_id, 'section1_sub2_item1', 0, 'en', 'Source documents submitted for translation', 'published'),
    (ns_id, 'section1_sub2_item2', 0, 'en', 'Translated documents and deliverables', 'published'),
    (ns_id, 'section1_sub2_item3', 0, 'en', 'Project specifications and instructions', 'published'),
    (ns_id, 'section1_sub2_item4', 0, 'en', 'Feedback and communications related to projects', 'published'),
    (ns_id, 'section1_sub3_title', 0, 'en', 'Automatic Information', 'published'),
    (ns_id, 'section1_sub3_intro', 0, 'en', 'We automatically collect certain information when you visit our website:', 'published'),
    (ns_id, 'section1_sub3_item1', 0, 'en', 'IP address and device information', 'published'),
    (ns_id, 'section1_sub3_item2', 0, 'en', 'Browser type and operating system', 'published'),
    (ns_id, 'section1_sub3_item3', 0, 'en', 'Pages visited and time spent on our website', 'published'),
    (ns_id, 'section1_sub3_item4', 0, 'en', 'Referring website or source', 'published'),
    (ns_id, 'section1_sub3_item5', 0, 'en', 'Cookies and similar tracking technologies (see our Cookie Policy)', 'published'),
    -- Section 2: How We Use Your Information
    (ns_id, 'section2_title', 0, 'en', '2. How We Use Your Information', 'published'),
    (ns_id, 'section2_intro', 0, 'en', 'We use the information we collect for the following purposes:', 'published'),
    (ns_id, 'section2_item1', 0, 'en', 'Providing and delivering our translation and localization services', 'published'),
    (ns_id, 'section2_item2', 0, 'en', 'Processing payments and managing your account', 'published'),
    (ns_id, 'section2_item3', 0, 'en', 'Communicating with you about projects, updates, and support', 'published'),
    (ns_id, 'section2_item4', 0, 'en', 'Improving our services and developing new features', 'published'),
    (ns_id, 'section2_item5', 0, 'en', 'Analyzing website usage and optimizing user experience', 'published'),
    (ns_id, 'section2_item6', 0, 'en', 'Complying with legal obligations and protecting our rights', 'published'),
    (ns_id, 'section2_item7', 0, 'en', 'Marketing and promotional communications (with your consent)', 'published'),
    -- Section 3: Information Sharing and Disclosure
    (ns_id, 'section3_title', 0, 'en', '3. Information Sharing and Disclosure', 'published'),
    (ns_id, 'section3_intro', 0, 'en', 'We may share your information in the following circumstances:', 'published'),
    (ns_id, 'section3_item1', 0, 'en', 'Service Providers: We work with trusted linguists, translators, and technology partners who assist in delivering our services. These parties are bound by confidentiality agreements.', 'published'),
    (ns_id, 'section3_item2', 0, 'en', 'Business Transfers: In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.', 'published'),
    (ns_id, 'section3_item3', 0, 'en', 'Legal Requirements: We may disclose information when required by law, court order, or government request.', 'published'),
    (ns_id, 'section3_item4', 0, 'en', 'Protection of Rights: We may share information to protect our rights, privacy, safety, or property.', 'published'),
    (ns_id, 'section3_no_sell', 0, 'en', 'We do not sell your personal information to third parties for marketing purposes.', 'published'),
    -- Section 4: Data Security
    (ns_id, 'section4_title', 0, 'en', '4. Data Security', 'published'),
    (ns_id, 'section4_intro', 0, 'en', 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:', 'published'),
    (ns_id, 'section4_item1', 0, 'en', 'Encryption of data in transit and at rest', 'published'),
    (ns_id, 'section4_item2', 0, 'en', 'Secure access controls and authentication', 'published'),
    (ns_id, 'section4_item3', 0, 'en', 'Regular security assessments and audits', 'published'),
    (ns_id, 'section4_item4', 0, 'en', 'Employee training on data protection', 'published'),
    (ns_id, 'section4_item5', 0, 'en', 'Confidentiality agreements with all personnel and contractors', 'published'),
    -- Section 5: Data Retention
    (ns_id, 'section5_title', 0, 'en', '5. Data Retention', 'published'),
    (ns_id, 'section5_p1', 0, 'en', 'We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations, resolve disputes, and enforce our agreements. The specific retention period depends on the nature of the information and the purpose for which it was collected.', 'published'),
    (ns_id, 'section5_p2', 0, 'en', 'Project documents and translations are retained according to our document retention policy and applicable industry regulations, unless you request earlier deletion.', 'published'),
    -- Section 6: Your Privacy Rights
    (ns_id, 'section6_title', 0, 'en', '6. Your Privacy Rights', 'published'),
    (ns_id, 'section6_sub1_title', 0, 'en', 'All Users', 'published'),
    (ns_id, 'section6_sub1_intro', 0, 'en', 'Depending on your location, you may have the following rights:', 'published'),
    (ns_id, 'section6_sub1_item1', 0, 'en', 'Access your personal information', 'published'),
    (ns_id, 'section6_sub1_item2', 0, 'en', 'Correct inaccurate or incomplete information', 'published'),
    (ns_id, 'section6_sub1_item3', 0, 'en', 'Request deletion of your information', 'published'),
    (ns_id, 'section6_sub1_item4', 0, 'en', 'Opt out of marketing communications', 'published'),
    (ns_id, 'section6_sub1_item5', 0, 'en', 'Request a copy of your data in a portable format', 'published'),
    (ns_id, 'section6_sub2_title', 0, 'en', 'Canadian Residents (PIPEDA)', 'published'),
    (ns_id, 'section6_sub2_desc', 0, 'en', 'Under the Personal Information Protection and Electronic Documents Act (PIPEDA), you have the right to access and correct your personal information held by us. You may also withdraw consent for certain processing activities. To exercise these rights, please contact our Privacy Officer.', 'published'),
    (ns_id, 'section6_sub3_title', 0, 'en', 'European Residents (GDPR)', 'published'),
    (ns_id, 'section6_sub3_desc', 0, 'en', 'If you are located in the European Economic Area, you have additional rights under the General Data Protection Regulation (GDPR), including the right to object to processing, request restriction of processing, and lodge a complaint with a supervisory authority. Our legal basis for processing includes contractual necessity, legitimate interests, and consent.', 'published'),
    -- Section 7: International Data Transfers
    (ns_id, 'section7_title', 0, 'en', '7. International Data Transfers', 'published'),
    (ns_id, 'section7_desc', 0, 'en', 'As a global translation service provider, we may transfer your information to countries outside your country of residence. When we transfer data internationally, we implement appropriate safeguards to protect your information, including standard contractual clauses and ensuring our partners maintain adequate data protection standards.', 'published'),
    -- Section 8: Children''s Privacy
    (ns_id, 'section8_title', 0, 'en', '8. Children''s Privacy', 'published'),
    (ns_id, 'section8_desc', 0, 'en', 'Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child, we will take steps to delete such information promptly.', 'published'),
    -- Section 9: Changes to This Policy
    (ns_id, 'section9_title', 0, 'en', '9. Changes to This Policy', 'published'),
    (ns_id, 'section9_desc', 0, 'en', 'We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the updated policy on our website and updating the "Last Updated" date. We encourage you to review this policy periodically.', 'published'),
    -- Section 10: Contact Us
    (ns_id, 'section10_title', 0, 'en', '10. Contact Us', 'published'),
    (ns_id, 'section10_desc', 0, 'en', 'If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact us:', 'published'),
    -- Contact box
    (ns_id, 'contact_title', 0, 'en', 'Privacy Officer', 'published'),
    (ns_id, 'contact_company', 0, 'en', 'Cethos Solutions Inc.', 'published'),
    (ns_id, 'contact_location', 0, 'en', 'Calgary, Alberta, Canada', 'published')
  ON CONFLICT (namespace_id, key, segment_index, locale) DO NOTHING;

  -- ============================================================
  -- TERMS
  -- ============================================================
  INSERT INTO cethosweb_i18n_namespaces (id, name, description)
  VALUES (gen_random_uuid(), 'terms', 'Terms of service page')
  ON CONFLICT (name) DO NOTHING;
  SELECT id INTO ns_id FROM cethosweb_i18n_namespaces WHERE name = 'terms';

  INSERT INTO cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status)
  VALUES
    (ns_id, 'label', 0, 'en', 'Legal', 'published'),
    (ns_id, 'heading', 0, 'en', 'Terms of Service', 'published'),
    (ns_id, 'hero_description', 0, 'en', 'Please read these terms carefully before using our services.', 'published'),
    (ns_id, 'highlight_title', 0, 'en', 'Agreement to Terms', 'published'),
    (ns_id, 'highlight_desc', 0, 'en', 'By using Cethos Solutions Inc.''s services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our services.', 'published'),
    (ns_id, 'effective_date_label', 0, 'en', 'Effective Date:', 'published'),
    (ns_id, 'effective_date', 0, 'en', 'January 1, 2026', 'published'),
    -- Section 1: Services
    (ns_id, 'section1_title', 0, 'en', '1. Services', 'published'),
    (ns_id, 'section1_desc', 0, 'en', 'Cethos Solutions Inc. ("Cethos," "we," "us," or "our") provides professional translation, localization, interpretation, and related language services ("Services"). These Terms of Service govern your use of our Services and constitute a binding agreement between you ("Client," "you," or "your") and Cethos.', 'published'),
    -- Section 2: Ordering and Acceptance
    (ns_id, 'section2_title', 0, 'en', '2. Ordering and Acceptance', 'published'),
    (ns_id, 'section2_intro', 0, 'en', 'Orders for Services may be placed through our website, email, or other agreed-upon channels. Each order is subject to acceptance by Cethos. An order is accepted when we provide written confirmation, including a quote or project agreement specifying:', 'published'),
    (ns_id, 'section2_item1', 0, 'en', 'Scope of Services and deliverables', 'published'),
    (ns_id, 'section2_item2', 0, 'en', 'Language pairs and target formats', 'published'),
    (ns_id, 'section2_item3', 0, 'en', 'Delivery timeline and milestones', 'published'),
    (ns_id, 'section2_item4', 0, 'en', 'Pricing and payment terms', 'published'),
    (ns_id, 'section2_item5', 0, 'en', 'Any special requirements or instructions', 'published'),
    (ns_id, 'section2_acceptance', 0, 'en', 'Your acceptance of the quote or project agreement, whether by written confirmation, payment of deposit, or submission of source materials, constitutes your agreement to these Terms of Service.', 'published'),
    -- Section 3: Client Responsibilities
    (ns_id, 'section3_title', 0, 'en', '3. Client Responsibilities', 'published'),
    (ns_id, 'section3_intro', 0, 'en', 'To enable us to provide high-quality Services, you agree to:', 'published'),
    (ns_id, 'section3_item1', 0, 'en', 'Provide accurate and complete source materials in agreed formats', 'published'),
    (ns_id, 'section3_item2', 0, 'en', 'Supply reference materials, glossaries, and style guides as applicable', 'published'),
    (ns_id, 'section3_item3', 0, 'en', 'Respond promptly to queries and requests for clarification', 'published'),
    (ns_id, 'section3_item4', 0, 'en', 'Designate a point of contact for project communications', 'published'),
    (ns_id, 'section3_item5', 0, 'en', 'Review and approve deliverables within agreed timeframes', 'published'),
    (ns_id, 'section3_item6', 0, 'en', 'Ensure you have the right to have the content translated', 'published'),
    -- Section 4: Delivery and Acceptance
    (ns_id, 'section4_title', 0, 'en', '4. Delivery and Acceptance', 'published'),
    (ns_id, 'section4_desc', 0, 'en', 'We will deliver completed work by the agreed deadline. Delivery is deemed complete upon transmission of the deliverables to you via email or other agreed method. You will have a review period of ten (10) business days from delivery to inspect the work and notify us of any issues. If no notice is received within this period, the deliverables are deemed accepted.', 'published'),
    -- Section 5: Revisions and Quality
    (ns_id, 'section5_title', 0, 'en', '5. Revisions and Quality', 'published'),
    (ns_id, 'section5_desc', 0, 'en', 'We are committed to delivering high-quality work that meets your specifications. If you identify errors or issues with the delivered work that represent a deviation from the agreed specifications, please notify us within the review period. We will correct verifiable errors at no additional charge. Requests for revisions beyond the original scope, changes to specifications, or preference-based changes may be subject to additional fees.', 'published'),
    -- Section 6: Payment Terms
    (ns_id, 'section6_title', 0, 'en', '6. Payment Terms', 'published'),
    (ns_id, 'section6_intro', 0, 'en', 'Payment terms are Net 30 days from the invoice date unless otherwise agreed in writing. We accept payment by:', 'published'),
    (ns_id, 'section6_item1', 0, 'en', 'Bank transfer (wire transfer)', 'published'),
    (ns_id, 'section6_item2', 0, 'en', 'Credit card', 'published'),
    (ns_id, 'section6_item3', 0, 'en', 'Other methods as agreed', 'published'),
    (ns_id, 'section6_deposit', 0, 'en', 'For new clients or large projects, we may require a deposit of up to 50% before commencing work. Late payments may be subject to interest charges of 1.5% per month on the outstanding balance.', 'published'),
    -- Section 7: Confidentiality
    (ns_id, 'section7_title', 0, 'en', '7. Confidentiality', 'published'),
    (ns_id, 'section7_desc', 0, 'en', 'We treat all client materials and information as confidential. We maintain strict confidentiality protocols and require all translators and staff to sign non-disclosure agreements. We will not disclose, share, or use your materials or information for any purpose other than providing the agreed Services, unless required by law or with your prior written consent.', 'published'),
    -- Section 8: Intellectual Property
    (ns_id, 'section8_title', 0, 'en', '8. Intellectual Property', 'published'),
    (ns_id, 'section8_desc', 0, 'en', 'You retain all intellectual property rights in your source materials. Upon full payment, you will own all intellectual property rights in the translated deliverables. We may retain copies of completed work for quality assurance and internal reference purposes, subject to confidentiality obligations. Translation memories and glossaries developed during projects may be retained by Cethos for use in future projects for you.', 'published'),
    -- Section 9: Limitation of Liability
    (ns_id, 'section9_title', 0, 'en', '9. Limitation of Liability', 'published'),
    (ns_id, 'section9_desc', 0, 'en', 'To the maximum extent permitted by law, Cethos''s total liability for any claim arising from or related to our Services shall not exceed the total fees paid by you for the specific project giving rise to the claim. In no event shall Cethos be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, revenue, data, or business opportunities, regardless of whether we were advised of the possibility of such damages.', 'published'),
    -- Section 10: Indemnification
    (ns_id, 'section10_title', 0, 'en', '10. Indemnification', 'published'),
    (ns_id, 'section10_desc', 0, 'en', 'You agree to indemnify, defend, and hold harmless Cethos and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including reasonable legal fees) arising from: (a) your breach of these Terms; (b) your violation of any third-party rights, including intellectual property rights; or (c) the content of your source materials.', 'published'),
    -- Section 11: Cancellation
    (ns_id, 'section11_title', 0, 'en', '11. Cancellation', 'published'),
    (ns_id, 'section11_intro', 0, 'en', 'You may cancel an order by providing written notice. Cancellation fees apply as follows:', 'published'),
    (ns_id, 'section11_item1', 0, 'en', 'Standard Projects: 25% of the remaining project value for work not yet completed', 'published'),
    (ns_id, 'section11_item2', 0, 'en', 'Rush Projects: 50% of the remaining project value for work not yet completed', 'published'),
    (ns_id, 'section11_completed', 0, 'en', 'Work completed prior to cancellation is fully billable. We reserve the right to cancel or suspend work if you fail to provide required materials, payment, or approvals in a timely manner.', 'published'),
    -- Section 12: Force Majeure
    (ns_id, 'section12_title', 0, 'en', '12. Force Majeure', 'published'),
    (ns_id, 'section12_desc', 0, 'en', 'Neither party shall be liable for delays or failures in performance resulting from circumstances beyond its reasonable control, including but not limited to natural disasters, acts of government, war, terrorism, labor disputes, internet or telecommunications failures, or pandemics. In such events, the affected party shall notify the other party promptly and make reasonable efforts to mitigate the impact.', 'published'),
    -- Section 13: Governing Law
    (ns_id, 'section13_title', 0, 'en', '13. Governing Law', 'published'),
    (ns_id, 'section13_desc', 0, 'en', 'These Terms of Service shall be governed by and construed in accordance with the laws of the Province of Alberta, Canada, without regard to its conflict of law principles. Any disputes arising from or related to these Terms or our Services shall be subject to the exclusive jurisdiction of the courts of Alberta, Canada.', 'published'),
    -- Section 14: Changes to Terms
    (ns_id, 'section14_title', 0, 'en', '14. Changes to Terms', 'published'),
    (ns_id, 'section14_desc', 0, 'en', 'We may update these Terms of Service from time to time. Material changes will be posted on our website with an updated effective date. Your continued use of our Services after such changes constitutes acceptance of the updated terms. We encourage you to review these Terms periodically.', 'published'),
    -- Section 15: Contact Information
    (ns_id, 'section15_title', 0, 'en', '15. Contact Information', 'published'),
    (ns_id, 'section15_desc', 0, 'en', 'If you have questions about these Terms of Service, please contact us:', 'published'),
    -- Contact box
    (ns_id, 'contact_title', 0, 'en', 'Legal Department', 'published'),
    (ns_id, 'contact_company', 0, 'en', 'Cethos Solutions Inc.', 'published'),
    (ns_id, 'contact_location', 0, 'en', 'Calgary, Alberta, Canada', 'published')
  ON CONFLICT (namespace_id, key, segment_index, locale) DO NOTHING;

  -- ============================================================
  -- COOKIES
  -- ============================================================
  INSERT INTO cethosweb_i18n_namespaces (id, name, description)
  VALUES (gen_random_uuid(), 'cookies', 'Cookie policy page')
  ON CONFLICT (name) DO NOTHING;
  SELECT id INTO ns_id FROM cethosweb_i18n_namespaces WHERE name = 'cookies';

  INSERT INTO cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status)
  VALUES
    (ns_id, 'label', 0, 'en', 'Legal', 'published'),
    (ns_id, 'heading', 0, 'en', 'Cookie Policy', 'published'),
    (ns_id, 'hero_description', 0, 'en', 'This policy explains how we use cookies and similar technologies on our website.', 'published'),
    (ns_id, 'highlight_title', 0, 'en', 'About Cookies', 'published'),
    (ns_id, 'highlight_desc', 0, 'en', 'We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By continuing to use our website, you consent to our use of cookies in accordance with this policy.', 'published'),
    (ns_id, 'last_updated_label', 0, 'en', 'Last Updated:', 'published'),
    (ns_id, 'last_updated_date', 0, 'en', 'January 1, 2026', 'published'),
    -- Table headers
    (ns_id, 'table_name', 0, 'en', 'Cookie Name', 'published'),
    (ns_id, 'table_purpose', 0, 'en', 'Purpose', 'published'),
    (ns_id, 'table_duration', 0, 'en', 'Duration', 'published'),
    -- What Are Cookies
    (ns_id, 'what_are_cookies_title', 0, 'en', 'What Are Cookies?', 'published'),
    (ns_id, 'what_are_cookies_p1', 0, 'en', 'Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently, provide information to website owners, and enable certain features. Cookies can be "persistent" (remaining on your device until deleted) or "session" (deleted when you close your browser).', 'published'),
    (ns_id, 'what_are_cookies_p2', 0, 'en', 'We also use similar technologies such as pixels, beacons, and local storage, which function similarly to cookies. References to "cookies" in this policy include these similar technologies.', 'published'),
    -- Essential Cookies
    (ns_id, 'essential_title', 0, 'en', 'Essential Cookies', 'published'),
    (ns_id, 'essential_desc', 0, 'en', 'These cookies are necessary for the website to function properly and cannot be disabled. They are typically set in response to actions you take, such as logging in or filling out forms.', 'published'),
    (ns_id, 'essential_session_purpose', 0, 'en', 'Maintains your session state across page requests', 'published'),
    (ns_id, 'essential_session_duration', 0, 'en', 'Session', 'published'),
    (ns_id, 'essential_csrf_purpose', 0, 'en', 'Protects against cross-site request forgery attacks', 'published'),
    (ns_id, 'essential_csrf_duration', 0, 'en', 'Session', 'published'),
    (ns_id, 'essential_consent_purpose', 0, 'en', 'Stores your cookie consent preferences', 'published'),
    (ns_id, 'essential_consent_duration', 0, 'en', '1 year', 'published'),
    -- Analytics Cookies
    (ns_id, 'analytics_title', 0, 'en', 'Analytics Cookies', 'published'),
    (ns_id, 'analytics_desc', 0, 'en', 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and services.', 'published'),
    (ns_id, 'analytics_ga_purpose', 0, 'en', 'Google Analytics - Distinguishes unique users', 'published'),
    (ns_id, 'analytics_ga_duration', 0, 'en', '2 years', 'published'),
    (ns_id, 'analytics_ga_star_purpose', 0, 'en', 'Google Analytics - Maintains session state', 'published'),
    (ns_id, 'analytics_ga_star_duration', 0, 'en', '2 years', 'published'),
    (ns_id, 'analytics_gid_purpose', 0, 'en', 'Google Analytics - Distinguishes users', 'published'),
    (ns_id, 'analytics_gid_duration', 0, 'en', '24 hours', 'published'),
    -- Marketing Cookies
    (ns_id, 'marketing_title', 0, 'en', 'Marketing Cookies', 'published'),
    (ns_id, 'marketing_desc', 0, 'en', 'These cookies are used to track visitors across websites and display ads that are relevant and engaging for individual users.', 'published'),
    (ns_id, 'marketing_gcl_purpose', 0, 'en', 'Google Ads - Stores conversion data', 'published'),
    (ns_id, 'marketing_gcl_duration', 0, 'en', '90 days', 'published'),
    (ns_id, 'marketing_fbp_purpose', 0, 'en', 'Facebook - Stores and tracks visits across websites', 'published'),
    (ns_id, 'marketing_fbp_duration', 0, 'en', '90 days', 'published'),
    -- Third-Party Cookies
    (ns_id, 'third_party_title', 0, 'en', 'Third-Party Cookies', 'published'),
    (ns_id, 'third_party_desc', 0, 'en', 'Some cookies are placed by third-party services that appear on our pages. We do not control these third-party cookies. The third parties that set these cookies may use them to track your online activity across different websites. Key third-party services we use include:', 'published'),
    (ns_id, 'third_party_item1', 0, 'en', 'Google Analytics: Web analytics service that tracks and reports website traffic', 'published'),
    (ns_id, 'third_party_item2', 0, 'en', 'Google Ads: Advertising platform for conversion tracking and remarketing', 'published'),
    (ns_id, 'third_party_item3', 0, 'en', 'Facebook/Meta: Social media platform for advertising and analytics', 'published'),
    (ns_id, 'third_party_note', 0, 'en', 'Please refer to these third parties'' privacy policies for more information about their data practices.', 'published'),
    -- Managing Preferences
    (ns_id, 'managing_title', 0, 'en', 'Managing Your Cookie Preferences', 'published'),
    (ns_id, 'managing_desc', 0, 'en', 'Most web browsers allow you to control cookies through their settings. You can typically find these settings in the "Options" or "Preferences" menu of your browser. Please note that disabling certain cookies may affect the functionality of our website.', 'published'),
    (ns_id, 'browser_instructions_title', 0, 'en', 'Browser-Specific Instructions', 'published'),
    (ns_id, 'browser_instructions_desc', 0, 'en', 'Learn how to manage cookies in your browser:', 'published'),
    -- Opt-Out Tools
    (ns_id, 'optout_title', 0, 'en', 'Opt-Out Tools', 'published'),
    (ns_id, 'optout_desc', 0, 'en', 'You can also opt out of certain third-party cookies using these tools:', 'published'),
    (ns_id, 'optout_ga', 0, 'en', 'Google Analytics Opt-out Browser Add-on', 'published'),
    (ns_id, 'optout_nai', 0, 'en', 'Network Advertising Initiative Opt-out', 'published'),
    (ns_id, 'optout_daa', 0, 'en', 'Digital Advertising Alliance Opt-out', 'published'),
    -- Do Not Track
    (ns_id, 'dnt_title', 0, 'en', 'Do Not Track', 'published'),
    (ns_id, 'dnt_desc', 0, 'en', 'Some browsers include a "Do Not Track" (DNT) feature that signals to websites that you do not want to be tracked. Because there is no uniform standard for how websites should respond to DNT signals, our website does not currently respond to DNT browser signals. However, you can use the cookie management options described above to control tracking.', 'published'),
    -- Changes
    (ns_id, 'changes_title', 0, 'en', 'Changes to This Policy', 'published'),
    (ns_id, 'changes_desc', 0, 'en', 'We may update this Cookie Policy from time to time to reflect changes in our practices or applicable laws. We will post any changes on this page and update the "Last Updated" date above.', 'published'),
    -- Contact
    (ns_id, 'contact_heading', 0, 'en', 'Contact Us', 'published'),
    (ns_id, 'contact_desc', 0, 'en', 'If you have questions about our use of cookies, please contact us:', 'published'),
    (ns_id, 'contact_title', 0, 'en', 'Privacy Team', 'published'),
    (ns_id, 'contact_company', 0, 'en', 'Cethos Solutions Inc.', 'published'),
    (ns_id, 'contact_location', 0, 'en', 'Calgary, Alberta, Canada', 'published'),
    -- Related links
    (ns_id, 'related_policies', 0, 'en', 'Related Policies:', 'published'),
    (ns_id, 'related_privacy', 0, 'en', 'Privacy Policy', 'published'),
    (ns_id, 'related_terms', 0, 'en', 'Terms of Service', 'published')
  ON CONFLICT (namespace_id, key, segment_index, locale) DO NOTHING;

END $$;
