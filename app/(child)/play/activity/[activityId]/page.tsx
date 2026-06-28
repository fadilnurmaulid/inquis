/**
 * Activity page — /play/activity/[activityId]
 * Renders ActivityPlayer for all defined activities.
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
import { ActivityStatus } from "@prisma/client";

interface PageProps {
  params: Promise<{ activityId: string }>;
}

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
    title: def?.title ?? `${parsed.world.titleBahasa} — Aktivitas ${parsed.activityNumber}`,
  };
}

export default async function ActivityPage({ params }: PageProps) {
  const { activityId } = await params;
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

  const worldProgress = await prisma.worldProgress.findUnique({
    where: { childId_worldId: { childId: child.id, worldId } },
    select: { status: true },
  });
  if (!worldProgress || worldProgress.status === "LOCKED") {
    redirect("/play/home");
  }

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

  let session = await prisma.activitySession.findFirst({
    where: { childId: child.id, activityId, isFirstAttempt: true },
    orderBy: { startedAt: "desc" },
  });

  const alreadyCompleted = session?.status === ActivityStatus.COMPLETED;

  if (!session) {
    session = await startActivity(child.id, activityId, worldId, worldNumber, activityNumber);
  } else if (session.status === ActivityStatus.NOT_STARTED) {
    session = await prisma.activitySession.update({
      where: { id: session.id },
      data: { status: ActivityStatus.IN_PROGRESS, startedAt: new Date() },
    });
  }

  return (
    <>
      <main className="min-h-screen pb-24">
        <ActivityPlayer
          definition={definition}
          sessionId={session.id}
          childId={child.id}
          themeColor={world.themeColor}
          companionName={world.companionName}
          alreadyCompleted={alreadyCompleted}
        />
      </main>
      <ChildNav />
    </>
  );
}
