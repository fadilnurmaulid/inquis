/**
 * Halaman depan — /
 *
 * Satu tugas: membuat orang mengerti apa ini dalam sepuluh detik, lalu
 * memberi mereka satu tombol. Tidak ada jalur guru, tidak ada jalur
 * orang tua, tidak ada pita lomba. Hanya anak dan pekerjaannya.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Specimen } from "@/components/illustrations/specimens";
import { LatarAlam } from "@/components/shared/latar-alam";
import { SEMUA_AKTIVITAS } from "@/lib/game/content";
import { NAMA_TAHAP, TAHAP_INKUIRI } from "@/lib/game/types";
import { WORLDS } from "@/types";

export const metadata: Metadata = {
  title: "INQUIS · Jurnal lapangan anak",
  description:
    "Dua puluh aktivitas matematika untuk anak 5–7 tahun. Setiap aktivitas berangkat dari satu pertanyaan dan berakhir dengan satu tindakan kecil untuk lingkungan.",
};

const CATATAN_TAHAP: Record<(typeof TAHAP_INKUIRI)[number], string> = {
  tujuan: "Apa yang akan dia bisa setelah ini.",
  pemantik: "Satu pertanyaan yang belum ada jawabannya.",
  eksplorasi: "Menyentuh dulu. Belum ada benar-salah.",
  prediksi: "Menebak, dan berani salah.",
  eksperimen: "Membuktikan sendiri lewat permainan.",
  refleksi: "Menceritakan caranya berpikir tadi.",
  penguatan: "Baru di sini matematikanya diberi nama.",
  karakter: "Satu hal kecil untuk dilakukan hari ini.",
};

export default function HomePage() {
  return (
    <>
      <LatarAlam />

      <header className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4 py-5 sm:px-6">
        <Logo size={34} />
        <nav className="flex items-center gap-2">
          <Link
            href="/about"
            className="target-sentuh inline-flex items-center rounded-full px-3 font-display text-kecil font-bold text-tinta-mid transition-colors duration-cepat hover:text-tinta"
          >
            Tentang
          </Link>
          <Link
            href="/login"
            className="target-sentuh inline-flex items-center rounded-full border-2 border-kertas-deep bg-kertas-lo px-4 font-display text-kecil font-bold text-tinta shadow-tile transition-all duration-cepat ease-pegas hover:-translate-y-0.5 hover:border-tinta-faint active:translate-y-0.5 active:shadow-tekan"
          >
            Masuk
          </Link>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 pb-20 sm:px-6">
        {/* ── Bagian pembuka ── */}
        <section className="flex flex-col items-center gap-5 py-10 text-center sm:py-16">
          <p className="label-spesimen rounded-full border-2 border-kertas-deep bg-kertas-lo px-3 py-1 text-tinta-soft">
            Usia 5–7 tahun
          </p>

          <h1 className="max-w-3xl font-display text-raksasa font-extrabold leading-tight text-tinta teks-seimbang">
            Anak bertanya, mencoba, lalu tahu.
          </h1>

          <p className="max-w-xl text-besar leading-relaxed text-tinta-mid teks-seimbang">
            {SEMUA_AKTIVITAS.length} permainan matematika dari alam. Setiap permainan mulai dengan satu
            pertanyaan, dan berakhir dengan satu perbuatan baik.
          </p>

          <div className="flex flex-col items-center gap-3 pt-1 sm:flex-row">
            <Link
              href="/demo"
              className="target-sentuh group inline-flex items-center gap-2 rounded-full border-2 border-daun-hi bg-daun px-8 font-display text-besar font-extrabold text-kertas-lo shadow-angkat transition-all duration-cepat ease-pegas hover:-translate-y-0.5 hover:bg-daun-hi active:translate-y-0.5 active:shadow-tekan"
            >
              Coba sekarang
              <ArrowRight className="h-5 w-5 transition-transform duration-cepat group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <p className="text-kecil text-tinta-soft">Tanpa daftar. Langsung main.</p>
          </div>
        </section>

        {/* ── Empat dunia ── */}
        <section className="py-10">
          <div className="mb-5 flex flex-col gap-1.5">
            <p className="label-spesimen text-tinta-soft">Empat dunia</p>
            <h2 className="font-display text-judul font-extrabold text-tinta">
              Tiap dunia punya cara mainnya sendiri
            </h2>
          </div>

          <ul className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WORLDS.map((w) => (
              <li key={w.id} className="flex">
                <article
                  className="flex w-full flex-col gap-3 rounded-kartu border-2 border-kertas-deep bg-kertas-lo p-5 shadow-kertas"
                  style={{ borderTopColor: w.themeColor, borderTopWidth: 5 }}
                >
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-full border-2 bg-kertas"
                    style={{ borderColor: w.themeColor }}
                  >
                    <Specimen id={w.companionSpecimen} size={32} label={w.companionName} />
                  </span>
                  <div>
                    <p className="label-spesimen" style={{ color: w.themeColor }}>
                      Dunia {w.number}
                    </p>
                    <h3 className="font-display text-besar font-extrabold leading-tight text-tinta">
                      {w.titleBahasa}
                    </h3>
                  </div>
                  <p className="flex-1 text-kecil leading-relaxed text-tinta-mid">{w.description}</p>
                  <p className="label-spesimen text-tinta-faint">{w.activityCount} aktivitas</p>
                </article>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Delapan tahap ── */}
        <section className="py-10">
          <div className="mb-5 flex flex-col gap-1.5">
            <p className="label-spesimen text-tinta-soft">Isi satu aktivitas</p>
            <h2 className="font-display text-judul font-extrabold text-tinta">Delapan tahap, selalu berurutan</h2>
            <p className="max-w-2xl text-badan leading-relaxed text-tinta-mid teks-seimbang">
              Anak mengamati, menebak, membuktikan — baru diberi tahu namanya.
            </p>
          </div>

          <ol className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {TAHAP_INKUIRI.map((t, i) => (
              <li key={t} className="flex">
                <div className="flex w-full flex-col gap-1.5 rounded-tile border-2 border-kertas-deep bg-kertas-lo p-4 shadow-tile">
                  <span className="label-spesimen text-tinta-faint">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-badan font-bold text-tinta">{NAMA_TAHAP[t]}</span>
                  <span className="text-mikro leading-relaxed text-tinta-soft">{CATATAN_TAHAP[t]}</span>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Ajakan penutup ── */}
        <section className="mt-6 flex flex-col items-center gap-4 rounded-kartu border-2 border-kertas-deep bg-kertas-lo p-8 text-center shadow-kertas">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-daun/40 bg-daun-lo/30">
            <Specimen id="tunas" size={32} />
          </span>
          <h2 className="max-w-lg font-display text-judul font-extrabold text-tinta teks-seimbang">
            Cara tercepat menilainya: mainkan satu aktivitas.
          </h2>
          <p className="max-w-md text-kecil leading-relaxed text-tinta-mid">
            Sekitar lima menit. Tidak perlu akun.
          </p>
          <Link
            href="/demo"
            className="target-sentuh inline-flex items-center gap-2 rounded-full border-2 border-daun-hi bg-daun px-7 font-display text-besar font-extrabold text-kertas-lo shadow-angkat transition-all duration-cepat ease-pegas hover:-translate-y-0.5 hover:bg-daun-hi active:translate-y-0.5 active:shadow-tekan"
          >
            Buka aktivitas
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </section>
      </main>

      <footer className="border-t-2 border-kertas-deep/60">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row sm:px-6">
          <Logo size={26} tagline="" />
          <nav className="flex items-center gap-4 text-kecil text-tinta-mid">
            <Link href="/about" className="transition-colors duration-cepat hover:text-tinta">
              Tentang
            </Link>
            <Link href="/demo" className="transition-colors duration-cepat hover:text-tinta">
              Coba
            </Link>
            <Link href="/login" className="transition-colors duration-cepat hover:text-tinta">
              Masuk
            </Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
