/**
 * Halaman aktivitas — /play/activity/[activityId]
 *
 * Semua yang menyentuh basis data tinggal di sini; mesin permainannya
 * murni komponen klien. Pembagian ini yang membuat mode demo mungkin:
 * halaman demo memakai mesin yang sama persis dengan `simpan={null}`.
 */

import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { requireRole } from "@/lib/services/auth.service";
import { prisma } from "@/lib/prisma";
import { startActivity } from "@/lib/services/progress.service";
import { aktivitasDunia, getAktivitas } from "@/lib/game/content";
import { WORLDS } from "@/types";
import { ChildNav } from "@/components/dashboard/child-nav";
import { Mesin } from "@/components/game/mesin";
import { ActivityStatus } from "@/lib/db-enums";

interface PageProps {
  params: Promise<{ activityId: string }>;
  searchParams: Promise<{ replay?: string }>;
}

function baca(activityId: string) {
  const a = getAktivitas(activityId);
  if (!a) return null;
  const world = WORLDS.find((w) => w.id === a.worldId);
  if (!world) return null;
  return { a, world };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { activityId } = await params;
  const data = baca(activityId);
  return { title: data ? `${data.a.judul} · ${data.world.titleBahasa}` : "Aktivitas" };
}

export default async function ActivityPage({ params, searchParams }: PageProps) {
  const { activityId } = await params;
  const { replay } = await searchParams;

  const data = baca(activityId);
  if (!data) notFound();
  const { a, world } = data;

  const user = await requireRole(["CHILD"]);
  const child = await prisma.child.findFirst({
    where: { user: { id: user.id } },
    select: { id: true },
  });
  if (!child) redirect("/play/home");

  // Gerbang 1: dunianya harus sudah terbuka.
  const worldProgress = await prisma.worldProgress.findUnique({
    where: { childId_worldId: { childId: child.id, worldId: a.worldId } },
    select: { status: true },
  });
  if (!worldProgress || worldProgress.status === "LOCKED") redirect("/play/home");

  // Gerbang 2: aktivitas sebelumnya harus tuntas.
  if (a.nomor > 1) {
    const sebelumnya = await prisma.activitySession.findFirst({
      where: {
        childId: child.id,
        worldId: a.worldId,
        activityNumber: a.nomor - 1,
        isFirstAttempt: true,
        status: ActivityStatus.COMPLETED,
      },
    });
    if (!sebelumnya) redirect(`/play/world/${a.worldId}`);
  }

  let session = await prisma.activitySession.findFirst({
    where: { childId: child.id, activityId, isFirstAttempt: true },
    orderBy: { startedAt: "desc" },
  });

  const pernahTuntas = session?.status === ActivityStatus.COMPLETED;

  // "Main lagi": sesi baru non-percobaan-pertama. Peringkat, capaian, dan
  // kemajuan dunia tidak tersentuh karena setiap kueri penilaian menyaring
  // isFirstAttempt: true (lihat progress.service.ts dan activity-actions.ts).
  const ulang = replay === "1" && pernahTuntas;

  if (ulang || !session) {
    session = await startActivity(child.id, activityId, a.worldId, a.worldNumber, a.nomor);
  } else if (session.status === ActivityStatus.NOT_STARTED) {
    session = await prisma.activitySession.update({
      where: { id: session.id },
      data: { status: ActivityStatus.IN_PROGRESS, startedAt: new Date() },
    });
  }

  const daftar = aktivitasDunia(a.worldId);
  const lanjut = daftar.find((x) => x.nomor === a.nomor + 1);

  return (
    <>
      <main className="min-h-screen pb-24">
        <Mesin
          // Sesi baru = mesin baru. Inilah yang membuat "Main lagi"
          // benar-benar mereset: tidak ada keadaan lama yang tertinggal.
          key={session.id}
          aktivitas={a}
          namaDunia={world.titleBahasa}
          warna={world.themeColor}
          teman={{ nama: world.companionName, spesimen: world.companionSpecimen }}
          simpan={{
            sessionId: session.id,
            childId: child.id,
            worldId: a.worldId,
            worldNumber: a.worldNumber,
            activityNumber: a.nomor,
            primarySkill: world.primarySkill,
          }}
          jalanKembali={`/play/world/${a.worldId}`}
          basisAktivitas="/play/activity"
          berikutnya={lanjut ? { id: lanjut.id, judul: lanjut.judul } : null}
          sudahPernah={pernahTuntas && !ulang}
        />
      </main>
      <ChildNav />
    </>
  );
}
