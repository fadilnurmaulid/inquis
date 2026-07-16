/**
 * Profil anak — /play/profile
 *
 * Bukan papan skor. Yang ditampilkan: siapa dia, apa yang sudah
 * dikerjakan, dan apa yang menunggu. Angka-angka disimpan kecil dan
 * tidak dibandingkan dengan siapa pun.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Map } from "lucide-react";
import { requireRole } from "@/lib/services/auth.service";
import { getChildDashboardData } from "@/lib/services/dashboard.service";
import { ChildNav } from "@/components/dashboard/child-nav";
import { AchievementRow } from "@/components/dashboard/achievement-badge";
import { Specimen } from "@/components/illustrations/specimens";
import { LatarAlam } from "@/components/shared/latar-alam";
import { computeAchievements } from "@/lib/achievements";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Profil" };
export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const user = await requireRole(["CHILD"]);
  const data = await getChildDashboardData(user.id);

  const capaian = computeAchievements({
    totalCompletedActivities: data.totalCompletedActivities,
    completedWorlds: data.completedWorlds,
    totalWorlds: data.totalWorlds,
  });

  const totalAktivitas = data.worlds.reduce((n, w) => n + w.totalActivities, 0);

  return (
    <>
      <LatarAlam ragam="tenang" />
      <main className="mx-auto w-full max-w-2xl px-4 pb-28 pt-6 sm:px-6">
        {/* Kepala */}
        <header className="mb-6 flex flex-col items-center gap-3 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-daun/40 bg-kertas-lo shadow-kertas">
            <Specimen id="tunas" size={44} />
          </span>
          <div>
            <p className="label-spesimen text-tinta-soft">Penjelajah</p>
            <h1 className="font-display text-pekik font-extrabold text-tinta">{data.child.displayName}</h1>
          </div>
        </header>

        {/* Angka ringkas */}
        <section className="mb-6 grid grid-cols-3 items-stretch gap-3">
          {[
            { nilai: data.totalCompletedActivities, dari: totalAktivitas, label: "Aktivitas" },
            { nilai: data.completedWorlds, dari: data.totalWorlds, label: "Dunia tuntas" },
            { nilai: capaian.filter((c) => c.earned).length, dari: capaian.length, label: "Capaian" },
          ].map((k) => (
            <div
              key={k.label}
              className="flex flex-col items-center justify-center gap-1 rounded-kartu border-2 border-kertas-deep bg-kertas-lo p-4 shadow-tile"
            >
              <p className="font-label text-judul font-bold leading-none tabular-nums text-daun-hi">
                {k.nilai}
                <span className="text-kecil text-tinta-faint">/{k.dari}</span>
              </p>
              <p className="label-spesimen text-center text-tinta-soft">{k.label}</p>
            </div>
          ))}
        </section>

        {/* Kemajuan tiap dunia */}
        <section className="kartu-kertas mb-6 p-5">
          <p className="label-spesimen mb-3 text-tinta-soft">Kemajuan tiap dunia</p>
          <ul className="flex flex-col gap-3.5">
            {data.worlds.map((w) => {
              const persen =
                w.totalActivities > 0 ? Math.round((w.completedActivities / w.totalActivities) * 100) : 0;
              const terkunci = w.status === "LOCKED";
              return (
                <li key={w.worldId} className="flex items-center gap-3">
                  <span
                    className={cn("label-spesimen w-16 shrink-0", terkunci && "text-tinta-faint")}
                    style={terkunci ? undefined : { color: w.themeColor }}
                  >
                    Dunia {w.worldNumber}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        "mb-1 block truncate text-mikro font-bold",
                        terkunci ? "text-tinta-faint" : "text-tinta"
                      )}
                    >
                      {w.titleBahasa}
                    </span>
                    <span className="block h-2 overflow-hidden rounded-full bg-kertas-hi">
                      <span
                        className="block h-full rounded-full transition-all duration-lambat ease-halus"
                        style={{ width: `${persen}%`, backgroundColor: terkunci ? "#AEBCB1" : w.themeColor }}
                      />
                    </span>
                  </span>
                  <span className="w-12 shrink-0 text-right font-label text-mikro font-bold tabular-nums text-tinta-soft">
                    {w.completedActivities}/{w.totalActivities}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        <div className="mb-6">
          <AchievementRow items={capaian} />
        </div>

        <div className="flex justify-center">
          <Link
            href="/play/home"
            className="target-sentuh inline-flex items-center gap-2 rounded-full border-2 border-daun-hi bg-daun px-7 font-display text-besar font-extrabold text-kertas-lo shadow-angkat transition-all duration-cepat ease-pegas hover:-translate-y-0.5 hover:bg-daun-hi active:translate-y-0.5 active:shadow-tekan"
          >
            <Map className="h-4 w-4" aria-hidden />
            Kembali ke peta
          </Link>
        </div>
      </main>
      <ChildNav />
    </>
  );
}
