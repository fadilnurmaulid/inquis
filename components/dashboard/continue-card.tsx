"use client";

/**
 * ContinueCard — DASH-006
 * Primary CTA on the child dashboard.
 * Shows in-progress or next recommended activity.
 */

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Play, Sparkles, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WORLDS } from "@/types";
import type { ActivitySummary } from "@/lib/services/dashboard.service";

interface ContinueCardProps {
  activeSession: ActivitySummary | null;
  nextRecommended: ActivitySummary | null;
}

export function ContinueCard({
  activeSession,
  nextRecommended,
}: ContinueCardProps) {
  const router = useRouter();
  const session = activeSession ?? nextRecommended;

  // Edge case: all worlds completed
  if (!session) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gradient-to-r from-inquis-grass to-emerald-400 p-5 text-white shadow-xl"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white/20">
            <Trophy className="h-7 w-7 text-white" aria-hidden />
          </div>
          <div>
            <p className="font-display text-lg font-bold">
              Semua Dunia Selesai! 🏆
            </p>
            <p className="text-sm text-white/90">
              Kamu telah menjelajahi semua dunia belajar, luar biasa!
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  const worldDef = WORLDS.find((w) => w.id === session.worldId);
  const isResume = activeSession !== null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="overflow-hidden rounded-3xl shadow-xl"
      style={{
        background: worldDef
          ? `linear-gradient(135deg, ${worldDef.themeColor}ee, ${worldDef.themeColor}99)`
          : "linear-gradient(135deg, #60B8FF, #3b82f6)",
      }}
    >
      <div className="flex items-center justify-between gap-3 p-5">
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white/20">
            {isResume ? (
              <Play className="h-7 w-7 fill-white text-white" aria-hidden />
            ) : (
              <Sparkles className="h-7 w-7 text-white" aria-hidden />
            )}
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-white/75">
              {isResume ? "Lanjutkan" : "Aktivitas Berikutnya"}
            </p>
            <p className="font-display text-base font-bold text-white">
              {worldDef?.titleBahasa ?? "Dunia Belajar"}
            </p>
            <p className="text-sm text-white/90">
              Aktivitas {session.activityNumber} dari{" "}
              {worldDef?.activityCount ?? 5}
            </p>
          </div>
        </div>

        {/* CTA */}
        <Button
          onClick={() => router.push(`/play/activity/${session.activityId}`)}
          size="lg"
          className="h-14 min-w-[56px] flex-shrink-0 rounded-2xl bg-white px-5 font-bold text-gray-800
                     shadow-md hover:bg-white/90 active:scale-95"
          aria-label={
            isResume
              ? `Lanjutkan aktivitas ${session.activityNumber}`
              : `Mulai aktivitas ${session.activityNumber}`
          }
        >
          <ArrowRight className="h-5 w-5" aria-hidden />
        </Button>
      </div>

      {/* Activity progress strip */}
      <div className="flex gap-1.5 px-5 pb-4">
        {Array.from({ length: worldDef?.activityCount ?? 5 }).map((_, i) => (
          <div
            key={i}
            className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/25"
          >
            <div
              className="h-full rounded-full bg-white transition-all duration-500"
              style={{
                width:
                  i < (session.activityNumber - 1)
                    ? "100%"
                    : i === session.activityNumber - 1 && isResume
                    ? "50%"
                    : "0%",
              }}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
