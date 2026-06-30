"use client";

/**
 * Global Error Boundary — child-friendly, never exposes stack traces.
 */

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[GlobalError]", error.digest ?? error.message);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-gradient-to-br from-sky-50 to-blue-100 p-8 text-center">
      {/* Icon */}
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-50 shadow-sm">
        <AlertCircle className="h-12 w-12 text-red-400" aria-hidden />
      </div>

      <div className="space-y-3 max-w-sm">
        <h1 className="font-display text-2xl font-bold text-gray-800">
          Ups, Ada yang Salah!
        </h1>
        <p className="text-gray-500 leading-relaxed">
          Terjadi kesalahan yang tidak terduga. Coba lagi atau kembali ke beranda.
        </p>
        {process.env.NODE_ENV === "development" && (
          <p className="mt-2 rounded-xl bg-red-50 px-4 py-2 font-mono text-xs text-red-600 text-left">
            {error.message}
          </p>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Button
          onClick={reset}
          variant="childPrimary"
          size="lg"
          className="rounded-2xl"
        >
          <RefreshCw className="h-4 w-4" />
          Coba Lagi
        </Button>
        <Button asChild variant="outline" size="lg" className="rounded-2xl">
          <Link href="/">
            <Home className="h-4 w-4" />
            Beranda
          </Link>
        </Button>
      </div>
    </main>
  );
}
