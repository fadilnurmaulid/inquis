/**
 * DashboardEmpty — DASH-014
 * Shown when a new child has no progress at all.
 * Explains what to do next (ui-guidelines.md empty state rules).
 */

"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function DashboardEmpty() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-6 rounded-3xl bg-white/60 p-8 text-center shadow-sm"
    >
      <span className="text-6xl" aria-hidden>🌱</span>
      <div className="space-y-2">
        <h2 className="font-display text-2xl font-bold text-gray-800">
          Petualangan Menunggumu!
        </h2>
        <p className="text-gray-500">
          Kamu belum memulai belajar. Ayo mulai dari Dunia 1 dan temukan pola-pola seru!
        </p>
      </div>
      <Button
        variant="childPrimary"
        size="lg"
        onClick={() => router.push("/play/world/world-1")}
        className="px-8"
      >
        🚀 Mulai Petualangan
      </Button>
    </motion.div>
  );
}
