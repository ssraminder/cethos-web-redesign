"use client";

import { useEffect } from "react";

// Force Sentry client-side init to run.
//
// @sentry/nextjs's withSentryConfig is supposed to auto-bundle the
// client config into the client entry, but on Next 14 + SDK v10
// that auto-detection has previously been unreliable (the package
// loads but Sentry.init() never runs — verified in production by
// inspecting window.__SENTRY__ and finding no registered client).
//
// Mirroring the working pattern from portal.cethos.com: an explicit
// import from a client component rendered in the root layout. The
// import is deferred to useEffect so the module (which calls
// browserTracingIntegration, a browser-only export) is never
// evaluated during SSG/prerender.
export function SentryInit() {
  useEffect(() => {
    import("../instrumentation-client");
  }, []);
  return null;
}
