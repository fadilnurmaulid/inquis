"use client";

/**
 * PredictChallenge — World 3's distinct interaction: after the child picks
 * their prediction, an animated "outcome" plays out during the existing
 * checking window (instead of an instant flip to correct/wrong), then the
 * feedback explicitly frames it as "your prediction" vs "what happened" —
 * giving Prediction Explorer a genuine observe → predict → watch → compare
 * rhythm instead of a plain multiple-choice flip.
 *
 * Design constraint: identical to SortingChallenge/MagnifyChallenge — this
 * only changes presentation around the moment of choosing. It calls the
 * exact same onSelect(optionId) callback, so correctness/scoring/
 * submission logic is completely untouched.
 */

import { motion, AnimatePresence } from "framer-motion";
import { EmojiAsset } from "@/components/shared/emoji-asset";
import { cn } from "@/lib/utils";
import type { ActivityDefinition } from "@/lib/activities/types";

interface PredictChallengeProps {
  options: ActivityDefinition["options"];
  correctOptionId: string;
  phase: "challenge" | "feedback";
  selectedId: string | null;
  isChecking: boolean;
  isCorrect: boolean | null;
  onSelect: (optionId: string) => void;
  allHaveIcons: boolean;
}

export function PredictChallenge({
  options,
  correctOptionId,
  phase,
  selectedId,
  isChecking,
  isCorrect,
  onSelect,
  allHaveIcons,
}: PredictChallengeProps) {
  const disabled = phase === "feedback" || isChecking;
  const selectedOption = options.find((o) => o.id === selectedId);
  const correctOption = options.find((o) => o.id === correctOptionId);

  return (
    <div className="space-y-4">
      {/* Outcome reveal — plays during the checking window, before feedback appears */}
      <AnimatePresence>
        {isChecking && selectedOption && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="flex items-center justify-center gap-3 rounded-2xl bg-sky-50 px-4 py-3">
              <span className="text-xs font-semibold text-sky-600">Prediksimu</span>
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              >
                <EmojiAsset emoji={selectedOption.emoji} textClassName="text-2xl" size={28} />
              </motion.div>
              <motion.span
                className="text-sky-400"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                aria-hidden
              >
                →
              </motion.span>
              <span className="text-xs text-sky-500">sedang terjadi...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comparison framing once the outcome is revealed */}
      <AnimatePresence>
        {phase === "feedback" && selectedOption && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 rounded-2xl bg-gray-50 px-4 py-2.5 text-sm"
          >
            <span className="flex items-center gap-1.5 text-gray-500">
              Prediksimu:
              <EmojiAsset emoji={selectedOption.emoji} textClassName="text-lg" size={20} />
            </span>
            {!isCorrect && correctOption && (
              <span className="flex items-center gap-1.5 font-semibold text-primary">
                Yang terjadi:
                <EmojiAsset emoji={correctOption.emoji} textClassName="text-lg" size={20} />
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={cn(
          "grid gap-3",
          options.length <= 3 ? "grid-cols-3" : "grid-cols-2"
        )}
      >
        {options.map((option, i) => {
          const isSelected = selectedId === option.id;
          const isAnswer = option.id === correctOptionId;
          const showResult = phase === "feedback" && isSelected;
          const showCorrectHint = phase === "feedback" && isAnswer && !isSelected;
          const isPending = isChecking && isSelected;

          return (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 220, damping: 20 }}
              whileTap={!disabled ? { scale: 0.94 } : {}}
              disabled={disabled}
              onClick={() => !disabled && onSelect(option.id)}
              className={cn(
                "flex min-h-[96px] flex-col items-center justify-center gap-2 rounded-full border-2 p-4 transition-colors",
                isPending && "border-primary/60 bg-primary/5 opacity-60",
                showResult && isCorrect && "border-green-400 bg-green-50 shadow-md",
                showResult && !isCorrect && "border-orange-300 bg-orange-50",
                showCorrectHint && "border-green-300 bg-green-50/60 animate-pulse",
                !showResult && !showCorrectHint && !isPending &&
                  "border-gray-200 bg-white hover:border-primary/50 hover:shadow-sm"
              )}
              aria-label={option.label ?? option.emoji}
              aria-pressed={isSelected}
            >
              <EmojiAsset
                emoji={option.emoji}
                textClassName="text-4xl"
                size={44}
                forceEmoji={!allHaveIcons}
              />
              {option.label && (
                <span className="text-xs font-semibold text-gray-600">
                  {option.label}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
