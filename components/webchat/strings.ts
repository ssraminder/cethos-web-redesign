// Default copy for the website chat widget (v2, Tawk.to-style).
//
// The source of truth is the DB-backed next-intl namespace `webchat`
// (seed: scripts/seed-webchat-i18n.sql). These defaults are used only when a
// key is missing from the loaded messages, so the widget never renders raw
// `[webchat.key]` fallbacks before the namespace is seeded.
//
// Keep this file and the seed SQL in sync. Avoid bare ASCII apostrophes —
// ICU treats `'` as a quote character; use ’ instead.

export type WebchatKey =
  | 'launcher_open'
  | 'launcher_close'
  | 'header_title'
  | 'status_online'
  | 'status_away'
  | 'welcome'
  | 'composer_placeholder'
  | 'send_button'
  | 'attach_file'
  | 'drop_files'
  | 'uploading'
  | 'staff_label'
  | 'sending'
  | 'typing'
  | 'end_chat'
  | 'mute'
  | 'unmute'
  | 'identify_title'
  | 'identify_body'
  | 'field_name'
  | 'field_email'
  | 'field_phone'
  | 'field_message'
  | 'identify_save'
  | 'details_needed'
  | 'identify_saved'
  | 'offline_title'
  | 'offline_body'
  | 'offline_send'
  | 'offline_sent_title'
  | 'offline_sent_body'
  | 'chat_ended'
  | 'rate_title'
  | 'rate_good'
  | 'rate_bad'
  | 'rate_comment'
  | 'rate_submit'
  | 'rate_thanks'
  | 'transcript_title'
  | 'transcript_send'
  | 'transcript_sent'
  | 'new_chat'
  | 'privacy_note'
  | 'greeting_close'
  | 'error_generic'
  | 'error_invalid_name'
  | 'error_invalid_email'
  | 'error_invalid_phone'
  | 'error_slow_down'
  | 'error_session'
  | 'error_file_too_large'
  | 'error_file_type'
  | 'error_too_many'
  | 'error_details_required'

export const WEBCHAT_DEFAULTS: Record<'en' | 'fr', Record<WebchatKey, string>> = {
  en: {
    launcher_open: 'Chat with us',
    launcher_close: 'Close chat',
    header_title: 'Chat with Cethos',
    status_online: 'We’re online · usually reply in a few minutes',
    status_away: 'We’re away right now — leave a message',
    welcome: 'Hi there! 👋 How can we help with your translation today?',
    composer_placeholder: 'Type your message…',
    send_button: 'Send',
    attach_file: 'Attach a file',
    drop_files: 'Drop files to send',
    uploading: 'Uploading…',
    staff_label: 'Cethos team',
    sending: 'Sending…',
    typing: '{name} is typing…',
    end_chat: 'End chat',
    mute: 'Mute sounds',
    unmute: 'Turn sounds on',
    identify_title: 'How can we reach you?',
    identify_body: 'Please share your name, email and phone so our team can follow up — we’ll reply here, and by email if you step away.',
    field_name: 'Name',
    field_email: 'Email',
    field_phone: 'Phone',
    field_message: 'Message',
    identify_save: 'Save',
    details_needed: 'Add your name, email and phone above to keep chatting.',
    identify_saved: 'Thanks! We’ll reply here, and by email if you step away.',
    offline_title: 'Leave us a message',
    offline_body: 'No one is online right now. Leave a message and we’ll reply by email, usually within one business day.',
    offline_send: 'Send message',
    offline_sent_title: 'Message sent',
    offline_sent_body: 'Thanks! We’ll reply to {email} soon.',
    chat_ended: 'This chat has ended.',
    rate_title: 'How was this chat?',
    rate_good: 'Good',
    rate_bad: 'Not good',
    rate_comment: 'Anything to add? (optional)',
    rate_submit: 'Send feedback',
    rate_thanks: 'Thanks for your feedback!',
    transcript_title: 'Email me the transcript',
    transcript_send: 'Send',
    transcript_sent: 'Transcript sent to {email}.',
    new_chat: 'Start a new chat',
    privacy_note: 'We only use your details to reply to your enquiry.',
    greeting_close: 'Dismiss',
    error_generic: 'Something went wrong. Please try again.',
    error_invalid_name: 'Please enter your name.',
    error_invalid_email: 'Please enter a valid email address.',
    error_invalid_phone: 'Please enter a valid phone number.',
    error_slow_down: 'You’re sending messages a little fast. Please wait a moment.',
    error_session: 'Your chat session ended. Please reload the page.',
    error_file_too_large: 'That file is over 10 MB.',
    error_file_type: 'That file type isn’t supported. Try PDF, JPG, PNG, Word or Excel.',
    error_too_many: 'Too many messages — please try again later.',
    error_details_required: 'Please add your name, email and phone to continue the chat.',
  },
  fr: {
    launcher_open: 'Clavardez avec nous',
    launcher_close: 'Fermer le clavardage',
    header_title: 'Clavardez avec Cethos',
    status_online: 'Nous sommes en ligne · réponse en quelques minutes',
    status_away: 'Nous sommes absents — laissez-nous un message',
    welcome: 'Bonjour ! 👋 Comment pouvons-nous vous aider avec votre traduction ?',
    composer_placeholder: 'Écrivez votre message…',
    send_button: 'Envoyer',
    attach_file: 'Joindre un fichier',
    drop_files: 'Déposez les fichiers à envoyer',
    uploading: 'Téléversement…',
    staff_label: 'Équipe Cethos',
    sending: 'Envoi…',
    typing: '{name} écrit…',
    end_chat: 'Terminer',
    mute: 'Couper le son',
    unmute: 'Activer le son',
    identify_title: 'Comment vous joindre ?',
    identify_body: 'Indiquez votre nom, votre courriel et votre téléphone pour que notre équipe puisse faire le suivi — nous répondrons ici, et par courriel si vous partez.',
    field_name: 'Nom',
    field_email: 'Courriel',
    field_phone: 'Téléphone',
    field_message: 'Message',
    identify_save: 'Enregistrer',
    details_needed: 'Ajoutez votre nom, votre courriel et votre téléphone ci-dessus pour continuer.',
    identify_saved: 'Merci ! Nous répondrons ici, et par courriel si vous partez.',
    offline_title: 'Laissez-nous un message',
    offline_body: 'Personne n’est en ligne pour le moment. Laissez un message et nous vous répondrons par courriel, habituellement en un jour ouvrable.',
    offline_send: 'Envoyer le message',
    offline_sent_title: 'Message envoyé',
    offline_sent_body: 'Merci ! Nous répondrons à {email} sous peu.',
    chat_ended: 'Ce clavardage est terminé.',
    rate_title: 'Comment s’est passé ce clavardage ?',
    rate_good: 'Bien',
    rate_bad: 'Pas bien',
    rate_comment: 'Un commentaire ? (facultatif)',
    rate_submit: 'Envoyer',
    rate_thanks: 'Merci pour votre commentaire !',
    transcript_title: 'M’envoyer la transcription',
    transcript_send: 'Envoyer',
    transcript_sent: 'Transcription envoyée à {email}.',
    new_chat: 'Nouveau clavardage',
    privacy_note: 'Nous utilisons vos coordonnées uniquement pour répondre à votre demande.',
    greeting_close: 'Fermer',
    error_generic: 'Une erreur est survenue. Veuillez réessayer.',
    error_invalid_name: 'Veuillez entrer votre nom.',
    error_invalid_email: 'Veuillez entrer une adresse courriel valide.',
    error_invalid_phone: 'Veuillez entrer un numéro de téléphone valide.',
    error_slow_down: 'Vous envoyez des messages un peu trop vite. Veuillez patienter.',
    error_session: 'Votre session de clavardage a pris fin. Veuillez recharger la page.',
    error_file_too_large: 'Ce fichier dépasse 10 Mo.',
    error_file_type: 'Ce type de fichier n’est pas pris en charge. Essayez PDF, JPG, PNG, Word ou Excel.',
    error_too_many: 'Trop de messages — veuillez réessayer plus tard.',
    error_details_required: 'Veuillez indiquer votre nom, votre courriel et votre téléphone pour continuer.',
  },
}

/** Map edge-function error codes to copy keys. */
export function errorKey(code: string | undefined): WebchatKey {
  switch (code) {
    case 'invalid_name':
      return 'error_invalid_name'
    case 'invalid_email':
      return 'error_invalid_email'
    case 'invalid_phone':
      return 'error_invalid_phone'
    case 'slow_down':
      return 'error_slow_down'
    case 'too_many':
      return 'error_too_many'
    case 'details_required':
      return 'error_details_required'
    case 'file_too_large':
      return 'error_file_too_large'
    case 'file_type_not_allowed':
      return 'error_file_type'
    case 'invalid_session':
      return 'error_session'
    default:
      return 'error_generic'
  }
}
