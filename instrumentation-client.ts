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
  beforeSend(event) {
    const exception = event.exception?.values?.[0];
    if (exception?.type === "AbortError") return null;
    if (exception?.value?.includes("AbortError")) return null;
    return event;
  },
});
