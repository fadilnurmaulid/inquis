"use client";

/**
 * CompanionCharacter — animated friendly guide for child activities.
 * Each world has a unique companion with mood-responsive feedback.
 */

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface CompanionCharacterProps {
  name: string;
  message: string;
  themeColor: string;
  mood?: "idle" | "happy" | "thinking" | "celebrate";
  emoji?: string;
  className?: string;
}

const MOOD_EMOJI: Record<string, string> = {
  idle: "🦉",
  happy: "😊",
  thinking: "🤔",
  celebrate: "🎉",
};

const MOOD_BG: Record<string, string> = {
  idle: "",
  happy: "bg-green-50 border-green-200",
  thinking: "bg-amber-50 border-amber-200",
  celebrate: "bg-yellow-50 border-yellow-200",
};

export function CompanionCharacter({
  name,
  message,
  themeColor,
  mood = "idle",
  emoji,
  className,
}: CompanionCharacterProps) {
  const displayEmoji = emoji && mood === "idle" ? emoji : MOOD_EMOJI[mood];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={mood + message.slice(0, 10)}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex items-start gap-3 rounded-2xl border-2 bg-white/85 p-4 shadow-sm backdrop-blur-sm",
          "transition-colors duration-300",
          MOOD_BG[mood] || "border-gray-100",
          className
        )}
        aria-live="polite"
        aria-atomic="true"
      >
        {/* Avatar */}
        <motion.div
          animate={
            mood === "celebrate"
              ? { scale: [1, 1.2, 0.9, 1.15, 1], rotate: [0, -10, 10, -5, 0] }
              : mood === "happy"
              ? { scale: [1, 1.08, 1] }
              : mood === "thinking"
              ? { y: [0, -3, 0] }
              : { y: [0, -4, 0] }
          }
          transition={
            mood === "idle"
              ? { duration: 3, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.5 }
          }
          className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl text-3xl shadow-sm"
          style={{
            background: `linear-gradient(135deg, ${themeColor}cc, ${themeColor}66)`,
          }}
          aria-hidden
        >
          {displayEmoji}
        </motion.div>

        {/* Speech bubble */}
        <div className="min-w-0 flex-1">
          <p className="font-display text-sm font-bold text-gray-800">{name}</p>
          <p className="mt-0.5 text-sm leading-relaxed text-gray-600">{message}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
