/**
 * WorldCard — DASH-004
 * Displays a single learning world with title, status, progress, and lock state.
 * Follows ui-guidelines.md: icon-based, large touch targets, immediate feedback.
 */

"use client";

import { motion } from "framer-motion";
import { Lock, CheckCircle, Play, Star, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WorldProgressSummary } from "@/lib/services/dashboard.service";

interface WorldCardProps {
  world: WorldProgressSummary;
  onClick?: () => void;
  isRecommended?: boolean;
}

/**
 * STATUS_CONFIG covers all WorldStatus values including MASTERED (future expansion).
 * This prevents a runtime crash if the DB ever returns MASTERED for a world.
 */
const STATUS_CONFIG: Record<
  string,
  {
    label: string;
    icon: React.ElementType;
    cardClass: string;
    badgeClass: string;
  }
> = {
  LOCKED: {
    label: "Terkunci",
    icon: Lock,
    cardClass: "opacity-60 cursor-not-allowed",
    badgeClass: "bg-gray-200 text-gray-500",
  },
  UNLOCKED: {
    label: "Siap Dimulai",
    icon: Play,
    cardClass: "cursor-pointer hover:scale-105 active:scale-95",
    badgeClass: "bg-white/80 text-gray-700",
  },
  IN_PROGRESS: {
    label: "Sedang Belajar",
    icon: Play,
    cardClass: "cursor-pointer hover:scale-105 active:scale-95",
    badgeClass: "bg-white/80 text-gray-700",
  },
  COMPLETED: {
    label: "Selesai! 🎉",
    icon: CheckCircle,
    cardClass: "cursor-pointer hover:scale-105 active:scale-95",
    badgeClass: "bg-white/80 text-green-700",
  },
  // FR-DASH spec lists MASTERED as a future state — handled gracefully here
  MASTERED: {
    label: "Dikuasai! 🏆",
    icon: Trophy,
    cardClass: "cursor-pointer hover:scale-105 active:scale-95",
    badgeClass: "bg-yellow-100 text-yellow-700",
  },
};

export function WorldCard({ world, onClick, isRecommended }: WorldCardProps) {
  const config = STATUS_CONFIG[world.status] ?? STATUS_CONFIG.UNLOCKED;
  const StatusIcon = config.icon;
  const isLocked = world.status === "LOCKED";
  const progressPercent =
    world.totalActivities > 0
      ? Math.round((world.completedActivities / world.totalActivities) * 100)
      : 0;

  return (
    <motion.button
      onClick={isLocked ? undefined : onClick}
      disabled={isLocked}
      whileTap={isLocked ? {} : { scale: 0.95 }}
      whileHover={isLocked ? {} : { scale: 1.04 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn(
        // Base — meets 44px minimum touch target from ui-guidelines.md
        "relative w-full rounded-3xl p-5 text-left shadow-lg transition-shadow",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60",
        config.cardClass,
        isRecommended && !isLocked && "ring-4 ring-white shadow-2xl"
      )}
      style={{
        background: isLocked
          ? "linear-gradient(135deg, #e5e7eb, #d1d5db)"
          : `linear-gradient(135deg, ${world.themeColor}dd, ${world.themeColor}88)`,
      }}
      aria-label={`${world.titleBahasa} — ${config.label}`}
      aria-disabled={isLocked}
    >
      {/* Recommended pulse ring */}
      {isRecommended && !isLocked && (
        <span className="absolute -inset-1 animate-pulse-ring rounded-3xl bg-white/30" />
      )}

      {/* World number badge */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/30 text-lg font-bold text-white"
          aria-hidden
        >
          {world.worldNumber}
        </span>

        {/* Status badge */}
        <span
          className={cn(
            "flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
            config.badgeClass
          )}
        >
          <StatusIcon className="h-3.5 w-3.5" aria-hidden />
          {config.label}
        </span>
      </div>

      {/* World title */}
      <h3 className={cn("font-display text-xl font-bold leading-tight", isLocked ? "text-gray-500" : "text-white")}>
        {world.titleBahasa}
      </h3>
      <p className={cn("mt-0.5 text-sm", isLocked ? "text-gray-400" : "text-white/80")}>
        {world.title}
      </p>

      {/* Progress bar */}
      {!isLocked && (
        <div className="mt-4">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs text-white/80">
              {world.completedActivities}/{world.totalActivities} aktivitas
            </span>
            {world.status === "COMPLETED" && (
              <div className="flex gap-0.5" aria-label="Selesai semua bintang">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-yellow-300 text-yellow-300" />
                ))}
              </div>
            )}
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/30">
            <motion.div
              className="h-full rounded-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            />
          </div>
        </div>
      )}

      {/* Lock overlay icon */}
      {isLocked && (
        <div className="mt-3 flex items-center gap-1.5 text-gray-400">
          <Lock className="h-4 w-4" aria-hidden />
          <span className="text-sm">Selesaikan dunia sebelumnya dulu</span>
        </div>
      )}
    </motion.button>
  );
}
