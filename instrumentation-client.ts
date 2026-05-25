// Sentry client-side init for cethos.com (browser).
// Loaded automatically by @sentry/nextjs.

import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN || "";

Sentry.init({
  dsn,
  enabled: !!dsn,
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.NODE_ENV,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 0.2,
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 1.0,
  ignoreErrors: [
    // Tawk.to chat widget internals (Vue $refs error from twk-chunk-*.js).
    // Third-party code we don't control; spams Sentry without actionable signal.
    /\$refs\['branding-widget'\]/,
    /twk-chunk-/,
    "$_Tawk",
    "BufferLoader: XHR error",
  ],
  denyUrls: [
    /embed\.tawk\.to/i,
    /twk-chunk-/i,
    /twk-vendor/i,
  ],
  beforeSend(event) {
    const exception = event.exception?.values?.[0];
    if (exception?.type === "AbortError") return null;
    if (exception?.value?.includes("AbortError")) return null;

    // Drop replay-hydration-error events. These are dominated by browser-extension
    // DOM mutations (Grammarly, password managers, dark-mode extensions) rather than
    // app bugs, and Sentry surfaces them with no stacktrace — not actionable.
    const issueType = (event as { type?: string }).type;
    if (issueType === "replay_hydration_error") return null;
    const tags = event.tags as Record<string, unknown> | undefined;
    if (tags?.replay_hydration_error) return null;

    // Defense in depth: also drop events whose top frame is Tawk.to code.
    const frames = exception?.stacktrace?.frames ?? [];
    if (frames.some((f) => /twk-(chunk|vendor)|embed\.tawk\.to/i.test(f.filename ?? ""))) {
      return null;
    }

    return event;
  },
});
