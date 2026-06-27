/**
 * DashboardError — DASH-015
 * Shown when dashboard data fails to load.
 * Friendly, child-appropriate messaging with retry action.
 */

"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface DashboardErrorProps {
  onRetry?: () => void;
}

export function DashboardError({ onRetry }: DashboardErrorProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-6 rounded-3xl bg-white/60 p-8 text-center shadow-sm"
    >
      <span className="text-5xl" aria-hidden>😅</span>
      <div className="space-y-2">
        <h2 className="font-display text-2xl font-bold text-gray-800">Ups, Ada Masalah!</h2>
        <p className="text-gray-500">
          Peta dunia tidak bisa dimuat sekarang. Coba lagi ya!
        </p>
      </div>
      <div className="flex gap-3">
        {onRetry && (
          <Button variant="childPrimary" size="lg" onClick={onRetry}>
            🔄 Coba Lagi
          </Button>
        )}
        <Button variant="outline" size="lg" onClick={() => router.push("/")}>
          Kembali
        </Button>
      </div>
    </motion.div>
  );
}
