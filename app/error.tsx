"use client";

/**
 * Global Error Boundary — FND-018 / FR-010
 * Catches unexpected runtime errors without exposing implementation details.
 */

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to monitoring service (future Sentry integration point)
    console.error("[GlobalError]", error.digest ?? error.message);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
        <AlertCircle className="h-8 w-8 text-destructive" />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Ups, ada yang salah!</h1>
        <p className="max-w-md text-muted-foreground">
          Maaf, terjadi kesalahan yang tidak terduga. Tim kami sudah diberitahu.
          Coba lagi atau kembali ke halaman utama.
        </p>
        {process.env.NODE_ENV === "development" && (
          <p className="mt-2 rounded bg-muted px-3 py-1 font-mono text-xs text-muted-foreground">
            {error.message}
          </p>
        )}
      </div>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Coba Lagi
        </button>
        <a
          href="/"
          className="rounded-lg border px-6 py-3 font-medium transition-colors hover:bg-muted"
        >
          Halaman Utama
        </a>
      </div>
    </div>
  );
}
