/**
 * Seed i18n translations into Supabase.
 * Run with: npx tsx scripts/seed-i18n.ts
 */
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

type TranslationSeed = {
  namespace: string
  key: string
  value: string
  context_note?: string
}

const translations: TranslationSeed[] = [
  // =============================================
  // ABOUT PAGE - Hero
  // =============================================
  { namespace: 'about.hero', key: 'breadcrumb_home', value: 'Home' },
  { namespace: 'about.hero', key: 'breadcrumb_about', value: 'About' },
  { namespace: 'about.hero', key: 'heading', value: 'Global Communication. Local Precision.' },
  { namespace: 'about.hero', key: 'description', value: 'Cethos Solutions Inc. is a Canadian translation company with offices across three continents—serving life sciences enterprises and individuals worldwide in 200+ languages.' },
  { namespace: 'about.hero', key: 'cta_quote', value: 'Get a Quote' },
  { namespace: 'about.hero', key: 'cta_contact', value: 'Contact Us' },
  { namespace: 'about.hero', key: 'trust_founded', value: 'Founded 2015' },
  { namespace: 'about.hero', key: 'trust_languages', value: '200+ Languages' },
  { namespace: 'about.hero', key: 'trust_offices', value: 'Offices in Canada, UAE & India' },
  { namespace: 'about.hero', key: 'trust_iso', value: 'ISO 17100 Compliant' },

  // =============================================
  // ABOUT PAGE - Story
  // =============================================
  { namespace: 'about.story', key: 'heading', value: 'Our Story' },
  { namespace: 'about.story', key: 'para1', value: 'Founded in 2015, Cethos Solutions Inc. has grown from a Canadian translation agency into a global language services provider with operations spanning three continents.' },
  { namespace: 'about.story', key: 'para2', value: 'What started as a mission to bridge language barriers has evolved into an international operation trusted by Fortune 500 pharmaceutical companies, multinational energy corporations, and government agencies worldwide—alongside thousands of individuals and families navigating immigration processes.' },
  { namespace: 'about.story', key: 'para3', value: 'Today, our team of 5,000+ linguists serves clients in over 50 countries, delivering translations in 200+ languages with offices strategically positioned across North America, the Middle East, and Asia-Pacific.' },
  { namespace: 'about.story', key: 'para4', value: 'Our name "Cethos" reflects our commitment to bridging cultures—connecting people, businesses, and ideas across linguistic boundaries.' },
  { namespace: 'about.story', key: 'badge_canadian', value: 'Canadian-Owned\nOperating' },
  { namespace: 'about.story', key: 'badge_bbb', value: 'BBB A+\nAccredited' },
  { namespace: 'about.story', key: 'badge_ailia', value: 'AILIA Corporate\nMember' },
  { namespace: 'about.story', key: 'badge_gov', value: 'Government of Alberta\nApproved' },
  { namespace: 'about.story', key: 'badge_team', value: 'Global Team' },

  // =============================================
  // ABOUT PAGE - Offices
  // =============================================
  { namespace: 'about.offices', key: 'heading', value: 'Global Operations. Canadian Roots.' },
  { namespace: 'about.offices', key: 'description', value: 'Headquartered in Canada with strategic offices in the UAE and India, Cethos serves clients across six continents. Our distributed model isn\'t just about time zones—it\'s about having local expertise where our clients and their audiences are.' },
  { namespace: 'about.offices', key: 'calgary_title', value: 'Calgary, Canada' },
  { namespace: 'about.offices', key: 'calgary_label', value: 'Corporate Headquarters' },
  { namespace: 'about.offices', key: 'calgary_desc', value: 'Home to our executive team, life sciences division, and enterprise client management. As a Canadian company, we bring North American business standards, data privacy compliance (PIPEDA), and direct access to Government of Alberta approved certified translations.' },
  { namespace: 'about.offices', key: 'dubai_title', value: 'Dubai, UAE' },
  { namespace: 'about.offices', key: 'dubai_label', value: 'EMEA Hub' },
  { namespace: 'about.offices', key: 'dubai_desc', value: 'Our Middle East office coordinates European, Middle Eastern, and African language projects. Strategically positioned for regulatory submissions to EMA and support for Arabic, Farsi, Turkish, and African language translations.' },
  { namespace: 'about.offices', key: 'india_title', value: 'Patiala, India' },
  { namespace: 'about.offices', key: 'india_label', value: 'Asia-Pacific Production Center' },
  { namespace: 'about.offices', key: 'india_desc', value: 'Our largest production facility powers translations across South Asian, Southeast Asian, and East Asian languages. Home to our 24/7 support operations and linguist network management.' },
  { namespace: 'about.offices', key: 'stat_countries', value: '50+ Countries' },
  { namespace: 'about.offices', key: 'stat_countries_desc', value: 'Clients across six continents' },
  { namespace: 'about.offices', key: 'stat_operations', value: '24/7 Operations' },
  { namespace: 'about.offices', key: 'stat_operations_desc', value: 'Follow-the-sun coverage' },
  { namespace: 'about.offices', key: 'stat_speakers', value: 'Native Speakers' },
  { namespace: 'about.offices', key: 'stat_speakers_desc', value: 'Local expertise worldwide' },
  { namespace: 'about.offices', key: 'stat_jurisdictions', value: 'Multi-Jurisdictional' },
  { namespace: 'about.offices', key: 'stat_jurisdictions_desc', value: 'FDA, EMA, Health Canada' },
  { namespace: 'about.offices', key: 'detail_heading', value: 'Local Expertise. Global Scale.' },
  { namespace: 'about.offices', key: 'detail_desc', value: 'Three offices across three time zones ensure your projects move forward 24 hours a day.' },
  { namespace: 'about.offices', key: 'follow_sun_quote', value: '"When Calgary sleeps, Dubai works. When Dubai rests, India delivers. Your projects move forward 24 hours a day."' },

  // =============================================
  // ABOUT PAGE - Stats
  // =============================================
  { namespace: 'about.stats', key: 'heading', value: 'By The Numbers' },
  { namespace: 'about.stats', key: 'languages', value: '200+' },
  { namespace: 'about.stats', key: 'languages_label', value: 'Languages Supported' },
  { namespace: 'about.stats', key: 'countries', value: '50+' },
  { namespace: 'about.stats', key: 'countries_label', value: 'Countries Served' },
  { namespace: 'about.stats', key: 'linguists', value: '5,000+' },
  { namespace: 'about.stats', key: 'linguists_label', value: 'Professional Linguists' },
  { namespace: 'about.stats', key: 'moderators', value: '1,000+' },
  { namespace: 'about.stats', key: 'moderators_label', value: 'Debriefing Moderators' },
  { namespace: 'about.stats', key: 'areas', value: '25+' },
  { namespace: 'about.stats', key: 'areas_label', value: 'Therapeutic Areas' },
  { namespace: 'about.stats', key: 'rating', value: '4.9' },
  { namespace: 'about.stats', key: 'rating_label', value: 'Google Rating' },

  // =============================================
  // ABOUT PAGE - Differentiators
  // =============================================
  { namespace: 'about.differentiators', key: 'heading', value: 'The Cethos Difference' },
  { namespace: 'about.differentiators', key: 'human_title', value: 'Human Translations' },
  { namespace: 'about.differentiators', key: 'human_desc', value: 'Every translation is performed by professional human linguists—never raw machine translation. We use technology to enhance consistency and efficiency, but human expertise drives quality.' },
  { namespace: 'about.differentiators', key: 'expertise_title', value: 'Subject Matter Expertise' },
  { namespace: 'about.differentiators', key: 'expertise_desc', value: 'Our translators aren\'t just language experts—they\'re specialists in their fields. Medical translators with PhDs. Legal translators who are practicing lawyers. Real expertise matters.' },
  { namespace: 'about.differentiators', key: 'quality_title', value: 'Rigorous Quality Control' },
  { namespace: 'about.differentiators', key: 'quality_desc', value: 'Multi-step review process including translation, editing, proofreading, and specialized review (clinician review for medical, legal review for contracts). Nothing ships without multiple expert eyes.' },
  { namespace: 'about.differentiators', key: 'fast_title', value: 'Flexible & Fast' },
  { namespace: 'about.differentiators', key: 'fast_desc', value: 'From same-day certified translations to year-long clinical trial programs, we scale to your needs. Rush delivery available without compromising quality.' },
  { namespace: 'about.differentiators', key: 'transparent_title', value: 'Transparent Communication' },
  { namespace: 'about.differentiators', key: 'transparent_desc', value: 'Clear, upfront quotes with no hidden fees. Dedicated project managers. Real-time status updates. Enterprise projects receive detailed quotes within 24 hours.' },
  { namespace: 'about.differentiators', key: 'secure_title', value: 'Secure & Confidential' },
  { namespace: 'about.differentiators', key: 'secure_desc', value: 'Bank-level encryption, secure file transfer, NDA protection, and compliance with global data protection regulations. Your data stays safe.' },

  // =============================================
  // ABOUT PAGE - CTA
  // =============================================
  { namespace: 'about.cta', key: 'heading', value: 'Ready to Work With Us?' },
  { namespace: 'about.cta', key: 'description', value: 'Whether you need a single document translated or a global clinical trial supported, we\'re here to help.' },
  { namespace: 'about.cta', key: 'cta_quote', value: 'Get a Free Quote' },
  { namespace: 'about.cta', key: 'cta_contact', value: 'Contact Our Team' },

  // =============================================
  // ABOUT PAGE - FAQ
  // =============================================
  { namespace: 'about.faq', key: 'q1', value: 'Where is Cethos located?' },
  { namespace: 'about.faq', key: 'a1', value: 'Our corporate headquarters is in Calgary, Canada, with additional offices in Dubai, UAE and Patiala, India. We serve clients across Canada and in 50+ countries worldwide. This three-continent presence enables 24/7 operations and local expertise worldwide.' },
  { namespace: 'about.faq', key: 'q2', value: 'Are your translations accepted by IRCC?' },
  { namespace: 'about.faq', key: 'a2', value: 'Yes. We are approved by the Government of Alberta and our certified translations are accepted by IRCC, Service Alberta, universities, and legal institutions across Canada.' },
  { namespace: 'about.faq', key: 'q3', value: 'Do you use machine translation?' },
  { namespace: 'about.faq', key: 'a3', value: 'No. All translations are performed by professional human linguists. We use technology for consistency and quality assurance, but never for the translation itself.' },
  { namespace: 'about.faq', key: 'q4', value: 'Do you work with clients outside of Canada?' },
  { namespace: 'about.faq', key: 'a4', value: 'Absolutely. We serve clients in 50+ countries across six continents, including the US, UK, EU, Middle East, and Asia-Pacific regions.' },
  { namespace: 'about.faq', key: 'q5', value: 'What industries do you specialize in?' },
  { namespace: 'about.faq', key: 'a5', value: 'Life sciences (pharmaceutical, biotech, medical devices), oil & gas, legal, immigration, technology, and finance. We have deep expertise in regulated industries.' },
  { namespace: 'about.faq', key: 'q6', value: 'How quickly can you deliver?' },
  { namespace: 'about.faq', key: 'a6', value: 'Standard certified translations are completed in 1-2 business days. Rush service (same-day or 24-hour) is available. Enterprise project timelines are based on scope.' },
  { namespace: 'about.faq', key: 'heading', value: 'Frequently Asked Questions' },

  // =============================================
  // ABOUT PAGE - Office Detail Cards
  // =============================================
  { namespace: 'about.offices', key: 'detail_calgary_region', value: 'North America' },
  { namespace: 'about.offices', key: 'detail_calgary_city', value: 'Calgary, Canada' },
  { namespace: 'about.offices', key: 'detail_calgary_badge', value: 'CORPORATE HEADQUARTERS' },
  { namespace: 'about.offices', key: 'detail_calgary_address', value: '421 7 Avenue SW, Floor 30<br/>Calgary, AB T2P 4K9, Canada' },
  { namespace: 'about.offices', key: 'detail_calgary_hours', value: 'Mon\u2013Fri, 9:00 AM \u2013 5:00 PM MST' },
  { namespace: 'about.offices', key: 'detail_calgary_phone', value: '(587) 600-0786' },
  { namespace: 'about.offices', key: 'detail_calgary_svc1', value: 'Executive Leadership' },
  { namespace: 'about.offices', key: 'detail_calgary_svc2', value: 'Life Sciences Division' },
  { namespace: 'about.offices', key: 'detail_calgary_svc3', value: 'Enterprise Sales' },
  { namespace: 'about.offices', key: 'detail_calgary_svc4', value: 'Quality Assurance' },
  { namespace: 'about.offices', key: 'detail_services_label', value: 'SERVICES' },
  { namespace: 'about.offices', key: 'detail_dubai_region', value: 'EMEA' },
  { namespace: 'about.offices', key: 'detail_dubai_city', value: 'Dubai, UAE' },
  { namespace: 'about.offices', key: 'detail_dubai_badge', value: 'EUROPE, MIDDLE EAST & AFRICA HUB' },
  { namespace: 'about.offices', key: 'detail_dubai_address', value: 'Building A1, Dubai Digital Park<br/>Dubai Silicon Oasis, Dubai, UAE' },
  { namespace: 'about.offices', key: 'detail_dubai_hours', value: 'Sun\u2013Thu, 9:00 AM \u2013 6:00 PM GST' },
  { namespace: 'about.offices', key: 'detail_dubai_svc1', value: 'European Coordination' },
  { namespace: 'about.offices', key: 'detail_dubai_svc2', value: 'EMA Submissions' },
  { namespace: 'about.offices', key: 'detail_dubai_svc3', value: 'Arabic Languages' },
  { namespace: 'about.offices', key: 'detail_dubai_svc4', value: 'EMEA Support' },
  { namespace: 'about.offices', key: 'detail_india_region', value: 'Asia-Pacific' },
  { namespace: 'about.offices', key: 'detail_india_city', value: 'Patiala, India' },
  { namespace: 'about.offices', key: 'detail_india_badge', value: 'PRODUCTION CENTER' },
  { namespace: 'about.offices', key: 'detail_india_address', value: '158/3, Dharampura Bazaar<br/>Patiala 147001, Punjab, India' },
  { namespace: 'about.offices', key: 'detail_india_hours', value: 'Mon\u2013Fri, 9:00 AM \u2013 6:00 PM IST' },
  { namespace: 'about.offices', key: 'detail_india_svc1', value: '24/7 Support' },
  { namespace: 'about.offices', key: 'detail_india_svc2', value: 'Production Operations' },
  { namespace: 'about.offices', key: 'detail_india_svc3', value: 'Asian Languages' },
  { namespace: 'about.offices', key: 'detail_india_svc4', value: 'Linguist Network' },
  { namespace: 'about.offices', key: 'follow_sun_label', value: 'FOLLOW-THE-SUN OPERATIONS' },

  // =============================================
  // ABOUT PAGE - Services (Service Pillars)
  // =============================================
  { namespace: 'about.services', key: 'heading', value: 'Expert Translation Across Industries' },
  { namespace: 'about.services', key: 'lifesci_title', value: 'Life Sciences Translation' },
  { namespace: 'about.services', key: 'lifesci_desc', value: 'For pharmaceutical, biotech, and medical device companies conducting global clinical trials and regulatory submissions.' },
  { namespace: 'about.services', key: 'lifesci_item1', value: 'Linguistic Validation (ISPOR methodology)' },
  { namespace: 'about.services', key: 'lifesci_item2', value: 'Cognitive Debriefing' },
  { namespace: 'about.services', key: 'lifesci_item3', value: 'Clinician Review' },
  { namespace: 'about.services', key: 'lifesci_item4', value: 'Clinical Trial Documentation' },
  { namespace: 'about.services', key: 'lifesci_item5', value: 'Regulatory Affairs Translation' },
  { namespace: 'about.services', key: 'lifesci_item6', value: 'Pharmacovigilance & Safety' },
  { namespace: 'about.services', key: 'lifesci_item7', value: 'eCOA/ePRO Migration' },
  { namespace: 'about.services', key: 'lifesci_item8', value: 'Medical Device IFUs' },
  { namespace: 'about.services', key: 'lifesci_link', value: 'Learn More' },
  { namespace: 'about.services', key: 'certified_title', value: 'Certified Translation' },
  { namespace: 'about.services', key: 'certified_desc', value: 'For individuals and businesses needing official document translation accepted by IRCC, Government of Alberta, and institutions worldwide.' },
  { namespace: 'about.services', key: 'certified_item1', value: 'Immigration Documents (IRCC approved)' },
  { namespace: 'about.services', key: 'certified_item2', value: 'Birth & Marriage Certificates' },
  { namespace: 'about.services', key: 'certified_item3', value: 'Academic Transcripts & Diplomas' },
  { namespace: 'about.services', key: 'certified_item4', value: "Driver's License Translation" },
  { namespace: 'about.services', key: 'certified_item5', value: 'Legal Documents & Contracts' },
  { namespace: 'about.services', key: 'certified_item6', value: 'Business Documents' },
  { namespace: 'about.services', key: 'certified_badge1', value: 'Government of Alberta Approved' },
  { namespace: 'about.services', key: 'certified_badge2', value: 'Same-day service available' },
  { namespace: 'about.services', key: 'certified_link', value: 'Get a Quote' },

  // =============================================
  // ABOUT PAGE - Industries
  // =============================================
  { namespace: 'about.industries', key: 'heading', value: 'Industries We Serve' },
  { namespace: 'about.industries', key: 'description', value: 'Deep expertise across regulated industries worldwide.' },
  { namespace: 'about.industries', key: 'pharma', value: 'Pharmaceutical & Biotech' },
  { namespace: 'about.industries', key: 'medical_devices', value: 'Medical Devices' },
  { namespace: 'about.industries', key: 'oil_gas', value: 'Oil & Gas' },
  { namespace: 'about.industries', key: 'healthcare', value: 'Healthcare' },
  { namespace: 'about.industries', key: 'legal', value: 'Legal' },
  { namespace: 'about.industries', key: 'immigration', value: 'Immigration' },
  { namespace: 'about.industries', key: 'technology', value: 'Technology' },
  { namespace: 'about.industries', key: 'finance', value: 'Finance & Banking' },
  { namespace: 'about.industries', key: 'energy_mining', value: 'Energy & Mining' },
  { namespace: 'about.industries', key: 'government', value: 'Government' },

  // =============================================
  // ABOUT PAGE - Quality & Compliance
  // =============================================
  { namespace: 'about.quality', key: 'heading', value: 'Quality Without Compromise' },
  { namespace: 'about.quality', key: 'description', value: 'Our processes align with international standards for translation quality, data security, and regulatory compliance.' },
  { namespace: 'about.quality', key: 'status_compliant', value: 'Compliant' },
  { namespace: 'about.quality', key: 'status_followed', value: 'Followed' },
  { namespace: 'about.quality', key: 'iso17100_desc', value: 'Translation services quality standard' },
  { namespace: 'about.quality', key: 'iso9001_desc', value: 'Quality management systems' },
  { namespace: 'about.quality', key: 'gcp_desc', value: 'Good Clinical Practice' },
  { namespace: 'about.quality', key: 'ispor_name', value: 'ISPOR Guidelines' },
  { namespace: 'about.quality', key: 'ispor_desc', value: 'Linguistic validation standards' },
  { namespace: 'about.quality', key: 'gdpr_desc', value: 'European data protection' },
  { namespace: 'about.quality', key: 'pipeda_desc', value: 'Canadian privacy legislation' },
  { namespace: 'about.quality', key: 'hipaa_desc', value: 'US healthcare data protection' },
  { namespace: 'about.quality', key: 'bbb_label', value: 'Accredited Business' },
  { namespace: 'about.quality', key: 'ailia_label', value: 'Corporate Member' },
  { namespace: 'about.quality', key: 'gov_alberta_name', value: 'Gov. of Alberta' },
  { namespace: 'about.quality', key: 'gov_alberta_label', value: 'Approved Provider' },

  // =============================================
  // SERVICES LANDING PAGE - Hero
  // =============================================
  { namespace: 'services.hero', key: 'breadcrumb_home', value: 'Home' },
  { namespace: 'services.hero', key: 'breadcrumb_services', value: 'Services' },
  { namespace: 'services.hero', key: 'heading', value: 'Professional Translation Services' },
  { namespace: 'services.hero', key: 'description', value: 'From life sciences to certified immigration documents, we deliver accurate, culturally-adapted translations in 200+ languages. ISO 17100 compliant with specialized expertise across industries.' },

  // =============================================
  // SERVICES LANDING PAGE - Service List
  // =============================================
  { namespace: 'services.list', key: 'heading', value: 'Our Services' },
  { namespace: 'services.list', key: 'description', value: 'Comprehensive language solutions tailored to your industry and needs.' },
  { namespace: 'services.list', key: 'lifesciences_title', value: 'Life Sciences' },
  { namespace: 'services.list', key: 'lifesciences_desc', value: 'Clinical trial documentation, regulatory translations, linguistic validation, and cognitive debriefing for pharmaceutical and biotech companies.' },
  { namespace: 'services.list', key: 'lifesciences_price', value: 'Custom pricing' },
  { namespace: 'services.list', key: 'certified_title', value: 'Certified Translation' },
  { namespace: 'services.list', key: 'certified_desc', value: 'IRCC-approved certified translations for immigration documents. Government of Alberta approved. Same-day service available.' },
  { namespace: 'services.list', key: 'certified_price', value: 'From $65' },
  { namespace: 'services.list', key: 'website_title', value: 'Website Localization' },
  { namespace: 'services.list', key: 'website_desc', value: 'E-commerce, SaaS, and corporate website translation with international SEO optimization. CMS integration included.' },
  { namespace: 'services.list', key: 'website_price', value: 'From $0.12/word' },
  { namespace: 'services.list', key: 'interpretation_title', value: 'Interpretation' },
  { namespace: 'services.list', key: 'interpretation_desc', value: 'Consecutive, simultaneous, and remote interpretation for conferences, legal proceedings, medical appointments, and business meetings.' },
  { namespace: 'services.list', key: 'interpretation_price', value: 'From $85/hour' },
  { namespace: 'services.list', key: 'transcription_title', value: 'Transcription' },
  { namespace: 'services.list', key: 'transcription_desc', value: 'Legal, medical, business, and academic transcription services. Verbatim and clean read formats. Translation available.' },
  { namespace: 'services.list', key: 'transcription_price', value: 'From $1.50/minute' },
  { namespace: 'services.list', key: 'software_title', value: 'Software Localization' },
  { namespace: 'services.list', key: 'software_desc', value: 'Mobile apps, web applications, and software UI translation. String extraction, QA testing, and ongoing updates.' },

  // =============================================
  // SERVICES LANDING PAGE - Why Choose
  // =============================================
  { namespace: 'services.whychoose', key: 'heading', value: 'Why Choose Cethos' },
  { namespace: 'services.whychoose', key: 'description', value: 'Industry-leading expertise backed by rigorous quality standards.' },
  { namespace: 'services.whychoose', key: 'languages_value', value: '200+' },
  { namespace: 'services.whychoose', key: 'languages_label', value: 'Languages' },
  { namespace: 'services.whychoose', key: 'languages_desc', value: 'From major European languages to rare indigenous dialects' },
  { namespace: 'services.whychoose', key: 'specialists_value', value: '5,000+' },
  { namespace: 'services.whychoose', key: 'specialists_label', value: 'Specialists' },
  { namespace: 'services.whychoose', key: 'specialists_desc', value: 'Native-speaking linguists and subject matter experts' },
  { namespace: 'services.whychoose', key: 'iso_value', value: 'ISO 17100' },
  { namespace: 'services.whychoose', key: 'iso_label', value: 'Compliant' },
  { namespace: 'services.whychoose', key: 'iso_desc', value: 'Quality management systems for translation services' },
  { namespace: 'services.whychoose', key: 'support_value', value: '24/7' },
  { namespace: 'services.whychoose', key: 'support_label', value: 'Support' },
  { namespace: 'services.whychoose', key: 'support_desc', value: 'Project managers available around the clock' },

  // =============================================
  // SERVICES LANDING PAGE - Process
  // =============================================
  { namespace: 'services.process', key: 'heading', value: 'How to Get Started' },
  { namespace: 'services.process', key: 'description', value: 'A simple process from quote to delivery.' },
  { namespace: 'services.process', key: 'step1_title', value: 'Request a Quote' },
  { namespace: 'services.process', key: 'step1_desc', value: 'Choose your service type, upload documents (optional), and get an instant estimate.' },
  { namespace: 'services.process', key: 'step2_title', value: 'Review & Confirm' },
  { namespace: 'services.process', key: 'step2_desc', value: 'Receive a detailed quote, confirm timeline, and your project kicks off.' },
  { namespace: 'services.process', key: 'step3_title', value: 'Receive & Review' },
  { namespace: 'services.process', key: 'step3_desc', value: 'Delivery in your format, free revision round, quality guaranteed.' },

  // =============================================
  // SERVICES LANDING PAGE - Languages
  // =============================================
  { namespace: 'services.languages', key: 'heading', value: 'Translation by Language' },
  { namespace: 'services.languages', key: 'description', value: 'Dedicated translation pages for our most requested languages across Canada.' },
  { namespace: 'services.languages', key: 'view_all', value: 'View all 200+ languages →' },

  // =============================================
  // SERVICES LANDING PAGE - CTA
  // =============================================
  { namespace: 'services.cta', key: 'heading', value: 'Not Sure Which Service You Need?' },
  { namespace: 'services.cta', key: 'description', value: 'Our language experts can help you choose the right solution for your project.' },
  { namespace: 'services.cta', key: 'cta_primary', value: 'Get Free Consultation' },
  { namespace: 'services.cta', key: 'cta_phone', value: '(587) 600-0786' },

  // =============================================
  // SERVICES LANDING PAGE - Industries
  // =============================================
  { namespace: 'services.list', key: 'industries_heading', value: 'Industries We Serve' },
  { namespace: 'services.list', key: 'industries_desc', value: 'Specialized expertise across diverse sectors.' },

  // =============================================
  // CONTACT PAGE - Hero
  // =============================================
  { namespace: 'contact.hero', key: 'heading', value: 'Get in Touch' },
  { namespace: 'contact.hero', key: 'description', value: 'Have a question about our translation services? Our team is ready to help.' },

  // =============================================
  // CONTACT PAGE - Offices
  // =============================================
  { namespace: 'contact.offices', key: 'heading', value: 'Our Offices' },
  { namespace: 'contact.offices', key: 'description', value: 'Connect with us at the location nearest to you.' },
  { namespace: 'contact.offices', key: 'calgary_title', value: 'Calgary, Canada' },
  { namespace: 'contact.offices', key: 'calgary_label', value: 'Headquarters' },
  { namespace: 'contact.offices', key: 'calgary_address', value: '421 7 Avenue SW, Floor 30, Calgary, AB T2P 4K9, Canada' },
  { namespace: 'contact.offices', key: 'calgary_hours', value: 'Monday-Friday: 9:00 AM - 5:00 PM MST' },
  { namespace: 'contact.offices', key: 'dubai_title', value: 'Dubai, UAE' },
  { namespace: 'contact.offices', key: 'dubai_address', value: 'Building A1, Dubai Digital Park, Dubai Silicon Oasis, Dubai, UAE' },
  { namespace: 'contact.offices', key: 'dubai_hours', value: 'Sunday-Thursday: 9:00 AM - 6:00 PM GST' },
  { namespace: 'contact.offices', key: 'india_title', value: 'Patiala, India' },
  { namespace: 'contact.offices', key: 'india_address', value: '158/3, Dharampura Bazaar, Patiala 147001, Punjab, India' },
  { namespace: 'contact.offices', key: 'india_hours', value: 'Monday-Friday: 9:00 AM - 6:00 PM IST' },

  // =============================================
  // CONTACT PAGE - Form
  // =============================================
  { namespace: 'contact.form', key: 'heading', value: 'Send Us a Message' },
  { namespace: 'contact.form', key: 'description', value: 'Fill out the form below and we\'ll get back to you within 2 hours.' },
  { namespace: 'contact.form', key: 'name_label', value: 'Name' },
  { namespace: 'contact.form', key: 'email_label', value: 'Email' },
  { namespace: 'contact.form', key: 'phone_label', value: 'Phone (optional)' },
  { namespace: 'contact.form', key: 'service_label', value: 'Service Interest' },
  { namespace: 'contact.form', key: 'message_label', value: 'Message' },
  { namespace: 'contact.form', key: 'submit', value: 'Send Message' },
  { namespace: 'contact.form', key: 'success_heading', value: 'Message Sent!' },
  { namespace: 'contact.form', key: 'success_desc', value: 'Thank you for contacting us. We\'ll respond within 2 hours during business hours.' },
  { namespace: 'contact.form', key: 'success_again', value: 'Send Another Message' },

  // =============================================
  // CONTACT PAGE - CTA
  // =============================================
  { namespace: 'contact.cta', key: 'certified_heading', value: 'Need a certified translation?' },
  { namespace: 'contact.cta', key: 'certified_button', value: 'View Translation Services' },
  { namespace: 'contact.cta', key: 'enterprise_heading', value: 'Enterprise or Life Sciences?' },
  { namespace: 'contact.cta', key: 'enterprise_button', value: 'Learn More' },

  // =============================================
  // GET QUOTE PAGE
  // =============================================
  { namespace: 'get-quote', key: 'breadcrumb_home', value: 'Home' },
  { namespace: 'get-quote', key: 'breadcrumb_current', value: 'Get a Quote' },
  { namespace: 'get-quote', key: 'heading', value: 'Get Your Free Quote' },
  { namespace: 'get-quote', key: 'description', value: 'Select a service to start your quote request' },
  { namespace: 'get-quote', key: 'select_service', value: 'Select Your Service' },
  { namespace: 'get-quote', key: 'coming_soon', value: 'Coming Soon' },
  { namespace: 'get-quote', key: 'help_prompt', value: 'Not sure which service you need?' },
  { namespace: 'get-quote', key: 'help_contact_prefix', value: 'Contact us at' },
  { namespace: 'get-quote', key: 'help_contact_or', value: 'or' },
  { namespace: 'get-quote', key: 'back_to_services', value: 'Back to Service Selection' },

  // =============================================
  // QUOTE SUBMITTED PAGE
  // =============================================
  { namespace: 'quote-submitted', key: 'heading', value: 'Quote Request Submitted!' },
  { namespace: 'quote-submitted', key: 'description', value: 'Thank you for your request. Our team will review your requirements and get back to you within 2 hours during business hours.' },
  { namespace: 'quote-submitted', key: 'submit_another', value: 'Submit Another Request' },
  { namespace: 'quote-submitted', key: 'return_home', value: 'Return Home' },

  // =============================================
  // CONTACT SUBMITTED PAGE
  // =============================================
  { namespace: 'contact-submitted', key: 'heading', value: 'Message Sent!' },
  { namespace: 'contact-submitted', key: 'description', value: 'Thank you for contacting us. We\'ll respond within 2 hours during business hours.' },
  { namespace: 'contact-submitted', key: 'send_another', value: 'Send Another Message' },
  { namespace: 'contact-submitted', key: 'return_home', value: 'Return Home' },

  // =============================================
  // COMMON - Shared labels
  // =============================================
  { namespace: 'common.cta', key: 'get_quote', value: 'Get a Quote' },
  { namespace: 'common.cta', key: 'get_free_quote', value: 'Get a Free Quote' },
  { namespace: 'common.cta', key: 'contact_us', value: 'Contact Us' },
  { namespace: 'common.cta', key: 'learn_more', value: 'Learn More' },
  { namespace: 'common.cta', key: 'email_us', value: 'Email Us' },
  { namespace: 'common.nav', key: 'home', value: 'Home' },
  { namespace: 'common.nav', key: 'about', value: 'About' },
  { namespace: 'common.nav', key: 'services', value: 'Services' },
  { namespace: 'common.nav', key: 'contact', value: 'Contact' },
  { namespace: 'common.nav', key: 'blog', value: 'Blog' },
  { namespace: 'common.nav', key: 'careers', value: 'Careers' },

  // =============================================
  // LIFE SCIENCES INDEX PAGE
  // =============================================

  // Hero
  { namespace: 'lifesciences.index', key: 'hero_breadcrumb_services', value: 'Services' },
  { namespace: 'lifesciences.index', key: 'hero_breadcrumb_lifesciences', value: 'Life Sciences' },
  { namespace: 'lifesciences.index', key: 'hero_jsonld_name', value: 'Life Sciences Translation Services' },
  { namespace: 'lifesciences.index', key: 'hero_jsonld_desc', value: 'Comprehensive life sciences translation services including linguistic validation, cognitive debriefing, clinical trial documentation, regulatory submissions, and pharmacovigilance.' },
  { namespace: 'lifesciences.index', key: 'hero_eyebrow', value: 'Life Sciences Translation' },
  { namespace: 'lifesciences.index', key: 'hero_heading', value: 'Life Sciences Translation Services' },
  { namespace: 'lifesciences.index', key: 'hero_description', value: 'End-to-end language solutions for pharma, biotech, and medical device companies. ISPOR-compliant linguistic validation, clinical trial translation, and regulatory submissions in 200+ languages.' },
  { namespace: 'lifesciences.index', key: 'hero_cta_quote', value: 'Get a Quote' },
  { namespace: 'lifesciences.index', key: 'hero_cta_phone', value: 'Call (587) 600-0786' },
  { namespace: 'lifesciences.index', key: 'hero_badge_iso', value: 'ISO 17100 Certified' },
  { namespace: 'lifesciences.index', key: 'hero_badge_ispor', value: 'ISPOR-Compliant' },
  { namespace: 'lifesciences.index', key: 'hero_badge_gcp', value: 'GCP Trained Linguists' },
  { namespace: 'lifesciences.index', key: 'hero_stat1_value', value: '200+' },
  { namespace: 'lifesciences.index', key: 'hero_stat1_label', value: 'Languages Supported' },
  { namespace: 'lifesciences.index', key: 'hero_stat2_value', value: '5,000+' },
  { namespace: 'lifesciences.index', key: 'hero_stat2_label', value: 'Expert Linguists' },
  { namespace: 'lifesciences.index', key: 'hero_stat3_value', value: '50+' },
  { namespace: 'lifesciences.index', key: 'hero_stat3_label', value: 'Countries Served' },
  { namespace: 'lifesciences.index', key: 'hero_stat4_value', value: '10+' },
  { namespace: 'lifesciences.index', key: 'hero_stat4_label', value: 'Years Experience' },

  // Services
  { namespace: 'lifesciences.index', key: 'services_get_quote', value: 'Get a Quote' },
  { namespace: 'lifesciences.index', key: 'services_learn_more', value: 'Learn More' },
  { namespace: 'lifesciences.index', key: 'services_lv_title', value: 'Linguistic Validation' },
  { namespace: 'lifesciences.index', key: 'services_lv_desc', value: 'ISPOR-compliant linguistic validation of PRO, ClinRO, ObsRO, and PerfO instruments with forward/backward translation, harmonization, and cognitive debriefing.' },
  { namespace: 'lifesciences.index', key: 'services_lv_f1', value: 'Forward & backward translation' },
  { namespace: 'lifesciences.index', key: 'services_lv_f2', value: 'Reconciliation & harmonization' },
  { namespace: 'lifesciences.index', key: 'services_lv_f3', value: 'Cognitive debriefing interviews' },
  { namespace: 'lifesciences.index', key: 'services_lv_f4', value: 'Final proofreading & sign-off' },
  { namespace: 'lifesciences.index', key: 'services_cd_title', value: 'Cognitive Debriefing' },
  { namespace: 'lifesciences.index', key: 'services_cd_desc', value: 'Patient interviews conducted by trained qualitative researchers to verify comprehension, cultural relevance, and conceptual equivalence of translated instruments.' },
  { namespace: 'lifesciences.index', key: 'services_cd_f1', value: 'Trained qualitative interviewers' },
  { namespace: 'lifesciences.index', key: 'services_cd_f2', value: 'Native-speaking patient panels' },
  { namespace: 'lifesciences.index', key: 'services_cd_f3', value: 'Comprehensive debriefing reports' },
  { namespace: 'lifesciences.index', key: 'services_cd_f4', value: 'Iterative revision support' },
  { namespace: 'lifesciences.index', key: 'services_cr_title', value: 'Clinician Review' },
  { namespace: 'lifesciences.index', key: 'services_cr_desc', value: 'Independent clinician review of translated instruments by practicing healthcare professionals with therapeutic area expertise.' },
  { namespace: 'lifesciences.index', key: 'services_cr_f1', value: 'Therapeutic area specialists' },
  { namespace: 'lifesciences.index', key: 'services_cr_f2', value: 'Independent quality assessment' },
  { namespace: 'lifesciences.index', key: 'services_cr_f3', value: 'Clinical accuracy verification' },
  { namespace: 'lifesciences.index', key: 'services_cr_f4', value: 'Detailed review documentation' },
  { namespace: 'lifesciences.index', key: 'services_ct_title', value: 'Clinical Trials Translation' },
  { namespace: 'lifesciences.index', key: 'services_ct_desc', value: 'Translation of clinical trial documentation including protocols, ICFs, CRFs, patient diaries, and study reports for global multi-site studies.' },
  { namespace: 'lifesciences.index', key: 'services_ct_f1', value: 'Informed consent forms (ICFs)' },
  { namespace: 'lifesciences.index', key: 'services_ct_f2', value: 'Case report forms (CRFs)' },
  { namespace: 'lifesciences.index', key: 'services_ct_f3', value: 'Study protocols & amendments' },
  { namespace: 'lifesciences.index', key: 'services_ct_f4', value: 'Patient-facing materials' },
  { namespace: 'lifesciences.index', key: 'services_ra_title', value: 'Regulatory Affairs Translation' },
  { namespace: 'lifesciences.index', key: 'services_ra_desc', value: 'Certified translations for regulatory submissions including CTD modules, IND/NDA applications, drug labels, and SmPCs for global health authorities.' },
  { namespace: 'lifesciences.index', key: 'services_ra_f1', value: 'CTD Module 1-5 translations' },
  { namespace: 'lifesciences.index', key: 'services_ra_f2', value: 'Drug labeling & SmPCs' },
  { namespace: 'lifesciences.index', key: 'services_ra_f3', value: 'IND/NDA submission packages' },
  { namespace: 'lifesciences.index', key: 'services_ra_f4', value: 'Variation & renewal documents' },
  { namespace: 'lifesciences.index', key: 'services_pv_title', value: 'Pharmacovigilance Translation' },
  { namespace: 'lifesciences.index', key: 'services_pv_desc', value: 'Fast-turnaround translation of adverse event reports, ICSRs, PSURs, and safety narratives with strict compliance to reporting timelines.' },
  { namespace: 'lifesciences.index', key: 'services_pv_f1', value: 'Adverse event report translation' },
  { namespace: 'lifesciences.index', key: 'services_pv_f2', value: 'ICSRs & safety narratives' },
  { namespace: 'lifesciences.index', key: 'services_pv_f3', value: 'PSURs & risk management plans' },
  { namespace: 'lifesciences.index', key: 'services_pv_f4', value: '24/7 expedited turnaround' },
  { namespace: 'lifesciences.index', key: 'services_ecoa_title', value: 'eCOA Migration Services' },
  { namespace: 'lifesciences.index', key: 'services_ecoa_desc', value: 'Migration of validated paper COA instruments to electronic (eCOA) platforms with linguistic and screenshot review to ensure equivalence.' },
  { namespace: 'lifesciences.index', key: 'services_ecoa_f1', value: 'Paper-to-electronic migration' },
  { namespace: 'lifesciences.index', key: 'services_ecoa_f2', value: 'Screenshot review & sign-off' },
  { namespace: 'lifesciences.index', key: 'services_ecoa_f3', value: 'Platform compatibility testing' },
  { namespace: 'lifesciences.index', key: 'services_ecoa_f4', value: 'Linguistic equivalence checks' },
  { namespace: 'lifesciences.index', key: 'services_md_title', value: 'Medical Device Translation' },
  { namespace: 'lifesciences.index', key: 'services_md_desc', value: 'Translation of IFUs, labeling, technical documentation, and clinical evaluation reports for medical device regulatory submissions worldwide.' },
  { namespace: 'lifesciences.index', key: 'services_md_f1', value: 'Instructions for Use (IFUs)' },
  { namespace: 'lifesciences.index', key: 'services_md_f2', value: 'Device labeling & packaging' },
  { namespace: 'lifesciences.index', key: 'services_md_f3', value: 'Technical file translations' },
  { namespace: 'lifesciences.index', key: 'services_md_f4', value: 'Clinical evaluation reports' },

  // Therapeutic Areas
  { namespace: 'lifesciences.index', key: 'therapeutic_heading', value: 'Therapeutic Areas We Cover' },
  { namespace: 'lifesciences.index', key: 'therapeutic_description', value: 'Our linguists have deep subject-matter expertise across a wide range of therapeutic areas and medical specialties.' },
  { namespace: 'lifesciences.index', key: 'therapeutic_area_1', value: 'Oncology' },
  { namespace: 'lifesciences.index', key: 'therapeutic_area_2', value: 'Cardiology' },
  { namespace: 'lifesciences.index', key: 'therapeutic_area_3', value: 'Neurology' },
  { namespace: 'lifesciences.index', key: 'therapeutic_area_4', value: 'Immunology' },
  { namespace: 'lifesciences.index', key: 'therapeutic_area_5', value: 'Dermatology' },
  { namespace: 'lifesciences.index', key: 'therapeutic_area_6', value: 'Endocrinology' },
  { namespace: 'lifesciences.index', key: 'therapeutic_area_7', value: 'Respiratory' },
  { namespace: 'lifesciences.index', key: 'therapeutic_area_8', value: 'Gastroenterology' },
  { namespace: 'lifesciences.index', key: 'therapeutic_area_9', value: 'Rheumatology' },
  { namespace: 'lifesciences.index', key: 'therapeutic_area_10', value: 'Ophthalmology' },
  { namespace: 'lifesciences.index', key: 'therapeutic_area_11', value: 'Rare Diseases' },
  { namespace: 'lifesciences.index', key: 'therapeutic_area_12', value: 'Infectious Disease' },
  { namespace: 'lifesciences.index', key: 'therapeutic_area_13', value: 'Psychiatry' },
  { namespace: 'lifesciences.index', key: 'therapeutic_area_14', value: 'Pediatrics' },
  { namespace: 'lifesciences.index', key: 'therapeutic_area_15', value: 'Women\'s Health' },
  { namespace: 'lifesciences.index', key: 'therapeutic_overflow', value: '+ Many More' },

  // Regulatory Agencies
  { namespace: 'lifesciences.index', key: 'regulatory_heading', value: 'Regulatory Agency Expertise' },
  { namespace: 'lifesciences.index', key: 'regulatory_description', value: 'We prepare translations that meet the specific formatting, terminology, and compliance requirements of major global health authorities.' },
  { namespace: 'lifesciences.index', key: 'regulatory_fda', value: 'FDA' },
  { namespace: 'lifesciences.index', key: 'regulatory_fda_country', value: 'United States' },
  { namespace: 'lifesciences.index', key: 'regulatory_ema', value: 'EMA' },
  { namespace: 'lifesciences.index', key: 'regulatory_ema_country', value: 'European Union' },
  { namespace: 'lifesciences.index', key: 'regulatory_hc', value: 'Health Canada' },
  { namespace: 'lifesciences.index', key: 'regulatory_hc_country', value: 'Canada' },
  { namespace: 'lifesciences.index', key: 'regulatory_mhra', value: 'MHRA' },
  { namespace: 'lifesciences.index', key: 'regulatory_mhra_country', value: 'United Kingdom' },
  { namespace: 'lifesciences.index', key: 'regulatory_pmda', value: 'PMDA' },
  { namespace: 'lifesciences.index', key: 'regulatory_pmda_country', value: 'Japan' },
  { namespace: 'lifesciences.index', key: 'regulatory_nmpa', value: 'NMPA' },
  { namespace: 'lifesciences.index', key: 'regulatory_nmpa_country', value: 'China' },
  { namespace: 'lifesciences.index', key: 'regulatory_swiss', value: 'Swissmedic' },
  { namespace: 'lifesciences.index', key: 'regulatory_swiss_country', value: 'Switzerland' },
  { namespace: 'lifesciences.index', key: 'regulatory_tga', value: 'TGA' },
  { namespace: 'lifesciences.index', key: 'regulatory_tga_country', value: 'Australia' },

  // Compliance Standards
  { namespace: 'lifesciences.index', key: 'compliance_heading', value: 'Compliance & Quality Standards' },
  { namespace: 'lifesciences.index', key: 'compliance_description', value: 'Every translation is produced in accordance with the industry\'s most demanding quality and regulatory frameworks.' },
  { namespace: 'lifesciences.index', key: 'compliance_std_1', value: 'ISO 17100:2015' },
  { namespace: 'lifesciences.index', key: 'compliance_std_2', value: 'ISO 9001:2015' },
  { namespace: 'lifesciences.index', key: 'compliance_std_3', value: 'ICH GCP (E6 R2)' },
  { namespace: 'lifesciences.index', key: 'compliance_std_4', value: 'ISPOR Guidelines' },
  { namespace: 'lifesciences.index', key: 'compliance_std_5', value: '21 CFR Part 11' },
  { namespace: 'lifesciences.index', key: 'compliance_std_6', value: 'EU MDR 2017/745' },
  { namespace: 'lifesciences.index', key: 'compliance_std_7', value: 'GDPR Compliant' },

  // Quote Section
  { namespace: 'lifesciences.index', key: 'quote_heading', value: 'Request a Life Sciences Quote' },
  { namespace: 'lifesciences.index', key: 'quote_description', value: 'Get a customized quote for your life sciences translation project. We respond within 2 hours during business hours.' },
  { namespace: 'lifesciences.index', key: 'quote_body', value: 'Contact our life sciences team for a customized quote. We\'ll scope your project, recommend the right service tier, and provide a detailed estimate—typically within 2 hours.' },
  { namespace: 'lifesciences.index', key: 'quote_cta_phone', value: 'Call (587) 600-0786' },
  { namespace: 'lifesciences.index', key: 'quote_cta_email', value: 'Email Our Team' },
  { namespace: 'lifesciences.index', key: 'quote_email_prefix', value: 'Or email us directly at' },
  { namespace: 'lifesciences.index', key: 'quote_email_address', value: 'lifesciences@cethos.com' },

  // FAQ
  { namespace: 'lifesciences.index', key: 'faq_heading', value: 'Frequently Asked Questions' },
  { namespace: 'lifesciences.index', key: 'faq_description', value: 'Common questions about our life sciences translation services.' },
  { namespace: 'lifesciences.index', key: 'faq_q1', value: 'What is linguistic validation and when is it required?' },
  { namespace: 'lifesciences.index', key: 'faq_a1', value: 'Linguistic validation is a rigorous, multi-step translation process required for patient-reported outcome (PRO) instruments used in clinical trials. It follows ISPOR guidelines and includes forward translation, reconciliation, back translation, harmonization, cognitive debriefing, and final review to ensure conceptual equivalence across languages.' },
  { namespace: 'lifesciences.index', key: 'faq_q2', value: 'How long does a typical life sciences translation project take?' },
  { namespace: 'lifesciences.index', key: 'faq_a2', value: 'Timelines vary by project scope. Standard document translations take 3-5 business days. Linguistic validation projects typically run 6-10 weeks per language depending on cognitive debriefing requirements. We offer expedited services for urgent regulatory submissions and pharmacovigilance reports.' },
  { namespace: 'lifesciences.index', key: 'faq_q3', value: 'Are your translators specialized in life sciences?' },
  { namespace: 'lifesciences.index', key: 'faq_a3', value: 'Yes. All life sciences translators hold advanced degrees in relevant fields (pharmacy, medicine, biology, chemistry) and have a minimum of 5 years of specialized translation experience. Many are practicing healthcare professionals or clinical researchers.' },
  { namespace: 'lifesciences.index', key: 'faq_q4', value: 'Which regulatory frameworks do you support?' },
  { namespace: 'lifesciences.index', key: 'faq_a4', value: 'We support submissions to all major regulatory bodies including FDA, EMA, Health Canada, MHRA, PMDA, NMPA, Swissmedic, and TGA. Our translations comply with ICH GCP, 21 CFR Part 11, EU MDR, and other applicable frameworks.' },
  { namespace: 'lifesciences.index', key: 'faq_q5', value: 'Do you provide certified translations for regulatory submissions?' },
  { namespace: 'lifesciences.index', key: 'faq_a5', value: 'Yes. We provide certified translations with declarations of accuracy for all regulatory submissions. Our process is ISO 17100-compliant, and we maintain full audit trails including translator qualifications, revision history, and quality assurance records.' },

  // CTA
  { namespace: 'lifesciences.index', key: 'cta_heading', value: 'Ready to Start Your Life Sciences Project?' },
  { namespace: 'lifesciences.index', key: 'cta_description', value: 'Contact our specialized life sciences team for a consultation. We\'ll help you navigate regulatory requirements and deliver translations that meet the highest quality standards.' },
  { namespace: 'lifesciences.index', key: 'cta_cta_phone', value: 'Call (587) 600-0786' },
  { namespace: 'lifesciences.index', key: 'cta_cta_contact', value: 'Contact Us' },
  { namespace: 'lifesciences.index', key: 'cta_footer_text', value: 'ISO 17100 certified. ISPOR-compliant methodology. FDA, EMA & Health Canada expertise.' },

  // =============================================
  // CAREERS PAGE - Hero
  // =============================================
  { namespace: 'careers.hero', key: 'label', value: 'Careers' },
  { namespace: 'careers.hero', key: 'heading', value: 'Join Our Global Team' },
  { namespace: 'careers.hero', key: 'description', value: 'Be part of a team that bridges languages and cultures. At Cethos, we connect the world through expert translation and localization services.' },
  { namespace: 'careers.hero', key: 'cta_positions', value: 'View Open Positions' },
  { namespace: 'careers.hero', key: 'cta_freelance', value: 'Freelance Opportunities' },

  // =============================================
  // CAREERS PAGE - Benefits
  // =============================================
  { namespace: 'careers.benefits', key: 'heading', value: 'Why Work With Us' },
  { namespace: 'careers.benefits', key: 'description', value: 'We offer more than just jobs\u2014we offer careers built on growth, flexibility, and meaningful work.' },
  { namespace: 'careers.benefits', key: 'benefit1_title', value: 'Remote Flexibility' },
  { namespace: 'careers.benefits', key: 'benefit1_desc', value: 'Work from anywhere in the world. We embrace remote work and flexible schedules to support your work-life balance.' },
  { namespace: 'careers.benefits', key: 'benefit2_title', value: 'Professional Growth' },
  { namespace: 'careers.benefits', key: 'benefit2_desc', value: 'Access continuous learning opportunities, certifications, and career advancement paths in the language industry.' },
  { namespace: 'careers.benefits', key: 'benefit3_title', value: 'Health & Wellness' },
  { namespace: 'careers.benefits', key: 'benefit3_desc', value: 'Comprehensive health benefits, wellness programs, and mental health support for full-time employees.' },
  { namespace: 'careers.benefits', key: 'benefit4_title', value: 'Diverse Projects' },
  { namespace: 'careers.benefits', key: 'benefit4_desc', value: 'Work on exciting projects across industries including life sciences, legal, technology, and more.' },

  // =============================================
  // CAREERS PAGE - Positions
  // =============================================
  { namespace: 'careers.positions', key: 'heading', value: 'Open Positions' },
  { namespace: 'careers.positions', key: 'description', value: 'Explore our current openings and find the perfect opportunity to advance your career.' },
  { namespace: 'careers.positions', key: 'apply_now', value: 'Apply Now' },
  { namespace: 'careers.positions', key: 'pos1_title', value: 'Senior Medical Translator (German)' },
  { namespace: 'careers.positions', key: 'pos1_department', value: 'Life Sciences' },
  { namespace: 'careers.positions', key: 'pos1_location', value: 'Remote' },
  { namespace: 'careers.positions', key: 'pos1_type', value: 'Contract' },
  { namespace: 'careers.positions', key: 'pos2_title', value: 'Project Manager' },
  { namespace: 'careers.positions', key: 'pos2_department', value: 'Operations' },
  { namespace: 'careers.positions', key: 'pos2_location', value: 'Calgary, AB' },
  { namespace: 'careers.positions', key: 'pos2_type', value: 'Full-time' },
  { namespace: 'careers.positions', key: 'pos3_title', value: 'Linguistic Validator (Spanish)' },
  { namespace: 'careers.positions', key: 'pos3_department', value: 'Life Sciences' },
  { namespace: 'careers.positions', key: 'pos3_location', value: 'Remote' },
  { namespace: 'careers.positions', key: 'pos3_type', value: 'Contract' },
  { namespace: 'careers.positions', key: 'pos4_title', value: 'Quality Assurance Specialist' },
  { namespace: 'careers.positions', key: 'pos4_department', value: 'Quality' },
  { namespace: 'careers.positions', key: 'pos4_location', value: 'Dubai, UAE' },
  { namespace: 'careers.positions', key: 'pos4_type', value: 'Full-time' },

  // =============================================
  // CAREERS PAGE - Freelance
  // =============================================
  { namespace: 'careers.freelance', key: 'heading', value: 'Freelance Linguists' },
  { namespace: 'careers.freelance', key: 'description', value: 'Are you a professional translator, interpreter, or language specialist? Join our network of freelance linguists and work on diverse projects from clients around the world.' },
  { namespace: 'careers.freelance', key: 'cta', value: 'Join Our Network' },
  { namespace: 'careers.freelance', key: 'note', value: 'Send your CV and language combinations to linguists@cethos.com' },

  // =============================================
  // CAREERS PAGE - Contact
  // =============================================
  { namespace: 'careers.contact', key: 'heading', value: 'Have Questions?' },
  { namespace: 'careers.contact', key: 'description', value: 'Our HR team is here to help you with any questions about careers at Cethos.' },
  { namespace: 'careers.contact', key: 'label', value: 'Contact our careers team:' },

  // =============================================
  // PRIVACY PAGE
  // =============================================
  { namespace: 'privacy', key: 'label', value: 'Legal' },
  { namespace: 'privacy', key: 'heading', value: 'Privacy Policy' },
  { namespace: 'privacy', key: 'hero_description', value: 'Your privacy is important to us. This policy explains how we collect, use, and protect your information.' },
  { namespace: 'privacy', key: 'highlight_title', value: 'Your Privacy Matters' },
  { namespace: 'privacy', key: 'highlight_desc', value: 'Cethos Solutions Inc. is committed to protecting your privacy and ensuring the security of your personal information. We comply with applicable privacy laws including PIPEDA (Canada) and GDPR (European Union).' },
  { namespace: 'privacy', key: 'last_updated_label', value: 'Last Updated:' },
  { namespace: 'privacy', key: 'last_updated_date', value: 'January 1, 2026' },
  { namespace: 'privacy', key: 'section1_title', value: '1. Information We Collect' },
  { namespace: 'privacy', key: 'section1_sub1_title', value: 'Personal Information' },
  { namespace: 'privacy', key: 'section1_sub1_intro', value: 'We collect personal information that you provide directly to us, including:' },
  { namespace: 'privacy', key: 'section1_sub1_item1', value: 'Name and contact information (email address, phone number, mailing address)' },
  { namespace: 'privacy', key: 'section1_sub1_item2', value: 'Company name and job title' },
  { namespace: 'privacy', key: 'section1_sub1_item3', value: 'Account credentials' },
  { namespace: 'privacy', key: 'section1_sub1_item4', value: 'Payment and billing information' },
  { namespace: 'privacy', key: 'section1_sub1_item5', value: 'Communication preferences' },
  { namespace: 'privacy', key: 'section1_sub2_title', value: 'Documents and Content' },
  { namespace: 'privacy', key: 'section1_sub2_intro', value: 'When you use our translation services, we collect:' },
  { namespace: 'privacy', key: 'section1_sub2_item1', value: 'Source documents submitted for translation' },
  { namespace: 'privacy', key: 'section1_sub2_item2', value: 'Translated documents and deliverables' },
  { namespace: 'privacy', key: 'section1_sub2_item3', value: 'Project specifications and instructions' },
  { namespace: 'privacy', key: 'section1_sub2_item4', value: 'Feedback and communications related to projects' },
  { namespace: 'privacy', key: 'section1_sub3_title', value: 'Automatic Information' },
  { namespace: 'privacy', key: 'section1_sub3_intro', value: 'We automatically collect certain information when you visit our website:' },
  { namespace: 'privacy', key: 'section1_sub3_item1', value: 'IP address and device information' },
  { namespace: 'privacy', key: 'section1_sub3_item2', value: 'Browser type and operating system' },
  { namespace: 'privacy', key: 'section1_sub3_item3', value: 'Pages visited and time spent on our website' },
  { namespace: 'privacy', key: 'section1_sub3_item4', value: 'Referring website or source' },
  { namespace: 'privacy', key: 'section1_sub3_item5', value: 'Cookies and similar tracking technologies (see our Cookie Policy)' },
  { namespace: 'privacy', key: 'section2_title', value: '2. How We Use Your Information' },
  { namespace: 'privacy', key: 'section2_intro', value: 'We use the information we collect for the following purposes:' },
  { namespace: 'privacy', key: 'section2_item1', value: 'Providing and delivering our translation and localization services' },
  { namespace: 'privacy', key: 'section2_item2', value: 'Processing payments and managing your account' },
  { namespace: 'privacy', key: 'section2_item3', value: 'Communicating with you about projects, updates, and support' },
  { namespace: 'privacy', key: 'section2_item4', value: 'Improving our services and developing new features' },
  { namespace: 'privacy', key: 'section2_item5', value: 'Analyzing website usage and optimizing user experience' },
  { namespace: 'privacy', key: 'section2_item6', value: 'Complying with legal obligations and protecting our rights' },
  { namespace: 'privacy', key: 'section2_item7', value: 'Marketing and promotional communications (with your consent)' },
  { namespace: 'privacy', key: 'section3_title', value: '3. Information Sharing and Disclosure' },
  { namespace: 'privacy', key: 'section3_intro', value: 'We may share your information in the following circumstances:' },
  { namespace: 'privacy', key: 'section3_item1', value: 'Service Providers: We work with trusted linguists, translators, and technology partners who assist in delivering our services. These parties are bound by confidentiality agreements.' },
  { namespace: 'privacy', key: 'section3_item2', value: 'Business Transfers: In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.' },
  { namespace: 'privacy', key: 'section3_item3', value: 'Legal Requirements: We may disclose information when required by law, court order, or government request.' },
  { namespace: 'privacy', key: 'section3_item4', value: 'Protection of Rights: We may share information to protect our rights, privacy, safety, or property.' },
  { namespace: 'privacy', key: 'section3_no_sell', value: 'We do not sell your personal information to third parties for marketing purposes.' },
  { namespace: 'privacy', key: 'section4_title', value: '4. Data Security' },
  { namespace: 'privacy', key: 'section4_intro', value: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:' },
  { namespace: 'privacy', key: 'section4_item1', value: 'Encryption of data in transit and at rest' },
  { namespace: 'privacy', key: 'section4_item2', value: 'Secure access controls and authentication' },
  { namespace: 'privacy', key: 'section4_item3', value: 'Regular security assessments and audits' },
  { namespace: 'privacy', key: 'section4_item4', value: 'Employee training on data protection' },
  { namespace: 'privacy', key: 'section4_item5', value: 'Confidentiality agreements with all personnel and contractors' },
  { namespace: 'privacy', key: 'section5_title', value: '5. Data Retention' },
  { namespace: 'privacy', key: 'section5_p1', value: 'We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations, resolve disputes, and enforce our agreements. The specific retention period depends on the nature of the information and the purpose for which it was collected.' },
  { namespace: 'privacy', key: 'section5_p2', value: 'Project documents and translations are retained according to our document retention policy and applicable industry regulations, unless you request earlier deletion.' },
  { namespace: 'privacy', key: 'section6_title', value: '6. Your Privacy Rights' },
  { namespace: 'privacy', key: 'section6_sub1_title', value: 'All Users' },
  { namespace: 'privacy', key: 'section6_sub1_intro', value: 'Depending on your location, you may have the following rights:' },
  { namespace: 'privacy', key: 'section6_sub1_item1', value: 'Access your personal information' },
  { namespace: 'privacy', key: 'section6_sub1_item2', value: 'Correct inaccurate or incomplete information' },
  { namespace: 'privacy', key: 'section6_sub1_item3', value: 'Request deletion of your information' },
  { namespace: 'privacy', key: 'section6_sub1_item4', value: 'Opt out of marketing communications' },
  { namespace: 'privacy', key: 'section6_sub1_item5', value: 'Request a copy of your data in a portable format' },
  { namespace: 'privacy', key: 'section6_sub2_title', value: 'Canadian Residents (PIPEDA)' },
  { namespace: 'privacy', key: 'section6_sub2_desc', value: 'Under the Personal Information Protection and Electronic Documents Act (PIPEDA), you have the right to access and correct your personal information held by us. You may also withdraw consent for certain processing activities. To exercise these rights, please contact our Privacy Officer.' },
  { namespace: 'privacy', key: 'section6_sub3_title', value: 'European Residents (GDPR)' },
  { namespace: 'privacy', key: 'section6_sub3_desc', value: 'If you are located in the European Economic Area, you have additional rights under the General Data Protection Regulation (GDPR), including the right to object to processing, request restriction of processing, and lodge a complaint with a supervisory authority. Our legal basis for processing includes contractual necessity, legitimate interests, and consent.' },
  { namespace: 'privacy', key: 'section7_title', value: '7. International Data Transfers' },
  { namespace: 'privacy', key: 'section7_desc', value: 'As a global translation service provider, we may transfer your information to countries outside your country of residence. When we transfer data internationally, we implement appropriate safeguards to protect your information, including standard contractual clauses and ensuring our partners maintain adequate data protection standards.' },
  { namespace: 'privacy', key: 'section8_title', value: "8. Children's Privacy" },
  { namespace: 'privacy', key: 'section8_desc', value: 'Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child, we will take steps to delete such information promptly.' },
  { namespace: 'privacy', key: 'section9_title', value: '9. Changes to This Policy' },
  { namespace: 'privacy', key: 'section9_desc', value: 'We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the updated policy on our website and updating the "Last Updated" date. We encourage you to review this policy periodically.' },
  { namespace: 'privacy', key: 'section10_title', value: '10. Contact Us' },
  { namespace: 'privacy', key: 'section10_desc', value: 'If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact us:' },
  { namespace: 'privacy', key: 'contact_title', value: 'Privacy Officer' },
  { namespace: 'privacy', key: 'contact_company', value: 'Cethos Solutions Inc.' },
  { namespace: 'privacy', key: 'contact_location', value: 'Calgary, Alberta, Canada' },

  // =============================================
  // TERMS PAGE
  // =============================================
  { namespace: 'terms', key: 'label', value: 'Legal' },
  { namespace: 'terms', key: 'heading', value: 'Terms of Service' },
  { namespace: 'terms', key: 'hero_description', value: 'Please read these terms carefully before using our services.' },
  { namespace: 'terms', key: 'highlight_title', value: 'Agreement to Terms' },
  { namespace: 'terms', key: 'highlight_desc', value: "By using Cethos Solutions Inc.'s services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our services." },
  { namespace: 'terms', key: 'effective_date_label', value: 'Effective Date:' },
  { namespace: 'terms', key: 'effective_date', value: 'January 1, 2026' },
  { namespace: 'terms', key: 'section1_title', value: '1. Services' },
  { namespace: 'terms', key: 'section1_desc', value: 'Cethos Solutions Inc. ("Cethos," "we," "us," or "our") provides professional translation, localization, interpretation, and related language services ("Services"). These Terms of Service govern your use of our Services and constitute a binding agreement between you ("Client," "you," or "your") and Cethos.' },
  { namespace: 'terms', key: 'section2_title', value: '2. Ordering and Acceptance' },
  { namespace: 'terms', key: 'section2_intro', value: 'Orders for Services may be placed through our website, email, or other agreed-upon channels. Each order is subject to acceptance by Cethos. An order is accepted when we provide written confirmation, including a quote or project agreement specifying:' },
  { namespace: 'terms', key: 'section2_item1', value: 'Scope of Services and deliverables' },
  { namespace: 'terms', key: 'section2_item2', value: 'Language pairs and target formats' },
  { namespace: 'terms', key: 'section2_item3', value: 'Delivery timeline and milestones' },
  { namespace: 'terms', key: 'section2_item4', value: 'Pricing and payment terms' },
  { namespace: 'terms', key: 'section2_item5', value: 'Any special requirements or instructions' },
  { namespace: 'terms', key: 'section2_acceptance', value: 'Your acceptance of the quote or project agreement, whether by written confirmation, payment of deposit, or submission of source materials, constitutes your agreement to these Terms of Service.' },
  { namespace: 'terms', key: 'section3_title', value: '3. Client Responsibilities' },
  { namespace: 'terms', key: 'section3_intro', value: 'To enable us to provide high-quality Services, you agree to:' },
  { namespace: 'terms', key: 'section3_item1', value: 'Provide accurate and complete source materials in agreed formats' },
  { namespace: 'terms', key: 'section3_item2', value: 'Supply reference materials, glossaries, and style guides as applicable' },
  { namespace: 'terms', key: 'section3_item3', value: 'Respond promptly to queries and requests for clarification' },
  { namespace: 'terms', key: 'section3_item4', value: 'Designate a point of contact for project communications' },
  { namespace: 'terms', key: 'section3_item5', value: 'Review and approve deliverables within agreed timeframes' },
  { namespace: 'terms', key: 'section3_item6', value: 'Ensure you have the right to have the content translated' },
  { namespace: 'terms', key: 'section4_title', value: '4. Delivery and Acceptance' },
  { namespace: 'terms', key: 'section4_desc', value: 'We will deliver completed work by the agreed deadline. Delivery is deemed complete upon transmission of the deliverables to you via email or other agreed method. You will have a review period of ten (10) business days from delivery to inspect the work and notify us of any issues. If no notice is received within this period, the deliverables are deemed accepted.' },
  { namespace: 'terms', key: 'section5_title', value: '5. Revisions and Quality' },
  { namespace: 'terms', key: 'section5_desc', value: 'We are committed to delivering high-quality work that meets your specifications. If you identify errors or issues with the delivered work that represent a deviation from the agreed specifications, please notify us within the review period. We will correct verifiable errors at no additional charge. Requests for revisions beyond the original scope, changes to specifications, or preference-based changes may be subject to additional fees.' },
  { namespace: 'terms', key: 'section6_title', value: '6. Payment Terms' },
  { namespace: 'terms', key: 'section6_intro', value: 'Payment terms are Net 30 days from the invoice date unless otherwise agreed in writing. We accept payment by:' },
  { namespace: 'terms', key: 'section6_item1', value: 'Bank transfer (wire transfer)' },
  { namespace: 'terms', key: 'section6_item2', value: 'Credit card' },
  { namespace: 'terms', key: 'section6_item3', value: 'Other methods as agreed' },
  { namespace: 'terms', key: 'section6_deposit', value: 'For new clients or large projects, we may require a deposit of up to 50% before commencing work. Late payments may be subject to interest charges of 1.5% per month on the outstanding balance.' },
  { namespace: 'terms', key: 'section7_title', value: '7. Confidentiality' },
  { namespace: 'terms', key: 'section7_desc', value: 'We treat all client materials and information as confidential. We maintain strict confidentiality protocols and require all translators and staff to sign non-disclosure agreements. We will not disclose, share, or use your materials or information for any purpose other than providing the agreed Services, unless required by law or with your prior written consent.' },
  { namespace: 'terms', key: 'section8_title', value: '8. Intellectual Property' },
  { namespace: 'terms', key: 'section8_desc', value: 'You retain all intellectual property rights in your source materials. Upon full payment, you will own all intellectual property rights in the translated deliverables. We may retain copies of completed work for quality assurance and internal reference purposes, subject to confidentiality obligations. Translation memories and glossaries developed during projects may be retained by Cethos for use in future projects for you.' },
  { namespace: 'terms', key: 'section9_title', value: '9. Limitation of Liability' },
  { namespace: 'terms', key: 'section9_desc', value: "To the maximum extent permitted by law, Cethos's total liability for any claim arising from or related to our Services shall not exceed the total fees paid by you for the specific project giving rise to the claim. In no event shall Cethos be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, revenue, data, or business opportunities, regardless of whether we were advised of the possibility of such damages." },
  { namespace: 'terms', key: 'section10_title', value: '10. Indemnification' },
  { namespace: 'terms', key: 'section10_desc', value: 'You agree to indemnify, defend, and hold harmless Cethos and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including reasonable legal fees) arising from: (a) your breach of these Terms; (b) your violation of any third-party rights, including intellectual property rights; or (c) the content of your source materials.' },
  { namespace: 'terms', key: 'section11_title', value: '11. Cancellation' },
  { namespace: 'terms', key: 'section11_intro', value: 'You may cancel an order by providing written notice. Cancellation fees apply as follows:' },
  { namespace: 'terms', key: 'section11_item1', value: 'Standard Projects: 25% of the remaining project value for work not yet completed' },
  { namespace: 'terms', key: 'section11_item2', value: 'Rush Projects: 50% of the remaining project value for work not yet completed' },
  { namespace: 'terms', key: 'section11_completed', value: 'Work completed prior to cancellation is fully billable. We reserve the right to cancel or suspend work if you fail to provide required materials, payment, or approvals in a timely manner.' },
  { namespace: 'terms', key: 'section12_title', value: '12. Force Majeure' },
  { namespace: 'terms', key: 'section12_desc', value: 'Neither party shall be liable for delays or failures in performance resulting from circumstances beyond its reasonable control, including but not limited to natural disasters, acts of government, war, terrorism, labor disputes, internet or telecommunications failures, or pandemics. In such events, the affected party shall notify the other party promptly and make reasonable efforts to mitigate the impact.' },
  { namespace: 'terms', key: 'section13_title', value: '13. Governing Law' },
  { namespace: 'terms', key: 'section13_desc', value: 'These Terms of Service shall be governed by and construed in accordance with the laws of the Province of Alberta, Canada, without regard to its conflict of law principles. Any disputes arising from or related to these Terms or our Services shall be subject to the exclusive jurisdiction of the courts of Alberta, Canada.' },
  { namespace: 'terms', key: 'section14_title', value: '14. Changes to Terms' },
  { namespace: 'terms', key: 'section14_desc', value: 'We may update these Terms of Service from time to time. Material changes will be posted on our website with an updated effective date. Your continued use of our Services after such changes constitutes acceptance of the updated terms. We encourage you to review these Terms periodically.' },
  { namespace: 'terms', key: 'section15_title', value: '15. Contact Information' },
  { namespace: 'terms', key: 'section15_desc', value: 'If you have questions about these Terms of Service, please contact us:' },
  { namespace: 'terms', key: 'contact_title', value: 'Legal Department' },
  { namespace: 'terms', key: 'contact_company', value: 'Cethos Solutions Inc.' },
  { namespace: 'terms', key: 'contact_location', value: 'Calgary, Alberta, Canada' },

  // =============================================
  // COOKIES PAGE
  // =============================================
  { namespace: 'cookies', key: 'label', value: 'Legal' },
  { namespace: 'cookies', key: 'heading', value: 'Cookie Policy' },
  { namespace: 'cookies', key: 'hero_description', value: 'This policy explains how we use cookies and similar technologies on our website.' },
  { namespace: 'cookies', key: 'highlight_title', value: 'About Cookies' },
  { namespace: 'cookies', key: 'highlight_desc', value: 'We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By continuing to use our website, you consent to our use of cookies in accordance with this policy.' },
  { namespace: 'cookies', key: 'last_updated_label', value: 'Last Updated:' },
  { namespace: 'cookies', key: 'last_updated_date', value: 'January 1, 2026' },
  { namespace: 'cookies', key: 'table_name', value: 'Cookie Name' },
  { namespace: 'cookies', key: 'table_purpose', value: 'Purpose' },
  { namespace: 'cookies', key: 'table_duration', value: 'Duration' },
  { namespace: 'cookies', key: 'what_are_cookies_title', value: 'What Are Cookies?' },
  { namespace: 'cookies', key: 'what_are_cookies_p1', value: 'Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently, provide information to website owners, and enable certain features. Cookies can be "persistent" (remaining on your device until deleted) or "session" (deleted when you close your browser).' },
  { namespace: 'cookies', key: 'what_are_cookies_p2', value: 'We also use similar technologies such as pixels, beacons, and local storage, which function similarly to cookies. References to "cookies" in this policy include these similar technologies.' },
  { namespace: 'cookies', key: 'essential_title', value: 'Essential Cookies' },
  { namespace: 'cookies', key: 'essential_desc', value: 'These cookies are necessary for the website to function properly and cannot be disabled. They are typically set in response to actions you take, such as logging in or filling out forms.' },
  { namespace: 'cookies', key: 'essential_session_purpose', value: 'Maintains your session state across page requests' },
  { namespace: 'cookies', key: 'essential_session_duration', value: 'Session' },
  { namespace: 'cookies', key: 'essential_csrf_purpose', value: 'Protects against cross-site request forgery attacks' },
  { namespace: 'cookies', key: 'essential_csrf_duration', value: 'Session' },
  { namespace: 'cookies', key: 'essential_consent_purpose', value: 'Stores your cookie consent preferences' },
  { namespace: 'cookies', key: 'essential_consent_duration', value: '1 year' },
  { namespace: 'cookies', key: 'analytics_title', value: 'Analytics Cookies' },
  { namespace: 'cookies', key: 'analytics_desc', value: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and services.' },
  { namespace: 'cookies', key: 'analytics_ga_purpose', value: 'Google Analytics - Distinguishes unique users' },
  { namespace: 'cookies', key: 'analytics_ga_duration', value: '2 years' },
  { namespace: 'cookies', key: 'analytics_ga_star_purpose', value: 'Google Analytics - Maintains session state' },
  { namespace: 'cookies', key: 'analytics_ga_star_duration', value: '2 years' },
  { namespace: 'cookies', key: 'analytics_gid_purpose', value: 'Google Analytics - Distinguishes users' },
  { namespace: 'cookies', key: 'analytics_gid_duration', value: '24 hours' },
  { namespace: 'cookies', key: 'marketing_title', value: 'Marketing Cookies' },
  { namespace: 'cookies', key: 'marketing_desc', value: 'These cookies are used to track visitors across websites and display ads that are relevant and engaging for individual users.' },
  { namespace: 'cookies', key: 'marketing_gcl_purpose', value: 'Google Ads - Stores conversion data' },
  { namespace: 'cookies', key: 'marketing_gcl_duration', value: '90 days' },
  { namespace: 'cookies', key: 'marketing_fbp_purpose', value: 'Facebook - Stores and tracks visits across websites' },
  { namespace: 'cookies', key: 'marketing_fbp_duration', value: '90 days' },
  { namespace: 'cookies', key: 'third_party_title', value: 'Third-Party Cookies' },
  { namespace: 'cookies', key: 'third_party_desc', value: 'Some cookies are placed by third-party services that appear on our pages. We do not control these third-party cookies. The third parties that set these cookies may use them to track your online activity across different websites. Key third-party services we use include:' },
  { namespace: 'cookies', key: 'third_party_item1', value: 'Google Analytics: Web analytics service that tracks and reports website traffic' },
  { namespace: 'cookies', key: 'third_party_item2', value: 'Google Ads: Advertising platform for conversion tracking and remarketing' },
  { namespace: 'cookies', key: 'third_party_item3', value: 'Facebook/Meta: Social media platform for advertising and analytics' },
  { namespace: 'cookies', key: 'third_party_note', value: "Please refer to these third parties' privacy policies for more information about their data practices." },
  { namespace: 'cookies', key: 'managing_title', value: 'Managing Your Cookie Preferences' },
  { namespace: 'cookies', key: 'managing_desc', value: 'Most web browsers allow you to control cookies through their settings. You can typically find these settings in the "Options" or "Preferences" menu of your browser. Please note that disabling certain cookies may affect the functionality of our website.' },
  { namespace: 'cookies', key: 'browser_instructions_title', value: 'Browser-Specific Instructions' },
  { namespace: 'cookies', key: 'browser_instructions_desc', value: 'Learn how to manage cookies in your browser:' },
  { namespace: 'cookies', key: 'optout_title', value: 'Opt-Out Tools' },
  { namespace: 'cookies', key: 'optout_desc', value: 'You can also opt out of certain third-party cookies using these tools:' },
  { namespace: 'cookies', key: 'optout_ga', value: 'Google Analytics Opt-out Browser Add-on' },
  { namespace: 'cookies', key: 'optout_nai', value: 'Network Advertising Initiative Opt-out' },
  { namespace: 'cookies', key: 'optout_daa', value: 'Digital Advertising Alliance Opt-out' },
  { namespace: 'cookies', key: 'dnt_title', value: 'Do Not Track' },
  { namespace: 'cookies', key: 'dnt_desc', value: 'Some browsers include a "Do Not Track" (DNT) feature that signals to websites that you do not want to be tracked. Because there is no uniform standard for how websites should respond to DNT signals, our website does not currently respond to DNT browser signals. However, you can use the cookie management options described above to control tracking.' },
  { namespace: 'cookies', key: 'changes_title', value: 'Changes to This Policy' },
  { namespace: 'cookies', key: 'changes_desc', value: 'We may update this Cookie Policy from time to time to reflect changes in our practices or applicable laws. We will post any changes on this page and update the "Last Updated" date above.' },
  { namespace: 'cookies', key: 'contact_heading', value: 'Contact Us' },
  { namespace: 'cookies', key: 'contact_desc', value: 'If you have questions about our use of cookies, please contact us:' },
  { namespace: 'cookies', key: 'contact_title', value: 'Privacy Team' },
  { namespace: 'cookies', key: 'contact_company', value: 'Cethos Solutions Inc.' },
  { namespace: 'cookies', key: 'contact_location', value: 'Calgary, Alberta, Canada' },
  { namespace: 'cookies', key: 'related_policies', value: 'Related Policies:' },
  { namespace: 'cookies', key: 'related_privacy', value: 'Privacy Policy' },
  { namespace: 'cookies', key: 'related_terms', value: 'Terms of Service' },
]

async function seed() {
  console.log(`Seeding ${translations.length} translations...`)

  // Get all namespace IDs
  const { data: namespaces } = await supabase
    .from('cethosweb_i18n_namespaces')
    .select('id, name')

  if (!namespaces) {
    console.error('Failed to fetch namespaces')
    process.exit(1)
  }

  const nsMap = new Map(namespaces.map(ns => [ns.name, ns.id]))

  // Prepare rows
  const rows = translations.map(t => {
    const nsId = nsMap.get(t.namespace)
    if (!nsId) {
      console.warn(`Namespace not found: ${t.namespace}`)
      return null
    }
    return {
      namespace_id: nsId,
      key: t.key,
      locale: 'en',
      value: t.value,
      context_note: t.context_note || null,
      status: 'published',
    }
  }).filter(Boolean)

  // Upsert in batches
  const batchSize = 50
  let inserted = 0
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize)
    const { error } = await supabase
      .from('cethosweb_i18n_translations')
      .upsert(batch as any[], {
        onConflict: 'namespace_id,key,segment_index,locale',
      })

    if (error) {
      console.error(`Batch ${i / batchSize + 1} error:`, error.message)
    } else {
      inserted += batch.length
    }
  }

  console.log(`Done! Inserted/updated ${inserted} translations.`)

  // Summary
  const { count } = await supabase
    .from('cethosweb_i18n_translations')
    .select('*', { count: 'exact', head: true })

  console.log(`Total translations in database: ${count}`)
}

seed().catch(console.error)
