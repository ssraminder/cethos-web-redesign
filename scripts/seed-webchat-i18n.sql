-- Seed: website live-chat widget copy (components/webchat) — website chat v2
-- Namespace: webchat  (generated from components/webchat/strings.ts — keep in sync)
-- EN published; FR seeded as draft for review (site norm: /fr falls back to EN until published).
-- Also adds the chat's browser-storage row to the cookies page (namespace cookies).
-- Re-runnable. Keys from the v1 form-first widget are left in place, unused.

insert into cethosweb_i18n_namespaces (name, description, page_path, sort_order) values
  ('webchat', 'Website live-chat widget (all pages)', '*', 990)
on conflict (name) do nothing;

insert into cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status)
select n.id, v.k, 0, 'en', v.val, 'published'
from (values
  ($q$launcher_open$q$, $q$Chat with us$q$),
  ($q$launcher_close$q$, $q$Close chat$q$),
  ($q$header_title$q$, $q$Chat with Cethos$q$),
  ($q$status_online$q$, $q$We’re online · usually reply in a few minutes$q$),
  ($q$status_away$q$, $q$We’re away right now — leave a message$q$),
  ($q$welcome$q$, $q$Hi there! 👋 How can we help with your translation today?$q$),
  ($q$composer_placeholder$q$, $q$Type your message…$q$),
  ($q$send_button$q$, $q$Send$q$),
  ($q$attach_file$q$, $q$Attach a file$q$),
  ($q$drop_files$q$, $q$Drop files to send$q$),
  ($q$uploading$q$, $q$Uploading…$q$),
  ($q$staff_label$q$, $q$Cethos team$q$),
  ($q$sending$q$, $q$Sending…$q$),
  ($q$typing$q$, $q${name} is typing…$q$),
  ($q$end_chat$q$, $q$End chat$q$),
  ($q$mute$q$, $q$Mute sounds$q$),
  ($q$unmute$q$, $q$Turn sounds on$q$),
  ($q$identify_title$q$, $q$How can we reach you?$q$),
  ($q$identify_body$q$, $q$Please share your name, email and phone so our team can follow up — we’ll reply here, and by email if you step away.$q$),
  ($q$field_name$q$, $q$Name$q$),
  ($q$field_email$q$, $q$Email$q$),
  ($q$field_phone$q$, $q$Phone$q$),
  ($q$field_message$q$, $q$Message$q$),
  ($q$identify_save$q$, $q$Save$q$),
  ($q$details_needed$q$, $q$Add your name, email and phone above to keep chatting.$q$),
  ($q$identify_saved$q$, $q$Thanks! We’ll reply here, and by email if you step away.$q$),
  ($q$offline_title$q$, $q$Leave us a message$q$),
  ($q$offline_body$q$, $q$No one is online right now. Leave a message and we’ll reply by email, usually within one business day.$q$),
  ($q$offline_send$q$, $q$Send message$q$),
  ($q$offline_sent_title$q$, $q$Message sent$q$),
  ($q$offline_sent_body$q$, $q$Thanks! We’ll reply to {email} soon.$q$),
  ($q$chat_ended$q$, $q$This chat has ended.$q$),
  ($q$rate_title$q$, $q$How was this chat?$q$),
  ($q$rate_good$q$, $q$Good$q$),
  ($q$rate_bad$q$, $q$Not good$q$),
  ($q$rate_comment$q$, $q$Anything to add? (optional)$q$),
  ($q$rate_submit$q$, $q$Send feedback$q$),
  ($q$rate_thanks$q$, $q$Thanks for your feedback!$q$),
  ($q$transcript_title$q$, $q$Email me the transcript$q$),
  ($q$transcript_send$q$, $q$Send$q$),
  ($q$transcript_sent$q$, $q$Transcript sent to {email}.$q$),
  ($q$new_chat$q$, $q$Start a new chat$q$),
  ($q$privacy_note$q$, $q$We only use your details to reply to your enquiry.$q$),
  ($q$greeting_close$q$, $q$Dismiss$q$),
  ($q$error_generic$q$, $q$Something went wrong. Please try again.$q$),
  ($q$error_invalid_name$q$, $q$Please enter your name.$q$),
  ($q$error_invalid_email$q$, $q$Please enter a valid email address.$q$),
  ($q$error_invalid_phone$q$, $q$Please enter a valid phone number.$q$),
  ($q$error_slow_down$q$, $q$You’re sending messages a little fast. Please wait a moment.$q$),
  ($q$error_session$q$, $q$Your chat session ended. Please reload the page.$q$),
  ($q$error_file_too_large$q$, $q$That file is over 10 MB.$q$),
  ($q$error_file_type$q$, $q$That file type isn’t supported. Try PDF, JPG, PNG, Word or Excel.$q$),
  ($q$error_too_many$q$, $q$Too many messages — please try again later.$q$),
  ($q$error_details_required$q$, $q$Please add your name, email and phone to continue the chat.$q$)
) as v(k, val)
join cethosweb_i18n_namespaces n on n.name = 'webchat'
on conflict (namespace_id, key, segment_index, locale)
do update set value = excluded.value, status = excluded.status;

insert into cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status)
select n.id, v.k, 0, 'fr', v.val, 'draft'
from (values
  ($q$launcher_open$q$, $q$Clavardez avec nous$q$),
  ($q$launcher_close$q$, $q$Fermer le clavardage$q$),
  ($q$header_title$q$, $q$Clavardez avec Cethos$q$),
  ($q$status_online$q$, $q$Nous sommes en ligne · réponse en quelques minutes$q$),
  ($q$status_away$q$, $q$Nous sommes absents — laissez-nous un message$q$),
  ($q$welcome$q$, $q$Bonjour ! 👋 Comment pouvons-nous vous aider avec votre traduction ?$q$),
  ($q$composer_placeholder$q$, $q$Écrivez votre message…$q$),
  ($q$send_button$q$, $q$Envoyer$q$),
  ($q$attach_file$q$, $q$Joindre un fichier$q$),
  ($q$drop_files$q$, $q$Déposez les fichiers à envoyer$q$),
  ($q$uploading$q$, $q$Téléversement…$q$),
  ($q$staff_label$q$, $q$Équipe Cethos$q$),
  ($q$sending$q$, $q$Envoi…$q$),
  ($q$typing$q$, $q${name} écrit…$q$),
  ($q$end_chat$q$, $q$Terminer$q$),
  ($q$mute$q$, $q$Couper le son$q$),
  ($q$unmute$q$, $q$Activer le son$q$),
  ($q$identify_title$q$, $q$Comment vous joindre ?$q$),
  ($q$identify_body$q$, $q$Indiquez votre nom, votre courriel et votre téléphone pour que notre équipe puisse faire le suivi — nous répondrons ici, et par courriel si vous partez.$q$),
  ($q$field_name$q$, $q$Nom$q$),
  ($q$field_email$q$, $q$Courriel$q$),
  ($q$field_phone$q$, $q$Téléphone$q$),
  ($q$field_message$q$, $q$Message$q$),
  ($q$identify_save$q$, $q$Enregistrer$q$),
  ($q$details_needed$q$, $q$Ajoutez votre nom, votre courriel et votre téléphone ci-dessus pour continuer.$q$),
  ($q$identify_saved$q$, $q$Merci ! Nous répondrons ici, et par courriel si vous partez.$q$),
  ($q$offline_title$q$, $q$Laissez-nous un message$q$),
  ($q$offline_body$q$, $q$Personne n’est en ligne pour le moment. Laissez un message et nous vous répondrons par courriel, habituellement en un jour ouvrable.$q$),
  ($q$offline_send$q$, $q$Envoyer le message$q$),
  ($q$offline_sent_title$q$, $q$Message envoyé$q$),
  ($q$offline_sent_body$q$, $q$Merci ! Nous répondrons à {email} sous peu.$q$),
  ($q$chat_ended$q$, $q$Ce clavardage est terminé.$q$),
  ($q$rate_title$q$, $q$Comment s’est passé ce clavardage ?$q$),
  ($q$rate_good$q$, $q$Bien$q$),
  ($q$rate_bad$q$, $q$Pas bien$q$),
  ($q$rate_comment$q$, $q$Un commentaire ? (facultatif)$q$),
  ($q$rate_submit$q$, $q$Envoyer$q$),
  ($q$rate_thanks$q$, $q$Merci pour votre commentaire !$q$),
  ($q$transcript_title$q$, $q$M’envoyer la transcription$q$),
  ($q$transcript_send$q$, $q$Envoyer$q$),
  ($q$transcript_sent$q$, $q$Transcription envoyée à {email}.$q$),
  ($q$new_chat$q$, $q$Nouveau clavardage$q$),
  ($q$privacy_note$q$, $q$Nous utilisons vos coordonnées uniquement pour répondre à votre demande.$q$),
  ($q$greeting_close$q$, $q$Fermer$q$),
  ($q$error_generic$q$, $q$Une erreur est survenue. Veuillez réessayer.$q$),
  ($q$error_invalid_name$q$, $q$Veuillez entrer votre nom.$q$),
  ($q$error_invalid_email$q$, $q$Veuillez entrer une adresse courriel valide.$q$),
  ($q$error_invalid_phone$q$, $q$Veuillez entrer un numéro de téléphone valide.$q$),
  ($q$error_slow_down$q$, $q$Vous envoyez des messages un peu trop vite. Veuillez patienter.$q$),
  ($q$error_session$q$, $q$Votre session de clavardage a pris fin. Veuillez recharger la page.$q$),
  ($q$error_file_too_large$q$, $q$Ce fichier dépasse 10 Mo.$q$),
  ($q$error_file_type$q$, $q$Ce type de fichier n’est pas pris en charge. Essayez PDF, JPG, PNG, Word ou Excel.$q$),
  ($q$error_too_many$q$, $q$Trop de messages — veuillez réessayer plus tard.$q$),
  ($q$error_details_required$q$, $q$Veuillez indiquer votre nom, votre courriel et votre téléphone pour continuer.$q$)
) as v(k, val)
join cethosweb_i18n_namespaces n on n.name = 'webchat'
on conflict (namespace_id, key, segment_index, locale)
do update set value = excluded.value where cethosweb_i18n_translations.status <> 'published';

-- Cookies page: website chat browser-storage row
insert into cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status)
select n.id, v.k, 0, 'en', v.val, 'published'
from (values
  ($q$essential_webchat_purpose$q$, $q$Website chat: remembers your browser so an open chat and our replies are still there when you come back (browser local storage, not a cookie). Also lets our team see which page you are on while you browse, so we can help.$q$),
  ($q$essential_webchat_duration$q$, $q$Until cleared; visitor records without a chat are deleted after 30 days$q$)
) as v(k, val)
join cethosweb_i18n_namespaces n on n.name = 'cookies'
on conflict (namespace_id, key, segment_index, locale)
do update set value = excluded.value, status = excluded.status;

insert into cethosweb_i18n_translations (namespace_id, key, segment_index, locale, value, status)
select n.id, v.k, 0, 'fr', v.val, 'draft'
from (values
  ($q$essential_webchat_purpose$q$, $q$Clavardage du site : mémorise votre navigateur pour que votre clavardage et nos réponses soient toujours là à votre retour (stockage local du navigateur, pas un témoin). Permet aussi à notre équipe de voir la page que vous consultez afin de vous aider.$q$),
  ($q$essential_webchat_duration$q$, $q$Jusqu’à effacement; les visiteurs sans clavardage sont supprimés après 30 jours$q$)
) as v(k, val)
join cethosweb_i18n_namespaces n on n.name = 'cookies'
on conflict (namespace_id, key, segment_index, locale)
do update set value = excluded.value where cethosweb_i18n_translations.status <> 'published';
