"use client";

/**
 * Layar galat area anak.
 *
 * Ditulis untuk anak umur enam: kalimat pendek, tanpa istilah teknis,
 * tanpa menyalahkan dia. Selalu ada dua jalan keluar yang bisa diketuk.
 */

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcw, Map } from "lucide-react";
import { Specimen } from "@/components/illustrations/specimens";

export default function PlayError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[play]", error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-kartu border-2 border-kertas-deep bg-kertas-lo p-8 text-center shadow-kertas">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-tanah/30 bg-tanah-lo/25">
          <Specimen id="daun-kering" size={36} />
        </span>

        <div>
          <h1 className="font-display text-judul font-extrabold text-tinta">Ada yang tersangkut</h1>
          <p className="mt-1.5 text-kecil leading-relaxed text-tinta-mid">
            Bukan salahmu. Halaman ini gagal terbuka. Coba muat ulang, atau kembali ke peta.
          </p>
        </div>

        <div className="flex flex-col items-center gap-2.5 pt-1">
          <button
            type="button"
            onClick={reset}
            className="target-sentuh inline-flex items-center gap-2 rounded-full border-2 border-daun-hi bg-daun px-7 font-display text-besar font-extrabold text-kertas-lo shadow-angkat transition-all duration-cepat ease-pegas hover:-translate-y-0.5 hover:bg-daun-hi active:translate-y-0.5 active:shadow-tekan"
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
            Coba lagi
          </button>
          <Link
            href="/play/home"
            className="target-sentuh inline-flex items-center gap-1.5 rounded-full border-2 border-kertas-deep bg-kertas-lo px-4 font-display text-kecil font-bold text-tinta-mid shadow-tile transition-all duration-cepat ease-pegas hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-tekan"
          >
            <Map className="h-4 w-4" aria-hidden />
            Kembali ke peta
          </Link>
        </div>
      </div>
    </main>
  );
}
