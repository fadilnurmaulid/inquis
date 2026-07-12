"use server";

/**
 * Activity completion actions — bridges Activity Engine to ProgressService.
 */

import { prisma } from "@/lib/prisma";
import {
  completeActivity,
  completeReflection,
  completeWorld,
  updateActivityScaffold,
} from "@/lib/services/progress.service";
import { ScaffoldLevel, ActivityStatus } from "@/lib/db-enums";
import { WORLDS } from "@/types";
import { revalidatePath } from "next/cache";

const HINT_TO_SCAFFOLD: ScaffoldLevel[] = [
  ScaffoldLevel.NONE,
  ScaffoldLevel.HINT_1,
  ScaffoldLevel.HINT_2,
  ScaffoldLevel.HINT_3,
];

export interface CompleteActivityInput {
  sessionId: string;
  childId: string;
  hintsUsed: number;
  reflectionResponse: string;
  worldId: string;
  worldNumber: number;
  activityNumber: number;
  primarySkill: string;
}

export async function submitActivityCompletion(
  input: CompleteActivityInput
): Promise<{ success: boolean; worldCompleted?: boolean; error?: string }> {
  try {
    const session = await prisma.activitySession.findUnique({
      where: { id: input.sessionId },
      select: { status: true, childId: true, isFirstAttempt: true },
    });

    if (!session || session.childId !== input.childId) {
      return { success: false, error: "Sesi tidak ditemukan" };
    }

    if (session.status === ActivityStatus.COMPLETED) {
      return { success: true };
    }

    const scaffoldLevel = HINT_TO_SCAFFOLD[Math.min(input.hintsUsed, 3)] ?? ScaffoldLevel.NONE;

    if (input.hintsUsed > 0) {
      await updateActivityScaffold(input.sessionId, scaffoldLevel);
    }

    await completeReflection(input.sessionId, input.reflectionResponse);

    // Replay attempts (isFirstAttempt: false) are for practice only. They mark
    // their own session complete (for the completion-screen UI) but never
    // create an Assessment row or touch world-completion counting, because
    // teacher analytics (getClassroomSkillAverages, getTeacherImpactMetrics)
    // aggregate the Assessment table without an isFirstAttempt filter — a
    // scored replay would silently skew those averages. See
    // lib/services/teacher-analytics.service.ts.
    if (!session.isFirstAttempt) {
      await prisma.activitySession.update({
        where: { id: input.sessionId },
        data: { status: ActivityStatus.COMPLETED, completedAt: new Date() },
      });
      revalidatePath(`/play/world/${input.worldId}`);
      return { success: true, worldCompleted: false };
    }

    // Score based on scaffold — higher independence = higher scores
    const base =
      scaffoldLevel === ScaffoldLevel.NONE ? 90 : scaffoldLevel === ScaffoldLevel.HINT_1 ? 80 : 70;

    await completeActivity(input.sessionId, {
      observeScore: base,
      questionScore: base - 5,
      predictScore: base,
      exploreScore: base - 3,
      concludeScore: base + 2,
    });

    // Check world completion
    const world = WORLDS.find((w) => w.id === input.worldId);
    let worldCompleted = false;

    if (world) {
      const completedCount = await prisma.activitySession.count({
        where: {
          childId: input.childId,
          worldId: input.worldId,
          isFirstAttempt: true,
          status: ActivityStatus.COMPLETED,
        },
      });

      if (completedCount >= world.activityCount) {
        await completeWorld(input.childId, input.worldId);
        worldCompleted = true;
      } else {
        // Mark world IN_PROGRESS if not already
        await prisma.worldProgress.updateMany({
          where: { childId: input.childId, worldId: input.worldId, status: "UNLOCKED" },
          data: { status: "IN_PROGRESS" },
        });
      }
    }

    revalidatePath("/play/home");
    revalidatePath(`/play/world/${input.worldId}`);
    revalidatePath("/play/profile");
    revalidatePath("/parent/dashboard");
    revalidatePath("/teacher/dashboard");

    return { success: true, worldCompleted };
  } catch (e) {
    console.error("[submitActivityCompletion]", e);
    return { success: false, error: "Gagal menyimpan kemajuan" };
  }
}
