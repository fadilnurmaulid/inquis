/**
 * Development seed for INQUIS
 * Creates demo accounts for all roles + classroom + progress data
 *
 * Run: npm run db:seed
 */

import { PrismaClient, Role, WorldStatus, ActivityStatus, ScaffoldLevel } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.warn("🌱 Seeding INQUIS development database...");

  // ── Demo Teacher ──────────────────────────────────────────────────────────
  const teacherUser = await prisma.user.upsert({
    where: { email: "demo.teacher@inquis.app" },
    update: {},
    create: {
      supabaseId: "demo-teacher-supabase-id",
      email: "demo.teacher@inquis.app",
      role: Role.TEACHER,
      teacher: {
        create: {
          name: "Bu Sari",
          school: "SD Negeri 1 Surabaya",
        },
      },
    },
    include: { teacher: true },
  });

  // ── Demo Classroom ────────────────────────────────────────────────────────
  const classroom = await prisma.classroom.upsert({
    where: { code: "KELAS-1A" },
    update: {},
    create: {
      teacherId: teacherUser.teacher!.id,
      name: "Kelas 1A",
      code: "KELAS-1A",
    },
  });

  // ── Demo Parent ───────────────────────────────────────────────────────────
  const parentUser = await prisma.user.upsert({
    where: { email: "demo.parent@inquis.app" },
    update: {},
    create: {
      supabaseId: "demo-parent-supabase-id",
      email: "demo.parent@inquis.app",
      role: Role.PARENT,
      parent: {
        create: {
          name: "Pak Budi",
        },
      },
    },
    include: { parent: true },
  });

  // ── Demo Children ─────────────────────────────────────────────────────────
  const childrenData = [
    { email: "rara@inquis.app", name: "Rara", displayName: "Rara", supabaseId: "demo-child-rara" },
    { email: "bima@inquis.app", name: "Bima", displayName: "Bima", supabaseId: "demo-child-bima" },
    { email: "siti@inquis.app", name: "Siti", displayName: "Siti", supabaseId: "demo-child-siti" },
    { email: "andi@inquis.app", name: "Andi", displayName: "Andi", supabaseId: "demo-child-andi" },
  ];

  const children = await Promise.all(
    childrenData.map((data) =>
      prisma.user.upsert({
        where: { email: data.email },
        update: {},
        create: {
          supabaseId: data.supabaseId,
          email: data.email,
          role: Role.CHILD,
          child: {
            create: {
              name: data.name,
              displayName: data.displayName,
            },
          },
        },
        include: { child: true },
      })
    )
  );

  // ── Enroll children in classroom ──────────────────────────────────────────
  await Promise.all(
    children.map((c) =>
      prisma.classEnrollment.upsert({
        where: {
          classroomId_childId: {
            classroomId: classroom.id,
            childId: c.child!.id,
          },
        },
        update: {},
        create: {
          classroomId: classroom.id,
          childId: c.child!.id,
        },
      })
    )
  );

  // ── Link Rara to parent ───────────────────────────────────────────────────
  const raraChild = children[0].child!;
  await prisma.parentChild.upsert({
    where: {
      parentId_childId: {
        parentId: parentUser.parent!.id,
        childId: raraChild.id,
      },
    },
    update: {},
    create: {
      parentId: parentUser.parent!.id,
      childId: raraChild.id,
    },
  });

  // ── Seed World Progress for Rara (demo: has completed W1, in W2) ──────────
  const raraWorlds = [
    { worldId: "world-1", worldNumber: 1, status: WorldStatus.COMPLETED },
    { worldId: "world-2", worldNumber: 2, status: WorldStatus.IN_PROGRESS },
    { worldId: "world-3", worldNumber: 3, status: WorldStatus.LOCKED },
    { worldId: "world-4", worldNumber: 4, status: WorldStatus.LOCKED },
  ];

  await Promise.all(
    raraWorlds.map((w) =>
      prisma.worldProgress.upsert({
        where: { childId_worldId: { childId: raraChild.id, worldId: w.worldId } },
        update: { status: w.status },
        create: {
          childId: raraChild.id,
          worldId: w.worldId,
          worldNumber: w.worldNumber,
          status: w.status,
          unlockedAt: w.status !== WorldStatus.LOCKED ? new Date() : undefined,
          completedAt: w.status === WorldStatus.COMPLETED ? new Date() : undefined,
        },
      })
    )
  );

  // ── Seed Activity Sessions for Rara (W1 complete, W2 partial) ────────────
  const raraActivities = [
    // World 1 — all completed (per learning-framework.md: W1 has 5 activities)
    { activityId: "activity-1-1", worldId: "world-1", worldNumber: 1, activityNumber: 1, status: ActivityStatus.COMPLETED, scaffoldLevel: ScaffoldLevel.NONE },
    { activityId: "activity-1-2", worldId: "world-1", worldNumber: 1, activityNumber: 2, status: ActivityStatus.COMPLETED, scaffoldLevel: ScaffoldLevel.HINT_1 },
    { activityId: "activity-1-3", worldId: "world-1", worldNumber: 1, activityNumber: 3, status: ActivityStatus.COMPLETED, scaffoldLevel: ScaffoldLevel.NONE },
    { activityId: "activity-1-4", worldId: "world-1", worldNumber: 1, activityNumber: 4, status: ActivityStatus.COMPLETED, scaffoldLevel: ScaffoldLevel.HINT_2 },
    { activityId: "activity-1-5", worldId: "world-1", worldNumber: 1, activityNumber: 5, status: ActivityStatus.COMPLETED, scaffoldLevel: ScaffoldLevel.NONE },
    // World 2 — 2/5 completed
    { activityId: "activity-2-1", worldId: "world-2", worldNumber: 2, activityNumber: 1, status: ActivityStatus.COMPLETED, scaffoldLevel: ScaffoldLevel.NONE },
    { activityId: "activity-2-2", worldId: "world-2", worldNumber: 2, activityNumber: 2, status: ActivityStatus.IN_PROGRESS, scaffoldLevel: ScaffoldLevel.HINT_1 },
  ];

  for (const a of raraActivities) {
    await seedActivity(raraChild.id, a);
  }

  // ── Bima: fresh learner (world 1 unlocked only) ───────────────────────────
  const bimaChild = children[1].child!;
  await seedWorldProgress(bimaChild.id, [
    { worldId: "world-1", worldNumber: 1, status: WorldStatus.UNLOCKED },
    { worldId: "world-2", worldNumber: 2, status: WorldStatus.LOCKED },
    { worldId: "world-3", worldNumber: 3, status: WorldStatus.LOCKED },
    { worldId: "world-4", worldNumber: 4, status: WorldStatus.LOCKED },
  ]);

  // ── Siti: W1 partial (2/5 activities) ─────────────────────────────────────
  const sitiChild = children[2].child!;
  await seedWorldProgress(sitiChild.id, [
    { worldId: "world-1", worldNumber: 1, status: WorldStatus.IN_PROGRESS },
    { worldId: "world-2", worldNumber: 2, status: WorldStatus.LOCKED },
    { worldId: "world-3", worldNumber: 3, status: WorldStatus.LOCKED },
    { worldId: "world-4", worldNumber: 4, status: WorldStatus.LOCKED },
  ]);
  await seedActivity(sitiChild.id, {
    activityId: "activity-1-1", worldId: "world-1", worldNumber: 1, activityNumber: 1,
    status: ActivityStatus.COMPLETED, scaffoldLevel: ScaffoldLevel.NONE,
  });
  await seedActivity(sitiChild.id, {
    activityId: "activity-1-2", worldId: "world-1", worldNumber: 1, activityNumber: 2,
    status: ActivityStatus.COMPLETED, scaffoldLevel: ScaffoldLevel.HINT_1,
  });

  // ── Andi: W1 complete ───────────────────────────────────────────────────────
  const andiChild = children[3].child!;
  await seedWorldProgress(andiChild.id, [
    { worldId: "world-1", worldNumber: 1, status: WorldStatus.COMPLETED },
    { worldId: "world-2", worldNumber: 2, status: WorldStatus.UNLOCKED },
    { worldId: "world-3", worldNumber: 3, status: WorldStatus.LOCKED },
    { worldId: "world-4", worldNumber: 4, status: WorldStatus.LOCKED },
  ]);
  for (let i = 1; i <= 5; i++) {
    await seedActivity(andiChild.id, {
      activityId: `activity-1-${i}`, worldId: "world-1", worldNumber: 1, activityNumber: i,
      status: ActivityStatus.COMPLETED, scaffoldLevel: ScaffoldLevel.NONE,
    });
  }

  console.warn("✅ Seed complete.");
  console.warn("   Demo accounts (password: Demo2026!):");
  console.warn("   • Teacher: demo.teacher@inquis.app");
  console.warn("   • Parent:  demo.parent@inquis.app");
  console.warn("   • Children: rara@ (advanced), bima@ (fresh), siti@ (partial), andi@ (W1 done)");
  console.warn("   Run: npm run demo:sync  — to create Supabase auth users");
}

type ActivitySeed = {
  activityId: string;
  worldId: string;
  worldNumber: number;
  activityNumber: number;
  status: ActivityStatus;
  scaffoldLevel: ScaffoldLevel;
};

async function seedWorldProgress(
  childId: string,
  worlds: { worldId: string; worldNumber: number; status: WorldStatus }[]
) {
  await Promise.all(
    worlds.map((w) =>
      prisma.worldProgress.upsert({
        where: { childId_worldId: { childId, worldId: w.worldId } },
        update: { status: w.status },
        create: {
          childId,
          worldId: w.worldId,
          worldNumber: w.worldNumber,
          status: w.status,
          unlockedAt: w.status !== WorldStatus.LOCKED ? new Date() : undefined,
          completedAt: w.status === WorldStatus.COMPLETED ? new Date() : undefined,
        },
      })
    )
  );
}

async function seedActivity(childId: string, a: ActivitySeed) {
  const session = await prisma.activitySession.upsert({
    where: { id: `seed-${childId}-${a.activityId}` },
    update: {},
    create: {
      id: `seed-${childId}-${a.activityId}`,
      childId,
      activityId: a.activityId,
      worldId: a.worldId,
      worldNumber: a.worldNumber,
      activityNumber: a.activityNumber,
      status: a.status,
      isFirstAttempt: true,
      startedAt: new Date(),
      completedAt: a.status === ActivityStatus.COMPLETED ? new Date() : undefined,
      durationSeconds: a.status === ActivityStatus.COMPLETED ? 180 + Math.floor(Math.random() * 120) : undefined,
      maxScaffoldReached: a.scaffoldLevel,
      reflectionCompleted: a.status === ActivityStatus.COMPLETED,
      reflectionResponse: a.status === ActivityStatus.COMPLETED ? "Saya menemukan polanya!" : undefined,
    },
  });

  if (a.status === ActivityStatus.COMPLETED) {
    await prisma.assessment.upsert({
      where: { childId_sessionId: { childId, sessionId: session.id } },
      update: {},
      create: {
        childId,
        sessionId: session.id,
        observeScore: 70 + Math.floor(Math.random() * 30),
        questionScore: 60 + Math.floor(Math.random() * 40),
        predictScore: 65 + Math.floor(Math.random() * 35),
        exploreScore: 75 + Math.floor(Math.random() * 25),
        concludeScore: 60 + Math.floor(Math.random() * 40),
        independenceIndex: a.scaffoldLevel === ScaffoldLevel.NONE ? 1.0 : 0.7,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
