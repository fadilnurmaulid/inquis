"use client";

/**
 * ActivityPlayer — full inquiry cycle:
 * intro → explore → challenge → feedback → reflection → complete
 *
 * Implements: FR-W1-001 through FR-W1-007, LR-001 through LR-005
 * Never punishes wrong answers (P2). Always encourages (LR-003).
 */

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, ArrowRight, Star, Trophy, CheckCircle } from "lucide-react";
import type { ActivityDefinition, ActivityPhase } from "@/lib/activities/types";
import { CompanionCharacter } from "./companion-character";
import { WorldAtmosphere } from "./world-atmosphere";
import { getWorldVisualIdentity } from "@/lib/activities/world-visual-identity";
import { EmojiAsset } from "@/components/shared/emoji-asset";
import { hasNatureIconFor } from "@/components/illustrations/nature-icons";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { submitActivityCompletion } from "@/lib/services/activity-actions";
import { WORLDS } from "@/types";

interface ActivityPlayerProps {
  definition: ActivityDefinition;
  sessionId: string;
  childId: string;
  themeColor: string;
  companionName: string;
  companionEmoji?: string;
  alreadyCompleted?: boolean;
}

const PHASE_PROGRESS: Record<ActivityPhase, number> = {
  intro: 10,
  explore: 30,
  challenge: 55,
  feedback: 72,
  reflection: 88,
  complete: 100,
};

const PHASE_LABELS: Record<ActivityPhase, string> = {
  intro: "Kenalan",
  explore: "Jelajah",
  challenge: "Tantangan",
  feedback: "Hasil",
  reflection: "Renungkan",
  complete: "Selesai!",
};

// Success message per world, connects the correct-answer moment back to the
// environmental character theme instead of generic praise.
const SUCCESS_MESSAGE: Record<string, string> = {
  "world-1": "🎉 Hebat! Kamu jago mengamati alam sekitar!",
  "world-2": "🎉 Keren! Kamu tahu cara menjaga bumi lewat memilah!",
  "world-3": "🎉 Tepat! Prediksimu membantu memahami alam!",
  "world-4": "🎉 Luar biasa! Kamu berpikir dan bertindak seperti ilmuwan cilik yang peduli bumi!",
};

export function ActivityPlayer({
  definition,
  sessionId,
  childId,
  themeColor,
  companionName,
  companionEmoji,
  alreadyCompleted = false,
}: ActivityPlayerProps) {
  const router = useRouter();
  const [phase, setPhase] = useState<ActivityPhase>(
    alreadyCompleted ? "complete" : "intro"
  );
  const [exploredIds, setExploredIds] = useState<Set<string>>(new Set());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [hintIndex, setHintIndex] = useState(-1);
  const [reflectionId, setReflectionId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [worldCompleted, setWorldCompleted] = useState(false);
  const [companionMood, setCompanionMood] = useState<
    "idle" | "happy" | "thinking" | "celebrate"
  >("idle");
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const worldDef = WORLDS.find((w) => w.id === definition.worldId);
  const visualIdentity = getWorldVisualIdentity(definition.worldId);

  // Companion message per phase
  const companionMessage = (() => {
    switch (phase) {
      case "intro":
        return definition.companionIntro;
      case "explore":
        return exploredIds.size < definition.exploreItems.length
          ? definition.explorePrompt
          : "Bagus! Kamu sudah menjelajahi semuanya. Siap untuk tantangan? 👀";
      case "challenge":
        return isChecking
          ? "Yuk kita lihat... 🔍"
          : hintIndex >= 0
          ? definition.hints[hintIndex]
          : definition.instruction;
      case "feedback":
        return isCorrect
          ? "Hebat sekali! 🌟 Kamu berhasil menemukan jawabannya!"
          : "Hmm, ayo kita amati lagi bersama. Kamu pasti bisa! 🔍";
      case "reflection":
        return definition.reflectionQuestion;
      case "complete":
        return worldCompleted
          ? "Kamu menyelesaikan seluruh dunia ini! Luar biasa! 🏆"
          : definition.companionEncourage;
      default:
        return "";
    }
  })();

  const handleExploreTap = useCallback((id: string) => {
    setExploredIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    setCompanionMood("happy");
    setTimeout(() => setCompanionMood("idle"), 1200);
  }, []);

  const handleChallengeSelect = useCallback(
    (optionId: string) => {
      if (phase !== "challenge") return;
      setSelectedId(optionId);
      setIsChecking(true);
      setCompanionMood("thinking");
      window.setTimeout(() => {
        const correct = optionId === definition.correctOptionId;
        setIsCorrect(correct);
        setCompanionMood(correct ? "celebrate" : "thinking");
        setIsChecking(false);
        setPhase("feedback");
      }, 450);
    },
    [phase, definition.correctOptionId]
  );

  const handleHint = useCallback(() => {
    if (hintsUsed >= 3) return;
    const next = hintsUsed;
    setHintsUsed((h) => h + 1);
    setHintIndex(next);
    setCompanionMood("thinking");
  }, [hintsUsed]);

  const handleReflectionSubmit = useCallback(async () => {
    if (!reflectionId || isSubmitting) return;
    setIsSubmitting(true);
    setSaveError(null);

    const reflection = definition.reflectionOptions.find(
      (r) => r.id === reflectionId
    );

    const result = await submitActivityCompletion({
      sessionId,
      childId,
      hintsUsed,
      reflectionResponse: reflection?.label ?? reflectionId,
      worldId: definition.worldId,
      worldNumber: definition.worldNumber,
      activityNumber: definition.activityNumber,
      primarySkill: definition.primarySkill,
    });

    setIsSubmitting(false);

    if (result.success) {
      setWorldCompleted(result.worldCompleted ?? false);
      setCompanionMood("celebrate");
      setPhase("complete");
    } else {
      setSaveError(result.error ?? "Gagal menyimpan. Coba lagi.");
    }
  }, [reflectionId, isSubmitting, sessionId, childId, hintsUsed, definition]);

  const challengeOptions = definition.options.filter(
    (o, i, arr) => arr.findIndex((x) => x.id === o.id) === i
  );

  const exploreMinRequired = Math.min(2, definition.exploreItems.length);
  const canProceedFromExplore = exploredIds.size >= exploreMinRequired;

  // Distinct companion reaction the moment the explore threshold is first
  // reached — a small milestone beat, separate from the per-tap "happy"
  // blip, so unlocking "Lanjut ke Tantangan" feels like an accomplishment.
  const hasCelebratedExploreRef = useRef(false);
  useEffect(() => {
    if (canProceedFromExplore && !hasCelebratedExploreRef.current && phase === "explore") {
      hasCelebratedExploreRef.current = true;
      setCompanionMood("celebrate");
      const t = window.setTimeout(() => setCompanionMood("idle"), 1400);
      return () => window.clearTimeout(t);
    }
  }, [canProceedFromExplore, phase]);

  // Only use SVG nature-icon illustrations when every item in a given grid
  // has a matching icon — mixing icons and emoji glyphs in the same grid
  // looks visually inconsistent, so we fall back to emoji for the whole
  // group otherwise.
  const exploreItemsAllHaveIcons = definition.exploreItems.every((i) =>
    hasNatureIconFor(i.emoji)
  );
  const challengeOptionsAllHaveIcons = challengeOptions.every((o) =>
    hasNatureIconFor(o.emoji)
  );

  return (
    <div className="mx-auto max-w-lg px-4 pb-28 pt-4 lg:max-w-5xl lg:px-8">
      <WorldAtmosphere worldId={definition.worldId} />
      <div className="flex min-h-[calc(100vh-6rem)] flex-col gap-4 lg:grid lg:grid-cols-[300px_1fr] lg:items-start lg:gap-8">
        {/* Sidebar (desktop): progress + companion, stacked column on mobile */}
        <div className="space-y-4 lg:sticky lg:top-8 lg:space-y-5">
          {/* Progress header */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium text-gray-500">
              <span className="font-semibold text-gray-700">{worldDef?.titleBahasa}</span>
              <span>Aktivitas {definition.activityNumber}/{worldDef?.activityCount ?? 5}</span>
            </div>
            <Progress value={PHASE_PROGRESS[phase]} className="h-2.5 rounded-full" />
            {/* Phase stepper */}
            <div className="flex justify-between lg:flex-col lg:items-start lg:gap-1.5 lg:pt-1">
              {(["explore", "challenge", "reflection", "complete"] as ActivityPhase[]).map(
                (p) => (
                  <div
                    key={p}
                    className={cn(
                      "text-[10px] font-semibold transition-colors lg:flex lg:items-center lg:gap-2 lg:text-xs",
                      PHASE_PROGRESS[phase] >= PHASE_PROGRESS[p]
                        ? "text-primary"
                        : "text-gray-300"
                    )}
                  >
                    <span
                      className="hidden h-1.5 w-1.5 rounded-full bg-current lg:inline-block"
                      aria-hidden
                    />
                    {PHASE_LABELS[p]}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Companion */}
          <CompanionCharacter
            name={companionName}
            message={companionMessage}
            themeColor={themeColor}
            mood={companionMood}
            emoji={companionEmoji}
            avatarRadius={visualIdentity.cardRadius === "rounded-full" ? "rounded-full" : visualIdentity.cardRadius}
          />
        </div>

        {/* Phase content (main column on desktop) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="flex flex-1 flex-col gap-4 lg:min-h-[calc(100vh-10rem)]"
          >
            {/* ── INTRO ── */}
            {phase === "intro" && (
              <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: visualIdentity.springStiffness, damping: 20 }}
                className={cn(
                  "flex h-28 w-28 items-center justify-center text-5xl shadow-2xl",
                  visualIdentity.cardRadius
                )}
                style={{ background: `linear-gradient(135deg, ${themeColor}dd, ${themeColor}88)` }}
              >
                <EmojiAsset emoji={companionEmoji ?? "🔬"} textClassName="text-5xl" size={72} />
              </motion.div>
              <div className="space-y-2">
                <h1 className="font-display text-2xl font-bold text-gray-800">
                  {definition.title}
                </h1>
                <p className="text-gray-500">{definition.instruction}</p>
              </div>
              <Button
                variant="childPrimary"
                size="lg"
                onClick={() => {
                  setPhase("explore");
                  setCompanionMood("idle");
                }}
                className="w-full max-w-xs"
              >
                Mulai Jelajah! 🚀
              </Button>
            </div>
          )}

          {/* ── EXPLORE ── */}
          {phase === "explore" && (
            <div className="space-y-4">
              <p className="text-center font-display text-lg font-bold text-gray-800">
                {definition.explorePrompt}
              </p>
              <div
                className={cn(
                  "grid gap-3",
                  visualIdentity.exploreLayout === "flow" &&
                    "grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4",
                  visualIdentity.exploreLayout === "grid" &&
                    "grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4",
                  visualIdentity.exploreLayout === "focus" &&
                    "grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5"
                )}
              >
                {definition.exploreItems.map((item, i) => {
                  const explored = exploredIds.has(item.id);
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        delay: i * visualIdentity.staggerDelay,
                        type: "spring",
                        stiffness: visualIdentity.springStiffness,
                        damping: 20,
                      }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleExploreTap(item.id)}
                      className={cn(
                        "relative flex min-h-[88px] flex-col items-center justify-center gap-2 border-2 p-4 transition-colors",
                        visualIdentity.exploreLayout === "focus" ? "min-h-[76px] p-3" : "min-h-[88px] p-4",
                        visualIdentity.cardRadius,
                        explored
                          ? "border-primary bg-primary/10 shadow-md"
                          : "border-gray-200 bg-white hover:border-primary/50 hover:shadow-sm"
                      )}
                      aria-label={`${explored ? "Sudah dijelajahi: " : "Jelajahi: "}${item.label || item.emoji}`}
                      aria-pressed={explored}
                    >
                      <EmojiAsset
                        emoji={item.emoji}
                        textClassName="text-4xl"
                        size={44}
                        forceEmoji={!exploreItemsAllHaveIcons}
                      />
                      {item.label && (
                        <span className="text-xs font-semibold text-gray-600">
                          {item.label}
                        </span>
                      )}
                      <AnimatePresence>
                        {explored && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm"
                          >
                            <CheckCircle
                              className="h-4 w-4 text-primary"
                              aria-hidden
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  );
                })}
              </div>

              {/* Explore progress hint */}
              {!canProceedFromExplore && (
                <p className="text-center text-sm text-gray-400">
                  Ketuk {exploreMinRequired - exploredIds.size} benda lagi untuk melanjutkan
                </p>
              )}

              <AnimatePresence>
                {canProceedFromExplore && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 280, damping: 20 }}
                  >
                    <Button
                      variant="childPrimary"
                      size="lg"
                      onClick={() => setPhase("challenge")}
                      className="w-full"
                    >
                      Lanjut ke Tantangan <ArrowRight className="h-5 w-5" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* ── CHALLENGE + FEEDBACK ── */}
          {(phase === "challenge" || phase === "feedback") && (
            <div className="space-y-4">
              <p className="text-center font-display text-lg font-bold text-gray-800">
                {definition.challengePrompt}
              </p>

              <div
                className={cn(
                  "grid gap-3",
                  challengeOptions.length <= 3 ? "grid-cols-3" : "grid-cols-2"
                )}
              >
                {challengeOptions.map((option, i) => {
                  const isSelected = selectedId === option.id;
                  const isAnswer = option.id === definition.correctOptionId;
                  const showResult = phase === "feedback" && isSelected;
                  const showCorrectHint =
                    phase === "feedback" && isAnswer && !isSelected;
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
                          ? {
                              delay: i * visualIdentity.staggerDelay,
                              type: "spring",
                              stiffness: visualIdentity.springStiffness,
                              damping: 20,
                            }
                          : isPending
                          ? { duration: 0.45, repeat: Infinity }
                          : { duration: 0.4 }
                      }
                      whileTap={phase === "challenge" && !isChecking ? { scale: 0.9 } : {}}
                      disabled={phase === "feedback" || isChecking}
                      onClick={() => handleChallengeSelect(option.id)}
                      className={cn(
                        "flex min-h-[96px] flex-col items-center justify-center gap-2 border-2 p-4 transition-colors",
                        visualIdentity.cardRadius === "rounded-full" ? "rounded-[1.5rem]" : visualIdentity.cardRadius,
                        phase === "challenge" && !isChecking &&
                          "border-gray-200 bg-white hover:border-primary hover:shadow-md active:scale-95",
                        isPending && "border-primary/60 bg-primary/5",
                        showResult && isCorrect &&
                          "border-green-400 bg-green-50 shadow-md",
                        showResult && !isCorrect &&
                          "border-orange-300 bg-orange-50",
                        showCorrectHint &&
                          "border-green-300 bg-green-50/60 animate-pulse"
                      )}
                      aria-label={option.label ?? option.emoji}
                      aria-pressed={isSelected}
                    >
                      <EmojiAsset
                        emoji={option.emoji}
                        textClassName="text-4xl"
                        size={44}
                        forceEmoji={!challengeOptionsAllHaveIcons}
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

              {/* Hint button */}
              {phase === "challenge" && !isChecking && hintsUsed < 3 && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleHint}
                  className="w-full border-2 border-dashed"
                >
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                  Butuh Petunjuk ({3 - hintsUsed} tersisa)
                </Button>
              )}

              {/* Feedback: correct */}
              {phase === "feedback" && isCorrect && (
                <div className="relative space-y-3">
                  {/* Confetti burst — brief, purposeful, only on success */}
                  <div className="pointer-events-none absolute inset-x-0 -top-2 flex justify-center overflow-visible">
                    {["🌿", "✨", "🌟", "💚", "🍃"].map((piece, i) => (
                      <motion.span
                        key={i}
                        className="absolute text-xl"
                        initial={{ opacity: 1, x: 0, y: 0, scale: 0.6 }}
                        animate={{
                          opacity: 0,
                          x: (i - 2) * 26,
                          y: -46 - i * 4,
                          scale: 1,
                          rotate: (i - 2) * 40,
                        }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.03 }}
                        aria-hidden
                      >
                        {piece}
                      </motion.span>
                    ))}
                  </div>
                  <motion.div
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                    className="rounded-2xl bg-green-50 p-4 text-center"
                  >
                    <p className="text-lg font-bold text-green-700">
                      {SUCCESS_MESSAGE[definition.worldId] ?? "🎉 Luar biasa! Kamu berhasil!"}
                    </p>
                    <p className="text-sm text-green-600">
                      Kamu menggunakan {hintsUsed === 0 ? "kemampuanmu sendiri" : `${hintsUsed} petunjuk`}
                    </p>
                  </motion.div>
                  <Button
                    variant="childPrimary"
                    size="lg"
                    onClick={() => {
                      setPhase("reflection");
                      setCompanionMood("happy");
                    }}
                    className="w-full"
                  >
                    Lanjut Refleksi ✨
                  </Button>
                </div>
              )}

              {/* Feedback: incorrect — encouraging, never punitive */}
              {phase === "feedback" && !isCorrect && (
                <div className="space-y-3">
                  <motion.div
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                    className="rounded-2xl bg-amber-50 p-4 text-center"
                  >
                    <p className="text-base font-bold text-amber-700">
                      🔍 Hmm, coba amati lagi ya!
                    </p>
                    <p className="text-sm text-amber-600">
                      Kamu boleh mencoba lagi, ilmuwan selalu mencoba berkali-kali!
                    </p>
                  </motion.div>
                  <Button
                    variant="childPrimary"
                    size="lg"
                    onClick={() => {
                      setSelectedId(null);
                      setIsCorrect(null);
                      setPhase("challenge");
                      setCompanionMood("idle");
                    }}
                    className="w-full"
                  >
                    Coba Lagi 🔄
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* ── REFLECTION ── */}
          {phase === "reflection" && (
            <div className="space-y-4">
              <p className="text-center font-display text-lg font-bold text-gray-800">
                {definition.reflectionQuestion}
              </p>
              <p className="text-center text-sm text-gray-500">
                Tidak ada jawaban salah, ini tentang apa yang kamu rasakan!
              </p>
              <div className="space-y-2">
                {definition.reflectionOptions.map((opt, i) => (
                  <motion.button
                    key={opt.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * visualIdentity.staggerDelay, type: "spring", stiffness: visualIdentity.springStiffness, damping: 22 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setReflectionId(opt.id)}
                    className={cn(
                      "flex w-full min-h-[56px] items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-colors",
                      reflectionId === opt.id
                        ? "border-primary bg-primary/10 shadow-sm"
                        : "border-gray-200 bg-white hover:border-primary/50 hover:shadow-sm"
                    )}
                    aria-pressed={reflectionId === opt.id}
                  >
                    <EmojiAsset emoji={opt.emoji} textClassName="text-2xl" size={28} />
                    <span className="font-semibold text-gray-800">{opt.label}</span>
                  </motion.button>
                ))}
              </div>

              {saveError && (
                <div className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert">
                  {saveError}{" "}
                  <button
                    onClick={handleReflectionSubmit}
                    className="font-semibold underline min-h-0 min-w-0"
                  >
                    Coba lagi
                  </button>
                </div>
              )}

              <Button
                variant="childPrimary"
                size="lg"
                disabled={!reflectionId || isSubmitting}
                onClick={handleReflectionSubmit}
                className="w-full"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin">⏳</span>
                    Menyimpan kemajuanmu...
                  </>
                ) : (
                  "Selesai! 🎉"
                )}
              </Button>
            </div>
          )}

          {/* ── COMPLETE ── */}
          {phase === "complete" && (
            <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                {worldCompleted ? (
                  <Trophy
                    className="mx-auto h-24 w-24 text-yellow-500"
                    aria-hidden
                  />
                ) : (
                  <div className="text-7xl">🎉</div>
                )}
              </motion.div>

              <div className="space-y-2">
                <h2 className="font-display text-2xl font-bold text-gray-800">
                  {worldCompleted
                    ? `${worldDef?.titleBahasa ?? "Dunia"} Selesai!`
                    : alreadyCompleted
                    ? "Aktivitas Ini Sudah Kamu Selesaikan"
                    : "Aktivitas Selesai!"}
                </h2>
                <p className="text-gray-500">
                  {worldCompleted
                    ? "Kamu menyelesaikan semua aktivitas dan belajar cara nyata menjaga bumi! Dunia berikutnya sudah terbuka 🚀"
                    : alreadyCompleted
                    ? "Mau mengingat lagi apa yang kamu pelajari? Kamu bisa main lagi kapan saja untuk berlatih 🌟"
                    : "Kerja bagus! Setiap langkah kecilmu membantu menjaga alam tetap sehat 🌍"}
                </p>

                {definition.ecoReflection && (
                  <div className="mx-auto mt-3 max-w-xs rounded-2xl bg-emerald-50 px-4 py-3 text-left">
                    <p className="text-xs font-bold text-emerald-700">🌱 Tahukah Kamu?</p>
                    <p className="mt-1 text-sm leading-relaxed text-emerald-800">
                      {definition.ecoReflection}
                    </p>
                  </div>
                )}

                {/* Stars */}
                <div className="flex justify-center gap-1 pt-2">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.15, type: "spring" }}
                    >
                      <Star className="h-7 w-7 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex w-full max-w-xs flex-col gap-3">
                {alreadyCompleted && (
                  <Button
                    variant="childPrimary"
                    size="lg"
                    onClick={() =>
                      router.push(`/play/activity/${definition.activityId}?replay=1`)
                    }
                  >
                    🔄 Main Lagi
                  </Button>
                )}
                {definition.activityNumber < (worldDef?.activityCount ?? 5) ? (
                  <Button
                    variant={alreadyCompleted ? "outline" : "childPrimary"}
                    size="lg"
                    onClick={() =>
                      router.push(
                        `/play/activity/activity-${definition.worldNumber}-${definition.activityNumber + 1}`
                      )
                    }
                  >
                    Aktivitas Berikutnya →
                  </Button>
                ) : (
                  <Button
                    variant={alreadyCompleted ? "outline" : "childPrimary"}
                    size="lg"
                    onClick={() =>
                      router.push(`/play/world/${definition.worldId}`)
                    }
                  >
                    {worldCompleted ? "Lihat Pencapaian 🏆" : "Kembali ke Dunia"}
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => router.push("/play/home")}
                >
                  🗺️ Ke Peta Dunia
                </Button>
              </div>
            </div>
          )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
