"use client";

/**
 * WorldIntro — FR-W1-001
 * Skippable world introduction shown only on first visit.
 * Child-friendly, character-led, encouraging.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface WorldIntroProps {
  worldNumber: number;
  titleBahasa: string;
  description: string;
  companionName: string;
  companionEmoji?: string;
  themeColor: string;
  primarySkill: string;
}

const SKILL_LABELS: Record<string, string> = {
  observe: "Mengamati",
  question: "Bertanya",
  predict: "Memprediksi",
  explore: "Menjelajahi",
  conclude: "Menyimpulkan",
};

const SKILL_EMOJIS: Record<string, string> = {
  observe: "👀",
  question: "❓",
  predict: "🔮",
  explore: "🔬",
  conclude: "💡",
};

export function WorldIntro({
  titleBahasa,
  description,
  companionName,
  companionEmoji = "🦉",
  themeColor,
  primarySkill,
}: WorldIntroProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -16, scale: 0.97 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="mx-4 mb-5 overflow-hidden rounded-3xl border-2 bg-white/90 shadow-md backdrop-blur-sm"
        style={{ borderColor: `${themeColor}55` }}
      >
        {/* Colored header strip */}
        <div
          className="px-5 py-4"
          style={{
            background: `linear-gradient(135deg, ${themeColor}33, ${themeColor}11)`,
          }}
        >
          <div className="flex items-center gap-3">
            {/* Companion */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl text-3xl shadow-md"
              style={{ background: themeColor }}
              aria-hidden
            >
              {companionEmoji}
            </motion.div>

            <div>
              <p
                className="text-xs font-bold uppercase tracking-wide"
                style={{ color: themeColor }}
              >
                {companionName} menemanimu!
              </p>
              <h2 className="font-display text-xl font-bold text-gray-800">
                {titleBahasa}
              </h2>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </div>
        </div>

        {/* Skill focus */}
        <div className="flex items-center gap-3 px-5 py-3">
          <div
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-lg"
            style={{ background: `${themeColor}22` }}
            aria-hidden
          >
            {SKILL_EMOJIS[primarySkill] ?? "🔬"}
          </div>
          <div>
            <p className="text-xs font-bold text-gray-600">Fokus belajar dunia ini:</p>
            <p className="text-sm font-bold" style={{ color: themeColor }}>
              {SKILL_EMOJIS[primarySkill]} {SKILL_LABELS[primarySkill] ?? primarySkill}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex gap-2 px-5 pb-4">
          <Button
            variant="childPrimary"
            size="sm"
            onClick={() => setDismissed(true)}
            className="flex-1"
          >
            Mulai! 🚀
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDismissed(true)}
            className="text-gray-400"
          >
            Lewati
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
