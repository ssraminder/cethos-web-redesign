"use client";

// Force Sentry client-side init to run.
//
// @sentry/nextjs's withSentryConfig is supposed to auto-bundle
// sentry.client.config.ts into the client entry, but on Next 14 +
// SDK v10 that auto-detection isn't firing reliably (the package
// loads but Sentry.init() never runs — verified in production by
// inspecting window.__SENTRY__ and finding no registered client).
//
// Mirroring the working pattern from portal.cethos.com:
// an explicit side-effect import from a client component that's
// rendered in the root layout. This guarantees the init runs on
// every page load.
import "../sentry.client.config";

export function SentryInit() {
  return null;
}
