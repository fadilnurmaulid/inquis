/**
 * ContinueCard — DASH-006
 * Shows the most recent in-progress activity or next recommended activity.
 * Primary CTA on the child dashboard (FR-DASH-006).
 */

"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WORLDS } from "@/types";
import type { ActivitySummary } from "@/lib/services/dashboard.service";

interface ContinueCardProps {
  activeSession: ActivitySummary | null;
  nextRecommended: ActivitySummary | null;
}

export function ContinueCard({ activeSession, nextRecommended }: ContinueCardProps) {
  const router = useRouter();
  const session = activeSession ?? nextRecommended;

  if (!session) {
    // Edge case: all activities completed
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gradient-to-r from-inquis-grass to-emerald-400 p-5 text-white shadow-lg"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl" aria-hidden>🏆</span>
          <div>
            <p className="font-display text-lg font-bold">Semua Selesai!</p>
            <p className="text-sm text-white/90">Kamu sudah menjelajahi semua dunia belajar.</p>
          </div>
        </div>
      </motion.div>
    );
  }

  const worldDef = WORLDS.find((w) => w.id === session.worldId);
  const isResume = activeSession !== null;

  function handleClick() {
    if (!session) return;
    router.push(`/play/activity/${session.activityId}`);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="rounded-3xl p-5 shadow-lg"
      style={{
        background: worldDef
          ? `linear-gradient(135deg, ${worldDef.themeColor}ee, ${worldDef.themeColor}99)`
          : "linear-gradient(135deg, #60B8FF, #3b82f6)",
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white/20">
            {isResume ? (
              <Play className="h-6 w-6 fill-white text-white" aria-hidden />
            ) : (
              <Sparkles className="h-6 w-6 text-white" aria-hidden />
            )}
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-white/80">
              {isResume ? "Lanjutkan" : "Aktivitas Berikutnya"}
            </p>
            <p className="font-display text-base font-bold text-white">
              {worldDef?.titleBahasa ?? "Dunia Belajar"}
            </p>
            <p className="text-sm text-white/90">
              Aktivitas {session.activityNumber} dari {worldDef?.activityCount ?? 5}
            </p>
          </div>
        </div>

        {/* CTA Button — preferred touch target 56px */}
        <Button
          onClick={handleClick}
          size="lg"
          className="h-14 min-w-[56px] flex-shrink-0 rounded-2xl bg-white px-5 font-bold text-gray-800
                     shadow-md hover:bg-white/90 active:scale-95"
          aria-label={isResume ? `Lanjutkan aktivitas ${session.activityNumber}` : `Mulai aktivitas ${session.activityNumber}`}
        >
          <ArrowRight className="h-5 w-5" aria-hidden />
        </Button>
      </div>
    </motion.div>
  );
}
