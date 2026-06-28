/**
 * AchievementBadge — DASH-008
 * Displays earned milestones for child progress.
 */

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface Achievement {
  id: string;
  emoji: string;
  title: string;
  description: string;
  earned: boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first-step", emoji: "🌱", title: "Langkah Pertama", description: "Mulai aktivitas pertama", earned: false },
  { id: "world-1", emoji: "🔵", title: "Penjelajah Pola", description: "Selesaikan Dunia 1", earned: false },
  { id: "world-2", emoji: "🟢", title: "Penjelajah Pengurutan", description: "Selesaikan Dunia 2", earned: false },
  { id: "world-3", emoji: "🟡", title: "Penjelajah Prediksi", description: "Selesaikan Dunia 3", earned: false },
  { id: "world-4", emoji: "🟣", title: "Ilmuwan Kecil", description: "Selesaikan semua dunia", earned: false },
  { id: "independent", emoji: "⭐", title: "Pemikir Mandiri", description: "Selesai tanpa petunjuk", earned: false },
];

export function computeAchievements(data: {
  totalCompletedActivities: number;
  completedWorlds: number;
  totalWorlds: number;
}): Achievement[] {
  return ACHIEVEMENTS.map((a) => {
    let earned = false;
    switch (a.id) {
      case "first-step":
        earned = data.totalCompletedActivities >= 1;
        break;
      case "world-1":
        earned = data.completedWorlds >= 1;
        break;
      case "world-2":
        earned = data.completedWorlds >= 2;
        break;
      case "world-3":
        earned = data.completedWorlds >= 3;
        break;
      case "world-4":
        earned = data.completedWorlds >= data.totalWorlds;
        break;
      case "independent":
        earned = data.totalCompletedActivities >= 3;
        break;
    }
    return { ...a, earned };
  });
}

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: "sm" | "md";
}

export function AchievementBadge({ achievement, size = "md" }: AchievementBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "flex flex-col items-center gap-1 rounded-2xl border p-3 text-center transition-all",
        achievement.earned
          ? "border-primary/30 bg-primary/5 shadow-sm"
          : "border-gray-200 bg-gray-50 opacity-50 grayscale"
      )}
      title={achievement.description}
      aria-label={`${achievement.title}${achievement.earned ? " — diraih" : " — belum diraih"}`}
    >
      <span className={cn(size === "sm" ? "text-2xl" : "text-3xl")} aria-hidden>
        {achievement.emoji}
      </span>
      <span className={cn("font-display font-bold text-gray-800", size === "sm" ? "text-[10px]" : "text-xs")}>
        {achievement.title}
      </span>
    </motion.div>
  );
}

interface AchievementRowProps {
  achievements: Achievement[];
}

export function AchievementRow({ achievements }: AchievementRowProps) {
  const earned = achievements.filter((a) => a.earned);
  if (earned.length === 0) return null;

  return (
    <section aria-label="Pencapaian" className="rounded-3xl bg-white/60 p-4 shadow-sm">
      <h2 className="mb-3 font-display text-lg font-bold text-gray-800">🏅 Pencapaian</h2>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {achievements.map((a) => (
          <AchievementBadge key={a.id} achievement={a} size="sm" />
        ))}
      </div>
    </section>
  );
}
