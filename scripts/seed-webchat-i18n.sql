-- Seed: website live-chat widget copy (components/webchat)
-- Namespace: webchat  (generated from components/webchat/strings.ts — keep in sync)
-- EN published; FR seeded as draft for review (site norm: /fr falls back to EN until published).
-- Re-runnable.

insert into cethosweb_i18n_namespaces (name, description, page_path, sort_order) values
  ('webchat', 'Website live-chat widget (all pages)', '*', 990)
on conflict (name) do nothing;

insert into cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status)
select n.id, v.k, 0, 'en', v.val, 'published'
from (values
  ($q$launcher_open$q$, $q$Chat with us$q$),
  ($q$launcher_close$q$, $q$Close chat$q$),
  ($q$header_title$q$, $q$Chat with Cethos$q$),
  ($q$header_subtitle$q$, $q$Real people, usually replying within minutes during business hours (Mountain Time).$q$),
  ($q$end_chat$q$, $q$End chat$q$),
  ($q$prechat_intro$q$, $q$Tell us a little about you so we can follow up by email if you step away.$q$),
  ($q$field_name$q$, $q$Full name$q$),
  ($q$field_email$q$, $q$Email$q$),
  ($q$field_phone$q$, $q$Phone$q$),
  ($q$start_button$q$, $q$Start chat$q$),
  ($q$starting$q$, $q$Starting…$q$),
  ($q$privacy_note$q$, $q$We only use your details to reply to your enquiry.$q$),
  ($q$verify_title$q$, $q$Check your email$q$),
  ($q$verify_body$q$, $q$This email is already linked to a Cethos account, so we sent a 6-digit code to {email}.$q$),
  ($q$verify_code_label$q$, $q$Verification code$q$),
  ($q$verify_button$q$, $q$Continue$q$),
  ($q$verify_resend$q$, $q$Resend code$q$),
  ($q$verify_resent$q$, $q$A new code is on its way.$q$),
  ($q$verify_change_email$q$, $q$Use a different email$q$),
  ($q$welcome_message$q$, $q$Hi {name}! How can we help with your translation today?$q$),
  ($q$offline_note$q$, $q$If we’re away, we’ll reply by email to {email}.$q$),
  ($q$composer_placeholder$q$, $q$Type your message…$q$),
  ($q$send_button$q$, $q$Send$q$),
  ($q$staff_label$q$, $q$Cethos team$q$),
  ($q$you_label$q$, $q$You$q$),
  ($q$sending$q$, $q$Sending…$q$),
  ($q$error_generic$q$, $q$Something went wrong. Please try again.$q$),
  ($q$error_invalid_name$q$, $q$Please enter your name.$q$),
  ($q$error_invalid_email$q$, $q$Please enter a valid email address.$q$),
  ($q$error_invalid_phone$q$, $q$Please enter a valid phone number.$q$),
  ($q$error_wrong_code$q$, $q$That code isn’t right. Please check and try again.$q$),
  ($q$error_code_expired$q$, $q$That code has expired. Request a new one.$q$),
  ($q$error_too_many$q$, $q$Too many attempts. Please wait a few minutes and try again.$q$),
  ($q$error_slow_down$q$, $q$You’re sending messages a little fast. Please wait a moment.$q$),
  ($q$error_session$q$, $q$Your chat session has ended. Please start a new chat.$q$)
) as v(k, val)
join cethosweb_i18n_namespaces n on n.name = 'webchat'
on conflict (namespace_id, key, segment_index, locale)
do update set value = excluded.value, status = 'published';

insert into cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status)
select n.id, v.k, 0, 'fr', v.val, 'draft'
from (values
  ($q$launcher_open$q$, $q$Clavarder avec nous$q$),
  ($q$launcher_close$q$, $q$Fermer le clavardage$q$),
  ($q$header_title$q$, $q$Clavarder avec Cethos$q$),
  ($q$header_subtitle$q$, $q$De vraies personnes, qui répondent généralement en quelques minutes pendant les heures d’ouverture (heure des Rocheuses).$q$),
  ($q$end_chat$q$, $q$Terminer$q$),
  ($q$prechat_intro$q$, $q$Présentez-vous brièvement afin que nous puissions vous répondre par courriel si vous vous absentez.$q$),
  ($q$field_name$q$, $q$Nom complet$q$),
  ($q$field_email$q$, $q$Courriel$q$),
  ($q$field_phone$q$, $q$Téléphone$q$),
  ($q$start_button$q$, $q$Commencer$q$),
  ($q$starting$q$, $q$Démarrage…$q$),
  ($q$privacy_note$q$, $q$Nous utilisons vos coordonnées uniquement pour répondre à votre demande.$q$),
  ($q$verify_title$q$, $q$Vérifiez vos courriels$q$),
  ($q$verify_body$q$, $q$Ce courriel est déjà associé à un compte Cethos. Nous avons envoyé un code à 6 chiffres à {email}.$q$),
  ($q$verify_code_label$q$, $q$Code de vérification$q$),
  ($q$verify_button$q$, $q$Continuer$q$),
  ($q$verify_resend$q$, $q$Renvoyer le code$q$),
  ($q$verify_resent$q$, $q$Un nouveau code est en route.$q$),
  ($q$verify_change_email$q$, $q$Utiliser un autre courriel$q$),
  ($q$welcome_message$q$, $q$Bonjour {name}! Comment pouvons-nous vous aider avec votre traduction?$q$),
  ($q$offline_note$q$, $q$Si nous sommes absents, nous vous répondrons par courriel à {email}.$q$),
  ($q$composer_placeholder$q$, $q$Écrivez votre message…$q$),
  ($q$send_button$q$, $q$Envoyer$q$),
  ($q$staff_label$q$, $q$Équipe Cethos$q$),
  ($q$you_label$q$, $q$Vous$q$),
  ($q$sending$q$, $q$Envoi…$q$),
  ($q$error_generic$q$, $q$Une erreur s’est produite. Veuillez réessayer.$q$),
  ($q$error_invalid_name$q$, $q$Veuillez entrer votre nom.$q$),
  ($q$error_invalid_email$q$, $q$Veuillez entrer une adresse courriel valide.$q$),
  ($q$error_invalid_phone$q$, $q$Veuillez entrer un numéro de téléphone valide.$q$),
  ($q$error_wrong_code$q$, $q$Ce code est incorrect. Veuillez vérifier et réessayer.$q$),
  ($q$error_code_expired$q$, $q$Ce code a expiré. Demandez-en un nouveau.$q$),
  ($q$error_too_many$q$, $q$Trop de tentatives. Veuillez patienter quelques minutes.$q$),
  ($q$error_slow_down$q$, $q$Vous envoyez des messages un peu trop vite. Veuillez patienter.$q$),
  ($q$error_session$q$, $q$Votre session de clavardage a pris fin. Veuillez en commencer une nouvelle.$q$)
) as v(k, val)
join cethosweb_i18n_namespaces n on n.name = 'webchat'
on conflict (namespace_id, key, segment_index, locale)
do update set value = excluded.value, status = 'draft';

