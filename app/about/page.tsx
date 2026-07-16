/**
 * Tentang — /about
 *
 * Halaman ini menjelaskan pilihan pedagogisnya kepada orang dewasa yang
 * bertanya "kenapa begini?". Bukan brosur: tiap klaim dipasangkan dengan
 * hal konkret yang benar-benar ada di dalam produk.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Specimen, type SpecimenId } from "@/components/illustrations/specimens";
import { LatarAlam } from "@/components/shared/latar-alam";
import { SEMUA_AKTIVITAS } from "@/lib/game/content";
import { NAMA_TAHAP, TAHAP_INKUIRI } from "@/lib/game/types";
import { WORLDS } from "@/types";

export const metadata: Metadata = {
  title: "Tentang",
  description:
    "Kenapa INQUIS dibangun seperti ini: inkuiri matematis untuk anak 5–7 tahun, dengan kepedulian lingkungan sebagai bahannya, bukan tempelannya.",
};

const TAHAP_ISI: Record<(typeof TAHAP_INKUIRI)[number], { spesimen: SpecimenId; isi: string }> = {
  tujuan: { spesimen: "biji", isi: "Ditulis dari sisi anak: “Kamu akan…”, bukan “Peserta didik mampu…”." },
  pemantik: { spesimen: "kaca-pembesar", isi: "Pertanyaan terbuka yang tidak bisa dijawab ya atau tidak." },
  eksplorasi: { spesimen: "daun-hijau", isi: "Menyentuh dan mengamati dulu. Belum ada benar-salah di sini." },
  prediksi: { spesimen: "awan", isi: "Anak berkomitmen pada satu tebakan sebelum mencoba." },
  eksperimen: { spesimen: "gelas-ukur", isi: "Permainannya. Di sinilah tebakan tadi diuji." },
  refleksi: { spesimen: "kupu-kupu", isi: "Menceritakan caranya berpikir. Tidak ada jawaban salah." },
  penguatan: { spesimen: "tunas", isi: "Baru di sini matematikanya diberi nama." },
  karakter: { spesimen: "pohon-besar", isi: "Satu tindakan nyata yang bisa dikerjakan hari itu juga." },
};

const PANCASILA = [
  {
    dimensi: "Bernalar kritis",
    spesimen: "kaca-pembesar" as SpecimenId,
    bukti: "Prediksi direkam sebelum percobaan dan dibandingkan sesudahnya. Anak melihat sendiri saat tebakannya meleset.",
  },
  {
    dimensi: "Mandiri",
    spesimen: "tunas" as SpecimenId,
    bukti: "Petunjuk berjenjang, dan tidak ada satu pun yang menyebut jawaban akhir. Bantuan yang dipakai dicatat sebagai ukuran kemandirian.",
  },
  {
    dimensi: "Kreatif",
    spesimen: "bunga-matahari" as SpecimenId,
    bukti: "Di Dunia 3 anak bebas menggeser tuas sesukanya sebelum diminta menebak. Laboratoriumnya tidak punya jawaban tunggal.",
  },
  {
    dimensi: "Peduli lingkungan",
    spesimen: "pohon-besar" as SpecimenId,
    bukti: "Bahan hitungannya adalah kompos, sampah, dan tanaman. Tiap aktivitas ditutup satu ajakan bertindak.",
  },
];

export default function AboutPage() {
  const jumlahJenis = new Set(SEMUA_AKTIVITAS.map((a) => a.tantangan.kind)).size;

  return (
    <>
      <LatarAlam />
      <main className="mx-auto w-full max-w-3xl px-4 pb-16 pt-6 sm:px-6">
        <header className="mb-10 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="target-sentuh inline-flex items-center gap-1.5 rounded-full border-2 border-kertas-deep bg-kertas-lo px-3.5 font-display text-kecil font-bold text-tinta-mid shadow-tile transition-all duration-cepat ease-pegas hover:-translate-y-0.5 hover:border-tinta-faint active:translate-y-0.5 active:shadow-tekan"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Beranda
          </Link>
          <Logo size={30} />
        </header>

        {/* Pembuka */}
        <section className="mb-12 flex flex-col gap-3">
          <p className="label-spesimen text-tinta-soft">Tentang</p>
          <h1 className="font-display text-raksasa font-extrabold leading-tight text-tinta teks-seimbang">
            Kenapa dibangun seperti ini
          </h1>
          <p className="text-besar leading-relaxed text-tinta-mid teks-seimbang">
            INQUIS bukan lembar kerja yang dipindah ke layar. Anak tidak diberi aturan lalu disuruh
            melatihnya. Dia mengamati, menebak, membuktikan — dan baru setelah itu diberi tahu nama
            matematikanya.
          </p>
        </section>

        {/* Masalah */}
        <section className="kartu-kertas mb-8 p-6">
          <p className="label-spesimen mb-3 text-tinta-soft">Yang mau diperbaiki</p>
          <h2 className="mb-3 font-display text-judul font-extrabold text-tinta teks-seimbang">
            Anak bisa menjawab tanpa pernah bertanya
          </h2>
          <div className="flex flex-col gap-3 text-badan leading-relaxed text-tinta-mid">
            <p>
              Kebanyakan aplikasi matematika untuk usia dini menukar hafalan kertas dengan hafalan
              layar. Soal muncul, anak menebak, muncul tanda benar atau salah, lanjut. Yang dilatih
              kecepatan mengenali, bukan cara berpikir.
            </p>
            <p>
              Padahal usia 5–7 adalah saat anak paling sering bertanya. Kalau di masa itu ia terbiasa
              menunggu jawaban muncul di layar, kebiasaan bertanya itu justru dilatih untuk hilang.
            </p>
          </div>
        </section>

        {/* Delapan tahap */}
        <section className="mb-8">
          <div className="mb-4 flex flex-col gap-1.5">
            <p className="label-spesimen text-tinta-soft">Struktur</p>
            <h2 className="font-display text-judul font-extrabold text-tinta">
              Delapan tahap, dan tidak bisa dilompati
            </h2>
            <p className="text-badan leading-relaxed text-tinta-mid teks-seimbang">
              Urutan ini bukan anjuran, melainkan bentuk datanya. Di{" "}
              <code className="rounded bg-kertas-hi px-1.5 py-0.5 font-label text-mikro">lib/game/types.ts</code>,
              kedelapan tahap adalah bidang wajib. Aktivitas yang melewatkan satu tahap ditolak
              TypeScript sebelum sempat dijalankan.
            </p>
          </div>

          <ol className="flex flex-col gap-2.5">
            {TAHAP_INKUIRI.map((t, i) => (
              <li key={t} className="flex items-start gap-3 rounded-tile border-2 border-kertas-deep bg-kertas-lo p-3.5 shadow-tile">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-kertas-deep bg-kertas">
                  <Specimen id={TAHAP_ISI[t].spesimen} size={22} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex items-baseline gap-2">
                    <span className="label-spesimen text-tinta-faint">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-badan font-bold text-tinta">{NAMA_TAHAP[t]}</span>
                  </p>
                  <p className="mt-0.5 text-kecil leading-relaxed text-tinta-mid">{TAHAP_ISI[t].isi}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Empat dunia */}
        <section className="mb-8">
          <div className="mb-4 flex flex-col gap-1.5">
            <p className="label-spesimen text-tinta-soft">Isi</p>
            <h2 className="font-display text-judul font-extrabold text-tinta">
              {SEMUA_AKTIVITAS.length} aktivitas, {jumlahJenis} jenis permainan
            </h2>
            <p className="text-badan leading-relaxed text-tinta-mid teks-seimbang">
              Tiap dunia punya mesin permainannya sendiri. Dunia 4 tidak sekadar “lebih sulit” dari
              Dunia 1 — cara mainnya memang lain.
            </p>
          </div>

          <ul className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2">
            {WORLDS.map((w) => {
              const jenisDunia = Array.from(
                new Set(SEMUA_AKTIVITAS.filter((a) => a.worldId === w.id).map((a) => a.tantangan.kind))
              );
              return (
                <li key={w.id} className="flex">
                  <article
                    className="flex w-full flex-col gap-2 rounded-kartu border-2 border-kertas-deep bg-kertas-lo p-4 shadow-tile"
                    style={{ borderLeftColor: w.themeColor, borderLeftWidth: 5 }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 bg-kertas"
                        style={{ borderColor: w.themeColor }}
                      >
                        <Specimen id={w.companionSpecimen} size={24} label={w.companionName} />
                      </span>
                      <div className="min-w-0">
                        <p className="label-spesimen" style={{ color: w.themeColor }}>
                          Dunia {w.number}
                        </p>
                        <h3 className="font-display text-badan font-bold leading-tight text-tinta">
                          {w.titleBahasa}
                        </h3>
                      </div>
                    </div>
                    <p className="flex-1 text-mikro leading-relaxed text-tinta-mid">{w.description}</p>
                    <p className="text-mikro text-tinta-faint">{jenisDunia.length} mesin permainan</p>
                  </article>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Kurikulum */}
        <section className="kartu-kertas mb-8 p-6">
          <p className="label-spesimen mb-2 text-tinta-soft">Kurikulum Merdeka</p>
          <h2 className="mb-1.5 font-display text-judul font-extrabold text-tinta">
            Profil Pelajar Pancasila
          </h2>
          <p className="mb-5 text-kecil leading-relaxed text-tinta-mid">
            Empat dimensi yang paling erat, beserta bagian produk yang benar-benar mengerjakannya.
          </p>

          <ul className="flex flex-col gap-3">
            {PANCASILA.map((p) => (
              <li key={p.dimensi} className="flex items-start gap-3 rounded-tile bg-kertas p-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-kertas-deep bg-kertas-lo">
                  <Specimen id={p.spesimen} size={20} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-badan font-bold text-daun-hi">{p.dimensi}</p>
                  <p className="mt-0.5 text-kecil leading-relaxed text-tinta-mid">{p.bukti}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Lingkungan bukan tempelan */}
        <section className="mb-10 rounded-kartu border-2 border-daun/40 bg-daun-lo/20 p-6">
          <p className="label-spesimen mb-2 text-daun-hi">Peduli lingkungan</p>
          <h2 className="mb-3 font-display text-judul font-extrabold text-tinta teks-seimbang">
            Bahannya, bukan hiasannya
          </h2>
          <p className="text-badan leading-relaxed text-tinta-mid teks-seimbang">
            Gampang menempelkan pesan lingkungan di akhir soal yang sebenarnya tentang apel dan jeruk.
            Di sini yang dihitung memang bahan kompos: tiga cangkang telur, satu liter air cucian
            beras, dua ratus gram daun kering. Anak menemukan bahwa satu bahan habis lebih dulu — dan
            itulah pembagian. Matematikanya tidak bisa dipisahkan dari bahannya.
          </p>
        </section>

        {/* Ajakan */}
        <section className="flex flex-col items-center gap-4 rounded-kartu border-2 border-kertas-deep bg-kertas-lo p-8 text-center shadow-kertas">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-daun/40 bg-daun-lo/30">
            <Specimen id="kaca-pembesar" size={30} />
          </span>
          <h2 className="max-w-md font-display text-judul font-extrabold text-tinta teks-seimbang">
            Penjelasan paling jujur ada di dalam produknya.
          </h2>
          <Link
            href="/demo"
            className="target-sentuh inline-flex items-center gap-2 rounded-full border-2 border-daun-hi bg-daun px-7 font-display text-besar font-extrabold text-kertas-lo shadow-angkat transition-all duration-cepat ease-pegas hover:-translate-y-0.5 hover:bg-daun-hi active:translate-y-0.5 active:shadow-tekan"
          >
            Coba satu aktivitas
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </section>
      </main>
    </>
  );
}
