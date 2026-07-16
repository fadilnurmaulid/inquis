"use client";

/**
 * Perkakas bersama kesepuluh papan permainan.
 *
 * Yang ditaruh di sini hanyalah hal yang benar-benar sama di semua
 * permainan: bingkai papan, tangga petunjuk, tanda salah, dan perayaan.
 * Selebihnya milik masing-masing permainan — justru perbedaannya yang
 * membuat tiap dunia terasa lain.
 *
 * Satu keputusan yang menyebar ke mana-mana: papan tidak pernah dilepas
 * dari layar setelah selesai. Ia mengunci diri dan tetap terlihat,
 * sementara umpan balik muncul di bawahnya. Melepas papan di tengah
 * animasi seret adalah sumber bug layar kosong yang lama.
 */

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Kontrak setiap papan ──────────────────────────────────────── */

export interface HasilMain {
  /** Berhasil tanpa bantuan berlebihan? Dipakai untuk skor, bukan untuk lulus. */
  benar: boolean;
  /** Berapa kali mencoba sampai berhasil. */
  percobaan: number;
  /** Berapa petunjuk yang dibuka. */
  petunjuk: number;
}

export interface PropsMain<T> {
  data: T;
  onSelesai: (hasil: HasilMain) => void;
}

/* ── Pengelola keadaan bersama ─────────────────────────────────── */

/**
 * Menghitung percobaan, mengingat petunjuk yang dibuka, dan memastikan
 * `onSelesai` hanya dipanggil sekali betapa pun ributnya sebuah papan.
 */
export function useMain(onSelesai: (h: HasilMain) => void) {
  const [percobaan, setPercobaan] = useState(0);
  const [petunjuk, setPetunjuk] = useState(0);
  const [salah, setSalah] = useState(false);
  const [sudah, setSudah] = useState(false);
  const terkirim = useRef(false);

  const tandaiSalah = useCallback(() => {
    setPercobaan((n) => n + 1);
    setSalah(true);
    window.setTimeout(() => setSalah(false), 620);
  }, []);

  const bukaPetunjuk = useCallback(() => setPetunjuk((n) => Math.min(n + 1, 3)), []);

  const selesaikan = useCallback(() => {
    if (terkirim.current) return;
    terkirim.current = true;
    setSudah(true);
    setPercobaan((n) => {
      const total = n + 1;
      // Ditunda satu bingkai supaya animasi berhasil sempat mulai
      // sebelum induk menggambar umpan baliknya.
      window.setTimeout(() => onSelesai({ benar: n === 0 && petunjuk === 0, percobaan: total, petunjuk }), 620);
      return total;
    });
  }, [onSelesai, petunjuk]);

  return { percobaan, petunjuk, salah, sudah, tandaiSalah, bukaPetunjuk, selesaikan };
}

/* ── Bingkai papan ─────────────────────────────────────────────── */

interface BingkaiProps {
  perintah: string;
  children: ReactNode;
  /** Ketiga petunjuk dari data aktivitas. */
  petunjuk: [string, string, string];
  /** Berapa yang sudah dibuka. */
  terbuka: number;
  onBuka: () => void;
  /** Sembunyikan tombol petunjuk setelah selesai. */
  sudah: boolean;
  salah?: boolean;
  /** Keterangan kecil di bawah perintah, mis. sisa bahan. */
  keterangan?: ReactNode;
  className?: string;
}

export function Bingkai({
  perintah,
  children,
  petunjuk,
  terbuka,
  onBuka,
  sudah,
  salah = false,
  keterangan,
  className,
}: BingkaiProps) {
  const kurangiGerak = useReducedMotion();

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-col items-center gap-1.5 text-center">
        <motion.p
          animate={salah && !kurangiGerak ? { x: [0, -7, 7, -5, 5, 0] } : { x: 0 }}
          transition={{ duration: 0.42 }}
          className="font-display text-besar font-bold text-tinta teks-seimbang"
        >
          {perintah}
        </motion.p>
        {keterangan && <div className="text-kecil text-tinta-mid">{keterangan}</div>}
      </div>

      {children}

      {!sudah && (
        <div className="flex flex-col items-center gap-2">
          {terbuka < 3 && (
            <button
              type="button"
              onClick={onBuka}
              className={cn(
                "target-sentuh inline-flex items-center gap-2 rounded-full border-2 border-matahari/50 bg-matahari-lo/50 px-4",
                "font-display text-kecil font-bold text-tanah-hi shadow-tile",
                "transition-all duration-cepat ease-pegas hover:-translate-y-0.5 hover:bg-matahari-lo",
                "active:translate-y-0.5 active:shadow-tekan"
              )}
            >
              <Lightbulb className="h-4 w-4" aria-hidden />
              {terbuka === 0 ? "Butuh petunjuk?" : "Petunjuk lagi"}
            </button>
          )}

          <AnimatePresence initial={false}>
            {petunjuk.slice(0, terbuka).map((p, i) => (
              <motion.div
                key={i}
                initial={kurangiGerak ? false : { opacity: 0, y: -6, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                className="w-full max-w-md overflow-hidden"
              >
                <p className="rounded-tile border-2 border-dashed border-matahari/40 bg-matahari-lo/25 px-4 py-2.5 text-center text-kecil text-tinta-mid">
                  <span className="label-spesimen mr-2 text-matahari-hi">P{i + 1}</span>
                  {p}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

/* ── Perayaan ──────────────────────────────────────────────────── */

const WARNA_RAYA = ["#3E8B54", "#D9922E", "#2F7FA6", "#6B5DD3", "#A8D8B4"];

/**
 * Ledakan kecil: enam belas kepingan, sekali jalan, lalu hilang.
 * Sengaja tidak besar — perayaan yang terlalu ramai membuat anak
 * menunggu animasi, bukan memikirkan hasilnya.
 */
export function Raya({ jalan }: { jalan: boolean }) {
  const kurangiGerak = useReducedMotion();
  if (!jalan || kurangiGerak) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden" aria-hidden>
      {Array.from({ length: 16 }).map((_, i) => {
        const sudut = (i / 16) * Math.PI * 2;
        const jauh = 74 + (i % 4) * 22;
        return (
          <motion.span
            key={i}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
            animate={{
              x: Math.cos(sudut) * jauh,
              y: Math.sin(sudut) * jauh + 26,
              scale: [0, 1, 0.9],
              opacity: [1, 1, 0],
              rotate: i * 47,
            }}
            transition={{ duration: 0.86, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-1/2 block h-2 w-2"
            style={{
              backgroundColor: WARNA_RAYA[i % WARNA_RAYA.length],
              borderRadius: i % 3 === 0 ? "50%" : "2px 6px 2px 6px",
            }}
          />
        );
      })}
    </div>
  );
}

/* ── Tanda benar / salah pada satu benda ───────────────────────── */

export function Tanda({ jenis }: { jenis: "benar" | "salah" }) {
  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 480, damping: 18 }}
      className={cn(
        "absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-kertas-lo",
        jenis === "benar" ? "bg-daun" : "bg-tanah"
      )}
      aria-hidden
    >
      <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" fill="none" stroke="#fff" strokeWidth={2.2} strokeLinecap="round">
        {jenis === "benar" ? <path d="M1.6 5.2 4 7.6 8.4 2.6" /> : <path d="M2.4 2.4 7.6 7.6M7.6 2.4 2.4 7.6" />}
      </svg>
    </motion.span>
  );
}

/* ── Papan/kartu tempat permainan digelar ──────────────────────── */

export function Meja({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative rounded-kartu border-2 border-kertas-deep bg-kertas-lo/70 p-4 shadow-kertas sm:p-6",
        className
      )}
    >
      {children}
    </div>
  );
}

/** Judul kecil di dalam meja, mis. "Baki bahan". */
export function LabelMeja({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("label-spesimen mb-2.5 text-tinta-soft", className)}>{children}</p>;
}

/* ── Pengacak tetap ────────────────────────────────────────────── */

/**
 * Mengacak dengan benih tetap.
 *
 * Math.random() tidak boleh dipakai di sini: komponen klien tetap
 * dirender lebih dulu di server, jadi urutan acak yang berbeda antara
 * server dan peramban akan memicu galat hidrasi. Benih diambil dari id
 * aktivitas, sehingga urutannya tetap sama di kedua sisi — tapi tetap
 * tidak berurutan di mata anak.
 */
export function acakTetap<T>(arr: readonly T[], benih: string): T[] {
  let s = 2166136261;
  for (let i = 0; i < benih.length; i++) {
    s ^= benih.charCodeAt(i);
    s = Math.imul(s, 16777619);
  }
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    s = (Math.imul(s, 48271) + 11) >>> 0;
    const j = s % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Baki yang diacak tiap permainan, tanpa galat hidrasi.
 *
 * Render pertama memakai acakan berbenih (sama di server dan peramban,
 * jadi hidrasi aman), lalu satu kali diacak sungguhan setelah terpasang.
 * Hasilnya: posisi awal benda berbeda tiap kali main, urutan data tidak
 * pernah bocor jadi petunjuk, dan jawaban benar tidak tersentuh.
 */
export function useBakiAcak<T>(daftar: readonly T[], benih: string): T[] {
  const awal = useMemo(() => acakTetap(daftar, benih), [daftar, benih]);
  const [urut, setUrut] = useState<T[]>(awal);
  useEffect(() => {
    setUrut(acakTetap(awal, String(Math.random())));
  }, [awal]);
  return urut;
}

