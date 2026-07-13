"use client";

/**
 * ProgressJourney — DASH-007
 * Visual learning path: shows completed, current, and future milestones.
 * Avoids raw numbers; uses companion emojis and path nodes.
 */

import { motion } from "framer-motion";
import { Star, Lock } from "lucide-react";
import { EmojiAsset } from "@/components/shared/emoji-asset";
import { cn } from "@/lib/utils";
import type { WorldProgressSummary } from "@/lib/services/dashboard.service";

const COMPANION_EMOJI: Record<string, string> = {
  "world-1": "🦋",
  "world-2": "🐢",
  "world-3": "🔮",
  "world-4": "🧪",
};

// Short, distinct labels for the compact journey nodes (avoids collapsing to
// the same word when titles share a common first word, e.g. "Penjelajah").
const SHORT_LABEL: Record<string, string> = {
  "world-1": "Pola",
  "world-2": "Pilah",
  "world-3": "Prediksi",
  "world-4": "Ilmuwan",
};

interface ProgressJourneyProps {
  worlds: WorldProgressSummary[];
  totalCompletedActivities: number;
}

export function ProgressJourney({ worlds, totalCompletedActivities }: ProgressJourneyProps) {
  const completedWorlds = worlds.filter((w) => w.status === "COMPLETED").length;
  const totalActivities = worlds.reduce((sum, w) => sum + w.totalActivities, 0);

  const SUMMARY_MESSAGES = [
    "Petualanganmu baru dimulai, ayo jelajahi Dunia 1! 🚀",
    "Hebat! Kamu menyelesaikan Dunia 1. Lanjutkan ke Dunia 2! 💪",
    "Luar biasa! Sudah separuh perjalanan! ⭐",
    "Hampir sampai! Satu dunia lagi! 🌟",
    "Selamat! Kamu sudah menjelajahi semua dunia! 🎉🏆",
  ];

  return (
    <section
      aria-label="Perjalanan Belajarmu"
      className="rounded-3xl bg-white/60 p-5 shadow-sm backdrop-blur-sm"
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-gray-800">
          ✨ Perjalananmu
        </h2>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
          {totalCompletedActivities}/{totalActivities}
        </span>
      </div>

      {/* World nodes connected by a path */}
      <div className="flex items-center">
        {worlds.map((world, index) => {
          const isCompleted = world.status === "COMPLETED";
          const isActive =
            world.status === "IN_PROGRESS" || world.status === "UNLOCKED";
          const isLocked = world.status === "LOCKED";
          const isLast = index === worlds.length - 1;
          const companionEmoji = COMPANION_EMOJI[world.worldId] ?? "🌟";

          return (
            <div key={world.worldId} className="flex flex-1 items-center">
              {/* Node */}
              <div className="flex flex-col items-center gap-1.5">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: index * 0.12,
                    type: "spring",
                    stiffness: 280,
                    damping: 20,
                  }}
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full border-2 shadow-sm",
                    isCompleted &&
                      "border-inquis-grass bg-inquis-grass shadow-inquis-grass/30",
                    isActive &&
                      "border-primary bg-primary shadow-primary/30 shadow-md",
                    isLocked && "border-gray-200 bg-gray-100"
                  )}
                  style={
                    isActive
                      ? { boxShadow: `0 4px 12px ${world.themeColor}66` }
                      : isCompleted
                      ? { boxShadow: "0 4px 12px #4ECB7166" }
                      : {}
                  }
                  aria-label={`${world.titleBahasa}: ${
                    isCompleted ? "selesai" : isLocked ? "terkunci" : "sedang berlangsung"
                  }`}
                >
                  {isCompleted ? (
                    <Star
                      className="h-5 w-5 fill-white text-white"
                      aria-hidden
                    />
                  ) : isLocked ? (
                    <Lock className="h-4 w-4 text-gray-300" aria-hidden />
                  ) : (
                    <EmojiAsset emoji={companionEmoji} textClassName="text-xl" size={24} />
                  )}
                </motion.div>
                <span
                  className={cn(
                    "text-center text-[10px] font-semibold leading-tight",
                    isActive || isCompleted ? "text-gray-700" : "text-gray-400"
                  )}
                >
                  {SHORT_LABEL[world.worldId] ?? world.titleBahasa.split(" ")[0]}
                </span>
              </div>

              {/* Connector line */}
              {!isLast && (
                <div className="relative mx-1 h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-inquis-grass"
                    initial={{ width: 0 }}
                    animate={{ width: isCompleted ? "100%" : "0%" }}
                    transition={{ duration: 0.5, delay: index * 0.12 + 0.3 }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <p className="mt-4 text-center text-sm text-gray-500">
        {SUMMARY_MESSAGES[Math.min(completedWorlds, SUMMARY_MESSAGES.length - 1)]}
      </p>
    </section>
  );
}
