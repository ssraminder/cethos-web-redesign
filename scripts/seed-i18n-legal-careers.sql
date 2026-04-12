-- Seed i18n namespaces and translations for: careers, privacy, terms, cookies
-- Run against project: lmzoyezvsjgsxveoakdr

-- 1. Create namespaces
INSERT INTO cethosweb_i18n_namespaces (name, description, page_path, sort_order) VALUES
  ('careers.hero', 'Careers page hero section', '/careers', 100),
  ('careers.benefits', 'Careers page benefits section', '/careers', 101),
  ('careers.positions', 'Careers page open positions', '/careers', 102),
  ('careers.freelance', 'Careers page freelance section', '/careers', 103),
  ('careers.contact', 'Careers page contact section', '/careers', 104),
  ('privacy', 'Privacy policy page', '/privacy', 110),
  ('terms', 'Terms of service page', '/terms', 120),
  ('cookies', 'Cookie policy page', '/cookies', 130)
ON CONFLICT (name) DO NOTHING;

-- 2. Insert translations
-- CAREERS - Hero
INSERT INTO cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status)
SELECT n.id, v.key, 0, 'en', v.value, 'published'
FROM cethosweb_i18n_namespaces n,
(VALUES
  ('label', 'Careers'),
  ('heading', 'Join Our Global Team'),
  ('description', 'Be part of a team that bridges languages and cultures. At Cethos, we connect the world through expert translation and localization services.'),
  ('cta_positions', 'View Open Positions'),
  ('cta_freelance', 'Freelance Opportunities')
) AS v(key, value)
WHERE n.name = 'careers.hero'
ON CONFLICT (namespace_id, key, segment_index, locale) DO NOTHING;

-- CAREERS - Benefits
INSERT INTO cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status)
SELECT n.id, v.key, 0, 'en', v.value, 'published'
FROM cethosweb_i18n_namespaces n,
(VALUES
  ('heading', 'Why Work With Us'),
  ('description', 'We offer more than just jobs—we offer careers built on growth, flexibility, and meaningful work.'),
  ('benefit1_title', 'Remote Flexibility'),
  ('benefit1_desc', 'Work from anywhere in the world. We embrace remote work and flexible schedules to support your work-life balance.'),
  ('benefit2_title', 'Professional Growth'),
  ('benefit2_desc', 'Access continuous learning opportunities, certifications, and career advancement paths in the language industry.'),
  ('benefit3_title', 'Health & Wellness'),
  ('benefit3_desc', 'Comprehensive health benefits, wellness programs, and mental health support for full-time employees.'),
  ('benefit4_title', 'Diverse Projects'),
  ('benefit4_desc', 'Work on exciting projects across industries including life sciences, legal, technology, and more.')
) AS v(key, value)
WHERE n.name = 'careers.benefits'
ON CONFLICT (namespace_id, key, segment_index, locale) DO NOTHING;

-- CAREERS - Positions
INSERT INTO cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status)
SELECT n.id, v.key, 0, 'en', v.value, 'published'
FROM cethosweb_i18n_namespaces n,
(VALUES
  ('heading', 'Open Positions'),
  ('description', 'Explore our current openings and find the perfect opportunity to advance your career.'),
  ('apply_now', 'Apply Now'),
  ('pos1_title', 'Senior Medical Translator (German)'),
  ('pos1_department', 'Life Sciences'),
  ('pos1_location', 'Remote'),
  ('pos1_type', 'Contract'),
  ('pos2_title', 'Project Manager'),
  ('pos2_department', 'Operations'),
  ('pos2_location', 'Calgary, AB'),
  ('pos2_type', 'Full-time'),
  ('pos3_title', 'Linguistic Validator (Spanish)'),
  ('pos3_department', 'Life Sciences'),
  ('pos3_location', 'Remote'),
  ('pos3_type', 'Contract'),
  ('pos4_title', 'Quality Assurance Specialist'),
  ('pos4_department', 'Quality'),
  ('pos4_location', 'Dubai, UAE'),
  ('pos4_type', 'Full-time')
) AS v(key, value)
WHERE n.name = 'careers.positions'
ON CONFLICT (namespace_id, key, segment_index, locale) DO NOTHING;

-- CAREERS - Freelance
INSERT INTO cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status)
SELECT n.id, v.key, 0, 'en', v.value, 'published'
FROM cethosweb_i18n_namespaces n,
(VALUES
  ('heading', 'Freelance Linguists'),
  ('description', 'Are you a professional translator, interpreter, or language specialist? Join our network of freelance linguists and work on diverse projects from clients around the world.'),
  ('cta', 'Join Our Network'),
  ('note', 'Send your CV and language combinations to linguists@cethos.com')
) AS v(key, value)
WHERE n.name = 'careers.freelance'
ON CONFLICT (namespace_id, key, segment_index, locale) DO NOTHING;

-- CAREERS - Contact
INSERT INTO cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status)
SELECT n.id, v.key, 0, 'en', v.value, 'published'
FROM cethosweb_i18n_namespaces n,
(VALUES
  ('heading', 'Have Questions?'),
  ('description', 'Our HR team is here to help you with any questions about careers at Cethos.'),
  ('label', 'Contact our careers team:')
) AS v(key, value)
WHERE n.name = 'careers.contact'
ON CONFLICT (namespace_id, key, segment_index, locale) DO NOTHING;

-- PRIVACY PAGE
INSERT INTO cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status)
SELECT n.id, v.key, 0, 'en', v.value, 'published'
FROM cethosweb_i18n_namespaces n,
(VALUES
  ('label', 'Legal'),
  ('heading', 'Privacy Policy'),
  ('hero_description', 'Your privacy is important to us. This policy explains how we collect, use, and protect your information.'),
  ('highlight_title', 'Your Privacy Matters'),
  ('highlight_desc', 'Cethos Solutions Inc. is committed to protecting your privacy and ensuring the security of your personal information. We comply with applicable privacy laws including PIPEDA (Canada) and GDPR (European Union).'),
  ('last_updated_label', 'Last Updated:'),
  ('last_updated_date', 'January 1, 2026'),
  ('section1_title', '1. Information We Collect'),
  ('section1_sub1_title', 'Personal Information'),
  ('section1_sub1_intro', 'We collect personal information that you provide directly to us, including:'),
  ('section1_sub1_item1', 'Name and contact information (email address, phone number, mailing address)'),
  ('section1_sub1_item2', 'Company name and job title'),
  ('section1_sub1_item3', 'Account credentials'),
  ('section1_sub1_item4', 'Payment and billing information'),
  ('section1_sub1_item5', 'Communication preferences'),
  ('section1_sub2_title', 'Documents and Content'),
  ('section1_sub2_intro', 'When you use our translation services, we collect:'),
  ('section1_sub2_item1', 'Source documents submitted for translation'),
  ('section1_sub2_item2', 'Translated documents and deliverables'),
  ('section1_sub2_item3', 'Project specifications and instructions'),
  ('section1_sub2_item4', 'Feedback and communications related to projects'),
  ('section1_sub3_title', 'Automatic Information'),
  ('section1_sub3_intro', 'We automatically collect certain information when you visit our website:'),
  ('section1_sub3_item1', 'IP address and device information'),
  ('section1_sub3_item2', 'Browser type and operating system'),
  ('section1_sub3_item3', 'Pages visited and time spent on our website'),
  ('section1_sub3_item4', 'Referring website or source'),
  ('section1_sub3_item5', 'Cookies and similar tracking technologies (see our Cookie Policy)'),
  ('section2_title', '2. How We Use Your Information'),
  ('section2_intro', 'We use the information we collect for the following purposes:'),
  ('section2_item1', 'Providing and delivering our translation and localization services'),
  ('section2_item2', 'Processing payments and managing your account'),
  ('section2_item3', 'Communicating with you about projects, updates, and support'),
  ('section2_item4', 'Improving our services and developing new features'),
  ('section2_item5', 'Analyzing website usage and optimizing user experience'),
  ('section2_item6', 'Complying with legal obligations and protecting our rights'),
  ('section2_item7', 'Marketing and promotional communications (with your consent)'),
  ('section3_title', '3. Information Sharing and Disclosure'),
  ('section3_intro', 'We may share your information in the following circumstances:'),
  ('section3_item1', 'Service Providers: We work with trusted linguists, translators, and technology partners who assist in delivering our services. These parties are bound by confidentiality agreements.'),
  ('section3_item2', 'Business Transfers: In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.'),
  ('section3_item3', 'Legal Requirements: We may disclose information when required by law, court order, or government request.'),
  ('section3_item4', 'Protection of Rights: We may share information to protect our rights, privacy, safety, or property.'),
  ('section3_no_sell', 'We do not sell your personal information to third parties for marketing purposes.'),
  ('section4_title', '4. Data Security'),
  ('section4_intro', 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:'),
  ('section4_item1', 'Encryption of data in transit and at rest'),
  ('section4_item2', 'Secure access controls and authentication'),
  ('section4_item3', 'Regular security assessments and audits'),
  ('section4_item4', 'Employee training on data protection'),
  ('section4_item5', 'Confidentiality agreements with all personnel and contractors'),
  ('section5_title', '5. Data Retention'),
  ('section5_p1', 'We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations, resolve disputes, and enforce our agreements. The specific retention period depends on the nature of the information and the purpose for which it was collected.'),
  ('section5_p2', 'Project documents and translations are retained according to our document retention policy and applicable industry regulations, unless you request earlier deletion.'),
  ('section6_title', '6. Your Privacy Rights'),
  ('section6_sub1_title', 'All Users'),
  ('section6_sub1_intro', 'Depending on your location, you may have the following rights:'),
  ('section6_sub1_item1', 'Access your personal information'),
  ('section6_sub1_item2', 'Correct inaccurate or incomplete information'),
  ('section6_sub1_item3', 'Request deletion of your information'),
  ('section6_sub1_item4', 'Opt out of marketing communications'),
  ('section6_sub1_item5', 'Request a copy of your data in a portable format'),
  ('section6_sub2_title', 'Canadian Residents (PIPEDA)'),
  ('section6_sub2_desc', 'Under the Personal Information Protection and Electronic Documents Act (PIPEDA), you have the right to access and correct your personal information held by us. You may also withdraw consent for certain processing activities. To exercise these rights, please contact our Privacy Officer.'),
  ('section6_sub3_title', 'European Residents (GDPR)'),
  ('section6_sub3_desc', 'If you are located in the European Economic Area, you have additional rights under the General Data Protection Regulation (GDPR), including the right to object to processing, request restriction of processing, and lodge a complaint with a supervisory authority. Our legal basis for processing includes contractual necessity, legitimate interests, and consent.'),
  ('section7_title', '7. International Data Transfers'),
  ('section7_desc', 'As a global translation service provider, we may transfer your information to countries outside your country of residence. When we transfer data internationally, we implement appropriate safeguards to protect your information, including standard contractual clauses and ensuring our partners maintain adequate data protection standards.'),
  ('section8_title', '8. Children''s Privacy'),
  ('section8_desc', 'Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child, we will take steps to delete such information promptly.'),
  ('section9_title', '9. Changes to This Policy'),
  ('section9_desc', 'We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the updated policy on our website and updating the "Last Updated" date. We encourage you to review this policy periodically.'),
  ('section10_title', '10. Contact Us'),
  ('section10_desc', 'If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact us:'),
  ('contact_title', 'Privacy Officer'),
  ('contact_company', 'Cethos Solutions Inc.'),
  ('contact_location', 'Calgary, Alberta, Canada')
) AS v(key, value)
WHERE n.name = 'privacy'
ON CONFLICT (namespace_id, key, segment_index, locale) DO NOTHING;

-- TERMS PAGE
INSERT INTO cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status)
SELECT n.id, v.key, 0, 'en', v.value, 'published'
FROM cethosweb_i18n_namespaces n,
(VALUES
  ('label', 'Legal'),
  ('heading', 'Terms of Service'),
  ('hero_description', 'Please read these terms carefully before using our services.'),
  ('highlight_title', 'Agreement to Terms'),
  ('highlight_desc', 'By using Cethos Solutions Inc.''s services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our services.'),
  ('effective_date_label', 'Effective Date:'),
  ('effective_date', 'January 1, 2026'),
  ('section1_title', '1. Services'),
  ('section1_desc', 'Cethos Solutions Inc. ("Cethos," "we," "us," or "our") provides professional translation, localization, interpretation, and related language services ("Services"). These Terms of Service govern your use of our Services and constitute a binding agreement between you ("Client," "you," or "your") and Cethos.'),
  ('section2_title', '2. Ordering and Acceptance'),
  ('section2_intro', 'Orders for Services may be placed through our website, email, or other agreed-upon channels. Each order is subject to acceptance by Cethos. An order is accepted when we provide written confirmation, including a quote or project agreement specifying:'),
  ('section2_item1', 'Scope of Services and deliverables'),
  ('section2_item2', 'Language pairs and target formats'),
  ('section2_item3', 'Delivery timeline and milestones'),
  ('section2_item4', 'Pricing and payment terms'),
  ('section2_item5', 'Any special requirements or instructions'),
  ('section2_acceptance', 'Your acceptance of the quote or project agreement, whether by written confirmation, payment of deposit, or submission of source materials, constitutes your agreement to these Terms of Service.'),
  ('section3_title', '3. Client Responsibilities'),
  ('section3_intro', 'To enable us to provide high-quality Services, you agree to:'),
  ('section3_item1', 'Provide accurate and complete source materials in agreed formats'),
  ('section3_item2', 'Supply reference materials, glossaries, and style guides as applicable'),
  ('section3_item3', 'Respond promptly to queries and requests for clarification'),
  ('section3_item4', 'Designate a point of contact for project communications'),
  ('section3_item5', 'Review and approve deliverables within agreed timeframes'),
  ('section3_item6', 'Ensure you have the right to have the content translated'),
  ('section4_title', '4. Delivery and Acceptance'),
  ('section4_desc', 'We will deliver completed work by the agreed deadline. Delivery is deemed complete upon transmission of the deliverables to you via email or other agreed method. You will have a review period of ten (10) business days from delivery to inspect the work and notify us of any issues. If no notice is received within this period, the deliverables are deemed accepted.'),
  ('section5_title', '5. Revisions and Quality'),
  ('section5_desc', 'We are committed to delivering high-quality work that meets your specifications. If you identify errors or issues with the delivered work that represent a deviation from the agreed specifications, please notify us within the review period. We will correct verifiable errors at no additional charge. Requests for revisions beyond the original scope, changes to specifications, or preference-based changes may be subject to additional fees.'),
  ('section6_title', '6. Payment Terms'),
  ('section6_intro', 'Payment terms are Net 30 days from the invoice date unless otherwise agreed in writing. We accept payment by:'),
  ('section6_item1', 'Bank transfer (wire transfer)'),
  ('section6_item2', 'Credit card'),
  ('section6_item3', 'Other methods as agreed'),
  ('section6_deposit', 'For new clients or large projects, we may require a deposit of up to 50% before commencing work. Late payments may be subject to interest charges of 1.5% per month on the outstanding balance.'),
  ('section7_title', '7. Confidentiality'),
  ('section7_desc', 'We treat all client materials and information as confidential. We maintain strict confidentiality protocols and require all translators and staff to sign non-disclosure agreements. We will not disclose, share, or use your materials or information for any purpose other than providing the agreed Services, unless required by law or with your prior written consent.'),
  ('section8_title', '8. Intellectual Property'),
  ('section8_desc', 'You retain all intellectual property rights in your source materials. Upon full payment, you will own all intellectual property rights in the translated deliverables. We may retain copies of completed work for quality assurance and internal reference purposes, subject to confidentiality obligations. Translation memories and glossaries developed during projects may be retained by Cethos for use in future projects for you.'),
  ('section9_title', '9. Limitation of Liability'),
  ('section9_desc', 'To the maximum extent permitted by law, Cethos''s total liability for any claim arising from or related to our Services shall not exceed the total fees paid by you for the specific project giving rise to the claim. In no event shall Cethos be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, revenue, data, or business opportunities, regardless of whether we were advised of the possibility of such damages.'),
  ('section10_title', '10. Indemnification'),
  ('section10_desc', 'You agree to indemnify, defend, and hold harmless Cethos and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including reasonable legal fees) arising from: (a) your breach of these Terms; (b) your violation of any third-party rights, including intellectual property rights; or (c) the content of your source materials.'),
  ('section11_title', '11. Cancellation'),
  ('section11_intro', 'You may cancel an order by providing written notice. Cancellation fees apply as follows:'),
  ('section11_item1', 'Standard Projects: 25% of the remaining project value for work not yet completed'),
  ('section11_item2', 'Rush Projects: 50% of the remaining project value for work not yet completed'),
  ('section11_completed', 'Work completed prior to cancellation is fully billable. We reserve the right to cancel or suspend work if you fail to provide required materials, payment, or approvals in a timely manner.'),
  ('section12_title', '12. Force Majeure'),
  ('section12_desc', 'Neither party shall be liable for delays or failures in performance resulting from circumstances beyond its reasonable control, including but not limited to natural disasters, acts of government, war, terrorism, labor disputes, internet or telecommunications failures, or pandemics. In such events, the affected party shall notify the other party promptly and make reasonable efforts to mitigate the impact.'),
  ('section13_title', '13. Governing Law'),
  ('section13_desc', 'These Terms of Service shall be governed by and construed in accordance with the laws of the Province of Alberta, Canada, without regard to its conflict of law principles. Any disputes arising from or related to these Terms or our Services shall be subject to the exclusive jurisdiction of the courts of Alberta, Canada.'),
  ('section14_title', '14. Changes to Terms'),
  ('section14_desc', 'We may update these Terms of Service from time to time. Material changes will be posted on our website with an updated effective date. Your continued use of our Services after such changes constitutes acceptance of the updated terms. We encourage you to review these Terms periodically.'),
  ('section15_title', '15. Contact Information'),
  ('section15_desc', 'If you have questions about these Terms of Service, please contact us:'),
  ('contact_title', 'Legal Department'),
  ('contact_company', 'Cethos Solutions Inc.'),
  ('contact_location', 'Calgary, Alberta, Canada')
) AS v(key, value)
WHERE n.name = 'terms'
ON CONFLICT (namespace_id, key, segment_index, locale) DO NOTHING;

-- COOKIES PAGE
INSERT INTO cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status)
SELECT n.id, v.key, 0, 'en', v.value, 'published'
FROM cethosweb_i18n_namespaces n,
(VALUES
  ('label', 'Legal'),
  ('heading', 'Cookie Policy'),
  ('hero_description', 'This policy explains how we use cookies and similar technologies on our website.'),
  ('highlight_title', 'About Cookies'),
  ('highlight_desc', 'We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By continuing to use our website, you consent to our use of cookies in accordance with this policy.'),
  ('last_updated_label', 'Last Updated:'),
  ('last_updated_date', 'January 1, 2026'),
  ('table_name', 'Cookie Name'),
  ('table_purpose', 'Purpose'),
  ('table_duration', 'Duration'),
  ('what_are_cookies_title', 'What Are Cookies?'),
  ('what_are_cookies_p1', 'Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently, provide information to website owners, and enable certain features. Cookies can be "persistent" (remaining on your device until deleted) or "session" (deleted when you close your browser).'),
  ('what_are_cookies_p2', 'We also use similar technologies such as pixels, beacons, and local storage, which function similarly to cookies. References to "cookies" in this policy include these similar technologies.'),
  ('essential_title', 'Essential Cookies'),
  ('essential_desc', 'These cookies are necessary for the website to function properly and cannot be disabled. They are typically set in response to actions you take, such as logging in or filling out forms.'),
  ('essential_session_purpose', 'Maintains your session state across page requests'),
  ('essential_session_duration', 'Session'),
  ('essential_csrf_purpose', 'Protects against cross-site request forgery attacks'),
  ('essential_csrf_duration', 'Session'),
  ('essential_consent_purpose', 'Stores your cookie consent preferences'),
  ('essential_consent_duration', '1 year'),
  ('analytics_title', 'Analytics Cookies'),
  ('analytics_desc', 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and services.'),
  ('analytics_ga_purpose', 'Google Analytics - Distinguishes unique users'),
  ('analytics_ga_duration', '2 years'),
  ('analytics_ga_star_purpose', 'Google Analytics - Maintains session state'),
  ('analytics_ga_star_duration', '2 years'),
  ('analytics_gid_purpose', 'Google Analytics - Distinguishes users'),
  ('analytics_gid_duration', '24 hours'),
  ('marketing_title', 'Marketing Cookies'),
  ('marketing_desc', 'These cookies are used to track visitors across websites and display ads that are relevant and engaging for individual users.'),
  ('marketing_gcl_purpose', 'Google Ads - Stores conversion data'),
  ('marketing_gcl_duration', '90 days'),
  ('marketing_fbp_purpose', 'Facebook - Stores and tracks visits across websites'),
  ('marketing_fbp_duration', '90 days'),
  ('third_party_title', 'Third-Party Cookies'),
  ('third_party_desc', 'Some cookies are placed by third-party services that appear on our pages. We do not control these third-party cookies. The third parties that set these cookies may use them to track your online activity across different websites. Key third-party services we use include:'),
  ('third_party_item1', 'Google Analytics: Web analytics service that tracks and reports website traffic'),
  ('third_party_item2', 'Google Ads: Advertising platform for conversion tracking and remarketing'),
  ('third_party_item3', 'Facebook/Meta: Social media platform for advertising and analytics'),
  ('third_party_note', 'Please refer to these third parties'' privacy policies for more information about their data practices.'),
  ('managing_title', 'Managing Your Cookie Preferences'),
  ('managing_desc', 'Most web browsers allow you to control cookies through their settings. You can typically find these settings in the "Options" or "Preferences" menu of your browser. Please note that disabling certain cookies may affect the functionality of our website.'),
  ('browser_instructions_title', 'Browser-Specific Instructions'),
  ('browser_instructions_desc', 'Learn how to manage cookies in your browser:'),
  ('optout_title', 'Opt-Out Tools'),
  ('optout_desc', 'You can also opt out of certain third-party cookies using these tools:'),
  ('optout_ga', 'Google Analytics Opt-out Browser Add-on'),
  ('optout_nai', 'Network Advertising Initiative Opt-out'),
  ('optout_daa', 'Digital Advertising Alliance Opt-out'),
  ('dnt_title', 'Do Not Track'),
  ('dnt_desc', 'Some browsers include a "Do Not Track" (DNT) feature that signals to websites that you do not want to be tracked. Because there is no uniform standard for how websites should respond to DNT signals, our website does not currently respond to DNT browser signals. However, you can use the cookie management options described above to control tracking.'),
  ('changes_title', 'Changes to This Policy'),
  ('changes_desc', 'We may update this Cookie Policy from time to time to reflect changes in our practices or applicable laws. We will post any changes on this page and update the "Last Updated" date above.'),
  ('contact_heading', 'Contact Us'),
  ('contact_desc', 'If you have questions about our use of cookies, please contact us:'),
  ('contact_title', 'Privacy Team'),
  ('contact_company', 'Cethos Solutions Inc.'),
  ('contact_location', 'Calgary, Alberta, Canada'),
  ('related_policies', 'Related Policies:'),
  ('related_privacy', 'Privacy Policy'),
  ('related_terms', 'Terms of Service')
) AS v(key, value)
WHERE n.name = 'cookies'
ON CONFLICT (namespace_id, key, segment_index, locale) DO NOTHING;
