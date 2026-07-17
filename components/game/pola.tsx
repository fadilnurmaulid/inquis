"use client";

/**
 * Papan Dunia 1 — pola.
 *
 * Empat mesin, empat cara berpikir yang berbeda:
 *
 *   PolaIsi     · membaca pola yang sudah ada, mengisi yang bolong
 *   PolaSusun   · membuat pola sendiri dari contoh
 *   BedaSendiri · menguji anggota kelompok terhadap aturan
 *   IngatPola   · menahan urutan di kepala, lalu menuliskannya kembali
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { Specimen, SPECIMEN_LABEL, type SpecimenId } from "@/components/illustrations/specimens";
import { BendaSeret, PapanDnd, ZonaLepas } from "@/components/game/dnd";
import { Bingkai, LabelMeja, Meja, Raya, Tanda, useBakiAcak, useMain, type PropsMain } from "@/components/game/umum";
import type { BedaSendiri, IngatPola, PolaIsi, PolaSusun } from "@/lib/game/types";
import { cn } from "@/lib/utils";

/* ── Ubin bersama ──────────────────────────────────────────────── */

// 64px di ponsel: dengan Meja p-5 (40px) dan jarak 8px, empat ubin pas
// dalam satu baris di layar 360px tanpa sisa yang menggantung sendirian.
// Tetap jauh di atas ambang sasaran sentuh 44px.
const UBIN = "h-16 w-16 sm:h-20 sm:w-20";

function Ubin({ id, kecil = false }: { id: SpecimenId; kecil?: boolean }) {
  return <Specimen id={id} size={kecil ? 34 : 44} label={SPECIMEN_LABEL[id]} />;
}

/** Ubin mati yang hanya dipandang — bagian pola yang sudah ada. */
function UbinTetap({ id, urut }: { id: SpecimenId; urut: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.86 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: urut * 0.045, type: "spring", stiffness: 420, damping: 24 }}
      className={cn(
        UBIN,
        "flex shrink-0 items-center justify-center rounded-tile border-2 border-kertas-deep bg-kertas-lo shadow-tile"
      )}
    >
      <Ubin id={id} />
    </motion.div>
  );
}

function Ulangi({ onKlik }: { onKlik: () => void }) {
  return (
    <button
      type="button"
      onClick={onKlik}
      className={cn(
        "target-sentuh inline-flex items-center gap-1.5 rounded-full border-2 border-kertas-deep bg-kertas-lo px-3.5",
        "font-display text-kecil font-bold text-tinta-mid shadow-tile transition-all duration-cepat ease-pegas",
        "hover:-translate-y-0.5 hover:border-tinta-faint active:translate-y-0.5 active:shadow-tekan"
      )}
    >
      <RotateCcw className="h-3.5 w-3.5" aria-hidden />
      Ulangi susunan
    </button>
  );
}

/* ═══ 1 · Lengkapi pola ════════════════════════════════════════ */

export function PapanPolaIsi({ data, onSelesai }: PropsMain<PolaIsi>) {
  const { petunjuk, salah, sudah, tandaiSalah, bukaPetunjuk, selesaikan } = useMain(onSelesai);
  const kurangiGerak = useReducedMotion();

  /** Indeks lubang di dalam `deret`, berurutan dari kiri. */
  const lubang = useMemo(
    () => data.deret.map((d, i) => (d === "?" ? i : -1)).filter((i) => i >= 0),
    [data.deret]
  );
  const [isian, setIsian] = useState<Record<number, SpecimenId>>({});
  const [salahDi, setSalahDi] = useState<number[]>([]);
  // Urutan data tidak boleh bocor jadi petunjuk; posisi awal berubah tiap main.
  const baki = useBakiAcak(data.baki, data.deret.join("|"));

  const onLepas = useCallback(
    (itemId: string, zonaId: string) => {
      if (sudah) return;
      const spesimen = itemId.replace("baki:", "") as SpecimenId;
      const idx = Number(zonaId.replace("lubang:", ""));
      setSalahDi([]);
      setIsian((prev) => ({ ...prev, [idx]: spesimen }));
    },
    [sudah]
  );

  // Diperiksa saat semua lubang terisi. Yang benar dibiarkan di tempat;
  // hanya yang keliru yang dikembalikan — supaya kemajuan tidak hangus.
  useEffect(() => {
    if (sudah || lubang.some((i) => !isian[i])) return;
    const keliru = lubang.filter((pos, urut) => isian[pos] !== data.jawaban[urut]);
    if (keliru.length === 0) {
      selesaikan();
    } else {
      tandaiSalah();
      setSalahDi(keliru);
      const t = window.setTimeout(() => {
        setIsian((prev) => {
          const next = { ...prev };
          keliru.forEach((i) => delete next[i]);
          return next;
        });
        setSalahDi([]);
      }, 700);
      return () => window.clearTimeout(t);
    }
  }, [isian, lubang, data.jawaban, sudah, selesaikan, tandaiSalah]);

  const terisi = lubang.filter((i) => isian[i]).length;

  return (
    <Bingkai
      perintah={data.perintah}
      petunjuk={data.petunjuk}
      terbuka={petunjuk}
      onBuka={bukaPetunjuk}
      sudah={sudah}
      salah={salah}
      keterangan={
        lubang.length > 1 && !sudah ? (
          <span className="label-spesimen text-tinta-soft">
            {terisi} dari {lubang.length} terisi
          </span>
        ) : undefined
      }
    >
      <PapanDnd onLepas={onLepas} kunci={sudah}>
        <Meja>
          <Raya jalan={sudah} />

          {/* Deret pola. MELIPAT, bukan menggulung.
              Dulu barisnya `justify-center overflow-x-auto`, dan itu bug
              CSS yang terkenal: begitu isi meluber, bagian yang keluar di
              sisi KIRI tidak bisa dijangkau scroll sama sekali. Deret 9
              ubin (aktivitas 1-2 dan 3-2) selebar 676px dipaksa masuk ruang
              328px di ponsel, jadi ubin-ubin pertama benar-benar tertutup
              permanen. Melipat ke beberapa baris membuat semuanya terlihat
              sekaligus, dan itu jauh lebih baik untuk anak yang tidak tahu
              bahwa ada isi tersembunyi di samping. */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {data.deret.map((d, i) => {
                if (d !== "?") return <UbinTetap key={i} id={d} urut={i} />;
                const isi = isian[i];
                const keliru = salahDi.includes(i);
                return (
                  <ZonaLepas
                    key={i}
                    id={`lubang:${i}`}
                    label={`Tempat kosong ke-${lubang.indexOf(i) + 1}`}
                    terisi={Boolean(isi)}
                    className={cn(UBIN, "shrink-0", keliru && !kurangiGerak && "animate-goyang")}
                  >
                    <AnimatePresence mode="wait">
                      {isi ? (
                        <motion.span
                          key={isi}
                          initial={kurangiGerak ? false : { scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 480, damping: 20 }}
                          className="relative"
                        >
                          <Ubin id={isi} />
                          {keliru && <Tanda jenis="salah" />}
                          {sudah && <Tanda jenis="benar" />}
                        </motion.span>
                      ) : (
                        <motion.span
                          key="tanya"
                          className="font-display text-judul font-extrabold text-tinta-faint"
                          animate={kurangiGerak ? undefined : { opacity: [0.55, 1, 0.55] }}
                          transition={{ duration: 2.1, repeat: Infinity }}
                        >
                          ?
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </ZonaLepas>
                );
              })}
          </div>

          <div className="mt-5 border-t-2 border-dashed border-kertas-deep pt-4">
            <LabelMeja>Baki</LabelMeja>
            <div className="flex flex-wrap justify-center gap-2.5">
              {baki.map((s) => (
                <BendaSeret key={s} id={`baki:${s}`} label={SPECIMEN_LABEL[s]} className={UBIN} disabled={sudah}>
                  <Ubin id={s} />
                </BendaSeret>
              ))}
            </div>
          </div>
        </Meja>
      </PapanDnd>
    </Bingkai>
  );
}

/* ═══ 2 · Susun pola ═══════════════════════════════════════════ */

export function PapanPolaSusun({ data, onSelesai }: PropsMain<PolaSusun>) {
  const { petunjuk, salah, sudah, tandaiSalah, bukaPetunjuk, selesaikan } = useMain(onSelesai);
  const kurangiGerak = useReducedMotion();
  const [slot, setSlot] = useState<(SpecimenId | null)[]>(() => data.jawaban.map(() => null));
  const [salahDi, setSalahDi] = useState<number[]>([]);
  const baki = useBakiAcak(data.baki, data.contoh.join("|"));

  const onLepas = useCallback(
    (itemId: string, zonaId: string) => {
      if (sudah) return;
      const spesimen = itemId.replace("baki:", "") as SpecimenId;
      const idx = Number(zonaId.replace("slot:", ""));
      setSalahDi([]);
      setSlot((prev) => prev.map((v, i) => (i === idx ? spesimen : v)));
    },
    [sudah]
  );

  const reset = useCallback(() => {
    setSlot(data.jawaban.map(() => null));
    setSalahDi([]);
  }, [data.jawaban]);

  useEffect(() => {
    if (sudah || slot.some((s) => s === null)) return;
    const keliru = slot.map((s, i) => (s === data.jawaban[i] ? -1 : i)).filter((i) => i >= 0);
    if (keliru.length === 0) {
      selesaikan();
    } else {
      tandaiSalah();
      setSalahDi(keliru);
      const t = window.setTimeout(() => {
        setSlot((prev) => prev.map((v, i) => (keliru.includes(i) ? null : v)));
        setSalahDi([]);
      }, 700);
      return () => window.clearTimeout(t);
    }
  }, [slot, data.jawaban, sudah, selesaikan, tandaiSalah]);

  return (
    <Bingkai
      perintah={data.perintah}
      petunjuk={data.petunjuk}
      terbuka={petunjuk}
      onBuka={bukaPetunjuk}
      sudah={sudah}
      salah={salah}
    >
      <PapanDnd onLepas={onLepas} kunci={sudah}>
        <Meja>
          <Raya jalan={sudah} />

          <LabelMeja>Bagian yang sudah jadi</LabelMeja>
          <div className="flex flex-wrap justify-center gap-2 rounded-tile bg-kertas/60 p-2.5">
            {data.contoh.map((s, i) => (
              <div
                key={i}
                className={cn(
                  UBIN,
                  "flex shrink-0 items-center justify-center rounded-tile border-2 border-dashed border-daun/40 bg-daun-lo/25"
                )}
              >
                <Ubin id={s} />
              </div>
            ))}
          </div>

          <p className="mt-4 text-center font-display text-kecil font-bold text-daun-hi">Lanjutkan dari sini</p>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {slot.map((isi, i) => {
                const keliru = salahDi.includes(i);
                return (
                  <ZonaLepas
                    key={i}
                    id={`slot:${i}`}
                    label={`Manik ke-${i + 1}`}
                    terisi={Boolean(isi)}
                    className={cn(UBIN, "shrink-0", keliru && !kurangiGerak && "animate-goyang")}
                  >
                    <AnimatePresence mode="wait">
                      {isi ? (
                        <motion.span
                          key={isi}
                          initial={kurangiGerak ? false : { scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 480, damping: 20 }}
                          className="relative"
                        >
                          <Ubin id={isi} />
                          {keliru && <Tanda jenis="salah" />}
                          {sudah && <Tanda jenis="benar" />}
                        </motion.span>
                      ) : (
                        <motion.span
                          key="kosong"
                          className="label-spesimen text-tinta-faint"
                          animate={kurangiGerak ? undefined : { opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2.1, repeat: Infinity, delay: i * 0.14 }}
                        >
                          {i + 1}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </ZonaLepas>
                );
              })}
          </div>

          <div className="mt-5 border-t-2 border-dashed border-kertas-deep pt-4">
            <LabelMeja>Baki manik</LabelMeja>
            <div className="flex flex-wrap justify-center gap-2.5">
              {baki.map((s) => (
                <BendaSeret key={s} id={`baki:${s}`} label={SPECIMEN_LABEL[s]} className={UBIN} disabled={sudah}>
                  <Ubin id={s} />
                </BendaSeret>
              ))}
            </div>
          </div>
        </Meja>
      </PapanDnd>

      {!sudah && slot.some(Boolean) && (
        <div className="flex justify-center">
          <Ulangi onKlik={reset} />
        </div>
      )}
    </Bingkai>
  );
}

/* ═══ 3 · Cari yang beda ═══════════════════════════════════════ */

export function PapanBedaSendiri({ data, onSelesai }: PropsMain<BedaSendiri>) {
  const { petunjuk, salah, sudah, tandaiSalah, bukaPetunjuk, selesaikan } = useMain(onSelesai);
  const kurangiGerak = useReducedMotion();
  const [ditolak, setDitolak] = useState<number[]>([]);
  // Dua ketukan, bukan satu: pilih dulu, lalu tegaskan. Dengan satu
  // ketukan, tebakan asal di kisi enam sel menang seketika 1 dari 6
  // kali — tanpa berpikir sama sekali. Komitmen kecil ini yang
  // membedakan menebak dari memilih.
  const [pilih, setPilih] = useState<number | null>(null);

  const ketuk = (i: number) => {
    if (sudah || ditolak.includes(i)) return;
    setPilih((prev) => (prev === i ? null : i));
  };

  const tegaskan = () => {
    if (pilih === null || sudah) return;
    if (pilih === data.indeksBeda) {
      selesaikan();
    } else {
      tandaiSalah();
      setDitolak((prev) => [...prev, pilih]);
      setPilih(null);
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
    >
      <Meja className="relative">
        <Raya jalan={sudah} />
        <div className="mx-auto grid max-w-[21rem] grid-cols-3 gap-2.5 sm:max-w-[24rem] sm:gap-3">
          {data.kisi.map((s, i) => {
            const kena = sudah && i === data.indeksBeda;
            const tolak = ditolak.includes(i);
            const dipilih = pilih === i && !sudah;
            return (
              <motion.button
                key={i}
                type="button"
                onClick={() => ketuk(i)}
                disabled={sudah || tolak}
                initial={kurangiGerak ? false : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: tolak ? 0.4 : 1, scale: 1 }}
                transition={{ delay: kurangiGerak ? 0 : i * 0.04, type: "spring", stiffness: 400, damping: 24 }}
                whileHover={sudah || tolak ? undefined : { y: -3, scale: 1.04 }}
                whileTap={sudah || tolak ? undefined : { scale: 0.93 }}
                aria-label={SPECIMEN_LABEL[s]}
                aria-pressed={dipilih}
                className={cn(
                  "relative flex aspect-square items-center justify-center rounded-tile border-2 transition-colors duration-cepat",
                  kena
                    ? "border-daun bg-daun-lo/60 shadow-angkat"
                    : tolak
                      ? "cursor-default border-kertas-deep bg-kertas"
                      : dipilih
                        ? "-translate-y-1 border-matahari bg-matahari-lo/40 shadow-angkat"
                        : "border-kertas-deep bg-kertas-lo shadow-tile hover:border-daun/60"
                )}
              >
                <Specimen id={s} size={40} label={SPECIMEN_LABEL[s]} />
                {kena && <Tanda jenis="benar" />}
                {tolak && <Tanda jenis="salah" />}
                {kena && !kurangiGerak && (
                  <span className="pointer-events-none absolute inset-0 animate-denyut-cincin rounded-tile border-2 border-daun" aria-hidden />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Tombol penegasan — muncul begitu ada yang dipilih. */}
        {!sudah && pilih !== null && (
          <motion.div
            initial={kurangiGerak ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex justify-center"
          >
            <button
              type="button"
              onClick={tegaskan}
              className="target-sentuh inline-flex items-center gap-2 rounded-full border-2 border-matahari-hi bg-matahari px-6 font-display text-badan font-extrabold text-kertas-lo shadow-angkat transition-all duration-cepat ease-pegas hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-tekan"
            >
              Yang ini beda!
            </button>
          </motion.div>
        )}

        <AnimatePresence>
          {sudah && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto mt-4 max-w-md rounded-tile border-2 border-daun/30 bg-daun-lo/25 px-4 py-3 text-center text-kecil text-tinta-mid"
            >
              {data.alasan}
            </motion.p>
          )}
        </AnimatePresence>
      </Meja>
    </Bingkai>
  );
}

/* ═══ 4 · Ingat pola ═══════════════════════════════════════════ */

type FaseIngat = "siap" | "lihat" | "susun";

export function PapanIngatPola({ data, onSelesai }: PropsMain<IngatPola>) {
  const { petunjuk, salah, sudah, tandaiSalah, bukaPetunjuk, selesaikan } = useMain(onSelesai);
  const baki = useBakiAcak(data.baki, data.urutan.join("|"));
  const kurangiGerak = useReducedMotion();
  const [fase, setFase] = useState<FaseIngat>("siap");
  const [sorot, setSorot] = useState(-1);
  const [slot, setSlot] = useState<(SpecimenId | null)[]>(() => data.urutan.map(() => null));
  const [salahDi, setSalahDi] = useState<number[]>([]);
  const [ulangan, setUlangan] = useState(0);

  // Memutar urutan satu per satu, lalu menyerahkan giliran ke anak.
  //
  // Timeout terakhir HARUS ikut dibatalkan, bukan cuma intervalnya. Dulu
  // hanya intervalnya yang dibersihkan: anak yang menekan "Ulangi
  // susunan" tepat di kartu terakhir membuat timeout lama tetap hidup,
  // lalu ia memotong pemutaran yang baru saja dimulai dan melompat ke
  // fase susun. Terlihat seperti permainan yang rusak sendiri.
  useEffect(() => {
    if (fase !== "lihat") return;
    const ms = kurangiGerak ? data.msPerKartu * 1.6 : data.msPerKartu;
    let i = 0;
    let tutup: number | undefined;
    setSorot(0);
    const jam = window.setInterval(() => {
      i += 1;
      if (i >= data.urutan.length) {
        window.clearInterval(jam);
        tutup = window.setTimeout(() => {
          setSorot(-1);
          setFase("susun");
        }, ms);
      } else {
        setSorot(i);
      }
    }, ms);
    return () => {
      window.clearInterval(jam);
      if (tutup !== undefined) window.clearTimeout(tutup);
    };
  }, [fase, data.urutan.length, data.msPerKartu, kurangiGerak, ulangan]);

  const onLepas = useCallback(
    (itemId: string, zonaId: string) => {
      if (sudah || fase !== "susun") return;
      const spesimen = itemId.replace("baki:", "") as SpecimenId;
      const idx = Number(zonaId.replace("slot:", ""));
      setSalahDi([]);
      setSlot((prev) => prev.map((v, i) => (i === idx ? spesimen : v)));
    },
    [sudah, fase]
  );

  useEffect(() => {
    if (sudah || fase !== "susun" || slot.some((s) => s === null)) return;
    const keliru = slot.map((s, i) => (s === data.urutan[i] ? -1 : i)).filter((i) => i >= 0);
    if (keliru.length === 0) {
      selesaikan();
    } else {
      tandaiSalah();
      setSalahDi(keliru);
      // Salah berarti ingatannya belum utuh — urutannya diputar sekali lagi.
      const t = window.setTimeout(() => {
        setSlot(data.urutan.map(() => null));
        setSalahDi([]);
        setUlangan((n) => n + 1);
        setFase("lihat");
      }, 900);
      return () => window.clearTimeout(t);
    }
  }, [slot, fase, data.urutan, sudah, selesaikan, tandaiSalah]);

  return (
    <Bingkai
      perintah={data.perintah}
      petunjuk={data.petunjuk}
      terbuka={petunjuk}
      onBuka={bukaPetunjuk}
      sudah={sudah}
      salah={salah}
      keterangan={
        fase === "lihat" ? (
          <span className="label-spesimen text-daun-hi">Perhatikan…</span>
        ) : fase === "susun" && !sudah ? (
          <span className="label-spesimen text-tinta-soft">Giliranmu</span>
        ) : undefined
      }
    >
      <PapanDnd onLepas={onLepas} kunci={sudah || fase !== "susun"}>
        <Meja>
          <Raya jalan={sudah} />

          {fase === "siap" ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="flex gap-2" aria-hidden>
                {data.urutan.map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      UBIN,
                      "flex items-center justify-center rounded-tile border-2 border-dashed border-tinta-faint bg-kertas/50"
                    )}
                  />
                ))}
              </div>
              <p className="text-center text-kecil text-tinta-mid">
                {data.urutan.length} kartu akan muncul sebentar, satu per satu.
              </p>
              <button
                type="button"
                onClick={() => setFase("lihat")}
                className={cn(
                  "target-sentuh rounded-full border-2 border-daun-hi bg-daun px-7 font-display text-besar font-extrabold text-kertas-lo",
                  "shadow-angkat transition-all duration-cepat ease-pegas hover:-translate-y-0.5 hover:bg-daun-hi",
                  "active:translate-y-0.5 active:shadow-tekan"
                )}
              >
                Mulai
              </button>
            </div>
          ) : fase === "lihat" ? (
            <div className="flex min-h-[13rem] items-center justify-center gap-2 py-8">
              {data.urutan.map((s, i) => (
                <motion.div
                  key={i}
                  animate={
                    sorot === i
                      ? { scale: kurangiGerak ? 1 : 1.12, opacity: 1 }
                      : { scale: 1, opacity: 0.22 }
                  }
                  transition={{ duration: 0.16 }}
                  className={cn(
                    UBIN,
                    "flex shrink-0 items-center justify-center rounded-tile border-2",
                    sorot === i ? "border-daun bg-daun-lo/50 shadow-angkat" : "border-kertas-deep bg-kertas-lo"
                  )}
                >
                  {sorot === i ? <Ubin id={s} /> : <span className="h-8 w-8 rounded-full bg-kertas-hi" aria-hidden />}
                </motion.div>
              ))}
            </div>
          ) : (
            <>
              <div className="flex justify-center gap-2 sm:gap-2.5">
                {slot.map((isi, i) => {
                  const keliru = salahDi.includes(i);
                  return (
                    <ZonaLepas
                      key={i}
                      id={`slot:${i}`}
                      label={`Kartu ke-${i + 1}`}
                      terisi={Boolean(isi)}
                      className={cn(UBIN, "shrink-0", keliru && !kurangiGerak && "animate-goyang")}
                    >
                      {isi ? (
                        <span className="relative">
                          <Ubin id={isi} />
                          {keliru && <Tanda jenis="salah" />}
                          {sudah && <Tanda jenis="benar" />}
                        </span>
                      ) : (
                        <span className="label-spesimen text-tinta-faint">{i + 1}</span>
                      )}
                    </ZonaLepas>
                  );
                })}
              </div>

              <div className="mt-5 border-t-2 border-dashed border-kertas-deep pt-4">
                <LabelMeja>Pilih kartunya</LabelMeja>
                <div className="flex flex-wrap justify-center gap-2.5">
                  {baki.map((s) => (
                    <BendaSeret key={s} id={`baki:${s}`} label={SPECIMEN_LABEL[s]} className={UBIN} disabled={sudah}>
                      <Ubin id={s} />
                    </BendaSeret>
                  ))}
                </div>
              </div>
            </>
          )}
        </Meja>
      </PapanDnd>
    </Bingkai>
  );
}
