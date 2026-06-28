"use client";

/**
 * Play route error boundary — DASH-015
 * Child-friendly error UI with retry and navigation.
 */

import { useEffect } from "react";
import { DashboardError } from "@/components/dashboard/dashboard-error";
import { ChildNav } from "@/components/dashboard/child-nav";

interface PlayErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function PlayError({ error, reset }: PlayErrorProps) {
  useEffect(() => {
    console.error("[PlayError]", error.digest ?? error.message);
  }, [error]);

  return (
    <>
      <main className="flex min-h-screen items-center justify-center px-4 pb-24 pt-12">
        <DashboardError onRetry={reset} />
      </main>
      <ChildNav />
    </>
  );
}
