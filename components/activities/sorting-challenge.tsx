"use client";

/**
 * SortingChallenge — World 2's distinct interaction: drag items into a
 * category bin instead of tapping a card. This gives Sorting Explorer a
 * genuinely different feel (organizing) from the other worlds' tap-based
 * challenges, matching the brief's "World 2 should feel like organizing."
 *
 * Design constraint: this component only decides HOW the child produces an
 * answer. It calls the exact same onSelect(optionId) callback that the
 * tap-based challenge grid uses in ActivityPlayer — so correctness checking,
 * scoring, and submission are completely untouched. If drag interaction
 * ever needs to be disabled, ActivityPlayer can fall back to the standard
 * tap grid with zero data changes required.
 */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { RecycleBinIcon } from "@/components/illustrations/nature-icons";
import { EmojiAsset } from "@/components/shared/emoji-asset";
import { cn } from "@/lib/utils";
import type { ActivityDefinition } from "@/lib/activities/types";

interface SortingChallengeProps {
  options: ActivityDefinition["options"];
  correctOptionId: string;
  phase: "challenge" | "feedback";
  selectedId: string | null;
  isChecking: boolean;
  isCorrect: boolean | null;
  onSelect: (optionId: string) => void;
  allHaveIcons: boolean;
}

export function SortingChallenge({
  options,
  correctOptionId,
  phase,
  selectedId,
  isChecking,
  isCorrect,
  onSelect,
  allHaveIcons,
}: SortingChallengeProps) {
  const [isOverBin, setIsOverBin] = useState(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const binRef = useRef<HTMLDivElement>(null);
  const hasSubmittedRef = useRef(false);
  const disabled = phase === "feedback" || isChecking;

  /** Guards against a drop and a subsequent synthetic click both firing onSelect. */
  function submitOnce(optionId: string) {
    if (hasSubmittedRef.current || disabled) return;
    hasSubmittedRef.current = true;
    onSelect(optionId);
  }

  useEffect(() => {
    if (selectedId === null) {
      hasSubmittedRef.current = false;
    }
  }, [selectedId]);

  /** True when the pointer's current viewport position is over the bin. */
  function isPointOverBin(clientX: number, clientY: number): boolean {
    const bin = binRef.current;
    if (!bin) return false;
    const rect = bin.getBoundingClientRect();
    return (
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom
    );
  }

  return (
    <div className="space-y-6">
      {/* Drop target */}
      <motion.div
        ref={binRef}
        animate={
          isOverBin
            ? { scale: 1.05 }
            : isChecking
            ? { scale: [1, 1.03, 1] }
            : { scale: 1 }
        }
        transition={isChecking ? { duration: 0.45, repeat: Infinity } : { type: "spring", stiffness: 300 }}
        className={cn(
          "mx-auto flex h-32 w-32 flex-col items-center justify-center gap-1 rounded-3xl border-4 border-dashed transition-colors",
          isOverBin
            ? "border-primary bg-primary/10"
            : phase === "feedback" && isCorrect
            ? "border-green-400 bg-green-50"
            : phase === "feedback" && isCorrect === false
            ? "border-orange-300 bg-orange-50"
            : "border-gray-300 bg-gray-50"
        )}
      >
        <RecycleBinIcon size={40} />
        <span className="text-[11px] font-semibold text-gray-500">
          Tarik ke sini
        </span>
      </motion.div>

      {/* Draggable items */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {options.map((option) => {
          const isAnswer = option.id === correctOptionId;
          const isSelected = selectedId === option.id;
          const showResult = phase === "feedback" && isSelected;
          const showCorrectHint = phase === "feedback" && isAnswer && !isSelected;
          const isThisDragging = draggingId === option.id;

          return (
            <motion.div
              key={option.id}
              drag={!disabled}
              dragSnapToOrigin
              dragElastic={0.15}
              dragMomentum={false}
              whileDrag={{ scale: 1.12, zIndex: 10 }}
              onDragStart={() => setDraggingId(option.id)}
              onDrag={(_event, info) => {
                setIsOverBin(isPointOverBin(info.point.x, info.point.y));
              }}
              onDragEnd={(_event, info) => {
                setDraggingId(null);
                const droppedOnBin = isPointOverBin(info.point.x, info.point.y);
                setIsOverBin(false);
                if (droppedOnBin) {
                  submitOnce(option.id);
                }
              }}
              whileTap={!disabled ? { scale: 0.95 } : {}}
              onClick={() => {
                // Tap fallback: some children (and all non-pointer /
                // accessibility contexts) may tap instead of drag — both
                // paths lead to the same onSelect call, guarded against
                // double-firing if a synthetic click follows a drag-drop.
                if (!isThisDragging) submitOnce(option.id);
              }}
              className={cn(
                "flex min-h-[96px] w-24 cursor-grab flex-col items-center justify-center gap-1.5 rounded-2xl border-2 bg-white p-3 shadow-sm active:cursor-grabbing",
                showResult && isCorrect && "border-green-400 bg-green-50 shadow-md",
                showResult && !isCorrect && "border-orange-300 bg-orange-50",
                showCorrectHint && "border-green-300 bg-green-50/60 animate-pulse",
                !showResult && !showCorrectHint && "border-gray-200 hover:border-primary/50 hover:shadow-md"
              )}
              role="button"
              tabIndex={disabled ? -1 : 0}
              aria-label={`${option.label ?? option.emoji}, tarik ke tempat sampah atau ketuk untuk memilih`}
              aria-pressed={isSelected}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && !disabled) {
                  e.preventDefault();
                  submitOnce(option.id);
                }
              }}
            >
              <EmojiAsset
                emoji={option.emoji}
                textClassName="text-3xl"
                size={36}
                forceEmoji={!allHaveIcons}
              />
              {option.label && (
                <span className="text-center text-[11px] font-semibold leading-tight text-gray-600">
                  {option.label}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>

      <p className="text-center text-xs text-gray-400">
        Tarik salah satu ke tempat sampah, atau ketuk untuk memilih
      </p>
    </div>
  );
}
