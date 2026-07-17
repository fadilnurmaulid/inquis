/**
 * Halaman dunia — /play/world/[worldId]
 *
 * Daftar aktivitas satu dunia. Aturan gerbangnya tidak berubah dari
 * versi sebelumnya dan sengaja tetap sederhana: aktivitas pertama
 * selalu terbuka, sisanya menunggu tetangga kirinya tuntas. Yang
 * dihitung hanya percobaan pertama (isFirstAttempt), jadi "Main lagi"
 * tidak pernah membuka apa pun.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Lock } from "lucide-react";
import { requireRole } from "@/lib/services/auth.service";
import { prisma } from "@/lib/prisma";
import { ChildNav } from "@/components/dashboard/child-nav";
import { Specimen } from "@/components/illustrations/specimens";
import { LatarAlam } from "@/components/shared/latar-alam";
import { aktivitasDunia } from "@/lib/game/content";
import { NAMA_JENIS } from "@/lib/game/types";
import { ActivityStatus } from "@/lib/db-enums";
import { WORLDS } from "@/types";
import { cn } from "@/lib/utils";

type Keadaan = "completed" | "in_progress" | "available" | "locked";

interface PageProps {
  params: Promise<{ worldId: string }>;
}

export const dynamic = "force-dynamic";

function keadaanAktivitas(nomor: number, tuntas: Set<number>, sedang: number | null): Keadaan {
  if (tuntas.has(nomor)) return "completed";
  if (sedang === nomor) return "in_progress";
  if (nomor === 1 || tuntas.has(nomor - 1)) return "available";
  return "locked";
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { worldId } = await params;
  const world = WORLDS.find((w) => w.id === worldId);
  return { title: world ? world.titleBahasa : "Dunia" };
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
  if (!progress || progress.status === "LOCKED") redirect("/play/home");

  const sesi = await prisma.activitySession.findMany({
    where: { childId: child.id, worldId, isFirstAttempt: true },
    select: { activityNumber: true, status: true },
    orderBy: { activityNumber: "asc" },
  });

  const tuntas = new Set<number>(
    sesi
      .filter((s: { activityNumber: number; status: string }) => s.status === ActivityStatus.COMPLETED)
      .map((s: { activityNumber: number; status: string }) => s.activityNumber)
  );
  const sedang =
    sesi.find((s: { activityNumber: number; status: string }) => s.status === ActivityStatus.IN_PROGRESS)
      ?.activityNumber ?? null;

  const daftar = aktivitasDunia(world.id);
  const persen = Math.round((tuntas.size / world.activityCount) * 100);

  return (
    <>
      <LatarAlam ragam="tenang" />
      <main className="mx-auto w-full max-w-3xl px-4 pb-28 pt-6 sm:px-6">
        <div className="mb-6 flex items-center justify-between gap-3">
          <Link
            href="/play/home"
            className="target-sentuh inline-flex items-center gap-1.5 rounded-full border-2 border-kertas-deep bg-kertas-lo px-3.5 font-display text-kecil font-bold text-tinta-mid shadow-tile transition-all duration-cepat ease-pegas hover:-translate-y-0.5 hover:border-tinta-faint active:translate-y-0.5 active:shadow-tekan"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Peta
          </Link>
          <p className="label-spesimen text-tinta-soft">
            {tuntas.size}/{world.activityCount} selesai
          </p>
        </div>

        {/* Kepala dunia */}
        <header
          className="mb-6 overflow-hidden rounded-kartu border-2 bg-kertas-lo p-5 shadow-kertas"
          style={{ borderColor: world.themeColor }}
        >
          <div className="flex items-start gap-4">
            <span
              className="flex h-16 w-16 shrink-0 animate-apung items-center justify-center rounded-full border-2 bg-kertas"
              style={{ borderColor: world.themeColor }}
            >
              <Specimen id={world.companionSpecimen} size={38} label={world.companionName} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="label-spesimen" style={{ color: world.themeColor }}>
                Dunia {world.number}
              </p>
              <h1 className="font-display text-judul font-extrabold leading-tight text-tinta">
                {world.titleBahasa}
              </h1>
              <p className="mt-1 text-kecil leading-relaxed text-tinta-mid">{world.description}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <span className="block h-2 flex-1 overflow-hidden rounded-full bg-kertas-hi">
              <span
                className="block h-full rounded-full transition-all duration-lambat ease-halus"
                style={{ width: `${persen}%`, backgroundColor: world.themeColor }}
              />
            </span>
            <span className="font-label text-mikro font-bold tabular-nums text-tinta-soft">{persen}%</span>
          </div>

          <p className="mt-3 rounded-tile bg-kertas px-3.5 py-2.5 text-mikro leading-relaxed text-tinta-mid">
            <span className="font-bold text-tinta">{world.companionName}:</span> Kita kerjakan berurutan, ya.
            Yang satu menyiapkan yang berikutnya.
          </p>
        </header>

        {/* Daftar aktivitas */}
        <ol className="flex flex-col gap-3">
          {daftar.map((a) => {
            const keadaan = keadaanAktivitas(a.nomor, tuntas, sedang);
            const terkunci = keadaan === "locked";

            const isi = (
              <>
                <span
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2",
                    terkunci ? "border-kertas-deep bg-kertas" : "bg-kertas"
                  )}
                  style={terkunci ? undefined : { borderColor: world.themeColor }}
                >
                  {terkunci ? (
                    <Lock className="h-4 w-4 text-tinta-faint" aria-hidden />
                  ) : keadaan === "completed" ? (
                    <Check className="h-5 w-5" style={{ color: world.themeColor }} strokeWidth={3.5} aria-hidden />
                  ) : (
                    <span className="font-label text-besar font-bold" style={{ color: world.themeColor }}>
                      {a.nomor}
                    </span>
                  )}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="label-spesimen text-tinta-faint">Aktivitas {a.nomor}</span>
                    <span
                      className="label-spesimen rounded px-1.5 py-0.5"
                      style={
                        terkunci
                          ? { backgroundColor: "#E1E7D6", color: "#AEBCB1" }
                          : { backgroundColor: `${world.themeColor}1F`, color: world.themeColor }
                      }
                    >
                      {NAMA_JENIS[a.tantangan.kind]}
                    </span>
                    {keadaan === "in_progress" && (
                      <span className="label-spesimen rounded bg-matahari-lo/60 px-1.5 py-0.5 text-tanah-hi">
                        Sedang dikerjakan
                      </span>
                    )}
                  </span>
                  <span
                    className={cn(
                      "mt-0.5 block font-display text-besar font-bold leading-tight",
                      terkunci ? "text-tinta-faint" : "text-tinta"
                    )}
                  >
                    {a.judul}
                  </span>
                  <span className="mt-0.5 line-clamp-1 block text-mikro text-tinta-soft">
                    {terkunci ? "Selesaikan aktivitas sebelumnya dulu." : a.pemantik}
                  </span>
                </span>

                {!terkunci && (
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform duration-cepat ease-pegas group-hover:translate-x-0.5"
                    style={{ backgroundColor: world.themeColor }}
                    aria-hidden
                  >
                    <ArrowRight className="h-4 w-4 text-kertas-lo" strokeWidth={2.5} />
                  </span>
                )}
              </>
            );

            return (
              <li key={a.id}>
                {terkunci ? (
                  <div
                    className="flex items-center gap-3.5 rounded-kartu border-2 border-kertas-deep bg-kertas-lo/60 p-4 opacity-70"
                    aria-disabled
                  >
                    {isi}
                  </div>
                ) : (
                  <Link
                    href={`/play/activity/${a.id}`}
                    className={cn(
                      "group flex items-center gap-3.5 rounded-kartu border-2 border-kertas-deep bg-kertas-lo p-4",
                      "shadow-tile transition-all duration-cepat ease-pegas",
                      "hover:-translate-y-0.5 hover:shadow-angkat active:translate-y-0 active:shadow-tekan"
                    )}
                  >
                    {isi}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </main>
      <ChildNav />
    </>
  );
}
