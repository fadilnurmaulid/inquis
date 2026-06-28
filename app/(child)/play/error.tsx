"use client";

/**
 * Play route error boundary — child-friendly error UI.
 */

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 px-4 pb-24 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="text-7xl"
          aria-hidden
        >
          😅
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-2 max-w-xs"
        >
          <h2 className="font-display text-2xl font-bold text-gray-800">
            Ups, Ada Masalah!
          </h2>
          <p className="text-gray-500">
            Peta dunia tidak bisa dimuat. Coba lagi ya — kamu pasti bisa! 💪
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex flex-col gap-3 w-full max-w-xs"
        >
          <Button
            onClick={reset}
            variant="childPrimary"
            size="lg"
            className="w-full rounded-2xl"
          >
            <RefreshCw className="h-4 w-4" />
            Coba Lagi
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full rounded-2xl">
            <Link href="/">
              <Home className="h-4 w-4" />
              Beranda
            </Link>
          </Button>
        </motion.div>
      </main>
      <ChildNav />
    </>
  );
}
