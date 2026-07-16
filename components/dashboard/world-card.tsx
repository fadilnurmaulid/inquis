"use client";

/**
 * Kartu dunia — dan kerangka muatnya.
 *
 * Keduanya sengaja tinggal di satu berkas dan berbagi konstanta yang
 * sama: KULIT, LINGKAR, TINGGI_JUDUL, TINGGI_KETERANGAN. Sebelumnya
 * kerangka muat ditulis di berkas terpisah dengan ukuran yang ditebak
 * sendiri, jadi tiap kali kartunya berubah, kerangkanya tertinggal dan
 * halaman melompat begitu data datang. Selama keduanya membaca
 * konstanta yang sama, mereka tidak bisa lagi berbeda.
 */

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Lock } from "lucide-react";
import { Specimen } from "@/components/illustrations/specimens";
import type { WorldProgressSummary } from "@/lib/services/dashboard.service";
import { WORLDS } from "@/types";
import { cn } from "@/lib/utils";

/* Dipakai kartu maupun kerangkanya. Jangan dipisah. */
const KULIT =
  "relative flex h-full w-full flex-col gap-3 overflow-hidden rounded-kartu border-2 border-kertas-deep bg-kertas-lo p-5";
const LINGKAR = "flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2";
const TINGGI_JUDUL = "min-h-[3.4rem]";
const TINGGI_KETERANGAN = "min-h-[2.7rem]";

/* ── Kartu ─────────────────────────────────────────────────────── */

export function WorldCard({ data, urut = 0 }: { data: WorldProgressSummary; urut?: number }) {
  const kurangiGerak = useReducedMotion();
  const def = WORLDS.find((w) => w.id === data.worldId);
  const terkunci = data.status === "LOCKED";
  const tuntas = data.status === "COMPLETED";
  const persen =
    data.totalActivities > 0 ? Math.round((data.completedActivities / data.totalActivities) * 100) : 0;

  const isi = (
    <>
      <span
        className="absolute inset-x-0 top-0 h-1.5"
        style={{ backgroundColor: terkunci ? "#AEBCB1" : data.themeColor }}
        aria-hidden
      />

      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(LINGKAR, terkunci ? "border-kertas-deep bg-kertas" : "bg-kertas")}
          style={terkunci ? undefined : { borderColor: data.themeColor }}
        >
          {terkunci ? (
            <Lock className="h-5 w-5 text-tinta-faint" aria-hidden />
          ) : (
            <span className={cn(!kurangiGerak && "animate-apung")}>
              <Specimen id={def?.companionSpecimen ?? "tunas"} size={32} label={data.companionName} />
            </span>
          )}
        </span>

        {tuntas && (
          <span
            className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-kertas-lo bg-daun"
            aria-hidden
          >
            <Check className="h-3.5 w-3.5 text-kertas-lo" strokeWidth={3.5} />
          </span>
        )}
      </div>

      <div className={cn("flex flex-col gap-0.5", TINGGI_JUDUL)}>
        <p className="label-spesimen" style={{ color: terkunci ? "#AEBCB1" : data.themeColor }}>
          Dunia {data.worldNumber}
        </p>
        <h3
          className={cn(
            "font-display text-besar font-extrabold leading-tight",
            terkunci ? "text-tinta-faint" : "text-tinta"
          )}
        >
          {data.titleBahasa}
        </h3>
      </div>

      <p className={cn("text-mikro leading-relaxed text-tinta-soft", TINGGI_KETERANGAN)}>
        {terkunci ? "Selesaikan dunia sebelumnya untuk membuka yang ini." : data.description}
      </p>

      <div className="mt-auto flex flex-col gap-1.5">
        <div className="flex items-baseline justify-between gap-2">
          <span className="label-spesimen text-tinta-faint">
            {data.completedActivities}/{data.totalActivities} aktivitas
          </span>
          <span className="font-label text-mikro font-bold tabular-nums text-tinta-soft">{persen}%</span>
        </div>
        <span className="block h-2 overflow-hidden rounded-full bg-kertas-hi">
          <motion.span
            className="block h-full rounded-full"
            style={{ backgroundColor: terkunci ? "#AEBCB1" : data.themeColor }}
            initial={kurangiGerak ? false : { width: 0 }}
            animate={{ width: `${persen}%` }}
            transition={{ duration: 0.7, delay: 0.1 + urut * 0.06, ease: [0.22, 1, 0.36, 1] }}
          />
        </span>
      </div>
    </>
  );

  if (terkunci) {
    return (
      <li className="flex">
        <div className={cn(KULIT, "opacity-70 shadow-tile")} aria-disabled>
          {isi}
          <span className="sr-only">Dunia {data.worldNumber} masih terkunci.</span>
        </div>
      </li>
    );
  }

  return (
    <li className="flex">
      <Link
        href={`/play/world/${data.worldId}`}
        aria-label={`Buka Dunia ${data.worldNumber}: ${data.titleBahasa}. ${data.completedActivities} dari ${data.totalActivities} aktivitas selesai.`}
        className={cn(
          KULIT,
          "shadow-kertas transition-all duration-cepat ease-pegas",
          "hover:-translate-y-1 hover:shadow-angkat active:translate-y-0 active:shadow-tekan"
        )}
      >
        {isi}
      </Link>
    </li>
  );
}

/* ── Kerangka muat ─────────────────────────────────────────────── */

/**
 * Bentuknya sama persis dengan kartu di atas: kulit yang sama, lingkaran
 * yang sama, tinggi judul dan keterangan yang sama, bilah kemajuan di
 * tempat yang sama. Yang berbeda hanya isinya — bidang berdenyut.
 */
export function WorldCardSkeleton() {
  return (
    <li className="flex">
      <div className={cn(KULIT, "shadow-tile")} aria-hidden>
        <span className="absolute inset-x-0 top-0 h-1.5 bg-kertas-hi" />

        <div className="flex items-start justify-between gap-3">
          <span className={cn(LINGKAR, "animate-pulse border-kertas-deep bg-kertas-hi")} />
        </div>

        <div className={cn("flex flex-col justify-center gap-1.5", TINGGI_JUDUL)}>
          <span className="block h-2.5 w-16 animate-pulse rounded-full bg-kertas-hi" />
          <span className="block h-4 w-4/5 animate-pulse rounded-full bg-kertas-hi" />
        </div>

        <div className={cn("flex flex-col justify-start gap-1.5", TINGGI_KETERANGAN)}>
          <span className="block h-2.5 w-full animate-pulse rounded-full bg-kertas-hi" />
          <span className="block h-2.5 w-3/5 animate-pulse rounded-full bg-kertas-hi" />
        </div>

        <div className="mt-auto flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between gap-2">
            <span className="block h-2.5 w-20 animate-pulse rounded-full bg-kertas-hi" />
            <span className="block h-2.5 w-7 animate-pulse rounded-full bg-kertas-hi" />
          </div>
          <span className="block h-2 rounded-full bg-kertas-hi" />
        </div>
      </div>
    </li>
  );
}
