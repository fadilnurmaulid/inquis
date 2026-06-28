/**
 * Teacher analytics — aggregates inquiry skill data for dashboard (FR-TP-006, FR-LIDM-005).
 */

"use server";

import { prisma } from "@/lib/prisma";
import type { SkillAverages } from "@/components/teacher/skill-progress";

export async function getClassroomSkillAverages(classroomId: string): Promise<SkillAverages> {
  const enrollments = await prisma.classEnrollment.findMany({
    where: { classroomId },
    select: { childId: true },
  });

  const childIds = enrollments.map((e) => e.childId);
  if (childIds.length === 0) {
    return { observe: 0, question: 0, predict: 0, explore: 0, conclude: 0 };
  }

  const assessments = await prisma.assessment.findMany({
    where: { childId: { in: childIds } },
    select: {
      observeScore: true,
      questionScore: true,
      predictScore: true,
      exploreScore: true,
      concludeScore: true,
    },
  });

  if (assessments.length === 0) {
    return { observe: 0, question: 0, predict: 0, explore: 0, conclude: 0 };
  }

  const sum = assessments.reduce(
    (acc, a) => ({
      observe: acc.observe + a.observeScore,
      question: acc.question + a.questionScore,
      predict: acc.predict + a.predictScore,
      explore: acc.explore + a.exploreScore,
      conclude: acc.conclude + a.concludeScore,
    }),
    { observe: 0, question: 0, predict: 0, explore: 0, conclude: 0 }
  );

  const n = assessments.length;
  return {
    observe: sum.observe / n,
    question: sum.question / n,
    predict: sum.predict / n,
    explore: sum.explore / n,
    conclude: sum.conclude / n,
  };
}

export interface StudentSummary {
  id: string;
  displayName: string;
  completedActivities: number;
  independenceAvg: number;
  currentWorld: string | null;
}

export async function getClassroomStudentSummaries(
  classroomId: string
): Promise<StudentSummary[]> {
  const enrollments = await prisma.classEnrollment.findMany({
    where: { classroomId },
    select: {
      child: {
        select: {
          id: true,
          displayName: true,
          activitySessions: {
            where: { isFirstAttempt: true, status: "COMPLETED" },
            select: { id: true },
          },
          assessments: {
            select: { independenceIndex: true },
          },
          worldProgress: {
            where: { status: { in: ["IN_PROGRESS", "UNLOCKED"] } },
            orderBy: { worldNumber: "asc" },
            take: 1,
            select: { worldId: true },
          },
        },
      },
    },
  });

  return enrollments.map((e) => {
    const assessments = e.child.assessments;
    const independenceAvg =
      assessments.length > 0
        ? assessments.reduce((s, a) => s + a.independenceIndex, 0) / assessments.length
        : 0;

    return {
      id: e.child.id,
      displayName: e.child.displayName,
      completedActivities: e.child.activitySessions.length,
      independenceAvg,
      currentWorld: e.child.worldProgress[0]?.worldId ?? null,
    };
  });
}

export async function getTeacherImpactMetrics(teacherId: string) {
  const classrooms = await prisma.classroom.findMany({
    where: { teacherId },
    select: { id: true },
  });

  const classroomIds = classrooms.map((c) => c.id);
  const enrollments = await prisma.classEnrollment.count({
    where: { classroomId: { in: classroomIds } },
  });

  const childIds = (
    await prisma.classEnrollment.findMany({
      where: { classroomId: { in: classroomIds } },
      select: { childId: true },
    })
  ).map((e) => e.childId);

  const [totalActivities, avgIndependence] = await Promise.all([
    prisma.activitySession.count({
      where: { childId: { in: childIds }, status: "COMPLETED", isFirstAttempt: true },
    }),
    childIds.length > 0
      ? prisma.assessment.aggregate({
          where: { childId: { in: childIds } },
          _avg: { independenceIndex: true },
        })
      : Promise.resolve({ _avg: { independenceIndex: 0 } }),
  ]);

  return {
    totalStudents: enrollments,
    totalActivitiesCompleted: totalActivities,
    avgIndependence: avgIndependence._avg.independenceIndex ?? 0,
  };
}
