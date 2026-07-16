"use client";

/**
 * Deretan capaian.
 *
 * Yang belum didapat tetap ditampilkan, dalam keadaan pudar — supaya
 * anak tahu apa yang menunggunya, bukan sekadar melihat ruang kosong.
 */

import { motion, useReducedMotion } from "framer-motion";
import { Specimen } from "@/components/illustrations/specimens";
import type { Achievement } from "@/lib/achievements";
import { cn } from "@/lib/utils";

export function AchievementBadge({ data, urut = 0 }: { data: Achievement; urut?: number }) {
  const kurangiGerak = useReducedMotion();

  return (
    <motion.li
      initial={kurangiGerak ? false : { opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: kurangiGerak ? 0 : urut * 0.05, type: "spring", stiffness: 420, damping: 24 }}
      className="flex w-[5.25rem] shrink-0 flex-col items-center gap-1.5 text-center"
    >
      <span
        title={data.earned ? data.title : `Belum didapat: ${data.description}`}
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-normal ease-pegas",
          data.earned
            ? "border-daun bg-daun-lo/40 shadow-tile"
            : "border-dashed border-kertas-deep bg-kertas grayscale"
        )}
      >
        <span className={cn(!data.earned && "opacity-35")}>
          <Specimen id={data.spesimen} size={30} />
        </span>
      </span>
      <span
        className={cn(
          "text-mikro font-bold leading-tight",
          data.earned ? "text-tinta" : "text-tinta-faint"
        )}
      >
        {data.title}
      </span>
      <span className="sr-only">{data.earned ? "Sudah didapat" : `Belum didapat. ${data.description}`}</span>
    </motion.li>
  );
}

export function AchievementRow({ items }: { items: Achievement[] }) {
  const dapat = items.filter((a) => a.earned).length;

  return (
    <section className="kartu-kertas p-5">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <p className="label-spesimen text-tinta-soft">Capaian</p>
        <p className="font-label text-kecil font-bold tabular-nums text-tinta-mid">
          {dapat}/{items.length}
        </p>
      </div>
      <ul className="tanpa-scrollbar flex gap-3 overflow-x-auto pb-1">
        {items.map((a, i) => (
          <AchievementBadge key={a.id} data={a} urut={i} />
        ))}
      </ul>
    </section>
  );
}
