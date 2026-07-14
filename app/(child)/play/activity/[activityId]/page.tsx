/**
 * Activity page — /play/activity/[activityId]
 * Renders the full ActivityPlayer for all defined activities.
 */

import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { requireRole } from "@/lib/services/auth.service";
import { prisma } from "@/lib/prisma";
import { startActivity } from "@/lib/services/progress.service";
import { getActivityDefinition } from "@/lib/activities/definitions";
import { WORLDS } from "@/types";
import { ChildNav } from "@/components/dashboard/child-nav";
import { ActivityPlayer } from "@/components/activities/activity-player";
import { ActivityStatus } from "@/lib/db-enums";

interface PageProps {
  params: Promise<{ activityId: string }>;
  searchParams: Promise<{ replay?: string }>;
}

// World companion emojis
const COMPANION_EMOJI: Record<string, string> = {
  "world-1": "🦋",
  "world-2": "🐢",
  "world-3": "🔮",
  "world-4": "🧪",
};

function parseActivityId(activityId: string) {
  const match = activityId.match(/^activity-(\d+)-(\d+)$/);
  if (!match) return null;
  const worldNumber = parseInt(match[1], 10);
  const activityNumber = parseInt(match[2], 10);
  const world = WORLDS.find((w) => w.number === worldNumber);
  if (!world || activityNumber < 1 || activityNumber > world.activityCount) return null;
  return { world, worldNumber, activityNumber, worldId: world.id };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { activityId } = await params;
  const parsed = parseActivityId(activityId);
  const def = getActivityDefinition(activityId);
  if (!parsed) return { title: "Aktivitas" };
  return {
    title: def?.title ?? `${parsed.world.titleBahasa} · Aktivitas ${parsed.activityNumber}`,
  };
}

export default async function ActivityPage({ params, searchParams }: PageProps) {
  const { activityId } = await params;
  const { replay } = await searchParams;
  const parsed = parseActivityId(activityId);
  if (!parsed) notFound();

  const definition = getActivityDefinition(activityId);
  if (!definition) notFound();

  const { world, worldNumber, activityNumber, worldId } = parsed;
  const user = await requireRole(["CHILD"]);

  const child = await prisma.child.findFirst({
    where: { user: { id: user.id } },
    select: { id: true },
  });
  if (!child) redirect("/play/home");

  // Gate: world must be unlocked
  const worldProgress = await prisma.worldProgress.findUnique({
    where: { childId_worldId: { childId: child.id, worldId } },
    select: { status: true },
  });
  if (!worldProgress || worldProgress.status === "LOCKED") {
    redirect("/play/home");
  }

  // Gate: previous activity must be completed (except first)
  if (activityNumber > 1) {
    const prevCompleted = await prisma.activitySession.findFirst({
      where: {
        childId: child.id,
        worldId,
        activityNumber: activityNumber - 1,
        isFirstAttempt: true,
        status: ActivityStatus.COMPLETED,
      },
    });
    if (!prevCompleted) redirect(`/play/world/${worldId}`);
  }

  // Fetch or create session
  let session = await prisma.activitySession.findFirst({
    where: { childId: child.id, activityId, isFirstAttempt: true },
    orderBy: { startedAt: "desc" },
  });

  const alreadyCompleted = session?.status === ActivityStatus.COMPLETED;

  // Replay: child explicitly chose "Main Lagi" on an already-completed activity.
  // Creates a fresh, non-first-attempt session via the existing replay-aware
  // startActivity() — progression, scores, and achievements are untouched
  // because every scoring/progression query already filters on
  // isFirstAttempt: true (see progress.service.ts / activity-actions.ts).
  const isReplay = replay === "1" && alreadyCompleted;

  if (isReplay) {
    session = await startActivity(child.id, activityId, worldId, worldNumber, activityNumber);
  } else if (!session) {
    session = await startActivity(child.id, activityId, worldId, worldNumber, activityNumber);
  } else if (session.status === ActivityStatus.NOT_STARTED) {
    session = await prisma.activitySession.update({
      where: { id: session.id },
      data: { status: ActivityStatus.IN_PROGRESS, startedAt: new Date() },
    });
  }

  const companionEmoji = COMPANION_EMOJI[worldId];

  return (
    <>
      <main className="min-h-screen pb-24 bg-gradient-to-br from-sky-50 to-blue-50">
        <ActivityPlayer
          key={session.id}
          definition={definition}
          sessionId={session.id}
          childId={child.id}
          themeColor={world.themeColor}
          companionName={world.companionName}
          companionEmoji={companionEmoji}
          alreadyCompleted={alreadyCompleted && !isReplay}
        />
      </main>
      <ChildNav />
    </>
  );
}
