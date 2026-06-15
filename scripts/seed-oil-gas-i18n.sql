-- Seed: Oil & Gas industry landing page i18n content
-- Namespace base: industry.oil-gas
-- Mirrors the section+key structure of industry.energy-mining.*
-- Re-runnable: namespaces use ON CONFLICT (name) DO NOTHING; translations DO UPDATE.
-- NOTE: company is NOT ISO-certified — never reference ISO certification standards.

-- =========================================================================
-- STEP 1: Namespaces (10)
-- =========================================================================
insert into cethosweb_i18n_namespaces (name, description, page_path, sort_order) values
  ('industry.oil-gas.hero',        'Oil & Gas - Hero section',                '/industries/oil-gas', 910),
  ('industry.oil-gas.trust',       'Oil & Gas - Trust bar',                   '/industries/oil-gas', 911),
  ('industry.oil-gas.challenge',   'Oil & Gas - Industry challenge section',  '/industries/oil-gas', 912),
  ('industry.oil-gas.services',    'Oil & Gas - Services section',            '/industries/oil-gas', 913),
  ('industry.oil-gas.documents',   'Oil & Gas - Document types section',      '/industries/oil-gas', 914),
  ('industry.oil-gas.why-calgary', 'Oil & Gas - Why Calgary section',         '/industries/oil-gas', 915),
  ('industry.oil-gas.languages',   'Oil & Gas - Languages section',           '/industries/oil-gas', 916),
  ('industry.oil-gas.quality',     'Oil & Gas - Quality & Security section',  '/industries/oil-gas', 917),
  ('industry.oil-gas.success',     'Oil & Gas - Success story section',       '/industries/oil-gas', 918),
  ('industry.oil-gas.cta',         'Oil & Gas - CTA section',                 '/industries/oil-gas', 919)
on conflict (name) do nothing;

-- =========================================================================
-- STEP 2: Translations (locale='en', status='published')
-- =========================================================================
insert into cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status)
select n.id, v.k, 0, 'en', v.val, 'published'
from (values
  -- ---------------- hero ----------------
  ('hero','breadcrumb_home',$q$Home$q$),
  ('hero','breadcrumb_industries',$q$Industries$q$),
  ('hero','breadcrumb_current',$q$Oil & Gas$q$),
  ('hero','badge',$q$Based in Calgary — Canada's Oil & Gas Capital$q$),
  ('hero','heading_line1',$q$Translation Services for$q$),
  ('hero','heading_line2',$q$Oil & Gas$q$),
  ('hero','description',$q$Technical translation, HSE documentation, and multilingual communication for upstream, midstream, and downstream operators, drilling contractors, and oilfield service companies working across borders.$q$),
  ('hero','cta_primary',$q$Get a Quote$q$),
  ('hero','cta_secondary',$q$Speak to a Specialist$q$),

  -- ---------------- trust ----------------
  ('trust','item_1',$q$200+ Languages$q$),
  ('trust','item_2',$q$Technical Subject Matter Experts$q$),
  ('trust','item_3',$q$TEP Quality Process$q$),
  ('trust','item_4',$q$24/7 Global Operations$q$),

  -- ---------------- challenge ----------------
  ('challenge','heading',$q$Oil & Gas Operations Demand Precision Across Every Phase$q$),
  ('challenge','p1',$q$The oil and gas value chain runs across borders, languages, and regulatory regimes—from exploration and drilling to refining, LNG export, and retail distribution. Clear, accurate communication is critical for safety, uptime, and compliance at every stage.$q$),
  ('challenge','p2',$q$A mistranslated drilling procedure or work permit can cost lives. An inaccurate equipment manual can shut in production. A poorly localized PSC or service contract can trigger costly disputes and regulatory exposure.$q$),
  ('challenge','p3',$q$That's why operators and oilfield service companies trust Cethos. Headquartered in Calgary—the centre of Canada's oil and gas industry—we understand the technical precision, HSE rigour, and AER regulatory complexity your projects demand.$q$),
  ('challenge','stat1_value',$q$50+$q$),
  ('challenge','stat1_label',$q$Oil & gas clients served$q$),
  ('challenge','stat2_value',$q$1M+$q$),
  ('challenge','stat2_label',$q$Pages translated$q$),
  ('challenge','stat3_value',$q$100%$q$),
  ('challenge','stat3_label',$q$On-time delivery$q$),
  ('challenge','card1_title',$q$Upstream$q$),
  ('challenge','card1_desc',$q$Exploration, drilling & production$q$),
  ('challenge','card2_title',$q$Midstream$q$),
  ('challenge','card2_desc',$q$Pipelines, storage & LNG$q$),
  ('challenge','card3_title',$q$Downstream$q$),
  ('challenge','card3_desc',$q$Refining, petrochemicals & distribution$q$),
  ('challenge','card4_title',$q$Oilfield Services$q$),
  ('challenge','card4_desc',$q$Drilling, completions & well services$q$),

  -- ---------------- services ----------------
  ('services','heading',$q$Translation Services for Oil & Gas$q$),
  ('services','description',$q$Comprehensive language solutions for every phase of the oil and gas value chain.$q$),
  ('services','svc1_title',$q$Technical Translation$q$),
  ('services','svc1_desc',$q$Drilling programs, equipment manuals, P&IDs, and engineering specifications translated by oil & gas subject matter experts.$q$),
  ('services','svc1_item1',$q$Drilling & completion programs$q$),
  ('services','svc1_item2',$q$Equipment & rig operation manuals$q$),
  ('services','svc1_item3',$q$P&IDs & engineering specifications$q$),
  ('services','svc2_title',$q$HSE & Safety Documentation$q$),
  ('services','svc2_desc',$q$Health, Safety, and Environmental documentation that protects your crews across rigs, plants, and pipelines in every language.$q$),
  ('services','svc2_item1',$q$Safe work procedures & permits$q$),
  ('services','svc2_item2',$q$Emergency response & well control plans$q$),
  ('services','svc2_item3',$q$Safety data sheets (SDS/MSDS)$q$),
  ('services','svc3_title',$q$Regulatory & Compliance$q$),
  ('services','svc3_desc',$q$AER filings, environmental assessments, and regulatory submissions for jurisdictions worldwide.$q$),
  ('services','svc3_item1',$q$AER & regulatory submissions$q$),
  ('services','svc3_item2',$q$Environmental impact assessments$q$),
  ('services','svc3_item3',$q$Permit & licence applications$q$),
  ('services','svc4_title',$q$Legal & Contracts$q$),
  ('services','svc4_desc',$q$Production sharing contracts, JOAs, and service agreements for international oil and gas partnerships.$q$),
  ('services','svc4_item1',$q$Production sharing contracts (PSCs)$q$),
  ('services','svc4_item2',$q$Joint operating agreements (JOAs)$q$),
  ('services','svc4_item3',$q$Drilling & service contracts$q$),
  ('services','svc5_title',$q$Training & eLearning$q$),
  ('services','svc5_desc',$q$Multilingual training materials, eLearning courses, and competency assessments for global oilfield workforces.$q$),
  ('services','svc5_item1',$q$Well control & safety training$q$),
  ('services','svc5_item2',$q$Operating & maintenance procedures$q$),
  ('services','svc5_item3',$q$Competency assessments$q$),
  ('services','svc6_title',$q$Corporate Communications$q$),
  ('services','svc6_desc',$q$Investor communications, annual reports, and stakeholder updates for publicly traded oil and gas companies.$q$),
  ('services','svc6_item1',$q$Annual & reserves reports$q$),
  ('services','svc6_item2',$q$Investor presentations$q$),
  ('services','svc6_item3',$q$ESG & sustainability reports$q$),

  -- ---------------- documents ----------------
  ('documents','heading',$q$Document Types We Translate$q$),
  ('documents','description',$q$From wellhead to boardroom—we translate every document your oil and gas operations require.$q$),
  ('documents','col1_title',$q$Technical$q$),
  ('documents','col1_item1',$q$Drilling & completion programs$q$),
  ('documents','col1_item2',$q$Equipment & rig manuals$q$),
  ('documents','col1_item3',$q$P&IDs & process flow diagrams$q$),
  ('documents','col1_item4',$q$Well logs & reservoir reports$q$),
  ('documents','col1_item5',$q$Pipeline integrity procedures$q$),
  ('documents','col1_item6',$q$Refinery & LNG operating manuals$q$),
  ('documents','col2_title',$q$HSE & Safety$q$),
  ('documents','col2_item1',$q$Safety data sheets (SDS/MSDS)$q$),
  ('documents','col2_item2',$q$Emergency response plans$q$),
  ('documents','col2_item3',$q$Work permits & JSAs$q$),
  ('documents','col2_item4',$q$Hazard identification (HAZID/HAZOP)$q$),
  ('documents','col2_item5',$q$Incident & near-miss reports$q$),
  ('documents','col2_item6',$q$Well control & PPE guidelines$q$),
  ('documents','col3_title',$q$Regulatory & Environmental$q$),
  ('documents','col3_item1',$q$AER & regulatory filings$q$),
  ('documents','col3_item2',$q$Environmental impact assessments$q$),
  ('documents','col3_item3',$q$Emissions & flaring reports$q$),
  ('documents','col3_item4',$q$Spill response & remediation plans$q$),
  ('documents','col3_item5',$q$Abandonment & reclamation plans$q$),
  ('documents','col3_item6',$q$ESG & methane disclosures$q$),
  ('documents','col4_title',$q$Business & Legal$q$),
  ('documents','col4_item1',$q$Production sharing contracts$q$),
  ('documents','col4_item2',$q$Joint operating agreements$q$),
  ('documents','col4_item3',$q$Drilling & service agreements$q$),
  ('documents','col4_item4',$q$Annual & reserves reports$q$),
  ('documents','col4_item5',$q$Investor presentations$q$),
  ('documents','col4_item6',$q$Board & M&A materials$q$),

  -- ---------------- why-calgary ----------------
  ('why-calgary','eyebrow',$q$HEADQUARTERED IN CALGARY$q$),
  ('why-calgary','heading',$q$Why Calgary Oil & Gas Companies Choose Cethos$q$),
  ('why-calgary','intro',$q$We're not an offshore translation factory trying to learn your industry from afar. We're based in the heart of Canada's oil and gas sector—we know upstream, midstream, and downstream operations, the terminology, and the standards you operate under.$q$),
  ('why-calgary','feature1_title',$q$Local Understanding$q$),
  ('why-calgary','feature1_desc',$q$We understand Canadian energy regulations, AER requirements, and the realities of operating in Alberta's oil sands, conventional, and unconventional plays.$q$),
  ('why-calgary','feature2_title',$q$Same Time Zone Service$q$),
  ('why-calgary','feature2_desc',$q$When you need a rush translation for a drilling rig in the Middle East, we're available during your business hours—not sleeping on the other side of the world.$q$),
  ('why-calgary','feature3_title',$q$Industry Security Standards$q$),
  ('why-calgary','feature3_desc',$q$We understand the confidentiality requirements for seismic data, well plans, reserves estimates, and proprietary completion technology.$q$),
  ('why-calgary','feature4_title',$q$Global Reach$q$),
  ('why-calgary','feature4_desc',$q$With offices in Dubai and India, we provide 24/7 coverage for operations across the Middle East, Africa, and Asia-Pacific.$q$),
  ('why-calgary','location_title',$q$Calgary Headquarters$q$),
  ('why-calgary','location_subtitle',$q$Canada's Oil & Gas Capital$q$),
  ('why-calgary','location_address',$q$421 7 Avenue SW, Floor 30\nCalgary, AB T2P 4K9$q$),
  ('why-calgary','location_phone',$q$(587) 600-0786$q$),
  ('why-calgary','location_link',$q$Visit Our Office$q$),

  -- ---------------- languages ----------------
  ('languages','heading',$q$Languages for Global Oil & Gas Operations$q$),
  ('languages','description',$q$From the oilfields of the Middle East to LNG projects in Asia-Pacific, we speak the languages your global workforce and partners need.$q$),
  ('languages','region1_title',$q$Middle East & Africa$q$),
  ('languages','region2_title',$q$Americas$q$),
  ('languages','region3_title',$q$Asia-Pacific$q$),
  ('languages','region4_title',$q$Europe & CIS$q$),
  ('languages','footer_text',$q$Don't see your language? We support 200+ languages worldwide.$q$),
  ('languages','footer_link',$q$Contact us for your specific language needs$q$),

  -- ---------------- quality ----------------
  ('quality','heading',$q$Quality & Security You Can Trust$q$),
  ('quality','description',$q$Your technical data and proprietary information are protected by industry-leading security practices.$q$),
  ('quality','card1_title',$q$Quality Standards$q$),
  ('quality','card1_item1',$q$TEP Quality Process$q$),
  ('quality','card1_item2',$q$Multi-Step QA Process$q$),
  ('quality','card1_item3',$q$TEP Process (Translate-Edit-Proof)$q$),
  ('quality','card2_title',$q$Data Security$q$),
  ('quality','card2_item1',$q$Encrypted file transfer$q$),
  ('quality','card2_item2',$q$NDA protection$q$),
  ('quality','card2_item3',$q$PIPEDA & GDPR compliant$q$),
  ('quality','card3_title',$q$Technical Expertise$q$),
  ('quality','card3_item1',$q$Oil & gas sector specialists$q$),
  ('quality','card3_item2',$q$Drilling & process engineering terminology$q$),
  ('quality','card3_item3',$q$Terminology management$q$),

  -- ---------------- success ----------------
  ('success','eyebrow',$q$CLIENT SUCCESS$q$),
  ('success','heading',$q$Supporting Global Operations for a Calgary-Based E&P Company$q$),
  ('success','description',$q$When a Calgary-based exploration and production company expanded into the Middle East and Latin America, they needed a translation partner who understood both the technical complexity and the urgency of oilfield operations. Over 18 months, we translated drilling programs, HSE procedures, and AER-aligned regulatory documents across 12 languages—maintaining consistent terminology and meeting every drilling-schedule deadline.$q$),
  ('success','stat1_value',$q$15,000+$q$),
  ('success','stat1_label',$q$Pages Translated$q$),
  ('success','stat2_value',$q$12$q$),
  ('success','stat2_label',$q$Languages$q$),
  ('success','stat3_value',$q$100%$q$),
  ('success','stat3_label',$q$On-Time Delivery$q$),
  ('success','tag1',$q$Drilling Programs$q$),
  ('success','tag2',$q$HSE Documentation$q$),
  ('success','tag3',$q$Regulatory Filings$q$),
  ('success','tag4',$q$Training Materials$q$),

  -- ---------------- cta ----------------
  ('cta','heading',$q$Ready to Discuss Your Project?$q$),
  ('cta','description',$q$Whether you need a single drilling procedure translated or support for a multi-year global project, we're here to help.$q$),
  ('cta','cta_primary',$q$Get a Quote$q$),
  ('cta','cta_secondary',$q$Speak to a Specialist$q$),
  ('cta','phone',$q$(587) 600-0786$q$),
  ('cta','email',$q$info@cethos.com$q$)
) as v(section,k,val)
join cethosweb_i18n_namespaces n on n.name = 'industry.oil-gas.'||v.section
on conflict (namespace_id, key, segment_index, locale)
do update set value = excluded.value, status = 'published';

-- =========================================================================
-- STEP 3: French (draft)  — Canadian French translations (locale='fr', status='draft')
-- The /fr site isn't published yet, so all French rows stay status='draft'.
-- Preserve exactly: literal \n in why-calgary.location_address; numbers/stats;
-- email, phone; proper nouns (Cethos, Calgary, AER, LNG/GNL, HSE/SST, PIPEDA, GDPR).
-- Never reference ISO certification standards.
-- =========================================================================
insert into cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status)
select n.id, v.k, 0, 'fr', v.val, 'draft'
from (values
  -- ---------------- hero ----------------
  ('hero','breadcrumb_home',$q$Accueil$q$),
  ('hero','breadcrumb_industries',$q$Industries$q$),
  ('hero','breadcrumb_current',$q$Pétrole et gaz$q$),
  ('hero','badge',$q$Basés à Calgary — la capitale canadienne du pétrole et du gaz$q$),
  ('hero','heading_line1',$q$Services de traduction pour le secteur$q$),
  ('hero','heading_line2',$q$Pétrole et gaz$q$),
  ('hero','description',$q$Traduction technique, documentation SST (HSE) et communication multilingue pour les exploitants en amont, intermédiaire et en aval, les entrepreneurs de forage et les sociétés de services pétroliers qui travaillent à l'échelle internationale.$q$),
  ('hero','cta_primary',$q$Obtenir un devis$q$),
  ('hero','cta_secondary',$q$Parler à un spécialiste$q$),

  -- ---------------- trust ----------------
  ('trust','item_1',$q$Plus de 200 langues$q$),
  ('trust','item_2',$q$Experts techniques en la matière$q$),
  ('trust','item_3',$q$Processus qualité TEP$q$),
  ('trust','item_4',$q$Opérations mondiales 24/7$q$),

  -- ---------------- challenge ----------------
  ('challenge','heading',$q$Les opérations pétrolières et gazières exigent de la précision à chaque étape$q$),
  ('challenge','p1',$q$La chaîne de valeur du pétrole et du gaz s'étend à travers les frontières, les langues et les régimes réglementaires—de l'exploration et du forage au raffinage, à l'exportation de GNL et à la distribution au détail. Une communication claire et exacte est essentielle à la sécurité, à la disponibilité et à la conformité à chaque étape.$q$),
  ('challenge','p2',$q$Une procédure de forage ou un permis de travail mal traduit peut coûter des vies. Un manuel d'équipement inexact peut entraîner l'arrêt de la production. Un contrat de partage de production (PSC) ou de service mal localisé peut déclencher des litiges coûteux et une exposition réglementaire.$q$),
  ('challenge','p3',$q$C'est pourquoi les exploitants et les sociétés de services pétroliers font confiance à Cethos. Établis à Calgary—au cœur de l'industrie pétrolière et gazière du Canada—nous comprenons la précision technique, la rigueur en matière de SST (HSE) et la complexité réglementaire de l'AER qu'exigent vos projets.$q$),
  ('challenge','stat1_value',$q$50+$q$),
  ('challenge','stat1_label',$q$Clients du secteur pétrolier et gazier servis$q$),
  ('challenge','stat2_value',$q$1M+$q$),
  ('challenge','stat2_label',$q$Pages traduites$q$),
  ('challenge','stat3_value',$q$100%$q$),
  ('challenge','stat3_label',$q$Livraison à temps$q$),
  ('challenge','card1_title',$q$Amont$q$),
  ('challenge','card1_desc',$q$Exploration, forage et production$q$),
  ('challenge','card2_title',$q$Intermédiaire$q$),
  ('challenge','card2_desc',$q$Pipelines, stockage et GNL$q$),
  ('challenge','card3_title',$q$Aval$q$),
  ('challenge','card3_desc',$q$Raffinage, pétrochimie et distribution$q$),
  ('challenge','card4_title',$q$Services pétroliers$q$),
  ('challenge','card4_desc',$q$Forage, complétion et services de puits$q$),

  -- ---------------- services ----------------
  ('services','heading',$q$Services de traduction pour le pétrole et le gaz$q$),
  ('services','description',$q$Des solutions linguistiques complètes pour chaque phase de la chaîne de valeur du pétrole et du gaz.$q$),
  ('services','svc1_title',$q$Traduction technique$q$),
  ('services','svc1_desc',$q$Programmes de forage, manuels d'équipement, P&ID et spécifications techniques traduits par des experts du secteur pétrolier et gazier.$q$),
  ('services','svc1_item1',$q$Programmes de forage et de complétion$q$),
  ('services','svc1_item2',$q$Manuels d'utilisation de l'équipement et des appareils de forage$q$),
  ('services','svc1_item3',$q$P&ID et spécifications techniques$q$),
  ('services','svc2_title',$q$Documentation SST et sécurité$q$),
  ('services','svc2_desc',$q$Documentation en santé, sécurité et environnement qui protège vos équipes sur les appareils de forage, dans les usines et le long des pipelines, dans toutes les langues.$q$),
  ('services','svc2_item1',$q$Procédures de travail sécuritaire et permis$q$),
  ('services','svc2_item2',$q$Plans d'intervention d'urgence et de contrôle des puits$q$),
  ('services','svc2_item3',$q$Fiches de données de sécurité (FDS/FS)$q$),
  ('services','svc3_title',$q$Réglementation et conformité$q$),
  ('services','svc3_desc',$q$Dépôts auprès de l'AER, évaluations environnementales et soumissions réglementaires pour les juridictions du monde entier.$q$),
  ('services','svc3_item1',$q$Soumissions auprès de l'AER et soumissions réglementaires$q$),
  ('services','svc3_item2',$q$Évaluations des impacts environnementaux$q$),
  ('services','svc3_item3',$q$Demandes de permis et de licences$q$),
  ('services','svc4_title',$q$Juridique et contrats$q$),
  ('services','svc4_desc',$q$Contrats de partage de production, accords d'exploitation conjointe et contrats de service pour les partenariats internationaux dans le pétrole et le gaz.$q$),
  ('services','svc4_item1',$q$Contrats de partage de production (PSC)$q$),
  ('services','svc4_item2',$q$Accords d'exploitation conjointe (JOA)$q$),
  ('services','svc4_item3',$q$Contrats de forage et de service$q$),
  ('services','svc5_title',$q$Formation et apprentissage en ligne$q$),
  ('services','svc5_desc',$q$Matériel de formation multilingue, cours d'apprentissage en ligne et évaluations des compétences pour les effectifs pétroliers du monde entier.$q$),
  ('services','svc5_item1',$q$Formation en contrôle des puits et en sécurité$q$),
  ('services','svc5_item2',$q$Procédures d'exploitation et d'entretien$q$),
  ('services','svc5_item3',$q$Évaluations des compétences$q$),
  ('services','svc6_title',$q$Communications d'entreprise$q$),
  ('services','svc6_desc',$q$Communications aux investisseurs, rapports annuels et mises à jour aux parties prenantes pour les sociétés pétrolières et gazières cotées en bourse.$q$),
  ('services','svc6_item1',$q$Rapports annuels et rapports sur les réserves$q$),
  ('services','svc6_item2',$q$Présentations aux investisseurs$q$),
  ('services','svc6_item3',$q$Rapports ESG et de durabilité$q$),

  -- ---------------- documents ----------------
  ('documents','heading',$q$Types de documents que nous traduisons$q$),
  ('documents','description',$q$De la tête de puits à la salle du conseil—nous traduisons tous les documents requis par vos opérations pétrolières et gazières.$q$),
  ('documents','col1_title',$q$Technique$q$),
  ('documents','col1_item1',$q$Programmes de forage et de complétion$q$),
  ('documents','col1_item2',$q$Manuels d'équipement et d'appareils de forage$q$),
  ('documents','col1_item3',$q$P&ID et schémas de procédé$q$),
  ('documents','col1_item4',$q$Diagraphies de puits et rapports de réservoir$q$),
  ('documents','col1_item5',$q$Procédures d'intégrité des pipelines$q$),
  ('documents','col1_item6',$q$Manuels d'exploitation de raffinerie et de GNL$q$),
  ('documents','col2_title',$q$SST et sécurité$q$),
  ('documents','col2_item1',$q$Fiches de données de sécurité (FDS/FS)$q$),
  ('documents','col2_item2',$q$Plans d'intervention d'urgence$q$),
  ('documents','col2_item3',$q$Permis de travail et analyses de sécurité des tâches (JSA)$q$),
  ('documents','col2_item4',$q$Identification des dangers (HAZID/HAZOP)$q$),
  ('documents','col2_item5',$q$Rapports d'incident et de quasi-accident$q$),
  ('documents','col2_item6',$q$Directives sur le contrôle des puits et les EPI$q$),
  ('documents','col3_title',$q$Réglementation et environnement$q$),
  ('documents','col3_item1',$q$Dépôts auprès de l'AER et dépôts réglementaires$q$),
  ('documents','col3_item2',$q$Évaluations des impacts environnementaux$q$),
  ('documents','col3_item3',$q$Rapports sur les émissions et le torchage$q$),
  ('documents','col3_item4',$q$Plans d'intervention en cas de déversement et de remise en état$q$),
  ('documents','col3_item5',$q$Plans d'abandon et de réhabilitation$q$),
  ('documents','col3_item6',$q$Divulgations ESG et sur le méthane$q$),
  ('documents','col4_title',$q$Affaires et juridique$q$),
  ('documents','col4_item1',$q$Contrats de partage de production$q$),
  ('documents','col4_item2',$q$Accords d'exploitation conjointe$q$),
  ('documents','col4_item3',$q$Contrats de forage et de service$q$),
  ('documents','col4_item4',$q$Rapports annuels et rapports sur les réserves$q$),
  ('documents','col4_item5',$q$Présentations aux investisseurs$q$),
  ('documents','col4_item6',$q$Documents pour le conseil et les fusions-acquisitions$q$),

  -- ---------------- why-calgary ----------------
  ('why-calgary','eyebrow',$q$ÉTABLIS À CALGARY$q$),
  ('why-calgary','heading',$q$Pourquoi les sociétés pétrolières et gazières de Calgary choisissent Cethos$q$),
  ('why-calgary','intro',$q$Nous ne sommes pas une usine de traduction délocalisée qui tente d'apprendre votre industrie de loin. Nous sommes établis au cœur du secteur pétrolier et gazier du Canada—nous connaissons les opérations en amont, intermédiaire et en aval, la terminologie et les normes selon lesquelles vous travaillez.$q$),
  ('why-calgary','feature1_title',$q$Connaissance locale$q$),
  ('why-calgary','feature1_desc',$q$Nous comprenons la réglementation énergétique canadienne, les exigences de l'AER et les réalités de l'exploitation dans les sables bitumineux, les gisements conventionnels et non conventionnels de l'Alberta.$q$),
  ('why-calgary','feature2_title',$q$Service dans le même fuseau horaire$q$),
  ('why-calgary','feature2_desc',$q$Lorsque vous avez besoin d'une traduction urgente pour un appareil de forage au Moyen-Orient, nous sommes disponibles pendant vos heures d'ouverture—et non endormis à l'autre bout du monde.$q$),
  ('why-calgary','feature3_title',$q$Normes de sécurité de l'industrie$q$),
  ('why-calgary','feature3_desc',$q$Nous comprenons les exigences de confidentialité applicables aux données sismiques, aux plans de puits, aux estimations de réserves et aux technologies de complétion exclusives.$q$),
  ('why-calgary','feature4_title',$q$Portée mondiale$q$),
  ('why-calgary','feature4_desc',$q$Avec des bureaux à Dubaï et en Inde, nous offrons une couverture 24/7 pour les opérations au Moyen-Orient, en Afrique et en Asie-Pacifique.$q$),
  ('why-calgary','location_title',$q$Siège social de Calgary$q$),
  ('why-calgary','location_subtitle',$q$La capitale canadienne du pétrole et du gaz$q$),
  ('why-calgary','location_address',$q$421 7 Avenue SW, Floor 30\nCalgary, AB T2P 4K9$q$),
  ('why-calgary','location_phone',$q$(587) 600-0786$q$),
  ('why-calgary','location_link',$q$Visiter notre bureau$q$),

  -- ---------------- languages ----------------
  ('languages','heading',$q$Langues pour les opérations pétrolières et gazières mondiales$q$),
  ('languages','description',$q$Des champs pétrolifères du Moyen-Orient aux projets de GNL en Asie-Pacifique, nous parlons les langues dont vos effectifs et partenaires mondiaux ont besoin.$q$),
  ('languages','region1_title',$q$Moyen-Orient et Afrique$q$),
  ('languages','region2_title',$q$Amériques$q$),
  ('languages','region3_title',$q$Asie-Pacifique$q$),
  ('languages','region4_title',$q$Europe et CEI$q$),
  ('languages','footer_text',$q$Vous ne voyez pas votre langue? Nous prenons en charge plus de 200 langues dans le monde.$q$),
  ('languages','footer_link',$q$Communiquez avec nous pour vos besoins linguistiques précis$q$),

  -- ---------------- quality ----------------
  ('quality','heading',$q$Une qualité et une sécurité dignes de confiance$q$),
  ('quality','description',$q$Vos données techniques et vos renseignements exclusifs sont protégés par des pratiques de sécurité à la fine pointe de l'industrie.$q$),
  ('quality','card1_title',$q$Normes de qualité$q$),
  ('quality','card1_item1',$q$Processus qualité TEP$q$),
  ('quality','card1_item2',$q$Processus d'assurance qualité à plusieurs étapes$q$),
  ('quality','card1_item3',$q$Processus TEP (traduction-révision-relecture)$q$),
  ('quality','card2_title',$q$Sécurité des données$q$),
  ('quality','card2_item1',$q$Transfert de fichiers chiffré$q$),
  ('quality','card2_item2',$q$Protection par entente de confidentialité (NDA)$q$),
  ('quality','card2_item3',$q$Conforme à la LPRPDE (PIPEDA) et au RGPD (GDPR)$q$),
  ('quality','card3_title',$q$Expertise technique$q$),
  ('quality','card3_item1',$q$Spécialistes du secteur pétrolier et gazier$q$),
  ('quality','card3_item2',$q$Terminologie du forage et du génie des procédés$q$),
  ('quality','card3_item3',$q$Gestion terminologique$q$),

  -- ---------------- success ----------------
  ('success','eyebrow',$q$RÉUSSITE CLIENT$q$),
  ('success','heading',$q$Soutenir les opérations mondiales d'une société d'exploration et de production de Calgary$q$),
  ('success','description',$q$Lorsqu'une société d'exploration et de production établie à Calgary a pris de l'expansion au Moyen-Orient et en Amérique latine, elle avait besoin d'un partenaire de traduction qui comprenait à la fois la complexité technique et l'urgence des opérations pétrolières. Sur une période de 18 mois, nous avons traduit des programmes de forage, des procédures de SST (HSE) et des documents réglementaires conformes aux exigences de l'AER dans 12 langues—en maintenant une terminologie cohérente et en respectant chaque échéance du calendrier de forage.$q$),
  ('success','stat1_value',$q$15 000+$q$),
  ('success','stat1_label',$q$Pages traduites$q$),
  ('success','stat2_value',$q$12$q$),
  ('success','stat2_label',$q$Langues$q$),
  ('success','stat3_value',$q$100%$q$),
  ('success','stat3_label',$q$Livraison à temps$q$),
  ('success','tag1',$q$Programmes de forage$q$),
  ('success','tag2',$q$Documentation SST$q$),
  ('success','tag3',$q$Dépôts réglementaires$q$),
  ('success','tag4',$q$Matériel de formation$q$),

  -- ---------------- cta ----------------
  ('cta','heading',$q$Prêt à discuter de votre projet?$q$),
  ('cta','description',$q$Que vous ayez besoin de faire traduire une seule procédure de forage ou d'un soutien pour un projet mondial pluriannuel, nous sommes là pour vous aider.$q$),
  ('cta','cta_primary',$q$Obtenir un devis$q$),
  ('cta','cta_secondary',$q$Parler à un spécialiste$q$),
  ('cta','phone',$q$(587) 600-0786$q$),
  ('cta','email',$q$info@cethos.com$q$)
) as v(section,k,val)
join cethosweb_i18n_namespaces n on n.name = 'industry.oil-gas.'||v.section
on conflict (namespace_id, key, segment_index, locale)
do update set value = excluded.value, status = 'draft';
