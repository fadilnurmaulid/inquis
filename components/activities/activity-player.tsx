"use client";

/**
 * ActivityPlayer — full inquiry cycle: intro → explore → challenge → feedback → reflection → complete.
 */

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, ArrowRight, Star, Trophy } from "lucide-react";
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
  alreadyCompleted?: boolean;
}

const PHASE_PROGRESS: Record<ActivityPhase, number> = {
  intro: 10,
  explore: 25,
  challenge: 50,
  feedback: 70,
  reflection: 85,
  complete: 100,
};

export function ActivityPlayer({
  definition,
  sessionId,
  childId,
  themeColor,
  companionName,
  alreadyCompleted = false,
}: ActivityPlayerProps) {
  const router = useRouter();
  const [phase, setPhase] = useState<ActivityPhase>(alreadyCompleted ? "complete" : "intro");
  const [exploredIds, setExploredIds] = useState<Set<string>>(new Set());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [hintIndex, setHintIndex] = useState(-1);
  const [reflectionId, setReflectionId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [worldCompleted, setWorldCompleted] = useState(false);
  const [companionMood, setCompanionMood] = useState<"idle" | "happy" | "thinking" | "celebrate">("idle");

  const worldDef = WORLDS.find((w) => w.id === definition.worldId);

  const companionMessage = (() => {
    switch (phase) {
      case "intro":
        return definition.companionIntro;
      case "explore":
        return exploredIds.size < definition.exploreItems.length
          ? definition.explorePrompt
          : "Bagus! Sekarang coba tantangannya! 👀";
      case "challenge":
        return hintIndex >= 0 ? definition.hints[hintIndex] : definition.instruction;
      case "feedback":
        return isCorrect ? "Hebat sekali! 🌟" : "Coba lagi ya, kamu pasti bisa!";
      case "reflection":
        return definition.reflectionQuestion;
      case "complete":
        return worldCompleted
          ? "Kamu menyelesaikan seluruh dunia! 🏆"
          : definition.companionEncourage;
      default:
        return "";
    }
  })();

  const handleExploreTap = useCallback((id: string) => {
    setExploredIds((prev) => new Set(prev).add(id));
    setCompanionMood("happy");
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
    const reflection = definition.reflectionOptions.find((r) => r.id === reflectionId);

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
    }
  }, [reflectionId, isSubmitting, sessionId, childId, hintsUsed, definition]);

  const challengeOptions = definition.options.filter(
    (o, i, arr) => arr.findIndex((x) => x.id === o.id) === i
  );

  return (
    <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-lg flex-col gap-4 px-4 pb-28 pt-4">
      {/* Progress bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-gray-500">
          <span>{worldDef?.titleBahasa}</span>
          <span>Aktivitas {definition.activityNumber}/5</span>
        </div>
        <Progress value={PHASE_PROGRESS[phase]} className="h-2" />
      </div>

      <CompanionCharacter
        name={companionName}
        message={companionMessage}
        themeColor={themeColor}
        mood={companionMood}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="flex flex-1 flex-col gap-4"
        >
          {phase === "intro" && (
            <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
              <div
                className="flex h-24 w-24 items-center justify-center rounded-3xl text-5xl shadow-xl"
                style={{ background: themeColor }}
              >
                🔬
              </div>
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

          {phase === "explore" && (
            <div className="space-y-4">
              <p className="text-center font-display text-lg font-bold text-gray-800">
                {definition.explorePrompt}
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {definition.exploreItems.map((item) => (
                  <motion.button
                    key={item.id}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => handleExploreTap(item.id)}
                    className={cn(
                      "flex min-h-[88px] flex-col items-center justify-center gap-1 rounded-2xl border-2 p-4 transition-all",
                      exploredIds.has(item.id)
                        ? "border-primary bg-primary/10 shadow-md"
                        : "border-gray-200 bg-white hover:border-primary/50"
                    )}
                    aria-label={item.label || item.emoji}
                  >
                    <span className="text-4xl">{item.emoji}</span>
                    {item.label && (
                      <span className="text-xs font-medium text-gray-600">{item.label}</span>
                    )}
                  </motion.button>
                ))}
              </div>
              {exploredIds.size >= Math.min(2, definition.exploreItems.length) && (
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
                  const showResult = phase === "feedback" && isSelected;
                  const isAnswer = option.id === definition.correctOptionId;

                  return (
                    <motion.button
                      key={option.id}
                      whileTap={phase === "challenge" ? { scale: 0.92 } : {}}
                      disabled={phase === "feedback"}
                      onClick={() => handleChallengeSelect(option.id)}
                      className={cn(
                        "flex min-h-[96px] flex-col items-center justify-center gap-1 rounded-2xl border-2 p-4 transition-all",
                        phase === "challenge" && "border-gray-200 bg-white hover:border-primary active:scale-95",
                        showResult && isCorrect && "border-green-400 bg-green-50",
                        showResult && !isCorrect && "border-orange-300 bg-orange-50",
                        phase === "feedback" && isAnswer && !isSelected && "border-green-300 bg-green-50/50"
                      )}
                      aria-label={option.label ?? option.emoji}
                    >
                      <span className="text-4xl">{option.emoji}</span>
                      {option.label && (
                        <span className="text-xs font-medium">{option.label}</span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {phase === "challenge" && hintsUsed < 3 && (
                <Button variant="outline" size="lg" onClick={handleHint} className="w-full">
                  <Lightbulb className="h-4 w-4" />
                  Butuh Petunjuk ({3 - hintsUsed} tersisa)
                </Button>
              )}

              {phase === "feedback" && isCorrect && (
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
              )}

              {phase === "feedback" && !isCorrect && (
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
              )}
            </div>
          )}

          {phase === "reflection" && (
            <div className="space-y-4">
              <p className="text-center font-display text-lg font-bold text-gray-800">
                {definition.reflectionQuestion}
              </p>
              <div className="space-y-2">
                {definition.reflectionOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setReflectionId(opt.id)}
                    className={cn(
                      "flex w-full min-h-[56px] items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-all",
                      reflectionId === opt.id
                        ? "border-primary bg-primary/10"
                        : "border-gray-200 bg-white hover:border-primary/50"
                    )}
                  >
                    <span className="text-2xl">{opt.emoji}</span>
                    <span className="font-medium text-gray-800">{opt.label}</span>
                  </button>
                ))}
              </div>
              <Button
                variant="childPrimary"
                size="lg"
                disabled={!reflectionId || isSubmitting}
                onClick={handleReflectionSubmit}
                className="w-full"
              >
                {isSubmitting ? "Menyimpan..." : "Selesai! 🎉"}
              </Button>
            </div>
          )}

          {phase === "complete" && (
            <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260 }}
                className="text-6xl"
              >
                {worldCompleted ? <Trophy className="mx-auto h-20 w-20 text-yellow-500" /> : "🎉"}
              </motion.div>
              <div className="space-y-2">
                <h2 className="font-display text-2xl font-bold text-gray-800">
                  {worldCompleted ? "Dunia Selesai!" : "Aktivitas Selesai!"}
                </h2>
                <p className="text-gray-500">
                  {worldCompleted
                    ? `Kamu menyelesaikan ${worldDef?.titleBahasa}! Dunia berikutnya terbuka!`
                    : "Kamu hebat! Lanjut ke aktivitas berikutnya?"}
                </p>
                <div className="flex justify-center gap-1 pt-2">
                  {[1, 2, 3].map((i) => (
                    <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <div className="flex w-full max-w-xs flex-col gap-3">
                {definition.activityNumber < 5 ? (
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
                    onClick={() => router.push(`/play/world/${definition.worldId}`)}
                  >
                    Kembali ke Dunia
                  </Button>
                )}
                <Button variant="outline" size="lg" onClick={() => router.push("/play/home")}>
                  Ke Peta Dunia
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
