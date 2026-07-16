/**
 * Halaman tidak ditemukan — 404
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Home } from "lucide-react";
import { Specimen } from "@/components/illustrations/specimens";
import { LatarAlam } from "@/components/shared/latar-alam";

export const metadata: Metadata = { title: "Halaman tidak ditemukan" };

export default function NotFound() {
  return (
    <>
      <LatarAlam ragam="tenang" />
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-kartu border-2 border-kertas-deep bg-kertas-lo p-8 text-center shadow-kertas">
          <span className="flex h-16 w-16 animate-apung items-center justify-center rounded-full border-2 border-kertas-deep bg-kertas">
            <Specimen id="kaca-pembesar" size={36} />
          </span>

          <div>
            <p className="label-spesimen mb-1.5 text-tinta-faint">404</p>
            <h1 className="font-display text-judul font-extrabold text-tinta">Tidak ada apa-apa di sini</h1>
            <p className="mt-1.5 text-kecil leading-relaxed text-tinta-mid">
              Halaman yang kamu cari sudah pindah atau memang belum pernah ada.
            </p>
          </div>

          <Link
            href="/"
            className="target-sentuh mt-1 inline-flex items-center gap-2 rounded-full border-2 border-daun-hi bg-daun px-7 font-display text-besar font-extrabold text-kertas-lo shadow-angkat transition-all duration-cepat ease-pegas hover:-translate-y-0.5 hover:bg-daun-hi active:translate-y-0.5 active:shadow-tekan"
          >
            <Home className="h-4 w-4" aria-hidden />
            Ke beranda
          </Link>
        </div>
      </main>
    </>
  );
}
