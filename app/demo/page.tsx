/**
 * Halaman coba — /demo
 *
 * Dua jalan, dan bedanya ditulis terang-terangan:
 *
 *   Coba dulu   → tanpa masuk, semua terbuka, tidak ada yang disimpan
 *   Masuk       → akun anak sungguhan, kemajuannya tersimpan
 *
 * Layar guru dan orang tua sudah tidak ada. Produk ini dipakai anak.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { DemoLoginSection } from "@/components/auth/demo-login-section";
import { Specimen } from "@/components/illustrations/specimens";
import { LatarAlam } from "@/components/shared/latar-alam";
import { Logo } from "@/components/brand/logo";
import { SEMUA_AKTIVITAS } from "@/lib/game/content";
import { NAMA_JENIS } from "@/lib/game/types";

export const metadata: Metadata = {
  title: "Coba dulu",
  description: "Mainkan dua puluh aktivitas tanpa mendaftar, atau masuk sebagai anak untuk menyimpan kemajuan.",
};

const jenis = Array.from(new Set(SEMUA_AKTIVITAS.map((a) => a.tantangan.kind)));

export default function DemoPage() {
  return (
    <>
      <LatarAlam />
      <main className="mx-auto w-full max-w-3xl px-4 pb-16 pt-6 sm:px-6">
        <header className="mb-8 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="target-sentuh inline-flex items-center gap-1.5 rounded-full border-2 border-kertas-deep bg-kertas-lo px-3.5 font-display text-kecil font-bold text-tinta-mid shadow-tile transition-all duration-cepat ease-pegas hover:-translate-y-0.5 hover:border-tinta-faint active:translate-y-0.5 active:shadow-tekan"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Kembali
          </Link>
          <Logo size={30} />
        </header>

        <div className="mb-8 flex flex-col gap-2">
          <h1 className="font-display text-pekik font-extrabold text-tinta">Mau mulai dari mana?</h1>
          <p className="max-w-xl text-badan leading-relaxed text-tinta-mid teks-seimbang">
            Dua pilihan. Yang pertama untuk melihat-lihat, yang kedua untuk benar-benar belajar.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2">
          {/* Jalan 1 — tanpa masuk */}
          <section className="flex flex-col gap-3 rounded-kartu border-2 border-daun/50 bg-kertas-lo p-5 shadow-kertas">
            <div className="flex items-center gap-2.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-daun/40 bg-daun-lo/30">
                <Specimen id="kaca-pembesar" size={26} />
              </span>
              <div>
                <p className="label-spesimen text-daun-hi">Tanpa masuk</p>
                <h2 className="font-display text-besar font-extrabold text-tinta">Coba dulu</h2>
              </div>
            </div>

            <ul className="flex flex-1 flex-col gap-1.5 text-kecil text-tinta-mid">
              <li>Dua puluh aktivitas, semuanya terbuka.</li>
              <li>Tidak perlu daftar atau mengisi apa pun.</li>
              <li>Kemajuan tidak disimpan. Muat ulang, semuanya kosong lagi.</li>
            </ul>

            <Link
              href="/demo/peta"
              className="target-sentuh mt-1 inline-flex items-center justify-center gap-2 rounded-full border-2 border-daun-hi bg-daun px-6 font-display text-besar font-extrabold text-kertas-lo shadow-angkat transition-all duration-cepat ease-pegas hover:-translate-y-0.5 hover:bg-daun-hi active:translate-y-0.5 active:shadow-tekan"
            >
              Mulai coba
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </section>

          {/* Jalan 2 — masuk */}
          <section className="flex flex-col gap-3 rounded-kartu border-2 border-kertas-deep bg-kertas-lo p-5 shadow-kertas">
            <div className="flex items-center gap-2.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-kertas-deep bg-kertas">
                <Specimen id="tunas" size={26} />
              </span>
              <div>
                <p className="label-spesimen text-tinta-soft">Dengan akun</p>
                <h2 className="font-display text-besar font-extrabold text-tinta">Masuk sebagai anak</h2>
              </div>
            </div>

            <div className="flex-1">
              <DemoLoginSection />
            </div>

            <p className="text-mikro leading-relaxed text-tinta-soft">
              Punya akun sendiri?{" "}
              <Link href="/login" className="font-semibold text-daun-hi underline underline-offset-2">
                Masuk di sini
              </Link>
              .
            </p>
          </section>
        </div>

        {/* Isi ringkas */}
        <section className="mt-8 rounded-kartu border-2 border-kertas-deep bg-kertas-lo/70 p-5">
          <p className="label-spesimen mb-3 text-tinta-soft">Yang akan kamu temui</p>
          <ul className="flex flex-wrap gap-2">
            {jenis.map((j) => (
              <li
                key={j}
                className="rounded-full border-2 border-kertas-deep bg-kertas px-3 py-1 font-display text-mikro font-bold text-tinta-mid"
              >
                {NAMA_JENIS[j]}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-kecil leading-relaxed text-tinta-mid">
            Sepuluh jenis permainan, dibagi ke empat dunia. Tiap aktivitas berjalan lewat tahap yang sama:
            amati, tebak, buktikan, lalu ceritakan caramu.
          </p>
        </section>
      </main>
    </>
  );
}
