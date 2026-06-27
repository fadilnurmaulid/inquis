/**
 * DashboardService
 * Aggregates all data needed to render a child's dashboard in one query.
 * Used exclusively in Server Components — no client-side fetching.
 */

"use server";

import { prisma } from "@/lib/prisma";
import { ActivityStatus, WorldStatus } from "@prisma/client";
import { WORLDS } from "@/types";

export interface ActivitySummary {
  activityId: string;
  worldId: string;
  worldNumber: number;
  activityNumber: number;
  status: ActivityStatus;
  reflectionCompleted: boolean;
}

export interface WorldProgressSummary {
  worldId: string;
  worldNumber: number;
  title: string;
  titleBahasa: string;
  description: string;
  themeColor: string;
  companionName: string;
  totalActivities: number;
  completedActivities: number;
  status: WorldStatus;
  unlockedAt: Date | null;
  completedAt: Date | null;
}

export interface ChildDashboardData {
  child: {
    id: string;
    name: string;
    displayName: string;
    avatarUrl: string | null;
  };
  worlds: WorldProgressSummary[];
  /** Most recent in-progress session (for Continue Learning) */
  activeSession: ActivitySummary | null;
  /** Next recommended activity if no active session */
  nextRecommended: ActivitySummary | null;
  totalCompletedActivities: number;
  totalWorlds: number;
  completedWorlds: number;
}

export async function getChildDashboardData(userId: string): Promise<ChildDashboardData> {
  // Fetch child profile
  const child = await prisma.child.findFirst({
    where: { user: { id: userId } },
    select: { id: true, name: true, displayName: true, avatarUrl: true },
  });

  if (!child) throw new Error("Child profile not found");

  // Ensure world progress rows exist (idempotent init)
  const existingProgress = await prisma.worldProgress.findMany({
    where: { childId: child.id },
    orderBy: { worldNumber: "asc" },
  });

  if (existingProgress.length < WORLDS.length) {
    await Promise.all(
      WORLDS.map((world) =>
        prisma.worldProgress.upsert({
          where: { childId_worldId: { childId: child.id, worldId: world.id } },
          update: {},
          create: {
            childId: child.id,
            worldId: world.id,
            worldNumber: world.number,
            status: world.number === 1 ? WorldStatus.UNLOCKED : WorldStatus.LOCKED,
            unlockedAt: world.number === 1 ? new Date() : undefined,
          },
        })
      )
    );
  }

  const worldProgress = await prisma.worldProgress.findMany({
    where: { childId: child.id },
    orderBy: { worldNumber: "asc" },
  });

  // Fetch all first-attempt activity sessions for this child
  const sessions = await prisma.activitySession.findMany({
    where: { childId: child.id, isFirstAttempt: true },
    select: {
      activityId: true,
      worldId: true,
      worldNumber: true,
      activityNumber: true,
      status: true,
      reflectionCompleted: true,
      startedAt: true,
    },
    orderBy: { startedAt: "desc" },
  });

  // Build per-world completed activity counts
  const completedByWorld: Record<string, number> = {};
  for (const s of sessions) {
    if (s.status === ActivityStatus.COMPLETED) {
      completedByWorld[s.worldId] = (completedByWorld[s.worldId] ?? 0) + 1;
    }
  }

  // Compose world summaries
  const worlds: WorldProgressSummary[] = worldProgress.map((wp) => {
    const def = WORLDS.find((w) => w.id === wp.worldId)!;
    return {
      worldId: wp.worldId,
      worldNumber: wp.worldNumber,
      title: def.title,
      titleBahasa: def.titleBahasa,
      description: def.description,
      themeColor: def.themeColor,
      companionName: def.companionName,
      totalActivities: def.activityCount,
      completedActivities: completedByWorld[wp.worldId] ?? 0,
      status: wp.status,
      unlockedAt: wp.unlockedAt,
      completedAt: wp.completedAt,
    };
  });

  // Find active (in-progress) session — most recent
  const activeRaw = sessions.find((s) => s.status === ActivityStatus.IN_PROGRESS);
  const activeSession: ActivitySummary | null = activeRaw
    ? {
        activityId: activeRaw.activityId,
        worldId: activeRaw.worldId,
        worldNumber: activeRaw.worldNumber,
        activityNumber: activeRaw.activityNumber,
        status: activeRaw.status,
        reflectionCompleted: activeRaw.reflectionCompleted,
      }
    : null;

  // Determine next recommended activity if no active session
  let nextRecommended: ActivitySummary | null = null;
  if (!activeSession) {
    // Find first unlocked world with incomplete activities
    for (const world of worlds) {
      if (world.status === WorldStatus.LOCKED) continue;
      if (world.completedActivities >= world.totalActivities) continue;
      const nextActivityNumber = world.completedActivities + 1;
      const activityId = `activity-${world.worldNumber}-${nextActivityNumber}`;
      nextRecommended = {
        activityId,
        worldId: world.worldId,
        worldNumber: world.worldNumber,
        activityNumber: nextActivityNumber,
        status: ActivityStatus.NOT_STARTED,
        reflectionCompleted: false,
      };
      break;
    }
  }

  const totalCompletedActivities = Object.values(completedByWorld).reduce((a, b) => a + b, 0);
  const completedWorlds = worlds.filter((w) => w.status === WorldStatus.COMPLETED).length;

  return {
    child,
    worlds,
    activeSession,
    nextRecommended,
    totalCompletedActivities,
    totalWorlds: WORLDS.length,
    completedWorlds,
  };
}
