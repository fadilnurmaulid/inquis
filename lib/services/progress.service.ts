/**
 * ProgressService — FND-016
 * Creates, updates, and retrieves learning progress for children.
 * Progress data is never deleted automatically (BR-005).
 */


"use server";

import { prisma } from "@/lib/prisma";
import { ActivityStatus, WorldStatus, ScaffoldLevel } from "@/lib/db-enums";
import { WORLDS } from "@/types";

// ─────────────────────────────────────────────
// World Progress
// ─────────────────────────────────────────────

/**
 * Returns all world progress for a child, creating defaults if none exist.
 * World 1 is unlocked by default; all others are locked.
 */
export async function getOrInitWorldProgress(childId: string) {
  const existing = await prisma.worldProgress.findMany({
    where: { childId },
    orderBy: { worldNumber: "asc" },
  });

  if (existing.length === WORLDS.length) return existing;

  // Initialize missing worlds (idempotent)
  await Promise.all(
    WORLDS.map((world) =>
      prisma.worldProgress.upsert({
        where: { childId_worldId: { childId, worldId: world.id } },
        update: {},
        create: {
          childId,
          worldId: world.id,
          worldNumber: world.number,
          // World 1 is unlocked by default
          status: world.number === 1 ? WorldStatus.UNLOCKED : WorldStatus.LOCKED,
          unlockedAt: world.number === 1 ? new Date() : undefined,
        },
      })
    )
  );

  return prisma.worldProgress.findMany({
    where: { childId },
    orderBy: { worldNumber: "asc" },
  });
}

/**
 * Marks a world as complete and unlocks the next world.
 * Enforces sequential unlock rule (BR-LF-002).
 */
export async function completeWorld(childId: string, worldId: string) {
  const world = WORLDS.find((w) => w.id === worldId);
  if (!world) throw new Error(`Unknown worldId: ${worldId}`);

  await prisma.worldProgress.update({
    where: { childId_worldId: { childId, worldId } },
    data: { status: WorldStatus.COMPLETED, completedAt: new Date() },
  });

  // Unlock next world
  const nextWorld = WORLDS.find((w) => w.number === world.number + 1);
  if (nextWorld) {
    await prisma.worldProgress.update({
      where: { childId_worldId: { childId, worldId: nextWorld.id } },
      data: { status: WorldStatus.UNLOCKED, unlockedAt: new Date() },
    });
  }
}

// ─────────────────────────────────────────────
// Activity Sessions
// ─────────────────────────────────────────────

export async function startActivity(
  childId: string,
  activityId: string,
  worldId: string,
  worldNumber: number,
  activityNumber: number
) {
  // Count previous attempts for this activity
  const previousAttempts = await prisma.activitySession.count({
    where: { childId, activityId },
  });

  return prisma.activitySession.create({
    data: {
      childId,
      activityId,
      worldId,
      worldNumber,
      activityNumber,
      status: ActivityStatus.IN_PROGRESS,
      isFirstAttempt: previousAttempts === 0,
      attemptNumber: previousAttempts + 1,
      startedAt: new Date(),
    },
  });
}

export async function updateActivityScaffold(
  sessionId: string,
  scaffoldLevel: ScaffoldLevel
) {
  const levelOrder: ScaffoldLevel[] = [
    ScaffoldLevel.NONE,
    ScaffoldLevel.HINT_1,
    ScaffoldLevel.HINT_2,
    ScaffoldLevel.HINT_3,
    ScaffoldLevel.ANSWER_REVEAL,
  ];

  const session = await prisma.activitySession.findUnique({
    where: { id: sessionId },
    select: { maxScaffoldReached: true, scaffoldEvents: true },
  });
  if (!session) throw new Error(`Session not found: ${sessionId}`);

  const currentMax = levelOrder.indexOf(session.maxScaffoldReached);
  const newLevel = levelOrder.indexOf(scaffoldLevel);
  const updatedMax = newLevel > currentMax ? scaffoldLevel : session.maxScaffoldReached;

  return prisma.activitySession.update({
    where: { id: sessionId },
    data: {
      maxScaffoldReached: updatedMax,
      scaffoldEvents: session.scaffoldEvents + 1,
    },
  });
}

export async function completeReflection(sessionId: string, response?: string) {
  return prisma.activitySession.update({
    where: { id: sessionId },
    data: {
      reflectionCompleted: true,
      reflectionResponse: response ?? null,
    },
  });
}

/**
 * Marks an activity as complete. Reflection must be done first (BR-LF-006).
 * Calculates duration and creates assessment record.
 */
export async function completeActivity(
  sessionId: string,
  assessmentData: {
    observeScore: number;
    questionScore: number;
    predictScore: number;
    exploreScore: number;
    concludeScore: number;
  }
) {
  const session = await prisma.activitySession.findUnique({
    where: { id: sessionId },
    select: {
      childId: true,
      startedAt: true,
      reflectionCompleted: true,
      maxScaffoldReached: true,
    },
  });

  if (!session) throw new Error(`Session not found: ${sessionId}`);
  if (!session.reflectionCompleted) {
    throw new Error("Reflection must be completed before marking activity as done.");
  }

  const durationSeconds = session.startedAt
    ? Math.round((Date.now() - session.startedAt.getTime()) / 1000)
    : null;

  // Independence Index: NONE=1.0, HINT_1=0.85, HINT_2=0.65, HINT_3=0.45, ANSWER_REVEAL=0.2
  const independenceMap: { [key: string]: number } = {
    NONE: 1.0,
    HINT_1: 0.85,
    HINT_2: 0.65,
    HINT_3: 0.45,
    ANSWER_REVEAL: 0.2,
  };
  const independenceIndex = independenceMap[session.maxScaffoldReached as string] ?? 0.5;

  const updatedSession = await prisma.activitySession.update({
    where: { id: sessionId },
    data: {
      status: ActivityStatus.COMPLETED,
      completedAt: new Date(),
      durationSeconds,
    },
  });

  await prisma.assessment.create({
    data: {
      childId: session.childId,
      sessionId,
      ...assessmentData,
      independenceIndex,
    },
  });

  return updatedSession;
}

// ─────────────────────────────────────────────
// Queries
// ─────────────────────────────────────────────

export async function getChildProgressSummary(childId: string) {
  const worldProgress = await getOrInitWorldProgress(childId);
  const sessions = await prisma.activitySession.findMany({
    where: { childId, status: ActivityStatus.COMPLETED, isFirstAttempt: true },
    include: { assessments: true },
  });

  return { worldProgress, sessions };
}
