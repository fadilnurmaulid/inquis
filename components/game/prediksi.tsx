"use client";

/**
 * Papan Dunia 3 — memprediksi.
 *
 *   LabSimulasi   · geser tuas, amati akibatnya, lalu tebak yang belum dicoba
 *   GarisBilangan · lanjutkan lompatan tetap ke langkah yang belum tiba
 *
 * Yang membuat lab ini bukan sekadar mainan tuas: anak tidak boleh
 * menebak sebelum benar-benar mencoba. Tombol "Aku siap menebak" baru
 * muncul setelah ia melihat sendiri lebih dari satu keadaan. Prediksi
 * tanpa pengamatan hanyalah tebak-tebakan.
 */

import { useCallback, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { Specimen, SPECIMEN_LABEL } from "@/components/illustrations/specimens";
import { Bingkai, LabelMeja, Meja, Raya, Tanda, useMain, type PropsMain } from "@/components/game/umum";
import type { GarisBilangan, LabSimulasi } from "@/lib/game/types";
import { cn } from "@/lib/utils";

/* ── Tuas ──────────────────────────────────────────────────────── */

interface TuasProps {
  nama: string;
  nilai: number;
  min: number;
  max: number;
  satuan: string;
  warna: string;
  kunci?: boolean;
  onUbah: (n: number) => void;
  children?: React.ReactNode;
}

function Tuas({ nama, nilai, min, max, satuan, warna, kunci = false, onUbah, children }: TuasProps) {
  const geser = (delta: number) => onUbah(Math.min(max, Math.max(min, nilai + delta)));

  return (
    <div className="rounded-tile border-2 border-kertas-deep bg-kertas-lo p-3">
      <div className="mb-2 flex items-center gap-2">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2"
          style={{ borderColor: warna, backgroundColor: `${warna}1F` }}
          aria-hidden
        >
          {children}
        </span>
        <span className="flex-1 font-display text-kecil font-bold text-tinta">{nama}</span>
        <span
          className="rounded-md px-2 py-0.5 font-label text-kecil font-bold tabular-nums"
          style={{ backgroundColor: `${warna}1F`, color: warna }}
        >
          {nilai} {satuan}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => geser(-1)}
          disabled={kunci || nilai <= min}
          aria-label={`Kurangi ${nama}`}
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-kertas-deep bg-kertas",
            "transition-all duration-instan hover:border-tinta-faint active:scale-90 disabled:opacity-40"
          )}
        >
          <Minus className="h-4 w-4 text-tinta-mid" aria-hidden />
        </button>

        <input
          type="range"
          min={min}
          max={max}
          step={1}
          value={nilai}
          disabled={kunci}
          onChange={(e) => onUbah(Number(e.target.value))}
          aria-label={`${nama}, ${nilai} ${satuan}`}
          className="tuas h-9 flex-1"
          style={{ ["--tuas-warna" as string]: warna }}
        />

        <button
          type="button"
          onClick={() => geser(1)}
          disabled={kunci || nilai >= max}
          aria-label={`Tambah ${nama}`}
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-kertas-deep bg-kertas",
            "transition-all duration-instan hover:border-tinta-faint active:scale-90 disabled:opacity-40"
          )}
        >
          <Plus className="h-4 w-4 text-tinta-mid" aria-hidden />
        </button>
      </div>
    </div>
  );
}

/* ═══ 7 · Lab simulasi ═════════════════════════════════════════ */

const WARNA_TUAS = ["#3E8B54", "#2F7FA6", "#D9922E"];

export function PapanLabSimulasi({ data, onSelesai }: PropsMain<LabSimulasi>) {
  const { petunjuk, salah, sudah, tandaiSalah, bukaPetunjuk, selesaikan } = useMain(onSelesai);
  const kurangiGerak = useReducedMotion();

  const [nilai, setNilai] = useState<Record<string, number>>(() =>
    Object.fromEntries(data.variabel.map((v) => [v.id, v.awal]))
  );
  const [fase, setFase] = useState<"coba" | "tebak">("coba");
  const [tebakan, setTebakan] = useState<string | null>(null);
  const [ditolak, setDitolak] = useState<string[]>([]);
  const terlihat = useRef(new Set<string>());

  /** Tabel keputusan: aturan pertama yang cocok menang. */
  const nilaiKeadaan = useCallback(
    (kondisi: Record<string, number>) => {
      for (const a of data.aturan) {
        if (!a.syarat) return a.keadaanId;
        const cocok = Object.entries(a.syarat).every(([k, [lo, hi]]) => {
          const v = kondisi[k];
          return v !== undefined && v >= lo && v <= hi;
        });
        if (cocok) return a.keadaanId;
      }
      return data.keadaan[0].id;
    },
    [data.aturan, data.keadaan]
  );

  const sekarangId = useMemo(() => nilaiKeadaan(nilai), [nilai, nilaiKeadaan]);
  const sekarang = data.keadaan.find((k) => k.id === sekarangId) ?? data.keadaan[0];
  terlihat.current.add(sekarangId);

  // Ambang yang sengaja rendah: cukup melihat dua keadaan berbeda.
  // Yang dijaga bukan lamanya bermain, tapi bahwa menebak datang
  // sesudah mengamati — bukan sebelumnya.
  const bolehTebak = terlihat.current.size >= 2;

  const jawabanUji = useMemo(() => nilaiKeadaan(data.ujian.kondisi), [data.ujian.kondisi, nilaiKeadaan]);

  const mulaiTebak = () => {
    setNilai({ ...data.ujian.kondisi });
    setFase("tebak");
  };

  const pilih = (id: string) => {
    if (sudah || ditolak.includes(id)) return;
    setTebakan(id);
    if (id === jawabanUji) {
      selesaikan();
    } else {
      tandaiSalah();
      setDitolak((prev) => [...prev, id]);
    }
  };

  return (
    <Bingkai
      perintah={fase === "coba" ? data.perintah : data.ujian.pertanyaan}
      petunjuk={data.petunjuk}
      terbuka={petunjuk}
      onBuka={bukaPetunjuk}
      sudah={sudah}
      salah={salah}
      keterangan={
        fase === "coba" ? (
          <span className="label-spesimen text-tinta-soft">
            Keadaan ditemukan: {terlihat.current.size} dari {data.keadaan.length}
          </span>
        ) : (
          <span className="label-spesimen text-nila">Tuas dikunci. Ayo tebak!</span>
        )
      }
    >
      <Meja>
        <Raya jalan={sudah} />

        <div className="grid gap-4 sm:grid-cols-[1fr_1.1fr] sm:items-stretch">
          {/* Jendela pengamatan */}
          <div className="flex flex-col items-center justify-center gap-3 rounded-tile border-2 border-kertas-deep bg-gradient-to-b from-langit-lo/40 to-daun-lo/25 p-4">
            <LabelMeja className="mb-0 self-start">Yang terlihat</LabelMeja>
            <AnimatePresence mode="wait">
              <motion.div
                key={fase === "tebak" && !sudah ? "tersembunyi" : sekarang.id}
                initial={kurangiGerak ? false : { scale: 0.7, opacity: 0, rotate: -4 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={kurangiGerak ? undefined : { scale: 0.7, opacity: 0 }}
                transition={{ type: "spring", stiffness: 340, damping: 22 }}
                className="flex flex-col items-center gap-2"
              >
                {fase === "tebak" && !sudah ? (
                  <>
                    <span className="flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full border-2 border-dashed border-nila/50 bg-nila-lo/25 font-display text-pekik font-extrabold text-nila">
                      ?
                    </span>
                    <p className="text-center text-kecil text-tinta-mid">Apa yang akan terjadi?</p>
                  </>
                ) : (
                  <>
                    <span className={cn("block", !kurangiGerak && "animate-apung")}>
                      <Specimen id={sekarang.spesimen} size={88} label={sekarang.nama} />
                    </span>
                    <p className="font-display text-besar font-extrabold text-tinta">{sekarang.nama}</p>
                    <p className="max-w-[15rem] text-center text-mikro text-tinta-mid">{sekarang.keterangan}</p>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Tuas */}
          <div className="flex flex-col gap-2.5">
            {data.variabel.map((v, i) => (
              <Tuas
                key={v.id}
                nama={v.nama}
                nilai={nilai[v.id]}
                min={v.min}
                max={v.max}
                satuan={v.satuan}
                warna={WARNA_TUAS[i % WARNA_TUAS.length]}
                kunci={fase === "tebak"}
                onUbah={(n) => setNilai((prev) => ({ ...prev, [v.id]: n }))}
              >
                <Specimen id={v.spesimen} size={18} />
              </Tuas>
            ))}

            {fase === "coba" && (
              <button
                type="button"
                onClick={mulaiTebak}
                disabled={!bolehTebak}
                className={cn(
                  "target-sentuh mt-1 rounded-full border-2 font-display text-besar font-extrabold transition-all duration-cepat ease-pegas",
                  bolehTebak
                    ? "border-nila-hi bg-nila text-kertas-lo shadow-angkat hover:-translate-y-0.5 hover:bg-nila-hi active:translate-y-0.5 active:shadow-tekan"
                    : "cursor-default border-kertas-deep bg-kertas text-tinta-faint"
                )}
              >
                {bolehTebak ? "Aku siap menebak" : "Coba geser tuasnya dulu"}
              </button>
            )}
          </div>
        </div>

        {/* Pilihan tebakan */}
        <AnimatePresence>
          {fase === "tebak" && (
            <motion.div
              initial={kurangiGerak ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 border-t-2 border-dashed border-kertas-deep pt-4"
            >
              <LabelMeja>Pilih tebakanmu</LabelMeja>
              <div className="grid grid-cols-2 items-stretch gap-2.5 sm:grid-cols-4">
                {data.keadaan.map((k) => {
                  const tolak = ditolak.includes(k.id);
                  const kena = sudah && k.id === jawabanUji;
                  return (
                    <button
                      key={k.id}
                      type="button"
                      onClick={() => pilih(k.id)}
                      disabled={sudah || tolak}
                      className={cn(
                        "relative flex flex-col items-center gap-1.5 rounded-tile border-2 p-2.5 transition-all duration-cepat",
                        kena
                          ? "border-daun bg-daun-lo/50 shadow-angkat"
                          : tolak
                            ? "cursor-default border-kertas-deep bg-kertas opacity-45"
                            : "border-kertas-deep bg-kertas-lo shadow-tile hover:-translate-y-0.5 hover:border-nila/60 active:translate-y-0.5"
                      )}
                    >
                      <Specimen id={k.spesimen} size={34} label={k.nama} />
                      <span className="font-display text-mikro font-bold leading-tight text-tinta">{k.nama}</span>
                      {kena && <Tanda jenis="benar" />}
                      {tolak && <Tanda jenis="salah" />}
                    </button>
                  );
                })}
              </div>

              {tebakan && sudah && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mx-auto mt-3 max-w-md rounded-tile border-2 border-daun/30 bg-daun-lo/25 px-4 py-2.5 text-center text-kecil text-tinta-mid"
                >
                  {data.keadaan.find((k) => k.id === jawabanUji)?.keterangan}
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Meja>
    </Bingkai>
  );
}

/* ═══ 8 · Garis bilangan ═══════════════════════════════════════ */

export function PapanGarisBilangan({ data, onSelesai }: PropsMain<GarisBilangan>) {
  const { petunjuk, salah, sudah, tandaiSalah, bukaPetunjuk, selesaikan } = useMain(onSelesai);
  const kurangiGerak = useReducedMotion();

  const benar = data.mulai + data.langkah * data.target;
  const [tebakan, setTebakan] = useState(data.mulai);
  const [pernahSalah, setPernahSalah] = useState(false);

  /** Titik-titik yang sudah diukur anak sebelum menebak. */
  const teramati = useMemo(
    () =>
      Array.from({ length: data.teramati }, (_, i) => ({
        langkahKe: i + 1,
        nilai: data.mulai + data.langkah * (i + 1),
      })),
    [data.teramati, data.mulai, data.langkah]
  );

  const persen = (n: number) => (n / data.maks) * 100;

  const periksa = () => {
    if (sudah) return;
    if (tebakan === benar) {
      selesaikan();
    } else {
      tandaiSalah();
      setPernahSalah(true);
    }
  };

  return (
    <Bingkai
      perintah={data.perintah}
      petunjuk={data.petunjuk}
      terbuka={petunjuk}
      onBuka={bukaPetunjuk}
      sudah={sudah}
      salah={salah}
      keterangan={
        <span className="label-spesimen text-tinta-soft">
          Sudah diukur sampai {data.namaLangkah} ke-{data.teramati}
        </span>
      }
    >
      <Meja>
        <Raya jalan={sudah} />

        {/* Catatan pengukuran */}
        <LabelMeja>Catatan pengukuran</LabelMeja>
        <div className="mb-5 flex flex-wrap justify-center gap-2">
          {teramati.map((t) => (
            <div
              key={t.langkahKe}
              className="flex w-[4.5rem] flex-col items-center gap-1 rounded-tile border-2 border-kertas-deep bg-kertas-lo py-2"
            >
              <span className="label-spesimen text-tinta-soft">
                {data.namaLangkah} {t.langkahKe}
              </span>
              <Specimen id={data.spesimen} size={26} label={SPECIMEN_LABEL[data.spesimen]} />
              <span className="font-label text-kecil font-bold tabular-nums text-daun-hi">
                {t.nilai} {data.satuan}
              </span>
            </div>
          ))}
          <div className="flex w-[4.5rem] flex-col items-center justify-center gap-1 rounded-tile border-2 border-dashed border-nila/50 bg-nila-lo/20 py-2">
            <span className="label-spesimen text-nila">
              {data.namaLangkah} {data.target}
            </span>
            <span className="font-display text-judul font-extrabold text-nila">?</span>
          </div>
        </div>

        {/* Garis bilangan */}
        <LabelMeja>Geser penanda ke tebakanmu</LabelMeja>
        <div className="relative px-1 pb-1 pt-9">
          {/* Penanda mengambang di atas garis */}
          <motion.div
            animate={{ left: `${persen(tebakan)}%` }}
            transition={kurangiGerak ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 30 }}
            className="pointer-events-none absolute top-0 z-10 -translate-x-1/2"
          >
            <span
              className={cn(
                "flex items-center gap-1 rounded-full border-2 px-2.5 py-1 font-label text-kecil font-bold tabular-nums shadow-tile",
                sudah ? "border-daun-hi bg-daun text-kertas-lo" : "border-nila-hi bg-nila text-kertas-lo"
              )}
            >
              {tebakan} {data.satuan}
            </span>
          </motion.div>

          {/* Garis + jejak lompatan yang sudah teramati */}
          <div className="relative h-2 rounded-full bg-kertas-hi">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-daun-lo"
              style={{ width: `${persen(teramati[teramati.length - 1]?.nilai ?? 0)}%` }}
              aria-hidden
            />
            {Array.from({ length: Math.floor(data.maks / data.langkah) + 1 }).map((_, i) => (
              <span
                key={i}
                className="absolute top-1/2 h-3 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-tinta-faint"
                style={{ left: `${persen(i * data.langkah)}%` }}
                aria-hidden
              />
            ))}
            {teramati.map((t) => (
              <span
                key={t.langkahKe}
                className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-kertas-lo bg-daun"
                style={{ left: `${persen(t.nilai)}%` }}
                aria-hidden
              />
            ))}
            {sudah && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-kertas-lo bg-daun-hi"
                style={{ left: `${persen(benar)}%` }}
                aria-hidden
              />
            )}
          </div>

          {/* Angka di bawah garis */}
          <div className="relative mt-2 h-4">
            {Array.from({ length: Math.floor(data.maks / data.langkah) + 1 }).map((_, i) => (
              <span
                key={i}
                className="absolute -translate-x-1/2 font-label text-mikro tabular-nums text-tinta-soft"
                style={{ left: `${persen(i * data.langkah)}%` }}
              >
                {i * data.langkah}
              </span>
            ))}
          </div>

          <input
            type="range"
            min={0}
            max={data.maks}
            step={1}
            value={tebakan}
            disabled={sudah}
            onChange={(e) => setTebakan(Number(e.target.value))}
            aria-label={`Tebakan tinggi pada ${data.namaLangkah} ke-${data.target}, sekarang ${tebakan} ${data.satuan}`}
            className="tuas mt-3 h-9 w-full"
            style={{ ["--tuas-warna" as string]: sudah ? "#3E8B54" : "#6B5DD3" }}
          />
        </div>

        <div className="mt-2 flex flex-col items-center gap-2">
          {!sudah && (
            <button
              type="button"
              onClick={periksa}
              className={cn(
                "target-sentuh rounded-full border-2 border-nila-hi bg-nila px-8 font-display text-besar font-extrabold text-kertas-lo",
                "shadow-angkat transition-all duration-cepat ease-pegas hover:-translate-y-0.5 hover:bg-nila-hi",
                "active:translate-y-0.5 active:shadow-tekan"
              )}
            >
              Ini tebakanku
            </button>
          )}
          {pernahSalah && !sudah && (
            <p className="text-center text-kecil text-tinta-mid">
              Belum pas. Lihat lagi jarak antar-titik hijau di garis. Jaraknya selalu sama.
            </p>
          )}
        </div>
      </Meja>
    </Bingkai>
  );
}
