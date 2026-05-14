"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

// Force Sentry client-side init to run.
//
// @sentry/nextjs's withSentryConfig auto-bundling of the client config
// has been unreliable on Next 14 + SDK v10 (the package loads but
// Sentry.init() never runs — verified by inspecting window.__SENTRY__
// in production and finding no registered client).
//
// Inlining the init here, gated on useEffect, guarantees:
//   - browser-only exports (browserTracingIntegration, replayIntegration)
//     are never invoked during SSG/prerender
//   - the init runs on every client navigation entry
//   - no dynamic-import chunking surprises in the production bundle
export function SentryInit() {
  useEffect(() => {
    const w = window as unknown as { __sentryClientInited?: boolean };
    if (w.__sentryClientInited) return;
    w.__sentryClientInited = true;

    const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN || "";
    if (!dsn) return;

    Sentry.init({
      dsn,
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
  }, []);
  return null;
}
