"use client";

/**
 * AchievementBadge — DASH-008
 * Milestone display for child progress. Visual, encouraging, earned vs. unearned.
 */

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import type { Achievement } from "@/lib/achievements";
export { ACHIEVEMENTS, computeAchievements } from "@/lib/achievements";

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: "sm" | "md";
  showDescription?: boolean;
}

export function AchievementBadge({
  achievement,
  size = "md",
  showDescription = false,
}: AchievementBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={cn(
        "flex flex-col items-center gap-1.5 rounded-2xl border-2 p-3 text-center transition-all",
        achievement.earned
          ? "border-primary/30 bg-gradient-to-b from-primary/10 to-primary/5 shadow-sm"
          : "border-gray-200 bg-gray-50 opacity-40 grayscale"
      )}
      title={achievement.description}
      aria-label={`${achievement.title}${achievement.earned ? ", diraih!" : ", belum diraih"}`}
    >
      <span
        className={cn(
          size === "sm" ? "text-2xl" : "text-3xl",
          achievement.earned && "animate-wiggle"
        )}
        aria-hidden
      >
        {achievement.emoji}
      </span>
      <span
        className={cn(
          "font-display font-bold text-gray-800",
          size === "sm" ? "text-[10px] leading-tight" : "text-xs"
        )}
      >
        {achievement.title}
      </span>
      {showDescription && (
        <span className="text-[10px] text-gray-500 leading-tight">
          {achievement.description}
        </span>
      )}
    </motion.div>
  );
}

interface AchievementRowProps {
  achievements: Achievement[];
}

export function AchievementRow({ achievements }: AchievementRowProps) {
  const earned = achievements.filter((a) => a.earned);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      aria-label="Pencapaianmu"
      className="rounded-3xl bg-white/60 p-4 shadow-sm backdrop-blur-sm"
    >
      <h2 className="mb-3 font-display text-lg font-bold text-gray-800">
        🏅 Pencapaian
      </h2>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {achievements.map((a) => (
          <AchievementBadge key={a.id} achievement={a} size="sm" />
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-gray-500">
        {earned.length > 0 ? (
          <>
            {earned.length}/{achievements.length} pencapaian diraih ·{" "}
            <span className="font-semibold text-primary">Terus semangat! 💪</span>
          </>
        ) : (
          <>Selesaikan aktivitas pertamamu untuk meraih pencapaian pertama! 🌱</>
        )}
      </p>
    </motion.section>
  );
}
