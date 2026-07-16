"use client";

/**
 * Kit seret-dan-lepas untuk seluruh papan permainan.
 *
 * Dua cara memindahkan benda, keduanya selalu aktif bersamaan:
 *
 *   1. Seret     — tekan lalu geser. Cara alami di layar sentuh.
 *   2. Ketuk-ketuk — ketuk benda (terpilih), lalu ketuk tempatnya.
 *
 * Cara kedua bukan sekadar cadangan. Anak usia 5–7 sering gagal menahan
 * jari sambil menggeser, dan seret murni tidak bisa dipakai dengan papan
 * tombol atau pembaca layar. Karena itu setiap benda yang bisa diseret
 * juga sebuah <button> sungguhan yang bisa difokus dan ditekan Enter.
 *
 * Tidak memakai pustaka luar — hanya framer-motion yang sudah ada di
 * proyek — sehingga tidak menambah dependensi.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/* ── Konteks papan ─────────────────────────────────────────────── */

interface KonteksPapan {
  terpilih: string | null;
  pilih: (id: string | null) => void;
  zonaAktif: string | null;
  daftarZona: (id: string, el: HTMLElement | null) => void;
  cariZona: (x: number, y: number) => string | null;
  setZonaAktif: (id: string | null) => void;
  lepas: (itemId: string, zonaId: string) => void;
  kunci: boolean;
}

const Papan = createContext<KonteksPapan | null>(null);

function usePapan(): KonteksPapan {
  const ctx = useContext(Papan);
  if (!ctx) throw new Error("Komponen seret harus berada di dalam <PapanDnd>.");
  return ctx;
}

interface PapanDndProps {
  children: ReactNode;
  /** Dipanggil saat sebuah benda dijatuhkan/diketukkan ke sebuah zona. */
  onLepas: (itemId: string, zonaId: string) => void;
  /** Matikan semua interaksi (mis. saat sedang menampilkan hasil). */
  kunci?: boolean;
  className?: string;
}

export function PapanDnd({ children, onLepas, kunci = false, className }: PapanDndProps) {
  const [terpilih, setTerpilih] = useState<string | null>(null);
  const [zonaAktif, setZonaAktif] = useState<string | null>(null);
  const zonaRef = useRef<Map<string, HTMLElement>>(new Map());

  const daftarZona = useCallback((id: string, el: HTMLElement | null) => {
    if (el) zonaRef.current.set(id, el);
    else zonaRef.current.delete(id);
  }, []);

  const cariZona = useCallback((x: number, y: number) => {
    for (const [id, el] of zonaRef.current) {
      const r = el.getBoundingClientRect();
      // Toleransi 14px: jari anak jarang tepat di dalam kotak.
      if (x >= r.left - 14 && x <= r.right + 14 && y >= r.top - 14 && y <= r.bottom + 14) return id;
    }
    return null;
  }, []);

  const lepas = useCallback(
    (itemId: string, zonaId: string) => {
      setTerpilih(null);
      setZonaAktif(null);
      onLepas(itemId, zonaId);
    },
    [onLepas]
  );

  const pilih = useCallback(
    (id: string | null) => {
      if (kunci) return;
      setTerpilih((prev) => (prev === id ? null : id));
    },
    [kunci]
  );

  // Escape membatalkan pilihan — jalan keluar yang jelas bagi pengguna papan tombol.
  useEffect(() => {
    if (!terpilih) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setTerpilih(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [terpilih]);

  const value = useMemo<KonteksPapan>(
    () => ({ terpilih, pilih, zonaAktif, daftarZona, cariZona, setZonaAktif, lepas, kunci }),
    [terpilih, pilih, zonaAktif, daftarZona, cariZona, lepas, kunci]
  );

  return (
    <Papan.Provider value={value}>
      <div className={cn("papan-main", className)}>{children}</div>
    </Papan.Provider>
  );
}

/** Baca status pilihan dari luar (mis. untuk menampilkan petunjuk). */
export function useTerpilih(): string | null {
  return usePapan().terpilih;
}

/* ── Benda yang bisa diseret ───────────────────────────────────── */

interface BendaSeretProps {
  id: string;
  children: ReactNode;
  className?: string;
  /** Label untuk pembaca layar, mis. "Kulit pisang". */
  label: string;
  disabled?: boolean;
  /** Sembunyikan benda (mis. sudah dipindah ke slot) tanpa mengubah tinggi baris. */
  kosong?: boolean;
}

export function BendaSeret({
  id,
  children,
  className,
  label,
  disabled = false,
  kosong = false,
}: BendaSeretProps) {
  const { terpilih, pilih, cariZona, setZonaAktif, lepas, kunci } = usePapan();
  const kurangiGerak = useReducedMotion();
  const aktif = terpilih === id;
  const mati = disabled || kunci || kosong;

  if (kosong) {
    // Tempat kosong: menjaga tinggi baris agar deretan tidak melompat
    // saat benda dipindahkan ke slot.
    return (
      <div
        className={cn(
          "rounded-tile border-2 border-dashed border-kertas-deep/70 bg-kertas/40",
          className
        )}
        aria-hidden
      />
    );
  }

  return (
    <motion.button
      type="button"
      layout={!kurangiGerak}
      drag={!mati}
      dragSnapToOrigin
      dragElastic={0.16}
      dragMomentum={false}
      whileDrag={{ scale: 1.14, zIndex: 60, cursor: "grabbing" }}
      whileHover={mati ? undefined : { y: -3 }}
      whileTap={mati ? undefined : { scale: 0.94 }}
      onDrag={(_, info) => setZonaAktif(cariZona(info.point.x, info.point.y))}
      onDragEnd={(_, info) => {
        const zona = cariZona(info.point.x, info.point.y);
        setZonaAktif(null);
        if (zona) lepas(id, zona);
      }}
      onClick={() => pilih(id)}
      disabled={mati}
      aria-label={aktif ? `${label} — terpilih. Sekarang pilih tempatnya.` : label}
      aria-pressed={aktif}
      className={cn(
        "relative flex touch-none items-center justify-center rounded-tile border-2 bg-kertas-lo",
        "transition-colors duration-cepat",
        mati ? "cursor-default opacity-60" : "cursor-grab",
        aktif
          ? "border-daun bg-daun-lo/50 shadow-angkat"
          : "border-kertas-deep shadow-tile hover:border-daun/60",
        className
      )}
    >
      {children}
      {aktif && (
        <motion.span
          layoutId="cincin-pilih"
          className="pointer-events-none absolute -inset-1 rounded-[1.1rem] border-2 border-daun"
          aria-hidden
        />
      )}
    </motion.button>
  );
}

/* ── Zona tempat menjatuhkan ───────────────────────────────────── */

interface ZonaLepasProps {
  id: string;
  children?: ReactNode;
  className?: string;
  label: string;
  /** Beri gaya berbeda saat zona sudah terisi. */
  terisi?: boolean;
  disabled?: boolean;
}

export function ZonaLepas({
  id,
  children,
  className,
  label,
  terisi = false,
  disabled = false,
}: ZonaLepasProps) {
  const { daftarZona, zonaAktif, terpilih, lepas, kunci } = usePapan();
  const ref = useRef<HTMLButtonElement | null>(null);
  const mati = disabled || kunci;

  useEffect(() => {
    daftarZona(id, mati ? null : ref.current);
    return () => daftarZona(id, null);
  }, [id, daftarZona, mati]);

  const disorot = zonaAktif === id;
  const menunggu = terpilih !== null && !terisi && !mati;

  return (
    <motion.button
      ref={ref}
      type="button"
      animate={disorot ? { scale: 1.06 } : { scale: 1 }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
      onClick={() => {
        if (terpilih && !mati) lepas(terpilih, id);
      }}
      disabled={mati || (!terpilih && !terisi)}
      aria-label={menunggu ? `Letakkan di ${label}` : label}
      className={cn(
        "relative flex items-center justify-center rounded-tile border-2 transition-colors duration-cepat",
        terisi
          ? "border-solid border-kertas-deep bg-kertas-lo"
          : "border-dashed border-tinta-faint bg-kertas/50",
        disorot && "border-solid border-daun bg-daun-lo/60",
        menunggu && !disorot && "border-daun/70 bg-daun-lo/20",
        mati && "opacity-70",
        className
      )}
    >
      {children}
      {/* Denyut lembut menandai tempat yang menunggu diisi. */}
      {menunggu && !disorot && (
        <span
          className="pointer-events-none absolute inset-0 animate-denyut-cincin rounded-tile border-2 border-daun/60"
          aria-hidden
        />
      )}
    </motion.button>
  );
}
