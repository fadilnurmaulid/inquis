// @ts-nocheck
/**
 * Benih data pengembangan.
 *
 * Hanya anak. Guru, orang tua, kelas, dan pendaftaran kelas sudah
 * dihapus bersama dasbornya, jadi tidak ada lagi yang perlu ditanam
 * di sini selain dua penjelajah:
 *
 *   Rara — Dunia 1 tuntas, sekarang di tengah Dunia 2
 *   Bima — baru mulai, cuma Dunia 1 yang terbuka
 *
 * Keduanya sama persis dengan DEMO_ACCOUNTS di lib/demo/accounts.ts.
 * Kalau daftarnya berbeda, tombol "Masuk sebagai anak" akan menunjuk
 * akun yang tidak ada.
 *
 * Jalankan: npm run db:seed
 */

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { Role, WorldStatus, ActivityStatus, ScaffoldLevel } from "@/lib/db-enums";

const prisma = new PrismaClient();

async function main() {
  console.warn("Menanam data pengembangan INQUIS...");

  const anakData = [
    { email: "rara@inquis.app", name: "Rara", displayName: "Rara", supabaseId: "demo-child-rara" },
    { email: "bima@inquis.app", name: "Bima", displayName: "Bima", supabaseId: "demo-child-bima" },
  ];

  const anak = await Promise.all(
    anakData.map((d) =>
      prisma.user.upsert({
        where: { email: d.email },
        update: {},
        create: {
          supabaseId: d.supabaseId,
          email: d.email,
          role: Role.CHILD,
          child: { create: { name: d.name, displayName: d.displayName } },
        },
        include: { child: true },
      })
    )
  );

  // ── Rara: Dunia 1 tuntas, Dunia 2 berjalan ────────────────────────────
  const rara = anak[0].child!;
  await seedWorldProgress(rara.id, [
    { worldId: "world-1", worldNumber: 1, status: WorldStatus.COMPLETED },
    { worldId: "world-2", worldNumber: 2, status: WorldStatus.IN_PROGRESS },
    { worldId: "world-3", worldNumber: 3, status: WorldStatus.LOCKED },
    { worldId: "world-4", worldNumber: 4, status: WorldStatus.LOCKED },
  ]);

  const aktivitasRara = [
    { activityId: "activity-1-1", worldId: "world-1", worldNumber: 1, activityNumber: 1, status: ActivityStatus.COMPLETED, scaffoldLevel: ScaffoldLevel.NONE },
    { activityId: "activity-1-2", worldId: "world-1", worldNumber: 1, activityNumber: 2, status: ActivityStatus.COMPLETED, scaffoldLevel: ScaffoldLevel.HINT_1 },
    { activityId: "activity-1-3", worldId: "world-1", worldNumber: 1, activityNumber: 3, status: ActivityStatus.COMPLETED, scaffoldLevel: ScaffoldLevel.NONE },
    { activityId: "activity-1-4", worldId: "world-1", worldNumber: 1, activityNumber: 4, status: ActivityStatus.COMPLETED, scaffoldLevel: ScaffoldLevel.HINT_2 },
    { activityId: "activity-1-5", worldId: "world-1", worldNumber: 1, activityNumber: 5, status: ActivityStatus.COMPLETED, scaffoldLevel: ScaffoldLevel.NONE },
    { activityId: "activity-2-1", worldId: "world-2", worldNumber: 2, activityNumber: 1, status: ActivityStatus.COMPLETED, scaffoldLevel: ScaffoldLevel.NONE },
    { activityId: "activity-2-2", worldId: "world-2", worldNumber: 2, activityNumber: 2, status: ActivityStatus.IN_PROGRESS, scaffoldLevel: ScaffoldLevel.HINT_1 },
  ];
  for (const a of aktivitasRara) await seedActivity(rara.id, a);

  // ── Bima: baru mulai ──────────────────────────────────────────────────
  const bima = anak[1].child!;
  await seedWorldProgress(bima.id, [
    { worldId: "world-1", worldNumber: 1, status: WorldStatus.UNLOCKED },
    { worldId: "world-2", worldNumber: 2, status: WorldStatus.LOCKED },
    { worldId: "world-3", worldNumber: 3, status: WorldStatus.LOCKED },
    { worldId: "world-4", worldNumber: 4, status: WorldStatus.LOCKED },
  ]);

  console.warn("Selesai.");
  console.warn("  Akun anak (kata sandi: Demo2026!):");
  console.warn("  - rara@inquis.app  — Dunia 1 tuntas, Dunia 2 berjalan");
  console.warn("  - bima@inquis.app  — baru mulai");
  console.warn("  Lanjut: npm run demo:sync  — membuat pengguna di Supabase Auth");
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
      reflectionResponse: a.status === ActivityStatus.COMPLETED ? "Aku lihat bagian yang berulang" : undefined,
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
