/**
 * World entry page — /play/world/[worldId]
 * Lists activities for a world with progress and lock status.
 */

import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Lock, Play, Sparkles } from "lucide-react";
import { requireRole } from "@/lib/services/auth.service";
import { prisma } from "@/lib/prisma";
import { WORLDS } from "@/types";
import { Button } from "@/components/ui/button";
import { ChildNav } from "@/components/dashboard/child-nav";
import { WorldIntro } from "@/components/world/world-intro";
import { EmojiAsset } from "@/components/shared/emoji-asset";
import { cn } from "@/lib/utils";
import { ActivityStatus } from "@/lib/db-enums";
import { getActivityDefinition } from "@/lib/activities/definitions";

interface PageProps {
  params: Promise<{ worldId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { worldId } = await params;
  const world = WORLDS.find((w) => w.id === worldId);
  return { title: world?.titleBahasa ?? "Dunia" };
}

type ActivityItemStatus = "locked" | "available" | "in_progress" | "completed";

function resolveActivityStatus(
  activityNumber: number,
  completedNumbers: Set<number>,
  inProgressNumber: number | null
): ActivityItemStatus {
  if (completedNumbers.has(activityNumber)) return "completed";
  if (inProgressNumber === activityNumber) return "in_progress";
  if (activityNumber === 1 || completedNumbers.has(activityNumber - 1))
    return "available";
  return "locked";
}

// World companion emojis
const COMPANION_EMOJI: Record<string, string> = {
  "world-1": "🦋",
  "world-2": "🐢",
  "world-3": "🔮",
  "world-4": "🧪",
};

export default async function WorldPage({ params }: PageProps) {
  const { worldId } = await params;
  const world = WORLDS.find((w) => w.id === worldId);
  if (!world) notFound();

  const user = await requireRole(["CHILD"]);

  const child = await prisma.child.findFirst({
    where: { user: { id: user.id } },
    select: { id: true },
  });
  if (!child) redirect("/play/home");

  const progress = await prisma.worldProgress.findUnique({
    where: { childId_worldId: { childId: child.id, worldId } },
    select: { status: true },
  });

  if (!progress || progress.status === "LOCKED") {
    redirect("/play/home");
  }

  const sessions = await prisma.activitySession.findMany({
    where: { childId: child.id, worldId, isFirstAttempt: true },
    select: { activityNumber: true, status: true },
    orderBy: { activityNumber: "asc" },
  });

  const completedNumbers = new Set<number>(
    sessions
      .filter((s: { activityNumber: number; status: string }) => s.status === ActivityStatus.COMPLETED)
      .map((s: { activityNumber: number; status: string }) => s.activityNumber)
  );
  const inProgress = sessions.find(
    (s: { activityNumber: number; status: string }) => s.status === ActivityStatus.IN_PROGRESS
  );
  const inProgressNumber = inProgress?.activityNumber ?? null;

  const activities = Array.from(
    { length: world.activityCount },
    (_, i) => {
      const activityNumber = i + 1;
      const activityId = `activity-${world.number}-${activityNumber}`;
      const status = resolveActivityStatus(
        activityNumber,
        completedNumbers,
        inProgressNumber
      );
      const activityName =
        getActivityDefinition(activityId)?.title ??
        `Aktivitas ${activityNumber}`;
      return { activityNumber, activityId, status, activityName };
    }
  );

  const completedCount = completedNumbers.size;
  const progressPercent = Math.round(
    (completedCount / world.activityCount) * 100
  );
  const companionEmoji = COMPANION_EMOJI[worldId] ?? "🦉";

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50/40 to-white pb-24">
        {/* World header */}
        <header
          className="px-4 pb-8 pt-10 text-center lg:px-8"
          style={{
            background: `linear-gradient(180deg, ${world.themeColor}44 0%, transparent 100%)`,
          }}
        >
          {/* Companion illustration */}
          <div
            className="mx-auto mb-3 flex h-24 w-24 items-center justify-center rounded-3xl shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${world.themeColor}ee, ${world.themeColor}88)`,
            }}
            aria-hidden
          >
            <EmojiAsset emoji={companionEmoji} textClassName="text-4xl" size={64} />
          </div>

          <h1 className="font-display text-2xl font-bold text-gray-800">
            {world.titleBahasa}
          </h1>
          <p className="mt-1 text-sm text-gray-500">{world.description}</p>
          <p className="mt-1.5 text-sm font-semibold text-gray-600">
            Temanmu:{" "}
            <span style={{ color: world.themeColor }} className="font-bold">
              {world.companionName} <EmojiAsset emoji={companionEmoji} textClassName="text-sm" size={16} className="inline-block align-[-2px]" />
            </span>
          </p>

          {/* Progress */}
          <div className="mx-auto mt-5 max-w-xs">
            <div className="mb-1.5 flex justify-between text-xs text-gray-500">
              <span>
                {completedCount}/{world.activityCount} aktivitas selesai
              </span>
              <span className="font-semibold">{progressPercent}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-gray-200/80">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${progressPercent}%`,
                  background: world.themeColor,
                }}
              />
            </div>
          </div>
        </header>

        {/* World intro (only for first visit) */}
        {completedCount === 0 && (
          <WorldIntro
            worldNumber={world.number}
            titleBahasa={world.titleBahasa}
            description={world.description}
            companionName={world.companionName}
            companionEmoji={companionEmoji}
            themeColor={world.themeColor}
            primarySkill={world.primarySkill}
          />
        )}

        {/* Activity list */}
        <section
          className="mx-auto max-w-lg space-y-3 px-4 lg:max-w-3xl lg:px-8"
          aria-label="Daftar aktivitas"
        >
          <h2 className="font-display text-lg font-bold text-gray-800">
            Aktivitas
          </h2>

          {activities.map((activity) => {
            const isLocked = activity.status === "locked";
            const isCompleted = activity.status === "completed";
            const isInProgress = activity.status === "in_progress";
            const isAvailable = activity.status === "available";

            const StatusIcon = isLocked
              ? Lock
              : isCompleted
              ? CheckCircle
              : isInProgress
              ? Play
              : Sparkles;

            const statusLabel = isLocked
              ? "Terkunci"
              : isCompleted
              ? "Selesai ✅"
              : isInProgress
              ? "Lanjutkan"
              : "Mulai";

            const card = (
              <div
                className={cn(
                  "flex items-center gap-4 rounded-2xl border-2 bg-white/85 p-4 shadow-sm transition-all",
                  !isLocked &&
                    "hover:-translate-y-0.5 hover:shadow-md active:scale-[0.98]",
                  isLocked && "cursor-not-allowed opacity-55",
                  isCompleted && "border-green-200 bg-green-50/60",
                  isInProgress && `border-opacity-50`,
                  !isLocked && !isCompleted && "border-gray-200"
                )}
                style={
                  isInProgress ? { borderColor: `${world.themeColor}66` } : {}
                }
              >
                {/* Activity number bubble */}
                <div
                  className={cn(
                    "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl font-display text-lg font-bold shadow-sm",
                    isLocked ? "bg-gray-100 text-gray-400" : "text-white"
                  )}
                  style={!isLocked ? { background: world.themeColor } : {}}
                  aria-hidden
                >
                  {activity.activityNumber}
                </div>

                <div className="flex-1 text-left">
                  <p className="font-display font-bold text-gray-800">
                    {activity.activityName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {isLocked
                      ? "Selesaikan aktivitas sebelumnya dulu"
                      : isCompleted
                      ? "Sudah kamu selesaikan 🌟"
                      : `Eksplorasi ${world.titleBahasa.toLowerCase()}`}
                  </p>
                </div>

                <span
                  className={cn(
                    "flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold",
                    isCompleted && "bg-green-100 text-green-700",
                    isInProgress && "bg-primary/15 text-primary",
                    isAvailable && "bg-blue-100 text-blue-700",
                    isLocked && "bg-gray-100 text-gray-500"
                  )}
                >
                  <StatusIcon className="h-3.5 w-3.5" aria-hidden />
                  {statusLabel}
                </span>
              </div>
            );

            if (isLocked) {
              return (
                <div key={activity.activityId} aria-disabled="true">
                  {card}
                </div>
              );
            }

            return (
              <Link
                key={activity.activityId}
                href={`/play/activity/${activity.activityId}`}
                aria-label={`${statusLabel}: ${activity.activityName}`}
              >
                {card}
              </Link>
            );
          })}
        </section>

        {/* World completion message */}
        {completedCount === world.activityCount && (
          <div className="mx-auto mt-6 max-w-lg px-4 lg:max-w-3xl lg:px-8">
            <div
              className="rounded-2xl p-5 text-center text-white shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${world.themeColor}ee, ${world.themeColor}88)`,
              }}
            >
              <div className="text-3xl mb-2">🏆</div>
              <p className="font-display text-lg font-bold">
                {world.titleBahasa} Selesai!
              </p>
              <p className="text-sm text-white/90 mt-1">
                Kamu sudah menyelesaikan semua aktivitas di dunia ini. Luar biasa!
              </p>
            </div>
          </div>
        )}

        {/* Back button */}
        <div className="mx-auto mt-6 max-w-lg px-4 lg:max-w-3xl lg:px-8">
          <Button asChild variant="outline" size="lg" className="w-full rounded-2xl lg:mx-auto lg:block lg:max-w-xs">
            <Link href="/play/home">← Kembali ke Peta Dunia</Link>
          </Button>
        </div>
      </main>

      <ChildNav />
    </>
  );
}
