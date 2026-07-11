"use client";

/**
 * ActivityPlayer — full inquiry cycle:
 * intro → explore → challenge → feedback → reflection → complete
 *
 * Implements: FR-W1-001 through FR-W1-007, LR-001 through LR-005
 * Never punishes wrong answers (P2). Always encourages (LR-003).
 */

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, ArrowRight, Star, Trophy, CheckCircle } from "lucide-react";
import type { ActivityDefinition, ActivityPhase } from "@/lib/activities/types";
import { CompanionCharacter } from "./companion-character";
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

  const worldDef = WORLDS.find((w) => w.id === definition.worldId);

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
        return hintIndex >= 0
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
      const correct = optionId === definition.correctOptionId;
      setIsCorrect(correct);
      setCompanionMood(correct ? "celebrate" : "thinking");
      setPhase("feedback");
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

  return (
    <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-lg flex-col gap-4 px-4 pb-28 pt-4">
      {/* Progress header */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-medium text-gray-500">
          <span className="font-semibold text-gray-700">{worldDef?.titleBahasa}</span>
          <span>Aktivitas {definition.activityNumber}/{worldDef?.activityCount ?? 5}</span>
        </div>
        <Progress value={PHASE_PROGRESS[phase]} className="h-2.5 rounded-full" />
        {/* Phase stepper */}
        <div className="flex justify-between">
          {(["explore", "challenge", "reflection", "complete"] as ActivityPhase[]).map(
            (p) => (
              <div
                key={p}
                className={cn(
                  "text-[10px] font-semibold transition-colors",
                  PHASE_PROGRESS[phase] >= PHASE_PROGRESS[p]
                    ? "text-primary"
                    : "text-gray-300"
                )}
              >
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
      />

      {/* Phase content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="flex flex-1 flex-col gap-4"
        >
          {/* ── INTRO ── */}
          {phase === "intro" && (
            <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                className="flex h-28 w-28 items-center justify-center rounded-3xl text-5xl shadow-2xl"
                style={{ background: `linear-gradient(135deg, ${themeColor}dd, ${themeColor}88)` }}
              >
                🔬
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
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {definition.exploreItems.map((item) => {
                  const explored = exploredIds.has(item.id);
                  return (
                    <motion.button
                      key={item.id}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleExploreTap(item.id)}
                      className={cn(
                        "flex min-h-[88px] flex-col items-center justify-center gap-2 rounded-2xl border-2 p-4 transition-all",
                        explored
                          ? "border-primary bg-primary/10 shadow-md"
                          : "border-gray-200 bg-white hover:border-primary/50 hover:shadow-sm"
                      )}
                      aria-label={`${explored ? "Sudah dijelajahi: " : "Jelajahi: "}${item.label || item.emoji}`}
                      aria-pressed={explored}
                    >
                      <span
                        className={
                          item.visualScale === "lg"
                            ? "text-6xl"
                            : item.visualScale === "sm"
                              ? "text-2xl"
                              : "text-4xl"
                        }
                      >
                        {item.emoji}
                      </span>
                      {item.label && (
                        <span className="text-xs font-semibold text-gray-600">
                          {item.label}
                        </span>
                      )}
                      {explored && (
                        <CheckCircle
                          className="h-4 w-4 text-primary"
                          aria-hidden
                        />
                      )}
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

              {canProceedFromExplore && (
                <Button
                  variant="childPrimary"
                  size="lg"
                  onClick={() => setPhase("challenge")}
                  className="w-full"
                >
                  Lanjut ke Tantangan <ArrowRight className="h-5 w-5" />
                </Button>
              )}
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
                {challengeOptions.map((option) => {
                  const isSelected = selectedId === option.id;
                  const isAnswer = option.id === definition.correctOptionId;
                  const showResult = phase === "feedback" && isSelected;
                  const showCorrectHint =
                    phase === "feedback" && isAnswer && !isSelected;

                  return (
                    <motion.button
                      key={option.id}
                      whileTap={phase === "challenge" ? { scale: 0.9 } : {}}
                      animate={
                        showResult && isCorrect
                          ? { scale: [1, 1.08, 1] }
                          : {}
                      }
                      disabled={phase === "feedback"}
                      onClick={() => handleChallengeSelect(option.id)}
                      className={cn(
                        "flex min-h-[96px] flex-col items-center justify-center gap-2 rounded-2xl border-2 p-4 transition-all",
                        phase === "challenge" &&
                          "border-gray-200 bg-white hover:border-primary hover:shadow-md active:scale-95",
                        showResult && isCorrect &&
                          "border-green-400 bg-green-50 shadow-md",
                        showResult && !isCorrect &&
                          "border-orange-300 bg-orange-50",
                        showCorrectHint &&
                          "border-green-300 bg-green-50/60"
                      )}
                      aria-label={option.label ?? option.emoji}
                      aria-pressed={isSelected}
                    >
                      <span
                        className={
                          option.visualScale === "lg"
                            ? "text-6xl"
                            : option.visualScale === "sm"
                              ? "text-2xl"
                              : "text-4xl"
                        }
                      >
                        {option.emoji}
                      </span>
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
              {phase === "challenge" && hintsUsed < 3 && (
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
                <div className="space-y-3">
                  <div className="rounded-2xl bg-green-50 p-4 text-center">
                    <p className="text-lg font-bold text-green-700">
                      🎉 Luar biasa! Kamu berhasil!
                    </p>
                    <p className="text-sm text-green-600">
                      Kamu menggunakan {hintsUsed === 0 ? "kemampuanmu sendiri" : `${hintsUsed} petunjuk`}
                    </p>
                  </div>
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
                  <div className="rounded-2xl bg-amber-50 p-4 text-center">
                    <p className="text-base font-bold text-amber-700">
                      🔍 Hmm, coba amati lagi ya!
                    </p>
                    <p className="text-sm text-amber-600">
                      {definition.hints[0]}
                    </p>
                    <p className="mt-1 text-xs text-amber-500">
                      Ilmuwan selalu mencoba berkali-kali, kamu pasti bisa!
                    </p>
                  </div>
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
                {definition.reflectionOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setReflectionId(opt.id)}
                    className={cn(
                      "flex w-full min-h-[56px] items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-all",
                      reflectionId === opt.id
                        ? "border-primary bg-primary/10 shadow-sm"
                        : "border-gray-200 bg-white hover:border-primary/50 hover:shadow-sm"
                    )}
                    aria-pressed={reflectionId === opt.id}
                  >
                    <span className="text-2xl" aria-hidden>{opt.emoji}</span>
                    <span className="font-semibold text-gray-800">{opt.label}</span>
                  </button>
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
                    : "Aktivitas Selesai!"}
                </h2>
                <p className="text-gray-500">
                  {worldCompleted
                    ? "Kamu menyelesaikan semua aktivitas! Dunia berikutnya sudah terbuka! 🚀"
                    : "Kerja bagus! Kamu sedang berkembang menjadi ilmuwan kecil! 🔬"}
                </p>

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
                {definition.activityNumber < (worldDef?.activityCount ?? 5) ? (
                  <Button
                    variant="childPrimary"
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
                    variant="childPrimary"
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
  );
}
