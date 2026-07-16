/**
 * Beranda anak — /play/home
 *
 * Server Component: seluruh data diambil di server, jadi tidak ada
 * air terjun permintaan di peramban. Urutannya sengaja begini —
 * sapaan, lalu satu tombol lanjut, baru petanya. Anak yang membuka
 * aplikasi ingin melanjutkan, bukan memilih.
 */

import type { Metadata } from "next";
import { requireRole } from "@/lib/services/auth.service";
import { getChildDashboardData } from "@/lib/services/dashboard.service";
import { WorldMap } from "@/components/dashboard/world-map";
import { ContinueCard } from "@/components/dashboard/continue-card";
import { ChildNav } from "@/components/dashboard/child-nav";
import { AchievementRow } from "@/components/dashboard/achievement-badge";
import { Specimen } from "@/components/illustrations/specimens";
import { LatarAlam } from "@/components/shared/latar-alam";
import { computeAchievements } from "@/lib/achievements";

export const metadata: Metadata = { title: "Peta Dunia" };

// Kemajuan harus selalu segar begitu satu aktivitas selesai.
export const dynamic = "force-dynamic";

export default async function PlayHomePage() {
  const user = await requireRole(["CHILD"]);
  const data = await getChildDashboardData(user.id);

  const capaian = computeAchievements({
    totalCompletedActivities: data.totalCompletedActivities,
    completedWorlds: data.completedWorlds,
    totalWorlds: data.totalWorlds,
  });

  const lanjut = data.activeSession ?? data.nextRecommended;
  const baru = data.totalCompletedActivities === 0;

  return (
    <>
      <LatarAlam ragam="tenang" />
      <main className="mx-auto w-full max-w-3xl px-4 pb-28 pt-6 sm:px-6">
        {/* Sapaan */}
        <header className="mb-6 flex items-center gap-3.5">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-daun/40 bg-kertas-lo shadow-tile">
            <Specimen id="tunas" size={30} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="label-spesimen text-tinta-soft">Jurnal lapangan</p>
            <h1 className="truncate font-display text-judul font-extrabold text-tinta">
              {data.child.displayName}
            </h1>
          </div>
          <div className="shrink-0 rounded-tile border-2 border-kertas-deep bg-kertas-lo px-3 py-1.5 text-center">
            <p className="font-label text-besar font-bold tabular-nums leading-none text-daun-hi">
              {data.totalCompletedActivities}
            </p>
            <p className="label-spesimen mt-1 text-tinta-faint">selesai</p>
          </div>
        </header>

        {/* Satu tombol lanjut */}
        {lanjut && (
          <div className="mb-6">
            <ContinueCard activityId={lanjut.activityId} lanjutan={data.activeSession !== null} />
          </div>
        )}

        {baru && (
          <p className="mb-6 rounded-kartu border-2 border-dashed border-daun/40 bg-daun-lo/20 px-5 py-4 text-kecil leading-relaxed text-tinta-mid">
            Jurnalmu masih kosong. Setiap aktivitas yang kamu selesaikan akan meninggalkan catatan di sini.
          </p>
        )}

        {/* Peta dunia */}
        <section className="mb-6">
          <p className="label-spesimen mb-3 text-tinta-soft">
            Empat dunia · {data.completedWorlds} dari {data.totalWorlds} tuntas
          </p>
          <WorldMap worlds={data.worlds} />
        </section>

        <AchievementRow items={capaian} />
      </main>
      <ChildNav />
    </>
  );
}
