// Default copy for the website chat widget.
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
  | 'header_subtitle'
  | 'end_chat'
  | 'prechat_intro'
  | 'field_name'
  | 'field_email'
  | 'field_phone'
  | 'start_button'
  | 'starting'
  | 'privacy_note'
  | 'verify_title'
  | 'verify_body'
  | 'verify_code_label'
  | 'verify_button'
  | 'verify_resend'
  | 'verify_resent'
  | 'verify_change_email'
  | 'welcome_message'
  | 'offline_note'
  | 'composer_placeholder'
  | 'send_button'
  | 'staff_label'
  | 'you_label'
  | 'sending'
  | 'error_generic'
  | 'error_invalid_name'
  | 'error_invalid_email'
  | 'error_invalid_phone'
  | 'error_wrong_code'
  | 'error_code_expired'
  | 'error_too_many'
  | 'error_slow_down'
  | 'error_session'

export const WEBCHAT_DEFAULTS: Record<'en' | 'fr', Record<WebchatKey, string>> = {
  en: {
    launcher_open: 'Chat with us',
    launcher_close: 'Close chat',
    header_title: 'Chat with Cethos',
    header_subtitle: 'Real people, usually replying within minutes during business hours (Mountain Time).',
    end_chat: 'End chat',
    prechat_intro: 'Tell us a little about you so we can follow up by email if you step away.',
    field_name: 'Full name',
    field_email: 'Email',
    field_phone: 'Phone',
    start_button: 'Start chat',
    starting: 'Starting…',
    privacy_note: 'We only use your details to reply to your enquiry.',
    verify_title: 'Check your email',
    verify_body: 'This email is already linked to a Cethos account, so we sent a 6-digit code to {email}.',
    verify_code_label: 'Verification code',
    verify_button: 'Continue',
    verify_resend: 'Resend code',
    verify_resent: 'A new code is on its way.',
    verify_change_email: 'Use a different email',
    welcome_message: 'Hi {name}! How can we help with your translation today?',
    offline_note: 'If we’re away, we’ll reply by email to {email}.',
    composer_placeholder: 'Type your message…',
    send_button: 'Send',
    staff_label: 'Cethos team',
    you_label: 'You',
    sending: 'Sending…',
    error_generic: 'Something went wrong. Please try again.',
    error_invalid_name: 'Please enter your name.',
    error_invalid_email: 'Please enter a valid email address.',
    error_invalid_phone: 'Please enter a valid phone number.',
    error_wrong_code: 'That code isn’t right. Please check and try again.',
    error_code_expired: 'That code has expired. Request a new one.',
    error_too_many: 'Too many attempts. Please wait a few minutes and try again.',
    error_slow_down: 'You’re sending messages a little fast. Please wait a moment.',
    error_session: 'Your chat session has ended. Please start a new chat.',
  },
  fr: {
    launcher_open: 'Clavarder avec nous',
    launcher_close: 'Fermer le clavardage',
    header_title: 'Clavarder avec Cethos',
    header_subtitle: 'De vraies personnes, qui répondent généralement en quelques minutes pendant les heures d’ouverture (heure des Rocheuses).',
    end_chat: 'Terminer',
    prechat_intro: 'Présentez-vous brièvement afin que nous puissions vous répondre par courriel si vous vous absentez.',
    field_name: 'Nom complet',
    field_email: 'Courriel',
    field_phone: 'Téléphone',
    start_button: 'Commencer',
    starting: 'Démarrage…',
    privacy_note: 'Nous utilisons vos coordonnées uniquement pour répondre à votre demande.',
    verify_title: 'Vérifiez vos courriels',
    verify_body: 'Ce courriel est déjà associé à un compte Cethos. Nous avons envoyé un code à 6 chiffres à {email}.',
    verify_code_label: 'Code de vérification',
    verify_button: 'Continuer',
    verify_resend: 'Renvoyer le code',
    verify_resent: 'Un nouveau code est en route.',
    verify_change_email: 'Utiliser un autre courriel',
    welcome_message: 'Bonjour {name}! Comment pouvons-nous vous aider avec votre traduction?',
    offline_note: 'Si nous sommes absents, nous vous répondrons par courriel à {email}.',
    composer_placeholder: 'Écrivez votre message…',
    send_button: 'Envoyer',
    staff_label: 'Équipe Cethos',
    you_label: 'Vous',
    sending: 'Envoi…',
    error_generic: 'Une erreur s’est produite. Veuillez réessayer.',
    error_invalid_name: 'Veuillez entrer votre nom.',
    error_invalid_email: 'Veuillez entrer une adresse courriel valide.',
    error_invalid_phone: 'Veuillez entrer un numéro de téléphone valide.',
    error_wrong_code: 'Ce code est incorrect. Veuillez vérifier et réessayer.',
    error_code_expired: 'Ce code a expiré. Demandez-en un nouveau.',
    error_too_many: 'Trop de tentatives. Veuillez patienter quelques minutes.',
    error_slow_down: 'Vous envoyez des messages un peu trop vite. Veuillez patienter.',
    error_session: 'Votre session de clavardage a pris fin. Veuillez en commencer une nouvelle.',
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
    case 'wrong_code':
    case 'invalid_code':
      return 'error_wrong_code'
    case 'code_expired':
    case 'no_code_issued':
      return 'error_code_expired'
    case 'too_many_attempts':
    case 'resend_cooldown':
      return 'error_too_many'
    case 'slow_down':
      return 'error_slow_down'
    case 'invalid_session':
    case 'session_expired':
    case 'not_verified':
      return 'error_session'
    default:
      return 'error_generic'
  }
}
