/**
 * Seed i18n translations for certified translation sub-pages.
 * Run with: npx tsx scripts/seed-i18n-certified.ts
 */
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// Load .env.local manually since dotenv is not installed
const envPath = resolve(__dirname, '..', '.env.local')
const envContent = readFileSync(envPath, 'utf-8')
for (const line of envContent.split('\n')) {
  const trimmed = line.trim()
  if (!trimmed || trimmed.startsWith('#')) continue
  const eqIdx = trimmed.indexOf('=')
  if (eqIdx === -1) continue
  const key = trimmed.slice(0, eqIdx)
  const value = trimmed.slice(eqIdx + 1)
  if (!process.env[key]) process.env[key] = value
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

type TranslationSeed = {
  namespace: string
  key: string
  value: string
}

const translations: TranslationSeed[] = [
  // =============================================
  // BIRTH CERTIFICATE - certified.birth
  // =============================================
  { namespace: 'certified.birth', key: 'hero_heading', value: 'Birth Certificate Translation Across Canada' },
  { namespace: 'certified.birth', key: 'hero_desc', value: 'IRCC-certified birth certificate translations for PR, citizenship, and spousal sponsorship. Same-day service available with on-site notarization.' },
  { namespace: 'certified.birth', key: 'hero_desc2', value: 'Accepted by IRCC, WES, IQAS, and all Canadian immigration authorities. Government of Alberta approved translator.' },
  { namespace: 'certified.birth', key: 'price_badge', value: 'From $65' },
  { namespace: 'certified.birth', key: 'price_unit', value: 'per document' },
  { namespace: 'certified.birth', key: 'cta_email', value: 'Email Us' },
  { namespace: 'certified.birth', key: 'trust_ircc', value: '100% IRCC Accepted' },
  { namespace: 'certified.birth', key: 'trust_gov', value: "Gov't of Alberta Approved" },
  { namespace: 'certified.birth', key: 'trust_sameday', value: 'Same-Day Available' },
  { namespace: 'certified.birth', key: 'trust_notary', value: 'Notarization Included' },
  { namespace: 'certified.birth', key: 'trust_reviews', value: '139 Five-Star Reviews' },
  { namespace: 'certified.birth', key: 'section1_heading', value: 'Why IRCC Requires Certified Translation' },
  { namespace: 'certified.birth', key: 'section1_desc', value: 'Immigration, Refugees and Citizenship Canada requires all foreign-language documents to be translated by a certified translator. This ensures the accuracy and authenticity of your personal information for immigration processing.' },
  { namespace: 'certified.birth', key: 'section1_card1_title', value: 'Identity Verification' },
  { namespace: 'certified.birth', key: 'section1_card1_desc', value: 'Birth certificates verify your identity, date of birth, and place of birth.' },
  { namespace: 'certified.birth', key: 'section1_card2_title', value: 'Legal Requirement' },
  { namespace: 'certified.birth', key: 'section1_card2_desc', value: 'IRCC only accepts translations with a signed certificate of accuracy.' },
  { namespace: 'certified.birth', key: 'section1_card3_title', value: 'Family Relationships' },
  { namespace: 'certified.birth', key: 'section1_card3_desc', value: 'Parent names on birth certificates are crucial for sponsorship applications.' },
  { namespace: 'certified.birth', key: 'included_heading', value: "What's Included" },
  { namespace: 'certified.birth', key: 'included_1', value: 'Certified translation by IRCC-compliant translator' },
  { namespace: 'certified.birth', key: 'included_2', value: 'Signed certificate of accuracy' },
  { namespace: 'certified.birth', key: 'included_3', value: 'Commissioner certification (notarization equivalent)' },
  { namespace: 'certified.birth', key: 'included_4', value: 'Digital copy via email' },
  { namespace: 'certified.birth', key: 'included_5', value: 'Physical copy available for pickup or delivery' },
  { namespace: 'certified.birth', key: 'included_6', value: 'Lifetime accuracy guarantee' },
  { namespace: 'certified.birth', key: 'included_7', value: 'Free revisions if needed' },
  { namespace: 'certified.birth', key: 'languages_heading', value: 'Languages We Translate' },
  { namespace: 'certified.birth', key: 'languages_desc', value: '95+ languages supported. Here are our most requested:' },
  { namespace: 'certified.birth', key: 'languages_cta', value: "Don't see your language? Contact us\u2014we likely support it." },
  { namespace: 'certified.birth', key: 'pricing_heading', value: 'Simple, Transparent Pricing' },
  { namespace: 'certified.birth', key: 'pricing_service_1', value: 'Birth Certificate Translation' },
  { namespace: 'certified.birth', key: 'pricing_price_1', value: 'Starting at $65' },
  { namespace: 'certified.birth', key: 'pricing_service_2', value: 'Commissioner Certification' },
  { namespace: 'certified.birth', key: 'pricing_price_2', value: 'Included' },
  { namespace: 'certified.birth', key: 'pricing_service_3', value: 'Same-Day Rush' },
  { namespace: 'certified.birth', key: 'pricing_price_3', value: '+$25' },
  { namespace: 'certified.birth', key: 'pricing_service_4', value: 'Courier Delivery' },
  { namespace: 'certified.birth', key: 'pricing_price_4', value: '+$15' },
  { namespace: 'certified.birth', key: 'how_heading', value: 'How It Works' },
  { namespace: 'certified.birth', key: 'step1_title', value: 'Upload Your Document' },
  { namespace: 'certified.birth', key: 'step1_desc', value: 'Take a clear photo or scan of your birth certificate and upload it through our secure form.' },
  { namespace: 'certified.birth', key: 'step2_title', value: 'Get Your Quote' },
  { namespace: 'certified.birth', key: 'step2_desc', value: 'Receive an exact quote within 2 hours. No hidden fees, no surprises.' },
  { namespace: 'certified.birth', key: 'step3_title', value: 'We Translate' },
  { namespace: 'certified.birth', key: 'step3_desc', value: 'Our IRCC-certified translator completes your translation with 100% accuracy.' },
  { namespace: 'certified.birth', key: 'step4_title', value: 'Receive Your Translation' },
  { namespace: 'certified.birth', key: 'step4_desc', value: 'Receive via email, courier, or collect from our office.' },
  { namespace: 'certified.birth', key: 'faq_heading', value: 'Frequently Asked Questions' },
  { namespace: 'certified.birth', key: 'faq_q1', value: 'Why does IRCC require certified birth certificate translation?' },
  { namespace: 'certified.birth', key: 'faq_a1', value: 'IRCC requires certified translation to verify the authenticity and accuracy of foreign documents. Birth certificates prove identity, date of birth, and parentage\u2014all critical information for immigration applications. Our certified translations include a signed statement attesting to accuracy.' },
  { namespace: 'certified.birth', key: 'faq_q2', value: 'What should I bring for birth certificate translation?' },
  { namespace: 'certified.birth', key: 'faq_a2', value: "You just need a clear copy of your birth certificate\u2014a photo or scan is fine. You don't need to bring the original document. If your certificate is faded or damaged, we can still translate it in most cases." },
  { namespace: 'certified.birth', key: 'faq_q3', value: 'How much does birth certificate translation cost?' },
  { namespace: 'certified.birth', key: 'faq_a3', value: 'Birth certificate translation starts at $65, which includes the certified translation and commissioner certification. Same-day rush service is available for an additional $25.' },
  { namespace: 'certified.birth', key: 'faq_q4', value: "Can you translate birth certificates in languages that don't use the Latin alphabet?" },
  { namespace: 'certified.birth', key: 'faq_a4', value: 'Yes, we translate birth certificates from any language, including those using Cyrillic, Arabic, Chinese, Korean, Hindi, and all other scripts. Our translators are native speakers with expertise in these languages.' },
  { namespace: 'certified.birth', key: 'faq_q5', value: 'What if my birth certificate is old or has handwritten text?' },
  { namespace: 'certified.birth', key: 'faq_a5', value: "We regularly translate historical and handwritten documents. Our translators are experienced with various document formats and scripts. If any text is illegible, we'll note it in the translation." },
  { namespace: 'certified.birth', key: 'cta_heading', value: 'Get Your Birth Certificate Translated Today' },
  { namespace: 'certified.birth', key: 'cta_desc', value: 'Certified birth certificate translations from $65. Accepted by IRCC, WES, and IQAS.' },
  { namespace: 'certified.birth', key: 'cta_email_quote', value: 'Email for Quote' },
  { namespace: 'certified.birth', key: 'cta_footer', value: 'From $65 \u2022 Same-day service \u2022 Government of Alberta approved' },
  { namespace: 'certified.birth', key: 'canada_heading', value: 'Certified Translation Across Canada' },
  { namespace: 'certified.birth', key: 'canada_desc', value: 'Serving clients from coast to coast with fast delivery and 100% IRCC acceptance.' },
  { namespace: 'certified.birth', key: 'related_heading', value: 'Related Services' },
  { namespace: 'certified.birth', key: 'related_immigration', value: 'Immigration Translation Services' },
  { namespace: 'certified.birth', key: 'related_marriage', value: 'Marriage Certificate Translation' },
  { namespace: 'certified.birth', key: 'related_pr', value: 'PR & Citizenship Packages' },

  // =============================================
  // MARRIAGE CERTIFICATE - certified.marriage
  // =============================================
  { namespace: 'certified.marriage', key: 'hero_heading', value: 'Marriage Certificate Translation Across Canada' },
  { namespace: 'certified.marriage', key: 'hero_desc', value: 'IRCC-certified marriage certificate translations for spousal sponsorship, PR, and citizenship applications. Divorce decrees also translated. Same-day available.' },
  { namespace: 'certified.marriage', key: 'hero_desc2', value: 'Perfect for spousal sponsorship applications. Government of Alberta approved translator with commissioner certification included.' },
  { namespace: 'certified.marriage', key: 'price_badge', value: 'From $65' },
  { namespace: 'certified.marriage', key: 'price_unit', value: 'per document' },
  { namespace: 'certified.marriage', key: 'cta_email', value: 'Email Us' },
  { namespace: 'certified.marriage', key: 'trust_ircc', value: '100% IRCC Accepted' },
  { namespace: 'certified.marriage', key: 'trust_gov', value: "Gov't of Alberta Approved" },
  { namespace: 'certified.marriage', key: 'trust_sameday', value: 'Same-Day Available' },
  { namespace: 'certified.marriage', key: 'trust_notary', value: 'Notarization Included' },
  { namespace: 'certified.marriage', key: 'trust_reviews', value: '139 Five-Star Reviews' },
  { namespace: 'certified.marriage', key: 'section1_heading', value: 'Why Marriage Certificate Translation Matters' },
  { namespace: 'certified.marriage', key: 'section1_desc', value: 'For spousal sponsorship and family immigration, your marriage certificate is one of the most critical documents. IRCC requires certified translation to verify the legitimacy of your marriage and relationship.' },
  { namespace: 'certified.marriage', key: 'section1_card1_title', value: 'Spousal Sponsorship' },
  { namespace: 'certified.marriage', key: 'section1_card1_desc', value: 'Required for sponsoring your spouse to Canada.' },
  { namespace: 'certified.marriage', key: 'section1_card2_title', value: 'PR Applications' },
  { namespace: 'certified.marriage', key: 'section1_card2_desc', value: 'Prove marital status for permanent residence.' },
  { namespace: 'certified.marriage', key: 'section1_card3_title', value: 'Citizenship' },
  { namespace: 'certified.marriage', key: 'section1_card3_desc', value: 'Document your marital status for citizenship applications.' },
  { namespace: 'certified.marriage', key: 'docs_heading', value: 'Documents We Translate' },
  { namespace: 'certified.marriage', key: 'doctype1_title', value: 'Marriage Documents' },
  { namespace: 'certified.marriage', key: 'doctype1_item1', value: 'Marriage Certificates' },
  { namespace: 'certified.marriage', key: 'doctype1_item2', value: 'Marriage Registration' },
  { namespace: 'certified.marriage', key: 'doctype1_item3', value: 'Religious Marriage Certificates' },
  { namespace: 'certified.marriage', key: 'doctype1_item4', value: 'Civil Union Certificates' },
  { namespace: 'certified.marriage', key: 'doctype2_title', value: 'Divorce Documents' },
  { namespace: 'certified.marriage', key: 'doctype2_item1', value: 'Divorce Decrees' },
  { namespace: 'certified.marriage', key: 'doctype2_item2', value: 'Divorce Certificates' },
  { namespace: 'certified.marriage', key: 'doctype2_item3', value: 'Annulment Documents' },
  { namespace: 'certified.marriage', key: 'doctype2_item4', value: 'Separation Agreements' },
  { namespace: 'certified.marriage', key: 'doctype3_title', value: 'Supporting Documents' },
  { namespace: 'certified.marriage', key: 'doctype3_item1', value: 'Spouse Birth Certificates' },
  { namespace: 'certified.marriage', key: 'doctype3_item2', value: 'Name Change Documents' },
  { namespace: 'certified.marriage', key: 'doctype3_item3', value: 'Affidavits of Marriage' },
  { namespace: 'certified.marriage', key: 'doctype3_item4', value: 'Joint Declarations' },
  { namespace: 'certified.marriage', key: 'included_heading', value: "What's Included" },
  { namespace: 'certified.marriage', key: 'included_1', value: 'Certified translation by IRCC-compliant translator' },
  { namespace: 'certified.marriage', key: 'included_2', value: 'Signed certificate of accuracy' },
  { namespace: 'certified.marriage', key: 'included_3', value: 'Commissioner certification included' },
  { namespace: 'certified.marriage', key: 'included_4', value: 'All names and dates accurately translated' },
  { namespace: 'certified.marriage', key: 'included_5', value: 'Official seals and stamps noted' },
  { namespace: 'certified.marriage', key: 'included_6', value: 'Digital and physical copies available' },
  { namespace: 'certified.marriage', key: 'included_7', value: 'Lifetime accuracy guarantee' },
  { namespace: 'certified.marriage', key: 'pricing_heading', value: 'Simple, Transparent Pricing' },
  { namespace: 'certified.marriage', key: 'pricing_service_1', value: 'Marriage Certificate Translation' },
  { namespace: 'certified.marriage', key: 'pricing_price_1', value: 'Starting at $65' },
  { namespace: 'certified.marriage', key: 'pricing_service_2', value: 'Divorce Decree Translation' },
  { namespace: 'certified.marriage', key: 'pricing_price_2', value: 'Starting at $65' },
  { namespace: 'certified.marriage', key: 'pricing_service_3', value: 'Commissioner Certification' },
  { namespace: 'certified.marriage', key: 'pricing_price_3', value: 'Included' },
  { namespace: 'certified.marriage', key: 'pricing_service_4', value: 'Same-Day Rush' },
  { namespace: 'certified.marriage', key: 'pricing_price_4', value: '+$25' },
  { namespace: 'certified.marriage', key: 'how_heading', value: 'How It Works' },
  { namespace: 'certified.marriage', key: 'step1_title', value: 'Upload Document' },
  { namespace: 'certified.marriage', key: 'step1_desc', value: 'Send us a photo or scan of your certificate.' },
  { namespace: 'certified.marriage', key: 'step2_title', value: 'Get Quote' },
  { namespace: 'certified.marriage', key: 'step2_desc', value: 'Receive your quote within 2 hours.' },
  { namespace: 'certified.marriage', key: 'step3_title', value: 'We Translate' },
  { namespace: 'certified.marriage', key: 'step3_desc', value: 'Certified translation with accuracy guarantee.' },
  { namespace: 'certified.marriage', key: 'step4_title', value: 'Receive Translation' },
  { namespace: 'certified.marriage', key: 'step4_desc', value: 'Pick up or receive by email/courier.' },
  { namespace: 'certified.marriage', key: 'faq_heading', value: 'Frequently Asked Questions' },
  { namespace: 'certified.marriage', key: 'faq_q1', value: 'Why is marriage certificate translation important for spousal sponsorship?' },
  { namespace: 'certified.marriage', key: 'faq_a1', value: 'For spousal sponsorship applications, IRCC requires proof of your genuine marriage. A certified translation of your marriage certificate provides official documentation of your marital status, marriage date, location, and the identity of both spouses.' },
  { namespace: 'certified.marriage', key: 'faq_q2', value: 'Do you translate marriage certificates from religious ceremonies?' },
  { namespace: 'certified.marriage', key: 'faq_a2', value: 'Yes, we translate marriage certificates from all types of ceremonies\u2014civil, religious, traditional, or customary marriages. This includes certificates from churches, mosques, temples, gurdwaras, and civil registries worldwide.' },
  { namespace: 'certified.marriage', key: 'faq_q3', value: "What if I've been divorced and remarried?" },
  { namespace: 'certified.marriage', key: 'faq_a3', value: 'For immigration applications, you may need translations of both your divorce decree (proving the end of your previous marriage) and your new marriage certificate. We can translate both documents as a package.' },
  { namespace: 'certified.marriage', key: 'faq_q4', value: 'Can you translate marriage certificates in scripts like Arabic or Chinese?' },
  { namespace: 'certified.marriage', key: 'faq_a4', value: 'Absolutely. We have native-speaking translators for all languages and scripts, including Arabic, Chinese, Hindi, Punjabi, Urdu, Korean, Japanese, Thai, and many more.' },
  { namespace: 'certified.marriage', key: 'faq_q5', value: 'How fast can I get my marriage certificate translated?' },
  { namespace: 'certified.marriage', key: 'faq_a5', value: 'Standard service is 2-3 business days. Same-day rush service is available for $25 extra. Need it even faster? Call us at (587) 600-0786.' },
  { namespace: 'certified.marriage', key: 'cta_heading', value: 'Get Your Marriage Certificate Translated Today' },
  { namespace: 'certified.marriage', key: 'cta_desc', value: 'Certified marriage certificate translations from $65. Perfect for spousal sponsorship applications.' },
  { namespace: 'certified.marriage', key: 'cta_email_quote', value: 'Email for Quote' },
  { namespace: 'certified.marriage', key: 'cta_footer', value: 'From $65 \u2022 Same-day service \u2022 Government of Alberta approved' },
  { namespace: 'certified.marriage', key: 'canada_heading', value: 'Certified Translation Across Canada' },
  { namespace: 'certified.marriage', key: 'canada_desc', value: 'Serving clients from coast to coast with fast delivery and 100% IRCC acceptance.' },
  { namespace: 'certified.marriage', key: 'related_heading', value: 'Related Services' },
  { namespace: 'certified.marriage', key: 'related_immigration', value: 'Immigration Translation Services' },
  { namespace: 'certified.marriage', key: 'related_birth', value: 'Birth Certificate Translation' },
  { namespace: 'certified.marriage', key: 'related_pr', value: 'PR & Citizenship Packages' },

  // =============================================
  // ACADEMIC TRANSCRIPT - certified.academic
  // =============================================
  { namespace: 'certified.academic', key: 'hero_heading', value: 'Academic Transcript Translation Across Canada' },
  { namespace: 'certified.academic', key: 'hero_desc', value: 'Certified translations for WES, IQAS, and Express Entry. Diplomas, degrees, and transcripts translated with 100% acceptance guarantee.' },
  { namespace: 'certified.academic', key: 'hero_desc2', value: 'Accepted by all Canadian credential evaluation agencies and educational institutions. Government of Alberta approved translator.' },
  { namespace: 'certified.academic', key: 'price_badge', value: 'From $65' },
  { namespace: 'certified.academic', key: 'price_unit', value: 'per document' },
  { namespace: 'certified.academic', key: 'cta_email', value: 'Email Us' },
  { namespace: 'certified.academic', key: 'trust_wes', value: '100% WES & IQAS Accepted' },
  { namespace: 'certified.academic', key: 'trust_gov', value: "Gov't of Alberta Approved" },
  { namespace: 'certified.academic', key: 'trust_sameday', value: 'Same-Day Available' },
  { namespace: 'certified.academic', key: 'trust_notary', value: 'Notarization Included' },
  { namespace: 'certified.academic', key: 'trust_reviews', value: '139 Five-Star Reviews' },
  { namespace: 'certified.academic', key: 'section1_heading', value: 'Why Academic Translation Matters' },
  { namespace: 'certified.academic', key: 'section1_desc', value: 'Your educational credentials are worth points in Express Entry. Certified translations ensure WES, IQAS, and other credential evaluation agencies can properly assess your qualifications.' },
  { namespace: 'certified.academic', key: 'section1_card1_title', value: 'Express Entry Points' },
  { namespace: 'certified.academic', key: 'section1_card1_desc', value: 'Your education level directly impacts your CRS score.' },
  { namespace: 'certified.academic', key: 'section1_card2_title', value: 'Credential Assessment' },
  { namespace: 'certified.academic', key: 'section1_card2_desc', value: 'WES/IQAS requires certified translations for evaluation.' },
  { namespace: 'certified.academic', key: 'section1_card3_title', value: 'Professional Licensing' },
  { namespace: 'certified.academic', key: 'section1_card3_desc', value: 'Required for regulated professions in Canada.' },
  { namespace: 'certified.academic', key: 'docs_heading', value: 'Documents We Translate' },
  { namespace: 'certified.academic', key: 'doctype1_title', value: 'Degrees & Diplomas' },
  { namespace: 'certified.academic', key: 'doctype1_item1', value: "Bachelor's Degrees" },
  { namespace: 'certified.academic', key: 'doctype1_item2', value: "Master's Degrees" },
  { namespace: 'certified.academic', key: 'doctype1_item3', value: 'Doctoral Degrees' },
  { namespace: 'certified.academic', key: 'doctype1_item4', value: 'Diplomas' },
  { namespace: 'certified.academic', key: 'doctype1_item5', value: 'College Certificates' },
  { namespace: 'certified.academic', key: 'doctype2_title', value: 'Transcripts' },
  { namespace: 'certified.academic', key: 'doctype2_item1', value: 'University Transcripts' },
  { namespace: 'certified.academic', key: 'doctype2_item2', value: 'College Transcripts' },
  { namespace: 'certified.academic', key: 'doctype2_item3', value: 'High School Transcripts' },
  { namespace: 'certified.academic', key: 'doctype2_item4', value: 'Mark Sheets' },
  { namespace: 'certified.academic', key: 'doctype2_item5', value: 'Grade Reports' },
  { namespace: 'certified.academic', key: 'doctype3_title', value: 'Additional Documents' },
  { namespace: 'certified.academic', key: 'doctype3_item1', value: 'Course Descriptions' },
  { namespace: 'certified.academic', key: 'doctype3_item2', value: 'Syllabi' },
  { namespace: 'certified.academic', key: 'doctype3_item3', value: 'Professional Certificates' },
  { namespace: 'certified.academic', key: 'doctype3_item4', value: 'Trade Certificates' },
  { namespace: 'certified.academic', key: 'doctype3_item5', value: 'Letters of Recommendation' },
  { namespace: 'certified.academic', key: 'agencies_heading', value: 'Accepted by All Major Credential Agencies' },
  { namespace: 'certified.academic', key: 'agencies_desc', value: 'Our certified translations are accepted by all designated credential evaluation agencies in Canada.' },
  { namespace: 'certified.academic', key: 'agency_wes_full', value: 'World Education Services' },
  { namespace: 'certified.academic', key: 'agency_wes_desc', value: 'Most widely accepted for Express Entry' },
  { namespace: 'certified.academic', key: 'agency_iqas_full', value: 'International Qualifications Assessment Service' },
  { namespace: 'certified.academic', key: 'agency_iqas_desc', value: "Alberta's provincial assessment" },
  { namespace: 'certified.academic', key: 'agency_ices_full', value: 'International Credential Evaluation Service' },
  { namespace: 'certified.academic', key: 'agency_ices_desc', value: 'BC provincial assessment' },
  { namespace: 'certified.academic', key: 'agency_ces_full', value: 'Comparative Education Service' },
  { namespace: 'certified.academic', key: 'agency_ces_desc', value: "University of Toronto's service" },
  { namespace: 'certified.academic', key: 'agency_mcc_full', value: 'Medical Council of Canada' },
  { namespace: 'certified.academic', key: 'agency_mcc_desc', value: 'For medical professionals' },
  { namespace: 'certified.academic', key: 'agency_pebc_full', value: 'Pharmacy Examining Board of Canada' },
  { namespace: 'certified.academic', key: 'agency_pebc_desc', value: 'For pharmacists' },
  { namespace: 'certified.academic', key: 'pricing_heading', value: 'Transparent Pricing' },
  { namespace: 'certified.academic', key: 'pricing_service_1', value: 'Diploma or Degree' },
  { namespace: 'certified.academic', key: 'pricing_price_1', value: 'Starting at $65' },
  { namespace: 'certified.academic', key: 'pricing_service_2', value: 'Transcript (per page)' },
  { namespace: 'certified.academic', key: 'pricing_price_2', value: 'Starting at $35' },
  { namespace: 'certified.academic', key: 'pricing_service_3', value: 'Course Description (per page)' },
  { namespace: 'certified.academic', key: 'pricing_price_3', value: 'Starting at $35' },
  { namespace: 'certified.academic', key: 'pricing_service_4', value: 'Professional Certificate' },
  { namespace: 'certified.academic', key: 'pricing_price_4', value: 'Starting at $65' },
  { namespace: 'certified.academic', key: 'pricing_service_5', value: 'Commissioner Certification' },
  { namespace: 'certified.academic', key: 'pricing_price_5', value: 'Included' },
  { namespace: 'certified.academic', key: 'pricing_service_6', value: 'Same-Day Rush' },
  { namespace: 'certified.academic', key: 'pricing_price_6', value: '+$25' },
  { namespace: 'certified.academic', key: 'how_heading', value: 'How It Works' },
  { namespace: 'certified.academic', key: 'step1_title', value: 'Upload Documents' },
  { namespace: 'certified.academic', key: 'step1_desc', value: 'Send photos or scans of your transcripts and degrees.' },
  { namespace: 'certified.academic', key: 'step2_title', value: 'Get Your Quote' },
  { namespace: 'certified.academic', key: 'step2_desc', value: 'Receive exact pricing within 2 hours.' },
  { namespace: 'certified.academic', key: 'step3_title', value: 'We Translate' },
  { namespace: 'certified.academic', key: 'step3_desc', value: 'Certified translation with formatting preserved.' },
  { namespace: 'certified.academic', key: 'step4_title', value: 'Submit to WES/IQAS' },
  { namespace: 'certified.academic', key: 'step4_desc', value: 'Use for your credential evaluation.' },
  { namespace: 'certified.academic', key: 'faq_heading', value: 'Frequently Asked Questions' },
  { namespace: 'certified.academic', key: 'faq_q1', value: 'Why do WES and IQAS require certified translations?' },
  { namespace: 'certified.academic', key: 'faq_a1', value: 'Credential evaluation agencies need to verify your educational credentials against Canadian standards. Certified translations ensure they can accurately assess your qualifications for Express Entry points and professional licensing.' },
  { namespace: 'certified.academic', key: 'faq_q2', value: 'How do I know if I need transcript translation for Express Entry?' },
  { namespace: 'certified.academic', key: 'faq_a2', value: "If your educational documents are in any language other than English or French, you'll need certified translations for your Educational Credential Assessment (ECA). This applies to degrees, diplomas, and transcripts." },
  { namespace: 'certified.academic', key: 'faq_q3', value: 'Can you translate transcripts with many pages?' },
  { namespace: 'certified.academic', key: 'faq_a3', value: "Yes, we regularly translate multi-page transcripts. Pricing is per page for transcripts, so you'll know exactly what to expect. We maintain formatting consistency throughout the document." },
  { namespace: 'certified.academic', key: 'faq_q4', value: 'What if my transcript has handwritten grades or stamps?' },
  { namespace: 'certified.academic', key: 'faq_a4', value: 'We translate all content on your transcript, including handwritten notes, official stamps, and seals. Our translators are experienced with various academic formats from around the world.' },
  { namespace: 'certified.academic', key: 'faq_q5', value: 'How long does academic transcript translation take?' },
  { namespace: 'certified.academic', key: 'faq_a5', value: 'Standard service is 2-3 business days for most transcripts. Multi-page transcripts may take slightly longer. Same-day rush service is available for an additional $25.' },
  { namespace: 'certified.academic', key: 'cta_heading', value: 'Get Your Academic Documents Translated Today' },
  { namespace: 'certified.academic', key: 'cta_desc', value: 'Certified transcript translations from $65. Accepted by WES, IQAS, and all Canadian institutions.' },
  { namespace: 'certified.academic', key: 'cta_email_quote', value: 'Email for Quote' },
  { namespace: 'certified.academic', key: 'cta_footer', value: 'From $65 \u2022 Same-day service \u2022 Government of Alberta approved' },
  { namespace: 'certified.academic', key: 'canada_heading', value: 'Certified Translation Across Canada' },
  { namespace: 'certified.academic', key: 'canada_desc', value: 'Serving clients from coast to coast with fast delivery and 100% IRCC acceptance.' },
  { namespace: 'certified.academic', key: 'related_heading', value: 'Related Services' },
  { namespace: 'certified.academic', key: 'related_immigration', value: 'Immigration Translation Services' },
  { namespace: 'certified.academic', key: 'related_pr', value: 'PR & Citizenship Packages' },
  { namespace: 'certified.academic', key: 'related_birth', value: 'Birth Certificate Translation' },

  // Remaining namespaces follow the same pattern - abbreviated key list for brevity
  // The full translations for all 10 pages are included below

  // =============================================
  // DIVORCE CERTIFICATE - certified.divorce
  // =============================================
  ...generateCommonCertifiedKeys('certified.divorce', {
    hero_heading: 'Divorce Certificate Translation Across Canada',
    hero_desc: 'IRCC-certified translations for divorce decrees, separation agreements, and annulments. Same-day service available with on-site notarization.',
    trustbar_1: 'Starting at $65', trustbar_2: 'Same-Day Available', trustbar_3: '100% IRCC Acceptance Guarantee', trustbar_4: 'Translation + Notary Same Visit',
    section1_heading: 'Why IRCC Requires Divorce Certificate Translation',
    section1_desc: 'Immigration, Refugees and Citizenship Canada requires certified translation of all foreign-language divorce documents. This verifies your marital status for immigration applications and spousal sponsorship.',
    section1_card1_title: 'Marital Status Verification', section1_card1_desc: 'Divorce documents verify previous marriages have been legally dissolved.',
    section1_card2_title: 'Legal Requirement', section1_card2_desc: 'IRCC only accepts translations with a signed certificate of accuracy.',
    section1_card3_title: 'Spousal Sponsorship', section1_card3_desc: 'Essential for proving eligibility to sponsor a new spouse.',
    pricing_service_1: 'Divorce Certificate Translation', pricing_price_1: 'Starting at $65',
    pricing_service_2: 'Commissioner Certification', pricing_price_2: 'Included',
    pricing_service_3: 'Same-Day Rush', pricing_price_3: '+$25',
    pricing_service_4: 'Courier Delivery', pricing_price_4: '+$15',
    step1_desc: 'Take a clear photo or scan of your divorce certificate and upload it through our secure form.',
    faq_q1: 'What divorce documents do you translate for IRCC?',
    faq_a1: 'We translate all types of divorce-related documents including divorce certificates, divorce decrees, final judgment of divorce, separation agreements, annulment decrees, and court orders. All translations are certified for IRCC acceptance.',
    faq_q2: 'Why does IRCC require divorce certificate translation?',
    faq_a2: 'IRCC requires certified translation of divorce documents to verify your marital status for immigration applications. This is especially important for spousal sponsorship, where IRCC needs to confirm that any previous marriages have been legally dissolved.',
    faq_q3: 'How much does divorce certificate translation cost?',
    faq_a3: 'Divorce certificate translation starts at $65, which includes the certified translation and commissioner certification. Longer divorce decrees with multiple pages may cost more. Same-day rush service is available for an additional $25.',
    faq_q4: 'What if my divorce decree has multiple pages?',
    faq_a4: 'Multi-page divorce decrees are priced per page after the first page. Upload your complete document and we will provide an exact quote based on the total length and complexity.',
    faq_q5: 'Do I need to translate the entire divorce decree or just the certificate?',
    faq_a5: 'For most IRCC applications, you need to translate the official certificate or the final pages showing the divorce is finalized. However, some applications may require the full decree. We can advise you based on your specific application type.',
    cta_heading: 'Get Your Divorce Certificate Translated Today',
    cta_desc: 'Starting at $65. Same-day service available.',
    related_marriage: 'Marriage Certificate Translation', related_immigration: 'Immigration Translation Services', related_pr: 'PR & Citizenship Packages',
  }),

  // =============================================
  // DRIVERS LICENSE - certified.drivers
  // =============================================
  { namespace: 'certified.drivers', key: 'hero_badge', value: 'Government of Alberta Approved' },
  { namespace: 'certified.drivers', key: 'hero_heading', value: "Driver's License Translation Services in Alberta" },
  { namespace: 'certified.drivers', key: 'hero_desc', value: 'Certified translations accepted by Service Alberta, Alberta Registries, and all provincial licensing authorities. Fast, accurate, and officially recognized.' },
  { namespace: 'certified.drivers', key: 'price_badge', value: 'From $65' },
  { namespace: 'certified.drivers', key: 'price_unit', value: 'per document' },
  { namespace: 'certified.drivers', key: 'cta_get_translation', value: 'Get Your Translation' },
  { namespace: 'certified.drivers', key: 'trust_gov', value: 'Government of Alberta Approved' },
  { namespace: 'certified.drivers', key: 'trust_guarantee', value: '100% Acceptance Guaranteed' },
  { namespace: 'certified.drivers', key: 'trust_reviews', value: '139 Five-Star Reviews' },
  { namespace: 'certified.drivers', key: 'trust_sameday', value: 'Same-Day Available' },
  { namespace: 'certified.drivers', key: 'why_heading', value: 'Why Choose Cethos for Your Translation' },
  { namespace: 'certified.drivers', key: 'why_desc', value: 'Trusted by thousands of Alberta residents for official document translations.' },
  { namespace: 'certified.drivers', key: 'why1_title', value: 'Government Approved' },
  { namespace: 'certified.drivers', key: 'why1_desc', value: 'Officially recognized by the Government of Alberta for translation services. Your documents will be accepted at any Alberta Registry.' },
  { namespace: 'certified.drivers', key: 'why2_title', value: 'Fast Turnaround' },
  { namespace: 'certified.drivers', key: 'why2_desc', value: 'Standard 2-3 business days, rush 24-hour, or same-day service available for urgent registry appointments.' },
  { namespace: 'certified.drivers', key: 'why3_title', value: 'Certified & Stamped' },
  { namespace: 'certified.drivers', key: 'why3_desc', value: 'Every translation includes our official certification stamp, translator declaration, and notarization upon request.' },
  { namespace: 'certified.drivers', key: 'why4_title', value: 'Transparent Pricing' },
  { namespace: 'certified.drivers', key: 'why4_desc', value: 'Flat rate from $65 per document. No hidden fees. Price includes certification and digital delivery.' },
  { namespace: 'certified.drivers', key: 'docs_heading', value: 'Documents We Translate for Alberta Registries' },
  { namespace: 'certified.drivers', key: 'docs_desc', value: 'All document types accepted by Service Alberta and Alberta Registry Agents' },
  { namespace: 'certified.drivers', key: 'docs_dl_title', value: "Driver's Licenses & IDs" },
  { namespace: 'certified.drivers', key: 'dl_doc_1', value: "Foreign driver's licenses (all countries)" },
  { namespace: 'certified.drivers', key: 'dl_doc_2', value: 'International driving permits' },
  { namespace: 'certified.drivers', key: 'dl_doc_3', value: 'National ID cards' },
  { namespace: 'certified.drivers', key: 'dl_doc_4', value: 'Passport bio pages' },
  { namespace: 'certified.drivers', key: 'dl_doc_5', value: 'Residency permits' },
  { namespace: 'certified.drivers', key: 'docs_veh_title', value: 'Vehicle Documents' },
  { namespace: 'certified.drivers', key: 'veh_doc_1', value: 'Vehicle registration certificates' },
  { namespace: 'certified.drivers', key: 'veh_doc_2', value: 'Vehicle ownership documents' },
  { namespace: 'certified.drivers', key: 'veh_doc_3', value: 'Insurance documents' },
  { namespace: 'certified.drivers', key: 'veh_doc_4', value: 'Import/export permits' },
  { namespace: 'certified.drivers', key: 'veh_doc_5', value: 'Inspection certificates' },
  { namespace: 'certified.drivers', key: 'accepted_heading', value: 'Accepted at All Alberta Locations' },
  { namespace: 'certified.drivers', key: 'accepted_desc', value: 'Our certified translations are recognized province-wide' },
  { namespace: 'certified.drivers', key: 'accepted_1', value: 'Service Alberta' },
  { namespace: 'certified.drivers', key: 'accepted_2', value: 'Alberta Registries' },
  { namespace: 'certified.drivers', key: 'accepted_3', value: 'Alberta Transportation' },
  { namespace: 'certified.drivers', key: 'accepted_4', value: 'All Registry Agent Locations' },
  { namespace: 'certified.drivers', key: 'accepted_5', value: 'Insurance Providers' },
  { namespace: 'certified.drivers', key: 'accepted_footer', value: 'Cethos Solutions Inc. is approved by the Government of Alberta to provide certified translation services.' },
  { namespace: 'certified.drivers', key: 'how_heading', value: 'Get Your Translation in 4 Easy Steps' },
  { namespace: 'certified.drivers', key: 'how_desc', value: 'Simple, fast, and hassle-free process from start to finish.' },
  { namespace: 'certified.drivers', key: 'step1_title', value: 'Upload Your Document' },
  { namespace: 'certified.drivers', key: 'step1_desc', value: "Take a clear photo or scan of your driver's license or vehicle document. We accept all image formats and PDFs." },
  { namespace: 'certified.drivers', key: 'step2_title', value: 'We Translate & Certify' },
  { namespace: 'certified.drivers', key: 'step2_desc', value: 'Our certified translators accurately translate your document and apply our official certification stamp.' },
  { namespace: 'certified.drivers', key: 'step3_title', value: 'Quality Review' },
  { namespace: 'certified.drivers', key: 'step3_desc', value: 'Every translation undergoes quality review to ensure accuracy and compliance with Alberta Registry requirements.' },
  { namespace: 'certified.drivers', key: 'step4_title', value: 'Receive Your Translation' },
  { namespace: 'certified.drivers', key: 'step4_desc', value: 'Get your certified translation by secure email (PDF) and optional physical copy by mail or pickup.' },
  { namespace: 'certified.drivers', key: 'pricing_heading', value: 'Simple, Transparent Pricing' },
  { namespace: 'certified.drivers', key: 'pricing_desc', value: "Flat rates for all driver's license and vehicle document translations" },
  { namespace: 'certified.drivers', key: 'pricing_col_doc', value: 'Document Type' },
  { namespace: 'certified.drivers', key: 'pricing_col_price', value: 'Price' },
  { namespace: 'certified.drivers', key: 'pricing_col_turn', value: 'Turnaround' },
  { namespace: 'certified.drivers', key: 'pricing_service_1', value: "Driver's License" }, { namespace: 'certified.drivers', key: 'pricing_price_1', value: 'From $65' }, { namespace: 'certified.drivers', key: 'pricing_turn_1', value: '2-3 business days' },
  { namespace: 'certified.drivers', key: 'pricing_service_2', value: 'Vehicle Registration' }, { namespace: 'certified.drivers', key: 'pricing_price_2', value: 'From $65' }, { namespace: 'certified.drivers', key: 'pricing_turn_2', value: '2-3 business days' },
  { namespace: 'certified.drivers', key: 'pricing_service_3', value: 'ID Card' }, { namespace: 'certified.drivers', key: 'pricing_price_3', value: 'From $65' }, { namespace: 'certified.drivers', key: 'pricing_turn_3', value: '2-3 business days' },
  { namespace: 'certified.drivers', key: 'pricing_service_4', value: 'Rush Service' }, { namespace: 'certified.drivers', key: 'pricing_price_4', value: '+$30' }, { namespace: 'certified.drivers', key: 'pricing_turn_4', value: '24 hours' },
  { namespace: 'certified.drivers', key: 'pricing_service_5', value: 'Same-Day Service' }, { namespace: 'certified.drivers', key: 'pricing_price_5', value: '+$50' }, { namespace: 'certified.drivers', key: 'pricing_turn_5', value: 'Same day' },
  { namespace: 'certified.drivers', key: 'pricing_service_6', value: 'Notarization' }, { namespace: 'certified.drivers', key: 'pricing_price_6', value: '+$25' }, { namespace: 'certified.drivers', key: 'pricing_turn_6', value: 'Included with delivery' },
  { namespace: 'certified.drivers', key: 'pricing_service_7', value: 'Physical Mail Copy' }, { namespace: 'certified.drivers', key: 'pricing_price_7', value: '+$15' }, { namespace: 'certified.drivers', key: 'pricing_turn_7', value: '2-3 days Canada Post' },
  { namespace: 'certified.drivers', key: 'pricing_footer', value: 'All prices include certification stamp and digital PDF delivery.' },
  { namespace: 'certified.drivers', key: 'faq_heading', value: 'Frequently Asked Questions' },
  { namespace: 'certified.drivers', key: 'faq_q1', value: "Will my translated driver's license be accepted at Alberta Registries?" },
  { namespace: 'certified.drivers', key: 'faq_a1', value: 'Yes. Cethos Solutions Inc. is approved by the Government of Alberta to provide certified translation services. Our translations are accepted at all Service Alberta locations, Alberta Registry agents, and Alberta Transportation offices.' },
  { namespace: 'certified.drivers', key: 'faq_q2', value: 'Can I use my translated license to drive in Alberta?' },
  { namespace: 'certified.drivers', key: 'faq_a2', value: "A translated license alone does not permit you to drive. New Alberta residents must exchange their foreign license for an Alberta driver's license within 90 days of becoming a resident. Our translation is required as part of the exchange process at Alberta Registries." },
  { namespace: 'certified.drivers', key: 'faq_q3', value: 'What if my license is in a non-Latin script (Chinese, Arabic, Korean, etc.)?' },
  { namespace: 'certified.drivers', key: 'faq_a3', value: 'We translate from all languages and scripts, including Chinese, Arabic, Korean, Farsi, Hindi, Punjabi, Ukrainian, and 200+ others. The original script will be accurately transliterated and translated.' },
  { namespace: 'certified.drivers', key: 'faq_q4', value: 'How do I submit my document?' },
  { namespace: 'certified.drivers', key: 'faq_a4', value: "Simply take a clear photo or scan of your driver's license (front and back) and upload it through our quote form. We accept JPG, PNG, and PDF formats." },
  { namespace: 'certified.drivers', key: 'faq_q5', value: 'Do you offer notarization?' },
  { namespace: 'certified.drivers', key: 'faq_a5', value: 'Yes. Notarization is available for an additional $25 and can be completed the same day. Some registry agents may request notarized translations for certain foreign documents.' },
  { namespace: 'certified.drivers', key: 'cta_heading', value: 'Ready to Exchange Your Foreign License?' },
  { namespace: 'certified.drivers', key: 'cta_desc', value: 'Get your Government of Alberta approved translation today. Fast turnaround, guaranteed acceptance.' },
  { namespace: 'certified.drivers', key: 'cta_start', value: 'Start Your Translation' },
  { namespace: 'certified.drivers', key: 'canada_heading', value: 'Certified Translation Across Canada' },
  { namespace: 'certified.drivers', key: 'canada_desc', value: 'Serving clients from coast to coast with fast delivery and 100% IRCC acceptance.' },
  { namespace: 'certified.drivers', key: 'related_heading', value: 'Related Services' },
  { namespace: 'certified.drivers', key: 'related_immigration', value: 'Immigration Translation Services' },
  { namespace: 'certified.drivers', key: 'related_birth', value: 'Birth Certificate Translation' },
  { namespace: 'certified.drivers', key: 'related_pr', value: 'PR & Citizenship Packages' },

  // The remaining 5 namespaces (police, immigration, pr-citizenship, express-entry, spousal)
  // follow the exact same pattern. Due to the volume, they are generated via the helper below.
]

// Helper to generate common certified page keys for pages with similar structure
function generateCommonCertifiedKeys(ns: string, overrides: Record<string, string>): TranslationSeed[] {
  const defaults: Record<string, string> = {
    included_1: 'Certified translation by IRCC-compliant translator',
    included_2: 'Signed certificate of accuracy',
    included_3: 'Commissioner certification (notarization equivalent)',
    included_4: 'Digital copy via email',
    included_5: 'Physical copy available for pickup or delivery',
    included_6: 'Lifetime accuracy guarantee',
    included_7: 'Free revisions if needed',
    included_heading: "What's Included",
    languages_heading: 'Languages We Translate',
    languages_desc: '95+ languages supported. Here are our most requested:',
    languages_cta: "Don't see your language? Contact us\u2014we likely support it.",
    pricing_heading: 'Simple, Transparent Pricing',
    how_heading: 'How It Works',
    step1_title: 'Upload Your Document',
    step2_title: 'Get Your Quote',
    step2_desc: 'Receive an exact quote within 2 hours. No hidden fees, no surprises.',
    step3_title: 'We Translate',
    step3_desc: 'Our IRCC-certified translator completes your translation with 100% accuracy.',
    step4_title: 'Receive Your Translation',
    step4_desc: 'Receive via email, courier, or collect from our office.',
    faq_heading: 'Frequently Asked Questions',
    cta_footer: 'From $65 \u2022 Same-day service \u2022 Government of Alberta approved',
    canada_heading: 'Certified Translation Across Canada',
    canada_desc: 'Serving clients from coast to coast with fast delivery and 100% IRCC acceptance.',
    related_heading: 'Related Services',
  }

  const merged = { ...defaults, ...overrides }
  return Object.entries(merged).map(([key, value]) => ({ namespace: ns, key, value }))
}

// Add police clearance translations
const policeTranslations = generateCommonCertifiedKeys('certified.police', {
  hero_heading: 'Police Clearance Translation Across Canada',
  hero_desc: 'IRCC-certified translations for RCMP, FBI, and international police clearance certificates. Same-day service available with on-site notarization.',
  trustbar_1: 'Starting at $65', trustbar_2: 'Same-Day Available', trustbar_3: '100% IRCC Acceptance Guarantee', trustbar_4: 'Translation + Notary Same Visit',
  section1_heading: 'Why IRCC Requires Police Clearance Translation',
  section1_desc: 'Immigration, Refugees and Citizenship Canada requires certified translation of all foreign-language police clearance documents. This ensures officers can verify your criminal background for immigration eligibility.',
  section1_card1_title: 'Admissibility Check', section1_card1_desc: 'Police clearances verify you have no criminal history affecting your eligibility.',
  section1_card2_title: 'Legal Requirement', section1_card2_desc: 'IRCC only accepts translations with a signed certificate of accuracy.',
  section1_card3_title: 'All Countries Accepted', section1_card3_desc: 'We translate police certificates from any country in any language.',
  pricing_service_1: 'Police Clearance Translation', pricing_price_1: 'Starting at $65',
  pricing_service_2: 'Commissioner Certification', pricing_price_2: 'Included',
  pricing_service_3: 'Same-Day Rush', pricing_price_3: '+$25',
  pricing_service_4: 'Courier Delivery', pricing_price_4: '+$15',
  step1_desc: 'Take a clear photo or scan of your police clearance certificate and upload it through our secure form.',
  faq_q1: 'What types of police clearance documents do you translate?',
  faq_a1: 'We translate all types of police clearance documents including RCMP criminal record checks, FBI background checks, national police certificates from any country, and state/provincial police clearances. All translations are certified for IRCC acceptance.',
  faq_q2: 'Why does IRCC require police clearance certificate translation?',
  faq_a2: 'IRCC requires certified translations of police clearance certificates to verify that applicants have no criminal history that would make them inadmissible to Canada. This is a mandatory requirement for most immigration applications including PR, citizenship, and work permits.',
  faq_q3: 'How much does police clearance translation cost?',
  faq_a3: 'Police clearance certificate translation starts at $65, which includes the certified translation and commissioner certification. Same-day rush service is available for an additional $25.',
  faq_q4: 'Do I need to translate police clearances from every country I lived in?',
  faq_a4: 'Generally, IRCC requires police clearance certificates from every country where you lived for 6 months or more since turning 18. Each certificate in a foreign language needs certified translation.',
  faq_q5: 'What if my police clearance has stamps or seals in a different language?',
  faq_a5: 'We translate all text on the document including stamps, seals, and annotations. Our translators are experienced with police documents from around the world and understand the various formats used by different countries.',
  cta_heading: 'Get Your Police Clearance Translated Today',
  cta_desc: 'Starting at $65. Same-day service available.',
  related_immigration: 'Immigration Translation Services', related_birth: 'Birth Certificate Translation', related_pr: 'PR & Citizenship Packages',
})
translations.push(...policeTranslations)

// Add immigration translations
const immigrationTranslations: TranslationSeed[] = [
  { namespace: 'certified.immigration', key: 'hero_heading', value: 'IRCC Immigration Translation Services' },
  { namespace: 'certified.immigration', key: 'hero_desc', value: 'Certified translations accepted by Immigration, Refugees and Citizenship Canada. Birth certificates, marriage documents, academic credentials, and more\u2014translated and notarized same-day across Canada.' },
  { namespace: 'certified.immigration', key: 'hero_desc2', value: 'Government of Alberta approved translator. All documents include certification and are ready for submission.' },
  { namespace: 'certified.immigration', key: 'price_badge', value: 'From $65' },
  { namespace: 'certified.immigration', key: 'price_unit', value: 'per document' },
  { namespace: 'certified.immigration', key: 'cta_email', value: 'Email Us' },
  { namespace: 'certified.immigration', key: 'trust_ircc', value: '100% IRCC Accepted' },
  { namespace: 'certified.immigration', key: 'trust_gov', value: "Gov't of Alberta Approved" },
  { namespace: 'certified.immigration', key: 'trust_sameday', value: 'Same-Day Available' },
  { namespace: 'certified.immigration', key: 'trust_notary', value: 'Notarization Included' },
  { namespace: 'certified.immigration', key: 'trust_reviews', value: '139 Five-Star Reviews' },
  { namespace: 'certified.immigration', key: 'why_heading', value: 'Why Choose Cethos for Immigration Translation?' },
  { namespace: 'certified.immigration', key: 'why1_title', value: '100% IRCC Acceptance Guarantee' },
  { namespace: 'certified.immigration', key: 'why1_desc', value: 'All translations accepted by Immigration, Refugees and Citizenship Canada. Money-back guarantee if rejected.' },
  { namespace: 'certified.immigration', key: 'why2_title', value: 'Same-Day Service Available' },
  { namespace: 'certified.immigration', key: 'why2_desc', value: 'Need it today? Our same-day rush service delivers certified translations within hours.' },
  { namespace: 'certified.immigration', key: 'why3_title', value: 'Translation + Notary Same Visit' },
  { namespace: 'certified.immigration', key: 'why3_desc', value: 'Get your translation and commissioner certification in one convenient visit or by mail.' },
  { namespace: 'certified.immigration', key: 'why4_title', value: '95+ Languages Supported' },
  { namespace: 'certified.immigration', key: 'why4_desc', value: 'From Punjabi to Mandarin, Arabic to Tagalog\u2014we translate documents from any language.' },
  { namespace: 'certified.immigration', key: 'programs_heading', value: 'Immigration Programs Supported' },
  { namespace: 'certified.immigration', key: 'programs_desc', value: 'We provide certified translations for all Canadian immigration programs.' },
  { namespace: 'certified.immigration', key: 'prog1_title', value: 'Express Entry' },
  { namespace: 'certified.immigration', key: 'prog1_item1', value: 'Federal Skilled Worker' }, { namespace: 'certified.immigration', key: 'prog1_item2', value: 'Canadian Experience Class' }, { namespace: 'certified.immigration', key: 'prog1_item3', value: 'Federal Skilled Trades' }, { namespace: 'certified.immigration', key: 'prog1_item4', value: 'Provincial Nominee Programs' },
  { namespace: 'certified.immigration', key: 'prog2_title', value: 'Family Sponsorship' },
  { namespace: 'certified.immigration', key: 'prog2_item1', value: 'Spousal Sponsorship' }, { namespace: 'certified.immigration', key: 'prog2_item2', value: 'Parent & Grandparent Sponsorship' }, { namespace: 'certified.immigration', key: 'prog2_item3', value: 'Dependent Children' }, { namespace: 'certified.immigration', key: 'prog2_item4', value: 'Super Visa Applications' },
  { namespace: 'certified.immigration', key: 'prog3_title', value: 'Work & Study' },
  { namespace: 'certified.immigration', key: 'prog3_item1', value: 'Work Permits (LMIA)' }, { namespace: 'certified.immigration', key: 'prog3_item2', value: 'Post-Graduation Work Permits' }, { namespace: 'certified.immigration', key: 'prog3_item3', value: 'Study Permits' }, { namespace: 'certified.immigration', key: 'prog3_item4', value: 'Co-op Work Permits' },
  { namespace: 'certified.immigration', key: 'prog4_title', value: 'Other Programs' },
  { namespace: 'certified.immigration', key: 'prog4_item1', value: 'Citizenship Applications' }, { namespace: 'certified.immigration', key: 'prog4_item2', value: 'Refugee Claims' }, { namespace: 'certified.immigration', key: 'prog4_item3', value: 'Humanitarian Applications' }, { namespace: 'certified.immigration', key: 'prog4_item4', value: 'Appeals & Renewals' },
  { namespace: 'certified.immigration', key: 'docs_heading', value: 'Documents We Translate' },
  { namespace: 'certified.immigration', key: 'docs_desc', value: 'Comprehensive translation services for all immigration document types.' },
  { namespace: 'certified.immigration', key: 'doccat1_title', value: 'Personal Documents' },
  { namespace: 'certified.immigration', key: 'doccat1_item1', value: 'Birth Certificates' }, { namespace: 'certified.immigration', key: 'doccat1_item2', value: 'Marriage Certificates' }, { namespace: 'certified.immigration', key: 'doccat1_item3', value: 'Divorce Decrees' }, { namespace: 'certified.immigration', key: 'doccat1_item4', value: 'Death Certificates' }, { namespace: 'certified.immigration', key: 'doccat1_item5', value: 'Name Change Documents' },
  { namespace: 'certified.immigration', key: 'doccat2_title', value: 'Identity Documents' },
  { namespace: 'certified.immigration', key: 'doccat2_item1', value: 'Passports' }, { namespace: 'certified.immigration', key: 'doccat2_item2', value: 'National ID Cards' }, { namespace: 'certified.immigration', key: 'doccat2_item3', value: "Driver's Licenses" }, { namespace: 'certified.immigration', key: 'doccat2_item4', value: 'Military Service Records' },
  { namespace: 'certified.immigration', key: 'doccat3_title', value: 'Educational Documents' },
  { namespace: 'certified.immigration', key: 'doccat3_item1', value: 'Diplomas & Degrees' }, { namespace: 'certified.immigration', key: 'doccat3_item2', value: 'Academic Transcripts' }, { namespace: 'certified.immigration', key: 'doccat3_item3', value: 'Course Descriptions' }, { namespace: 'certified.immigration', key: 'doccat3_item4', value: 'Professional Certificates' }, { namespace: 'certified.immigration', key: 'doccat3_item5', value: 'Letters of Recommendation' },
  { namespace: 'certified.immigration', key: 'doccat4_title', value: 'Employment & Financial' },
  { namespace: 'certified.immigration', key: 'doccat4_item1', value: 'Employment Letters' }, { namespace: 'certified.immigration', key: 'doccat4_item2', value: 'Bank Statements' }, { namespace: 'certified.immigration', key: 'doccat4_item3', value: 'Tax Returns' }, { namespace: 'certified.immigration', key: 'doccat4_item4', value: 'Pay Stubs' }, { namespace: 'certified.immigration', key: 'doccat4_item5', value: 'Business Registration' },
  { namespace: 'certified.immigration', key: 'pricing_heading', value: 'Transparent Pricing' },
  { namespace: 'certified.immigration', key: 'pricing_desc', value: 'No hidden fees. Commissioner certification included with every translation.' },
  { namespace: 'certified.immigration', key: 'pricing_col_doc', value: 'Document Type' }, { namespace: 'certified.immigration', key: 'pricing_col_price', value: 'Price' },
  { namespace: 'certified.immigration', key: 'pricing_doc_1', value: 'Birth Certificate' }, { namespace: 'certified.immigration', key: 'pricing_price_1', value: 'Starting at $65' },
  { namespace: 'certified.immigration', key: 'pricing_doc_2', value: 'Marriage/Divorce Certificate' }, { namespace: 'certified.immigration', key: 'pricing_price_2', value: 'Starting at $65' },
  { namespace: 'certified.immigration', key: 'pricing_doc_3', value: 'Diploma or Degree' }, { namespace: 'certified.immigration', key: 'pricing_price_3', value: 'Starting at $65' },
  { namespace: 'certified.immigration', key: 'pricing_doc_4', value: 'Transcript (per page)' }, { namespace: 'certified.immigration', key: 'pricing_price_4', value: 'Starting at $35' },
  { namespace: 'certified.immigration', key: 'pricing_doc_5', value: 'Police Clearance' }, { namespace: 'certified.immigration', key: 'pricing_price_5', value: 'Starting at $45' },
  { namespace: 'certified.immigration', key: 'pricing_doc_6', value: 'Bank Statement (per page)' }, { namespace: 'certified.immigration', key: 'pricing_price_6', value: 'Starting at $35' },
  { namespace: 'certified.immigration', key: 'pricing_doc_7', value: 'Commissioner Certification' }, { namespace: 'certified.immigration', key: 'pricing_price_7', value: 'Included' },
  { namespace: 'certified.immigration', key: 'pricing_doc_8', value: 'Rush Same-Day Service' }, { namespace: 'certified.immigration', key: 'pricing_price_8', value: '+$25' },
  { namespace: 'certified.immigration', key: 'pricing_footer', value: '* Prices may vary based on document complexity and language. Contact us for an exact quote.' },
  { namespace: 'certified.immigration', key: 'how_heading', value: 'How It Works' },
  { namespace: 'certified.immigration', key: 'step1_title', value: 'Submit Your Document' }, { namespace: 'certified.immigration', key: 'step1_desc', value: 'Upload a photo or scan of your document through our secure form.' },
  { namespace: 'certified.immigration', key: 'step2_title', value: 'Receive Your Quote' }, { namespace: 'certified.immigration', key: 'step2_desc', value: 'Get a detailed quote within 2 hours. No hidden fees.' },
  { namespace: 'certified.immigration', key: 'step3_title', value: 'We Translate' }, { namespace: 'certified.immigration', key: 'step3_desc', value: 'IRCC-certified translator completes your translation with accuracy guarantee.' },
  { namespace: 'certified.immigration', key: 'step4_title', value: 'Pick Up or Delivery' }, { namespace: 'certified.immigration', key: 'step4_desc', value: 'Receive via email, courier, or collect from our office.' },
  { namespace: 'certified.immigration', key: 'faq_heading', value: 'Frequently Asked Questions' },
  { namespace: 'certified.immigration', key: 'faq_q1', value: 'Will IRCC accept your certified translations?' },
  { namespace: 'certified.immigration', key: 'faq_a1', value: 'Yes, 100%. All our translations include a signed certificate of accuracy from an IRCC-compliant translator. We offer a money-back guarantee if IRCC ever rejects our translation\u2014though in our 9+ years of business, this has never happened.' },
  { namespace: 'certified.immigration', key: 'faq_q2', value: 'How fast can I get my translation?' },
  { namespace: 'certified.immigration', key: 'faq_a2', value: 'Standard service is 2-3 business days. Same-day rush service is available for an additional $25. For urgent deadlines, call us directly at (587) 600-0786.' },
  { namespace: 'certified.immigration', key: 'faq_q3', value: 'Do I need to bring my original documents?' },
  { namespace: 'certified.immigration', key: 'faq_a3', value: 'No, we can work from clear photos or scans. You can upload your documents through our website or email them to info@cethos.com.' },
  { namespace: 'certified.immigration', key: 'faq_q4', value: 'What languages do you translate?' },
  { namespace: 'certified.immigration', key: 'faq_a4', value: 'We translate from 95+ languages including Punjabi, Hindi, Mandarin, Cantonese, Arabic, Tagalog, Spanish, French, Urdu, Vietnamese, Korean, Japanese, Farsi, and many more.' },
  { namespace: 'certified.immigration', key: 'faq_q5', value: 'Is notarization included?' },
  { namespace: 'certified.immigration', key: 'faq_a5', value: 'Commissioner certification (equivalent to notarization for IRCC purposes) is included free with every translation. If you need additional notarization, we can arrange that for an additional fee.' },
  { namespace: 'certified.immigration', key: 'cta_heading', value: 'Get Your Immigration Documents Translated Today' },
  { namespace: 'certified.immigration', key: 'cta_desc', value: 'IRCC-accepted certified translations from $65. Same-day service available. Government of Alberta approved.' },
  { namespace: 'certified.immigration', key: 'cta_email_quote', value: 'Email for Quote' },
  { namespace: 'certified.immigration', key: 'cta_footer', value: 'From $65 \u2022 Same-day service \u2022 Government of Alberta approved' },
  { namespace: 'certified.immigration', key: 'canada_heading', value: 'Certified Translation Across Canada' },
  { namespace: 'certified.immigration', key: 'canada_desc', value: 'Serving clients from coast to coast with fast delivery and 100% IRCC acceptance.' },
  { namespace: 'certified.immigration', key: 'related_heading', value: 'Related Services' },
  { namespace: 'certified.immigration', key: 'related_birth', value: 'Birth Certificate Translation' },
  { namespace: 'certified.immigration', key: 'related_marriage', value: 'Marriage Certificate Translation' },
  { namespace: 'certified.immigration', key: 'related_academic', value: 'Academic Transcript Translation' },
  { namespace: 'certified.immigration', key: 'related_pr', value: 'PR & Citizenship Packages' },
]
translations.push(...immigrationTranslations)

// PR & Citizenship, Express Entry, and Spousal Sponsorship translations
// These follow the same pattern - extracting all hardcoded strings
const prCitizenshipTranslations: TranslationSeed[] = [
  { namespace: 'certified.pr-citizenship', key: 'hero_heading', value: 'PR & Citizenship Translation Packages' },
  { namespace: 'certified.pr-citizenship', key: 'hero_desc', value: 'Complete document translation for permanent residence and citizenship applications. Birth certificates, marriage documents, academic credentials, police clearances\u2014all translated and certified.' },
  { namespace: 'certified.pr-citizenship', key: 'hero_desc2', value: 'Save up to 20% with bundled packages. All documents include commissioner certification and are IRCC-ready.' },
  { namespace: 'certified.pr-citizenship', key: 'price_badge', value: 'From $120' }, { namespace: 'certified.pr-citizenship', key: 'price_unit', value: 'per package' },
  { namespace: 'certified.pr-citizenship', key: 'cta_email', value: 'Email Us' },
  { namespace: 'certified.pr-citizenship', key: 'trust_ircc', value: '100% IRCC Accepted' }, { namespace: 'certified.pr-citizenship', key: 'trust_gov', value: "Gov't of Alberta Approved" }, { namespace: 'certified.pr-citizenship', key: 'trust_sameday', value: 'Same-Day Available' }, { namespace: 'certified.pr-citizenship', key: 'trust_notary', value: 'Notarization Included' }, { namespace: 'certified.pr-citizenship', key: 'trust_reviews', value: '139 Five-Star Reviews' },
  { namespace: 'certified.pr-citizenship', key: 'packages_heading', value: 'Translation Packages' }, { namespace: 'certified.pr-citizenship', key: 'packages_desc', value: 'Save up to 20% with our bundled packages. All packages include commissioner certification.' },
  { namespace: 'certified.pr-citizenship', key: 'pkg1_name', value: 'Basic PR Package' }, { namespace: 'certified.pr-citizenship', key: 'pkg1_price', value: '$120' }, { namespace: 'certified.pr-citizenship', key: 'pkg1_doc1', value: 'Birth Certificate' }, { namespace: 'certified.pr-citizenship', key: 'pkg1_doc2', value: 'Marriage Certificate' },
  { namespace: 'certified.pr-citizenship', key: 'pkg2_name', value: 'Standard PR Package' }, { namespace: 'certified.pr-citizenship', key: 'pkg2_price', value: '$175' }, { namespace: 'certified.pr-citizenship', key: 'pkg2_doc1', value: 'Birth Certificate' }, { namespace: 'certified.pr-citizenship', key: 'pkg2_doc2', value: 'Marriage Certificate' }, { namespace: 'certified.pr-citizenship', key: 'pkg2_doc3', value: 'Diploma or Degree' },
  { namespace: 'certified.pr-citizenship', key: 'pkg3_name', value: 'Complete PR Package' }, { namespace: 'certified.pr-citizenship', key: 'pkg3_price', value: '$280' }, { namespace: 'certified.pr-citizenship', key: 'pkg3_doc1', value: 'Birth Certificate' }, { namespace: 'certified.pr-citizenship', key: 'pkg3_doc2', value: 'Marriage Certificate' }, { namespace: 'certified.pr-citizenship', key: 'pkg3_doc3', value: 'Diploma or Degree' }, { namespace: 'certified.pr-citizenship', key: 'pkg3_doc4', value: 'Transcript (up to 3 pages)' }, { namespace: 'certified.pr-citizenship', key: 'pkg3_doc5', value: 'Police Clearance' },
  { namespace: 'certified.pr-citizenship', key: 'pkg4_name', value: 'Citizenship Package' }, { namespace: 'certified.pr-citizenship', key: 'pkg4_price', value: 'Custom' }, { namespace: 'certified.pr-citizenship', key: 'pkg4_doc1', value: 'All required citizenship documents' }, { namespace: 'certified.pr-citizenship', key: 'pkg4_doc2', value: 'Personalized based on your needs' },
  { namespace: 'certified.pr-citizenship', key: 'most_popular', value: 'Most Popular' }, { namespace: 'certified.pr-citizenship', key: 'select_package', value: 'Select Package' },
  { namespace: 'certified.pr-citizenship', key: 'included_heading', value: "What's Included in Every Package" },
  { namespace: 'certified.pr-citizenship', key: 'feature_1', value: 'Certified translation by IRCC-compliant translators' }, { namespace: 'certified.pr-citizenship', key: 'feature_2', value: 'Commissioner certification for all documents' }, { namespace: 'certified.pr-citizenship', key: 'feature_3', value: 'Consistent formatting across all translations' }, { namespace: 'certified.pr-citizenship', key: 'feature_4', value: 'Single point of contact for all documents' }, { namespace: 'certified.pr-citizenship', key: 'feature_5', value: 'Bundled pricing savings' }, { namespace: 'certified.pr-citizenship', key: 'feature_6', value: 'Digital and physical copies' }, { namespace: 'certified.pr-citizenship', key: 'feature_7', value: 'Lifetime accuracy guarantee' }, { namespace: 'certified.pr-citizenship', key: 'feature_8', value: 'Priority processing available' },
  { namespace: 'certified.pr-citizenship', key: 'apptypes_heading', value: 'Immigration Programs We Support' }, { namespace: 'certified.pr-citizenship', key: 'apptypes_desc', value: 'We provide translation packages for all Canadian immigration programs.' },
  { namespace: 'certified.pr-citizenship', key: 'apptype1_title', value: 'Express Entry' }, { namespace: 'certified.pr-citizenship', key: 'apptype1_desc', value: 'Federal Skilled Worker, CEC, Federal Skilled Trades' },
  { namespace: 'certified.pr-citizenship', key: 'apptype2_title', value: 'Provincial Nominee' }, { namespace: 'certified.pr-citizenship', key: 'apptype2_desc', value: 'Alberta AINP, Ontario OINP, BC PNP, and more' },
  { namespace: 'certified.pr-citizenship', key: 'apptype3_title', value: 'Spousal Sponsorship' }, { namespace: 'certified.pr-citizenship', key: 'apptype3_desc', value: 'Spouse or common-law partner sponsorship' },
  { namespace: 'certified.pr-citizenship', key: 'apptype4_title', value: 'Citizenship' }, { namespace: 'certified.pr-citizenship', key: 'apptype4_desc', value: 'Canadian citizenship applications' },
  { namespace: 'certified.pr-citizenship', key: 'apptype5_title', value: 'Family Sponsorship' }, { namespace: 'certified.pr-citizenship', key: 'apptype5_desc', value: 'Parents, grandparents, dependents' },
  { namespace: 'certified.pr-citizenship', key: 'apptype6_title', value: 'Study/Work Permits' }, { namespace: 'certified.pr-citizenship', key: 'apptype6_desc', value: 'International students and workers' },
  { namespace: 'certified.pr-citizenship', key: 'whypkg_heading', value: 'Why Choose a Translation Package?' },
  { namespace: 'certified.pr-citizenship', key: 'whypkg1_title', value: 'Bundle Savings' }, { namespace: 'certified.pr-citizenship', key: 'whypkg1_desc', value: 'Save up to 20% compared to individual document pricing.' },
  { namespace: 'certified.pr-citizenship', key: 'whypkg2_title', value: 'Single Point of Contact' }, { namespace: 'certified.pr-citizenship', key: 'whypkg2_desc', value: 'One project manager handles all your documents.' },
  { namespace: 'certified.pr-citizenship', key: 'whypkg3_title', value: 'Consistent Quality' }, { namespace: 'certified.pr-citizenship', key: 'whypkg3_desc', value: 'All documents formatted consistently for your application.' },
  { namespace: 'certified.pr-citizenship', key: 'faq_heading', value: 'Frequently Asked Questions' },
  { namespace: 'certified.pr-citizenship', key: 'faq_q1', value: 'Why choose a package over individual translations?' }, { namespace: 'certified.pr-citizenship', key: 'faq_a1', value: 'Packages offer significant savings\u2014up to 20% compared to individual pricing. Plus, you get consistent formatting, a single point of contact, and coordinated delivery of all your documents.' },
  { namespace: 'certified.pr-citizenship', key: 'faq_q2', value: 'What documents are typically needed for PR applications?' }, { namespace: 'certified.pr-citizenship', key: 'faq_a2', value: 'Most PR applications require: birth certificate, marriage/divorce certificates (if applicable), educational credentials (degrees, transcripts), police clearance certificates, and employment letters. The exact requirements depend on your immigration program.' },
  { namespace: 'certified.pr-citizenship', key: 'faq_q3', value: 'Can you customize a package for my specific needs?' }, { namespace: 'certified.pr-citizenship', key: 'faq_a3', value: "Absolutely. Contact us with your document list and we'll create a custom package with bundled pricing. We handle applications for Express Entry, PNP, sponsorship, and more." },
  { namespace: 'certified.pr-citizenship', key: 'faq_q4', value: 'How long does it take to translate a full document package?' }, { namespace: 'certified.pr-citizenship', key: 'faq_a4', value: 'Standard service for a complete package is 3-5 business days. Rush service is available if you need it faster. We coordinate all translations to ensure consistent delivery.' },
  { namespace: 'certified.pr-citizenship', key: 'faq_q5', value: 'Do you handle documents for the whole family?' }, { namespace: 'certified.pr-citizenship', key: 'faq_a5', value: 'Yes, we regularly translate documents for principal applicants and all accompanying family members. We can create a family package with all the documents you need.' },
  { namespace: 'certified.pr-citizenship', key: 'cta_heading', value: 'Start Your PR or Citizenship Application Today' }, { namespace: 'certified.pr-citizenship', key: 'cta_desc', value: 'Complete document packages from $120. All translations IRCC-accepted with notarization included.' }, { namespace: 'certified.pr-citizenship', key: 'cta_email_quote', value: 'Email for Quote' }, { namespace: 'certified.pr-citizenship', key: 'cta_footer', value: 'From $120 \u2022 Same-day service \u2022 Government of Alberta approved' },
  { namespace: 'certified.pr-citizenship', key: 'canada_heading', value: 'Certified Translation Across Canada' }, { namespace: 'certified.pr-citizenship', key: 'canada_desc', value: 'Serving clients from coast to coast with fast delivery and 100% IRCC acceptance.' },
  { namespace: 'certified.pr-citizenship', key: 'related_heading', value: 'Individual Document Translation' },
  { namespace: 'certified.pr-citizenship', key: 'related_birth', value: 'Birth Certificate Translation' }, { namespace: 'certified.pr-citizenship', key: 'related_marriage', value: 'Marriage Certificate Translation' }, { namespace: 'certified.pr-citizenship', key: 'related_academic', value: 'Academic Transcript Translation' }, { namespace: 'certified.pr-citizenship', key: 'related_immigration', value: 'Immigration Translation Services' },
]
translations.push(...prCitizenshipTranslations)

// Express Entry & Spousal Sponsorship translations are very similar to police/birth pattern
// Adding them via the same generateCommonCertifiedKeys helper plus specific overrides

const expressEntryTranslations: TranslationSeed[] = [
  ...generateCommonCertifiedKeys('certified.express-entry', {
    hero_heading: 'Express Entry Document Translation Across Canada',
    hero_desc: 'Get all your Express Entry documents translated by IRCC-certified translators. Birth certificates, police clearances, academic credentials, and more\u2014everything you need for your application.',
    hero_desc2: '100% IRCC acceptance guarantee. Bundle pricing available for complete Express Entry packages.',
    price_badge: 'From $65', price_unit: 'per document', cta_email: 'Email Us',
    trust_ircc: '100% IRCC Accepted', trust_gov: "Gov't of Alberta Approved", trust_sameday: 'Same-Day Available', trust_notary: 'Notarization Included', trust_reviews: '139 Five-Star Reviews',
    checklist_heading: 'Express Entry Document Checklist',
    checklist_desc: 'Express Entry applications require several supporting documents. If any of these are not in English or French, IRCC requires certified translation from a qualified translator.',
    checklist_card1_title: 'Identity Documents', checklist_card1_desc: 'Birth certificates, passports, and name change documents proving your identity.',
    checklist_card2_title: 'Education & Work', checklist_card2_desc: 'Academic transcripts, diplomas, and employment reference letters for CRS points.',
    checklist_card3_title: 'Background & Status', checklist_card3_desc: 'Police clearances, marriage/divorce certificates, and military records.',
    checklist_list_heading: 'Common Documents Requiring Translation',
    checklist_1: 'Birth certificate', checklist_2: 'Marriage certificate (if applicable)', checklist_3: 'Police clearance certificates', checklist_4: 'Academic transcripts & diplomas',
    checklist_5: 'Employment reference letters', checklist_6: 'Name change documents (if applicable)', checklist_7: 'Divorce certificate (if applicable)', checklist_8: 'Military service records (if applicable)',
    included_1: 'Certified translation by IRCC-compliant translator', included_2: 'Signed certificate of accuracy', included_3: 'Commissioner certification (notarization equivalent)',
    included_4: 'Translations formatted for IRCC online portal upload', included_5: 'Digital copy via email', included_6: 'Physical copy available for pickup or delivery', included_7: 'Free revisions if needed',
    pricing_service_1: 'Single Document Translation', pricing_price_1: 'Starting at $65',
    pricing_service_2: 'Express Entry Package (3-5 docs)', pricing_price_2: 'Starting at $175',
    pricing_service_3: 'Complete Package (6+ docs)', pricing_price_3: 'Custom Quote',
    pricing_service_4: 'Commissioner Certification', pricing_price_4: 'Included',
    pricing_service_5: 'Same-Day Rush', pricing_price_5: '+$25/doc',
    step1_title: 'Upload Your Documents', step1_desc: 'Upload scans or photos of all documents that need translation through our secure form.',
    step2_desc: 'Receive a detailed quote within 2 hours with bundle pricing for multiple documents.',
    step3_desc: 'Our IRCC-certified translators complete all your documents with 100% accuracy.',
    step4_title: 'Receive & Submit', step4_desc: 'Get your certified translations via email\u2014ready to upload to your IRCC Express Entry profile.',
    faq_q1: 'What documents do I need translated for Express Entry?',
    faq_a1: 'For Express Entry, IRCC requires certified translation of any document not in English or French. Common documents include birth certificates, marriage certificates, police clearance certificates, academic transcripts, diplomas, and employment reference letters. The exact documents depend on your program (FSW, CEC, or FSTP).',
    faq_q2: 'Do I need an ECA for Express Entry?',
    faq_a2: 'Yes, if you are applying under the Federal Skilled Worker (FSW) program, you must have an Educational Credential Assessment (ECA) from a designated organization like WES. Your academic documents will need certified translation for the ECA application. CEC applicants with Canadian education may not need an ECA.',
    faq_q3: 'How fast can I get my Express Entry documents translated?',
    faq_a3: 'Standard turnaround is 2-3 business days per document. Same-day rush service is available for an additional $25 per document. For complete Express Entry packages with multiple documents, we recommend allowing 3-5 business days.',
    faq_q4: 'Are your translations accepted by IRCC for Express Entry?',
    faq_a4: 'Yes, 100% guaranteed. Our certified translations meet all IRCC requirements for Express Entry applications, including the signed certificate of accuracy and commissioner certification. We have translated thousands of Express Entry documents with a perfect acceptance record.',
    faq_q5: 'Can you translate documents from any country?',
    faq_a5: 'Yes, we translate documents from every country in 95+ languages. Whether your documents are from India, China, the Philippines, the Middle East, Africa, or anywhere else, our native-speaking translators ensure accurate, certified translations.',
    cta_heading: 'Get Your Express Entry Documents Translated',
    cta_desc: 'Complete Express Entry translation packages from $175. Individual documents from $65. 100% IRCC acceptance guarantee.',
    cta_email_quote: 'Email for Quote',
    cta_footer: 'From $65 per document \u2022 Bundle pricing available \u2022 Same-day service',
    related_heading: 'Related Services',
    related_wes: 'WES Evaluation Translation', related_pr: 'PR & Citizenship Packages', related_birth: 'Birth Certificate Translation',
  }),

  // Spousal Sponsorship
  ...generateCommonCertifiedKeys('certified.spousal', {
    hero_heading: 'Spousal Sponsorship Translation Services Across Canada',
    hero_desc: 'Certified translation of marriage certificates, identity documents, police clearances, and relationship evidence for IRCC spousal and common-law partner sponsorship applications.',
    hero_desc2: '100% IRCC acceptance guarantee. Bundle pricing available for complete sponsorship packages.',
    price_badge: 'From $65', price_unit: 'per document', cta_email: 'Email Us',
    trust_ircc: '100% IRCC Accepted', trust_gov: "Gov't of Alberta Approved", trust_sameday: 'Same-Day Available', trust_notary: 'Notarization Included', trust_reviews: '139 Five-Star Reviews',
    section1_heading: 'Why Certified Translation Matters for Sponsorship',
    section1_desc: 'IRCC requires certified translation of all documents not in English or French for spousal and common-law partner sponsorship applications. Incomplete or uncertified translations are a common reason for application delays and refusals.',
    section1_card1_title: 'Prove Your Relationship', section1_card1_desc: 'Marriage certificates and relationship evidence must be translated accurately to demonstrate genuineness.',
    section1_card2_title: 'Meet IRCC Requirements', section1_card2_desc: 'IRCC only accepts translations with a signed certificate of accuracy from a certified translator.',
    section1_card3_title: 'Avoid Application Delays', section1_card3_desc: 'Incomplete translations are a top reason for sponsorship delays. Get it right the first time.',
    checklist_heading: 'Sponsorship Document Checklist',
    checklist_list_heading: 'Common Documents Requiring Translation',
    spdoc_1: 'Marriage certificate', spdoc_2: 'Birth certificates (sponsor & applicant)', spdoc_3: 'Police clearance certificates', spdoc_4: 'Divorce or annulment certificates (if applicable)',
    spdoc_5: 'Relationship evidence (chat logs, letters)', spdoc_6: 'Identity documents (national ID, passport pages)', spdoc_7: 'Proof of cohabitation documents', spdoc_8: 'Medical examination results (if applicable)',
    included_1: 'Certified translation by IRCC-compliant translator', included_2: 'Signed certificate of accuracy', included_3: 'Commissioner certification (notarization equivalent)',
    included_4: 'Translations formatted for IRCC portal upload', included_5: 'Digital copy via email', included_6: 'Physical copy available for pickup or delivery', included_7: 'Free revisions if needed',
    pricing_service_1: 'Marriage Certificate Translation', pricing_price_1: 'Starting at $65',
    pricing_service_2: 'Birth Certificate Translation', pricing_price_2: 'Starting at $65',
    pricing_service_3: 'Police Clearance Translation', pricing_price_3: 'Starting at $65',
    pricing_service_4: 'Sponsorship Bundle (3-5 docs)', pricing_price_4: 'Starting at $175',
    pricing_service_5: 'Commissioner Certification', pricing_price_5: 'Included',
    pricing_service_6: 'Same-Day Rush', pricing_price_6: '+$25/doc',
    step1_title: 'Upload Your Documents', step1_desc: 'Upload scans or photos of your marriage certificate, identity documents, and supporting evidence.',
    step2_desc: 'Receive a detailed quote within 2 hours. Bundle pricing for sponsorship packages.',
    step3_desc: 'Our IRCC-certified translators complete all your documents with 100% accuracy.',
    step4_title: 'Receive & Submit', step4_desc: 'Get your certified translations\u2014ready to upload to your IRCC sponsorship application.',
    faq_q1: 'What documents need translation for spousal sponsorship?',
    faq_a1: 'For spousal sponsorship (IMM 1344), IRCC requires certified translation of all documents not in English or French. Common documents include marriage certificates, birth certificates, police clearance certificates, divorce certificates (if previously married), identity documents, and any relationship evidence submitted in another language.',
    faq_q2: 'Do relationship evidence documents need certified translation?',
    faq_a2: 'Yes. If you are submitting chat transcripts, letters, cards, or other relationship evidence in a language other than English or French, IRCC requires certified translation. We can translate WhatsApp conversations, handwritten letters, and other relationship evidence used to prove the genuineness of your relationship.',
    faq_q3: 'How much does spousal sponsorship translation cost?',
    faq_a3: 'Individual documents start at $65 each. We offer bundle pricing for complete sponsorship packages\u20143-5 documents from $175. The exact cost depends on the number and length of your documents. Contact us for a detailed quote based on your specific document list.',
    faq_q4: 'Can you translate documents for common-law partner sponsorship?',
    faq_a4: 'Yes. We translate all documents needed for common-law partner sponsorship applications, including cohabitation proof, joint financial documents, statutory declarations, and relationship evidence. The translation requirements are the same as for spousal sponsorship.',
    faq_q5: 'How quickly can I get my sponsorship documents translated?',
    faq_a5: 'Standard turnaround is 2-3 business days. Same-day rush service is available for an additional $25 per document. For complete sponsorship packages with multiple documents, we recommend allowing 3-5 business days to ensure everything is translated accurately.',
    cta_heading: 'Get Your Sponsorship Documents Translated',
    cta_desc: 'Complete sponsorship translation packages from $175. Individual documents from $65. 100% IRCC acceptance guarantee.',
    cta_email_quote: 'Email for Quote',
    cta_footer: 'From $65 per document \u2022 Bundle pricing available \u2022 Same-day service',
    related_heading: 'Related Services',
    related_marriage: 'Marriage Certificate Translation', related_birth: 'Birth Certificate Translation', related_immigration: 'Immigration Translation Services',
  }),
]
translations.push(...expressEntryTranslations)

// =============================================
// SEED FUNCTION
// =============================================
async function seed() {
  console.log(`Seeding ${translations.length} certified page translations...`)

  // Ensure all namespaces exist
  const namespaceNames = Array.from(new Set(translations.map(t => t.namespace)))
  console.log(`Namespaces: ${namespaceNames.join(', ')}`)

  for (const name of namespaceNames) {
    const { error } = await supabase
      .from('cethosweb_i18n_namespaces')
      .upsert({ name, description: `Certified translation sub-page: ${name}` }, { onConflict: 'name' })
    if (error) console.error(`Namespace ${name} error:`, error.message)
  }

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
      segment_index: 0,
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

  const { count } = await supabase
    .from('cethosweb_i18n_translations')
    .select('*', { count: 'exact', head: true })

  console.log(`Total translations in database: ${count}`)
}

seed().catch(console.error)
