"use client";

/**
 * Batas galat global.
 *
 * Tidak pernah menampilkan jejak tumpukan ke pengguna. Pesan aslinya
 * hanya muncul saat pengembangan, di kotak terpisah.
 */

import { useEffect } from "react";
import Link from "next/link";
import { Home, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Specimen } from "@/components/illustrations/specimens";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[GlobalError]", error.digest ?? error.message);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-kertas px-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-kartu border-2 border-kertas-deep bg-kertas-lo p-8 text-center shadow-kertas">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-tanah/30 bg-tanah-lo/25">
          <Specimen id="daun-kering" size={36} />
        </span>

        <div>
          <h1 className="font-display text-judul font-extrabold text-tinta">Ada yang tersangkut</h1>
          <p className="mt-1.5 text-kecil leading-relaxed text-tinta-mid">
            Halaman ini gagal terbuka. Coba muat ulang, atau kembali ke beranda.
          </p>
        </div>

        {process.env.NODE_ENV === "development" && (
          <p className="w-full rounded-tile bg-tanah-lo/30 px-3.5 py-2.5 text-left font-label text-mikro text-tanah-hi">
            {error.message}
          </p>
        )}

        <div className="flex flex-col items-center gap-2.5 pt-1">
          <Button onClick={reset} size="besar">
            <RotateCcw aria-hidden />
            Coba lagi
          </Button>
          <Button asChild variant="kertas" size="kecil">
            <Link href="/">
              <Home aria-hidden />
              Ke beranda
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
