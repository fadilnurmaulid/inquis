"use client";

/**
 * CompanionCharacter — friendly guide for child activities.
 */

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CompanionCharacterProps {
  name: string;
  message: string;
  themeColor: string;
  mood?: "idle" | "happy" | "thinking" | "celebrate";
  className?: string;
}

const MOOD_EMOJI = {
  idle: "🦉",
  happy: "😊",
  thinking: "🤔",
  celebrate: "🎉",
};

export function CompanionCharacter({
  name,
  message,
  themeColor,
  mood = "idle",
  className,
}: CompanionCharacterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex items-start gap-3 rounded-2xl bg-white/80 p-4 shadow-sm", className)}
      aria-live="polite"
    >
      <div
        className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl text-2xl shadow-sm"
        style={{ background: `linear-gradient(135deg, ${themeColor}cc, ${themeColor}66)` }}
        aria-hidden
      >
        {MOOD_EMOJI[mood]}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-display text-sm font-bold text-gray-800">{name}</p>
        <p className="text-sm leading-relaxed text-gray-600">{message}</p>
      </div>
    </motion.div>
  );
}
