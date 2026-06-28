"use client";

/**
 * WorldIntro — skippable world introduction (FR-W1-001).
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface WorldIntroProps {
  worldNumber: number;
  titleBahasa: string;
  description: string;
  companionName: string;
  themeColor: string;
  primarySkill: string;
}

export function WorldIntro({
  worldNumber,
  titleBahasa,
  description,
  companionName,
  themeColor,
  primarySkill,
}: WorldIntroProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="mx-4 mb-4 rounded-3xl border bg-white/90 p-5 shadow-sm"
        style={{ borderColor: `${themeColor}44` }}
      >
        <div className="flex items-start gap-4">
          <div
            className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl font-display text-xl font-bold text-white shadow-md"
            style={{ background: themeColor }}
          >
            {worldNumber}
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              {companionName} menemanimu
            </p>
            <h2 className="font-display text-lg font-bold text-gray-800">{titleBahasa}</h2>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              Fokus: <strong>{primarySkill}</strong> — amati, jelajahi, dan temukan polanya!
            </p>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button variant="childPrimary" size="sm" onClick={() => setDismissed(true)}>
            Mulai! 🚀
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setDismissed(true)}>
            Lewati
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
