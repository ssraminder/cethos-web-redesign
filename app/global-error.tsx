"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

// Catches errors at the root of the App Router that escape any nested
// error boundary. Reports to Sentry and renders a minimal fallback.
export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          padding: 24,
          textAlign: "center",
        }}
      >
        <h1>Something went wrong</h1>
        <p>The error has been reported. Please refresh and try again.</p>
      </body>
    </html>
  );
}
