/**
 * Peta mode coba — /demo/peta
 *
 * Semua terbuka. Tidak ada gerbang, tidak ada kunci, tidak ada urutan
 * wajib: yang datang ke sini ingin melihat isinya, bukan menamatkannya.
 * Gerbang dan urutan tetap berlaku di mode main, tempat kemajuannya
 * sungguhan.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Specimen } from "@/components/illustrations/specimens";
import { LatarAlam } from "@/components/shared/latar-alam";
import { Logo } from "@/components/brand/logo";
import { aktivitasDunia } from "@/lib/game/content";
import { NAMA_JENIS } from "@/lib/game/types";
import { WORLDS } from "@/types";

export const metadata: Metadata = {
  title: "Pilih aktivitas · Coba dulu",
  description: "Semua aktivitas terbuka. Coba yang mana saja.",
};

export default function DemoPetaPage() {
  return (
    <>
      <LatarAlam ragam="tenang" />
      <main className="mx-auto w-full max-w-4xl px-4 pb-16 pt-6 sm:px-6">
        <header className="mb-8 flex flex-col gap-5">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/demo"
              className="target-sentuh inline-flex items-center gap-1.5 rounded-full border-2 border-kertas-deep bg-kertas-lo px-3.5 font-display text-kecil font-bold text-tinta-mid shadow-tile transition-all duration-cepat ease-pegas hover:-translate-y-0.5 hover:border-tinta-faint active:translate-y-0.5 active:shadow-tekan"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Kembali
            </Link>
            <Logo size={30} />
          </div>

          <div className="flex flex-col gap-1.5">
            <p className="label-spesimen text-tinta-soft">Mode coba</p>
            <h1 className="font-display text-pekik font-extrabold text-tinta">Pilih aktivitas mana saja</h1>
            <p className="max-w-xl text-badan leading-relaxed text-tinta-mid teks-seimbang">
              Dua puluh aktivitas, sepuluh jenis permainan. Semuanya terbuka di sini. Kemajuannya tidak
              disimpan — muat ulang halaman dan semuanya kembali kosong.
            </p>
          </div>
        </header>

        <div className="flex flex-col gap-8">
          {WORLDS.map((w) => {
            const daftar = aktivitasDunia(w.id);
            return (
              <section key={w.id}>
                <div className="mb-3 flex items-center gap-3">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 bg-kertas-lo"
                    style={{ borderColor: w.themeColor }}
                  >
                    <Specimen id={w.companionSpecimen} size={26} label={w.companionName} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="label-spesimen" style={{ color: w.themeColor }}>
                      Dunia {w.number}
                    </p>
                    <h2 className="font-display text-besar font-extrabold text-tinta">{w.titleBahasa}</h2>
                  </div>
                </div>
                <p className="mb-3 text-kecil text-tinta-mid">{w.description}</p>

                <ul className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {daftar.map((a) => (
                    <li key={a.id} className="flex">
                      <Link
                        href={`/demo/main/${a.id}`}
                        className="group flex w-full flex-col gap-2 rounded-kartu border-2 border-kertas-deep bg-kertas-lo p-4 shadow-tile transition-all duration-cepat ease-pegas hover:-translate-y-1 hover:shadow-angkat active:translate-y-0 active:shadow-tekan"
                        style={{ borderTopColor: w.themeColor, borderTopWidth: 4 }}
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="label-spesimen text-tinta-soft">Aktivitas {a.nomor}</span>
                          <span
                            className="label-spesimen rounded px-1.5 py-0.5"
                            style={{ backgroundColor: `${w.themeColor}1F`, color: w.themeColor }}
                          >
                            {NAMA_JENIS[a.tantangan.kind]}
                          </span>
                        </span>
                        <span className="font-display text-badan font-bold leading-tight text-tinta">{a.judul}</span>
                        <span className="line-clamp-2 flex-1 text-mikro leading-relaxed text-tinta-soft">
                          {a.pemantik}
                        </span>
                        <span
                          className="mt-1 inline-flex items-center gap-1 font-display text-mikro font-bold transition-transform duration-cepat group-hover:translate-x-0.5"
                          style={{ color: w.themeColor }}
                        >
                          Coba
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </main>
    </>
  );
}
