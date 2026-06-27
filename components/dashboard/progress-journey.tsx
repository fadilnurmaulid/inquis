/**
 * ProgressJourney — DASH-007
 * Visual learning path: shows completed, current, and future milestones.
 * Avoids raw numbers; uses stars and path nodes (FR-DASH-005, pedagogy.md).
 */

"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WorldProgressSummary } from "@/lib/services/dashboard.service";

interface ProgressJourneyProps {
  worlds: WorldProgressSummary[];
  totalCompletedActivities: number;
}

export function ProgressJourney({ worlds, totalCompletedActivities }: ProgressJourneyProps) {
  const completedWorlds = worlds.filter((w) => w.status === "COMPLETED").length;
  const totalActivities = worlds.reduce((sum, w) => sum + w.totalActivities, 0);

  return (
    <section aria-label="Perjalanan Belajarmu" className="rounded-3xl bg-white/60 p-5 shadow-sm backdrop-blur-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-gray-800">
          ✨ Perjalananmu
        </h2>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
          {totalCompletedActivities}/{totalActivities} aktivitas
        </span>
      </div>

      {/* World nodes connected by a path */}
      <div className="flex items-center gap-1">
        {worlds.map((world, index) => {
          const isCompleted = world.status === "COMPLETED";
          const isActive = world.status === "IN_PROGRESS" || world.status === "UNLOCKED";
          const isLast = index === worlds.length - 1;

          return (
            <div key={world.worldId} className="flex flex-1 items-center">
              {/* Node */}
              <div className="flex flex-col items-center gap-1">
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.15, type: "spring" }}
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full border-2 shadow-sm",
                    isCompleted && "border-inquis-grass bg-inquis-grass",
                    isActive && "border-primary bg-primary",
                    !isCompleted && !isActive && "border-gray-200 bg-gray-100"
                  )}
                  aria-label={`Dunia ${world.worldNumber}: ${world.titleBahasa} — ${world.status}`}
                >
                  {isCompleted ? (
                    <Star className="h-5 w-5 fill-white text-white" aria-hidden />
                  ) : (
                    <span
                      className={cn(
                        "font-display text-sm font-bold",
                        isActive ? "text-white" : "text-gray-400"
                      )}
                      aria-hidden
                    >
                      {world.worldNumber}
                    </span>
                  )}
                </motion.div>
                <span className={cn("text-center text-xs font-medium leading-tight", isActive || isCompleted ? "text-gray-700" : "text-gray-400")}>
                  {world.titleBahasa.split(" ")[0]}
                </span>
              </div>

              {/* Connector line */}
              {!isLast && (
                <div className="relative mx-1 h-1 flex-1 overflow-hidden rounded-full bg-gray-200">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-inquis-grass"
                    initial={{ width: 0 }}
                    animate={{ width: isCompleted ? "100%" : "0%" }}
                    transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary text */}
      <p className="mt-4 text-center text-sm text-gray-500">
        {completedWorlds === 0 && "Petualanganmu baru dimulai — ayo jelajahi Dunia 1! 🚀"}
        {completedWorlds === 1 && "Hebat! Kamu sudah menyelesaikan Dunia 1. Lanjutkan! 💪"}
        {completedWorlds === 2 && "Luar biasa! Sudah separuh perjalanan! ⭐"}
        {completedWorlds === 3 && "Hampir sampai! Satu dunia lagi! 🌟"}
        {completedWorlds === 4 && "Selamat! Kamu sudah menjelajahi semua dunia! 🎉🏆"}
      </p>
    </section>
  );
}
