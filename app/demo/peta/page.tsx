/**
 * Peta mode coba — /demo/peta
 *
 * Semua terbuka: yang datang ke sini ingin melihat isinya, bukan
 * menamatkannya. Gerbang tetap berlaku di mode main.
 *
 * Tata rupa: empat gerbang dunia besar berwarna penuh di atas, lalu
 * aktivitasnya berkelompok di bawah dengan rona dunianya. Pendamping
 * dunia mengapung — halaman ini harus terasa hidup sebelum satu kata
 * pun dibaca.
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
  title: "Pilih dunia · Coba dulu",
  description: "Empat dunia, semua terbuka. Mau main yang mana?",
};

export default function DemoPetaPage() {
  return (
    <>
      <LatarAlam />
      <main className="mx-auto w-full max-w-4xl px-4 pb-16 pt-6 sm:px-6">
        <header className="mb-7 flex flex-col gap-6">
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

          <div className="text-center">
            <h1 className="font-display text-pekik font-extrabold text-tinta">Mau main yang mana?</h1>
            <p className="mt-1 text-badan text-tinta-mid">Semua terbuka. Ketuk saja!</p>
          </div>

          {/* Empat gerbang dunia — warna penuh, pendamping mengapung. */}
          <nav aria-label="Pilih dunia" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {WORLDS.map((w, i) => (
              <a
                key={w.id}
                href={`#${w.id}`}
                className="group relative flex flex-col items-center gap-2 overflow-hidden rounded-kartu border-2 p-4 pt-5 text-center shadow-kertas transition-all duration-cepat ease-pegas hover:-translate-y-1.5 hover:shadow-angkat active:translate-y-0 active:shadow-tekan"
                style={{ backgroundColor: w.themeColor, borderColor: w.themeColor }}
              >
                {/* Lingkaran cahaya di belakang pendamping */}
                <span className="absolute -top-8 h-24 w-24 rounded-full bg-white/15 blur-xl" aria-hidden />
                <span
                  className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/40 bg-kertas-lo shadow-tile animate-apung"
                  style={{ animationDelay: `${i * 0.35}s` }}
                >
                  <Specimen id={w.companionSpecimen} size={38} label={w.companionName} />
                </span>
                <span className="relative">
                  <span className="label-spesimen block text-white/75">Dunia {w.number}</span>
                  <span className="block font-display text-badan font-extrabold leading-tight text-white">
                    {w.titleBahasa}
                  </span>
                </span>
                <span className="label-spesimen relative rounded-full bg-white/20 px-2.5 py-0.5 text-white transition-transform duration-cepat group-hover:scale-105">
                  {w.activityCount} permainan
                </span>
              </a>
            ))}
          </nav>
        </header>

        {/* Aktivitas per dunia */}
        <div className="flex flex-col gap-9">
          {WORLDS.map((w) => {
            const daftar = aktivitasDunia(w.id);
            return (
              <section key={w.id} id={w.id} className="scroll-mt-6">
                <div
                  className="mb-3 flex items-center gap-3 rounded-kartu border-2 p-3.5"
                  style={{ backgroundColor: `${w.themeColor}14`, borderColor: `${w.themeColor}55` }}
                >
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 bg-kertas-lo animate-apung"
                    style={{ borderColor: w.themeColor }}
                  >
                    <Specimen id={w.companionSpecimen} size={28} label={w.companionName} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="label-spesimen" style={{ color: w.themeColor }}>
                      Dunia {w.number} · {w.companionName}
                    </p>
                    <h2 className="font-display text-besar font-extrabold leading-tight text-tinta">
                      {w.titleBahasa}
                    </h2>
                  </div>
                </div>

                <ul className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {daftar.map((a) => (
                    <li key={a.id} className="flex">
                      <Link
                        href={`/demo/main/${a.id}`}
                        className="group flex w-full flex-col gap-1.5 rounded-kartu border-2 border-kertas-deep bg-kertas-lo p-4 shadow-tile transition-all duration-cepat ease-pegas hover:-translate-y-1 hover:shadow-angkat active:translate-y-0 active:shadow-tekan"
                        style={{ borderTopColor: w.themeColor, borderTopWidth: 4 }}
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span
                            className="flex h-7 w-7 items-center justify-center rounded-full font-label text-kecil font-bold text-white"
                            style={{ backgroundColor: w.themeColor }}
                          >
                            {a.nomor}
                          </span>
                          <span
                            className="label-spesimen rounded-full px-2 py-0.5"
                            style={{ backgroundColor: `${w.themeColor}1F`, color: w.themeColor }}
                          >
                            {NAMA_JENIS[a.tantangan.kind]}
                          </span>
                        </span>
                        <span className="font-display text-badan font-bold leading-tight text-tinta">
                          {a.judul}
                        </span>
                        <span
                          className="mt-auto inline-flex items-center gap-1 pt-1 font-display text-kecil font-bold transition-transform duration-cepat group-hover:translate-x-1"
                          style={{ color: w.themeColor }}
                        >
                          Main
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
