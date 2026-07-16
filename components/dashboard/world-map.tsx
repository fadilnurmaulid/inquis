"use client";

/**
 * Peta dunia — dan kerangka muatnya.
 *
 * Sama seperti WorldCard: peta dan kerangkanya tinggal di satu berkas
 * dan berbagi konstanta KISI. Dulu keduanya ditulis terpisah dengan
 * jumlah kolom yang ditebak sendiri, jadi tata letak melompat begitu
 * data datang. Sekarang tidak bisa.
 */

import { WorldCard, WorldCardSkeleton } from "@/components/dashboard/world-card";
import type { WorldProgressSummary } from "@/lib/services/dashboard.service";

/** Satu-satunya sumber kebenaran tata kisi. Dibaca peta dan kerangkanya. */
const KISI = "grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2";

export function WorldMap({ worlds }: { worlds: WorldProgressSummary[] }) {
  return (
    <ul className={KISI} aria-label="Peta dunia">
      {worlds.map((w, i) => (
        <WorldCard key={w.worldId} data={w} urut={i} />
      ))}
    </ul>
  );
}

export function WorldMapSkeleton({ jumlah = 4 }: { jumlah?: number }) {
  return (
    <ul className={KISI} aria-hidden>
      {Array.from({ length: jumlah }).map((_, i) => (
        <WorldCardSkeleton key={i} />
      ))}
    </ul>
  );
}
