"use client";

/**
 * Kartu "lanjutkan".
 *
 * Satu tombol besar yang menjawab pertanyaan pertama anak setiap kali
 * ia membuka aplikasi: aku tadi sampai mana? Jawabannya tidak boleh
 * berupa daftar — cukup satu tempat untuk diketuk.
 */

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Specimen } from "@/components/illustrations/specimens";
import { getAktivitas } from "@/lib/game/content";
import { NAMA_JENIS } from "@/lib/game/types";
import { WORLDS } from "@/types";
import { cn } from "@/lib/utils";

interface ContinueCardProps {
  activityId: string;
  /** Sesi yang tertinggal di tengah, bukan aktivitas berikutnya yang belum dibuka. */
  lanjutan: boolean;
}

export function ContinueCard({ activityId, lanjutan }: ContinueCardProps) {
  const kurangiGerak = useReducedMotion();
  const a = getAktivitas(activityId);
  if (!a) return null;

  const w = WORLDS.find((x) => x.id === a.worldId);
  if (!w) return null;

  return (
    <motion.section
      initial={kurangiGerak ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
    >
      <Link
        href={`/play/activity/${a.id}`}
        className={cn(
          "group relative flex items-center gap-4 overflow-hidden rounded-kartu border-2 bg-kertas-lo p-5",
          "shadow-kertas transition-all duration-cepat ease-pegas",
          "hover:-translate-y-1 hover:shadow-angkat active:translate-y-0 active:shadow-tekan"
        )}
        style={{ borderColor: w.themeColor }}
      >
        <span className="absolute inset-y-0 left-0 w-1.5" style={{ backgroundColor: w.themeColor }} aria-hidden />

        <span
          className={cn(
            "flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 bg-kertas",
            !kurangiGerak && "animate-apung"
          )}
          style={{ borderColor: w.themeColor }}
        >
          <Specimen id={w.companionSpecimen} size={36} label={w.companionName} />
        </span>

        <span className="min-w-0 flex-1">
          <span className="label-spesimen block" style={{ color: w.themeColor }}>
            {lanjutan ? "Lanjutkan" : "Berikutnya"} · {NAMA_JENIS[a.tantangan.kind]}
          </span>
          <span className="mt-0.5 block font-display text-besar font-extrabold leading-tight text-tinta">
            {a.judul}
          </span>
          <span className="mt-0.5 block text-mikro text-tinta-soft">
            Dunia {w.number} · Aktivitas {a.nomor}
          </span>
        </span>

        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform duration-cepat ease-pegas group-hover:translate-x-0.5"
          style={{ backgroundColor: w.themeColor }}
          aria-hidden
        >
          <ArrowRight className="h-5 w-5 text-kertas-lo" strokeWidth={2.5} />
        </span>
      </Link>
    </motion.section>
  );
}
