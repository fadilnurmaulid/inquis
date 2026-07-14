"use client";

/**
 * MagnifyChallenge — World 1's distinct interaction for "spot the match /
 * spot the difference" activities (pick-one challengeType). The child must
 * tap each card to inspect it up close through a magnifying lens before it
 * becomes selectable — encouraging observation first, selection second,
 * matching "children should feel curious, not tested."
 *
 * Design constraint: same as SortingChallenge — this only decides HOW the
 * answer is produced. It calls the exact same onSelect(optionId) callback
 * used by the standard tap grid, so correctness/scoring/submission logic
 * is completely untouched.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { EmojiAsset } from "@/components/shared/emoji-asset";
import { cn } from "@/lib/utils";
import type { ActivityDefinition } from "@/lib/activities/types";

interface MagnifyChallengeProps {
  options: ActivityDefinition["options"];
  correctOptionId: string;
  phase: "challenge" | "feedback";
  selectedId: string | null;
  isChecking: boolean;
  isCorrect: boolean | null;
  onSelect: (optionId: string) => void;
  allHaveIcons: boolean;
}

export function MagnifyChallenge({
  options,
  correctOptionId,
  phase,
  selectedId,
  isChecking,
  isCorrect,
  onSelect,
  allHaveIcons,
}: MagnifyChallengeProps) {
  const [inspectedIds, setInspectedIds] = useState<Set<string>>(new Set());
  const disabled = phase === "feedback" || isChecking;

  function handleTap(optionId: string) {
    if (disabled) return;
    if (!inspectedIds.has(optionId)) {
      // First tap: inspect (reveal a closer look), don't answer yet.
      setInspectedIds((prev) => new Set(prev).add(optionId));
      return;
    }
    // Second tap on an already-inspected card: that's the answer.
    onSelect(optionId);
  }

  return (
    <div className="space-y-3">
      <p className="text-center text-xs text-gray-400">
        Ketuk untuk mengintip lebih dekat, ketuk lagi untuk memilih 🔍
      </p>
      <div
        className={cn(
          "grid gap-3",
          options.length <= 3 ? "grid-cols-3" : "grid-cols-2"
        )}
      >
        {options.map((option, i) => {
          const isInspected = inspectedIds.has(option.id);
          const isSelected = selectedId === option.id;
          const isAnswer = option.id === correctOptionId;
          const showResult = phase === "feedback" && isSelected;
          const showCorrectHint = phase === "feedback" && isAnswer && !isSelected;
          const isPending = isChecking && isSelected;

          return (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={
                showResult && isCorrect
                  ? { opacity: 1, scale: [1, 1.08, 1], y: 0 }
                  : showResult && !isCorrect
                  ? { opacity: 1, scale: 1, y: 0, x: [0, -6, 6, -4, 4, 0] }
                  : isPending
                  ? { opacity: 1, scale: [1, 1.05, 1], y: 0 }
                  : { opacity: 1, scale: 1, y: 0 }
              }
              transition={
                phase === "challenge" && !isChecking
                  ? { delay: i * 0.08, type: "spring", stiffness: 240, damping: 20 }
                  : isPending
                  ? { duration: 0.45, repeat: Infinity }
                  : { duration: 0.4 }
              }
              whileTap={!disabled ? { scale: 0.94 } : {}}
              disabled={disabled}
              onClick={() => handleTap(option.id)}
              className={cn(
                "relative flex min-h-[96px] flex-col items-center justify-center gap-2 rounded-[1.75rem] border-2 p-4 transition-colors",
                isInspected && !showResult && !showCorrectHint && "border-primary/40 bg-primary/5",
                !isInspected && !showResult && "border-gray-200 bg-white hover:border-primary/50 hover:shadow-sm",
                isPending && "border-primary/60 bg-primary/5",
                showResult && isCorrect && "border-green-400 bg-green-50 shadow-md",
                showResult && !isCorrect && "border-orange-300 bg-orange-50",
                showCorrectHint && "border-green-300 bg-green-50/60 animate-pulse"
              )}
              aria-label={
                isInspected
                  ? `${option.label ?? option.emoji}, sudah diintip, ketuk lagi untuk memilih`
                  : `${option.label ?? option.emoji}, ketuk untuk mengintip`
              }
              aria-pressed={isSelected}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isInspected ? "zoomed" : "normal"}
                  initial={{ scale: isInspected ? 0.7 : 1, opacity: isInspected ? 0 : 1 }}
                  animate={{ scale: isInspected ? 1.25 : 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <EmojiAsset
                    emoji={option.emoji}
                    textClassName="text-4xl"
                    size={44}
                    forceEmoji={!allHaveIcons}
                  />
                </motion.div>
              </AnimatePresence>
              {option.label && (
                <span className="text-xs font-semibold text-gray-600">
                  {option.label}
                </span>
              )}
              {!isInspected && !showResult && !showCorrectHint && (
                <div
                  className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm"
                  aria-hidden
                >
                  <Search className="h-3.5 w-3.5 text-gray-400" />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
