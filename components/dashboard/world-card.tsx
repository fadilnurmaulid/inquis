"use client";

/**
 * WorldCard — DASH-004
 * Displays a single learning world with title, status, progress, and lock state.
 * Follows ui-guidelines.md: icon-based, large touch targets, immediate feedback.
 */

import { motion } from "framer-motion";
import { Lock, CheckCircle, Play, Star, Trophy, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WorldProgressSummary } from "@/lib/services/dashboard.service";

interface WorldCardProps {
  world: WorldProgressSummary;
  onClick?: () => void;
  isRecommended?: boolean;
}

const STATUS_CONFIG: Record<
  string,
  {
    label: string;
    icon: React.ElementType;
    badgeClass: string;
  }
> = {
  LOCKED: {
    label: "Terkunci",
    icon: Lock,
    badgeClass: "bg-gray-200/80 text-gray-500",
  },
  UNLOCKED: {
    label: "Siap Dimulai",
    icon: Sparkles,
    badgeClass: "bg-white/80 text-gray-700",
  },
  IN_PROGRESS: {
    label: "Sedang Belajar",
    icon: Play,
    badgeClass: "bg-white/80 text-gray-700",
  },
  COMPLETED: {
    label: "Selesai! 🎉",
    icon: CheckCircle,
    badgeClass: "bg-white/80 text-green-700",
  },
  MASTERED: {
    label: "Dikuasai! 🏆",
    icon: Trophy,
    badgeClass: "bg-yellow-100/90 text-yellow-700",
  },
};

// World emoji illustrations (future: replace with proper SVG illustrations)
const WORLD_EMOJI: Record<string, string> = {
  "world-1": "🦋",
  "world-2": "🐢",
  "world-3": "🔮",
  "world-4": "🧪",
};

export function WorldCard({ world, onClick, isRecommended }: WorldCardProps) {
  const config = STATUS_CONFIG[world.status] ?? STATUS_CONFIG.UNLOCKED;
  const StatusIcon = config.icon;
  const isLocked = world.status === "LOCKED";
  const isCompleted = world.status === "COMPLETED";
  const progressPercent =
    world.totalActivities > 0
      ? Math.round(
          (world.completedActivities / world.totalActivities) * 100
        )
      : 0;
  const worldEmoji = WORLD_EMOJI[world.worldId] ?? "🌟";

  return (
    <motion.button
      onClick={isLocked ? undefined : onClick}
      disabled={isLocked}
      whileTap={isLocked ? {} : { scale: 0.96 }}
      whileHover={isLocked ? {} : { scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={cn(
        "relative w-full rounded-3xl p-5 text-left shadow-lg transition-shadow",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60",
        isLocked && "cursor-not-allowed opacity-60",
        !isLocked && "hover:shadow-xl active:shadow-md",
        isRecommended && !isLocked && "ring-4 ring-white shadow-2xl"
      )}
      style={{
        background: isLocked
          ? "linear-gradient(135deg, #e5e7eb, #d1d5db)"
          : `linear-gradient(135deg, ${world.themeColor}ee, ${world.themeColor}88)`,
      }}
      aria-label={`${world.titleBahasa}: ${config.label}`}
      aria-disabled={isLocked}
    >
      {/* Recommended pulse ring */}
      {isRecommended && !isLocked && (
        <span
          className="absolute -inset-1 animate-pulse-ring rounded-3xl bg-white/25"
          aria-hidden
        />
      )}

      {/* Top row: world number + status badge */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* World number */}
          <span
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/25 font-display text-lg font-bold text-white"
            aria-hidden
          >
            {world.worldNumber}
          </span>
          {/* World companion emoji */}
          <span className="text-2xl" aria-hidden>
            {worldEmoji}
          </span>
        </div>

        {/* Status badge */}
        <span
          className={cn(
            "flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold",
            config.badgeClass
          )}
        >
          <StatusIcon className="h-3.5 w-3.5" aria-hidden />
          {config.label}
        </span>
      </div>

      {/* World title */}
      <h3
        className={cn(
          "font-display text-xl font-bold leading-tight",
          isLocked ? "text-gray-500" : "text-white"
        )}
      >
        {world.titleBahasa}
      </h3>
      <p
        className={cn(
          "mt-0.5 text-sm",
          isLocked ? "text-gray-400" : "text-white/80"
        )}
      >
        {world.title}
      </p>

      {/* Companion name */}
      {!isLocked && (
        <p className="mt-1 text-xs font-semibold text-white/70">
          Bersama {world.companionName}
        </p>
      )}

      {/* Progress bar */}
      {!isLocked && (
        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-xs text-white/80">
              {world.completedActivities}/{world.totalActivities} aktivitas
            </span>
            {isCompleted && (
              <div className="flex gap-0.5" aria-label="Semua bintang diraih">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-yellow-300 text-yellow-300"
                    aria-hidden
                  />
                ))}
              </div>
            )}
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/25">
            <motion.div
              className="h-full rounded-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            />
          </div>
        </div>
      )}

      {/* Lock overlay */}
      {isLocked && (
        <div className="mt-3 flex items-center gap-1.5 text-gray-400">
          <Lock className="h-4 w-4" aria-hidden />
          <span className="text-sm">Selesaikan dunia sebelumnya dulu</span>
        </div>
      )}
    </motion.button>
  );
}
