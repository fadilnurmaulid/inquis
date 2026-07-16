/**
 * Kerangka muat beranda anak.
 *
 * Bentuknya mengikuti app/(child)/play/home/page.tsx baris demi baris:
 * sapaan, kartu lanjut, peta dunia, deret capaian. Kerangka yang tidak
 * seukuran halamannya justru bikin tata letak melompat — lebih buruk
 * daripada layar kosong.
 */

import { WorldMapSkeleton } from "@/components/dashboard/world-map";

export default function PlayLoading() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 pb-28 pt-6 sm:px-6" aria-busy>
      <span className="sr-only">Sedang memuat peta duniamu…</span>

      {/* Sapaan */}
      <header className="mb-6 flex items-center gap-3.5" aria-hidden>
        <span className="h-14 w-14 shrink-0 animate-pulse rounded-full border-2 border-kertas-deep bg-kertas-hi" />
        <div className="min-w-0 flex-1 space-y-2">
          <span className="block h-2.5 w-24 animate-pulse rounded-full bg-kertas-hi" />
          <span className="block h-5 w-40 animate-pulse rounded-full bg-kertas-hi" />
        </div>
        <span className="h-[3.25rem] w-16 shrink-0 animate-pulse rounded-tile border-2 border-kertas-deep bg-kertas-hi" />
      </header>

      {/* Kartu lanjut */}
      <div className="mb-6 flex items-center gap-4 rounded-kartu border-2 border-kertas-deep bg-kertas-lo p-5 shadow-tile" aria-hidden>
        <span className="h-16 w-16 shrink-0 animate-pulse rounded-full border-2 border-kertas-deep bg-kertas-hi" />
        <div className="min-w-0 flex-1 space-y-2">
          <span className="block h-2.5 w-32 animate-pulse rounded-full bg-kertas-hi" />
          <span className="block h-5 w-3/4 animate-pulse rounded-full bg-kertas-hi" />
          <span className="block h-2.5 w-28 animate-pulse rounded-full bg-kertas-hi" />
        </div>
        <span className="h-11 w-11 shrink-0 animate-pulse rounded-full bg-kertas-hi" />
      </div>

      {/* Peta dunia */}
      <section className="mb-6">
        <span className="mb-3 block h-2.5 w-48 animate-pulse rounded-full bg-kertas-hi" aria-hidden />
        <WorldMapSkeleton />
      </section>

      {/* Deret capaian */}
      <section className="kartu-kertas p-5" aria-hidden>
        <div className="mb-3 flex items-baseline justify-between gap-3">
          <span className="block h-2.5 w-20 animate-pulse rounded-full bg-kertas-hi" />
          <span className="block h-3 w-8 animate-pulse rounded-full bg-kertas-hi" />
        </div>
        <div className="flex gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex w-[5.25rem] shrink-0 flex-col items-center gap-1.5">
              <span className="h-14 w-14 animate-pulse rounded-full border-2 border-kertas-deep bg-kertas-hi" />
              <span className="block h-2.5 w-14 animate-pulse rounded-full bg-kertas-hi" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
