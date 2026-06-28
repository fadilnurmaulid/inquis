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
import { cn } from "@/lib/utils";
import { ActivityStatus } from "@prisma/client";

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
  if (activityNumber === 1 || completedNumbers.has(activityNumber - 1)) return "available";
  return "locked";
}

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

  const completedNumbers = new Set(
    sessions
      .filter((s) => s.status === ActivityStatus.COMPLETED)
      .map((s) => s.activityNumber)
  );
  const inProgress = sessions.find((s) => s.status === ActivityStatus.IN_PROGRESS);
  const inProgressNumber = inProgress?.activityNumber ?? null;

  const activities = Array.from({ length: world.activityCount }, (_, i) => {
    const activityNumber = i + 1;
    const activityId = `activity-${world.number}-${activityNumber}`;
    const status = resolveActivityStatus(activityNumber, completedNumbers, inProgressNumber);
    return { activityNumber, activityId, status };
  });

  const completedCount = completedNumbers.size;
  const progressPercent = Math.round((completedCount / world.activityCount) * 100);

  return (
    <>
      <main className="min-h-screen pb-24">
        <header
          className="px-4 pb-6 pt-8 text-center"
          style={{
            background: `linear-gradient(180deg, ${world.themeColor}33 0%, transparent 100%)`,
          }}
        >
          <div
            className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl shadow-xl"
            style={{ background: world.themeColor }}
          >
            <span className="font-display text-3xl font-bold text-white">{world.number}</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-gray-800">{world.titleBahasa}</h1>
          <p className="mt-1 text-sm text-gray-500">{world.description}</p>
          <p className="mt-2 text-sm font-medium text-gray-600">
            Temanmu: <span className="text-primary">{world.companionName}</span> 🦉
          </p>

          <div className="mx-auto mt-4 max-w-xs">
            <div className="mb-1 flex justify-between text-xs text-gray-500">
              <span>{completedCount}/{world.activityCount} aktivitas</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${progressPercent}%`, background: world.themeColor }}
              />
            </div>
          </div>
        </header>

        {completedCount === 0 && (
          <WorldIntro
            worldNumber={world.number}
            titleBahasa={world.titleBahasa}
            description={world.description}
            companionName={world.companionName}
            themeColor={world.themeColor}
            primarySkill={world.primarySkill}
          />
        )}

        <section className="mx-auto max-w-lg space-y-3 px-4" aria-label="Daftar aktivitas">
          <h2 className="font-display text-lg font-bold text-gray-800">Aktivitas</h2>

          {activities.map((activity) => {
            const isLocked = activity.status === "locked";
            const isCompleted = activity.status === "completed";
            const isInProgress = activity.status === "in_progress";

            const StatusIcon = isLocked ? Lock : isCompleted ? CheckCircle : isInProgress ? Play : Sparkles;
            const statusLabel = isLocked
              ? "Terkunci"
              : isCompleted
                ? "Selesai"
                : isInProgress
                  ? "Lanjutkan"
                  : "Mulai";

            const content = (
              <div
                className={cn(
                  "flex items-center gap-4 rounded-2xl border bg-white/80 p-4 shadow-sm transition-all",
                  !isLocked && "hover:scale-[1.02] hover:shadow-md active:scale-[0.98]",
                  isLocked && "cursor-not-allowed opacity-60"
                )}
              >
                <div
                  className={cn(
                    "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl font-display text-lg font-bold",
                    isLocked ? "bg-gray-100 text-gray-400" : "text-white"
                  )}
                  style={!isLocked ? { background: world.themeColor } : undefined}
                >
                  {activity.activityNumber}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-display font-bold text-gray-800">
                    Aktivitas {activity.activityNumber}
                  </p>
                  <p className="text-sm text-gray-500">
                    {isLocked
                      ? "Selesaikan aktivitas sebelumnya dulu"
                      : `Eksplorasi ${world.titleBahasa.toLowerCase()}`}
                  </p>
                </div>
                <span
                  className={cn(
                    "flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
                    isCompleted && "bg-green-100 text-green-700",
                    isInProgress && "bg-primary/10 text-primary",
                    activity.status === "available" && "bg-blue-100 text-blue-700",
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
                  {content}
                </div>
              );
            }

            return (
              <Link
                key={activity.activityId}
                href={`/play/activity/${activity.activityId}`}
                aria-label={`${statusLabel} aktivitas ${activity.activityNumber}`}
              >
                {content}
              </Link>
            );
          })}
        </section>

        <div className="mx-auto mt-8 max-w-lg px-4">
          <Button asChild variant="outline" size="lg" className="w-full">
            <Link href="/play/home">← Kembali ke Peta</Link>
          </Button>
        </div>
      </main>

      <ChildNav />
    </>
  );
}
