"use client";

/**
 * Papan Dunia 4 — ilmuwan cilik.
 *
 *   LabTakar · membuat unit demi unit sampai satu bahan habis
 *   Timbang  · menyeimbangkan dua sisi
 *
 * Yang penting di LabTakar: anak tidak diminta menghitung 7 ÷ 3 di
 * kepalanya. Ia membuat pot, melihat stok turun 7 → 4 → 1, lalu
 * menemukan sendiri bahwa 1 tidak cukup untuk 3. Pembagian itu
 * dialami, bukan dihitung. Namanya baru diberikan saat penguatan.
 */

import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Specimen, SPECIMEN_LABEL } from "@/components/illustrations/specimens";
import { BendaSeret, PapanDnd, ZonaLepas } from "@/components/game/dnd";
import { Bingkai, LabelMeja, Meja, Raya, Tanda, useMain, type PropsMain } from "@/components/game/umum";
import type { LabTakar, Timbang } from "@/lib/game/types";
import { cn } from "@/lib/utils";

/* ═══ 9 · Lab takar ════════════════════════════════════════════ */

export function PapanLabTakar({ data, onSelesai }: PropsMain<LabTakar>) {
  const { petunjuk, salah, sudah, tandaiSalah, bukaPetunjuk, selesaikan } = useMain(onSelesai);
  const kurangiGerak = useReducedMotion();

  const butuh = useMemo(
    () => Object.fromEntries(data.resep.map((r) => [r.bahanId, r.jumlah])) as Record<string, number>,
    [data.resep]
  );

  const [stok, setStok] = useState<Record<string, number>>(() =>
    Object.fromEntries(data.bahan.map((b) => [b.id, b.tersedia]))
  );
  const [pot, setPot] = useState<Record<string, boolean>>({});
  const [jadi, setJadi] = useState(0);
  const [tolak, setTolak] = useState<string | null>(null);
  const [pesan, setPesan] = useState<string | null>(null);

  const cukup = (id: string) => stok[id] >= butuh[id];
  const potPenuh = data.resep.every((r) => pot[r.bahanId]);
  /** Masih ada bahan lengkap untuk satu unit lagi? */
  const bisaLagi = data.resep.every((r) => cukup(r.bahanId));

  const onLepas = useCallback(
    (itemId: string, zonaId: string) => {
      if (sudah) return;
      const id = itemId.replace("bahan:", "");
      if (zonaId !== `slot:${id}`) return; // tiap bahan punya tempatnya sendiri
      if (pot[id]) return;
      if (!cukup(id)) {
        tandaiSalah();
        setTolak(id);
        setPesan(`Bahan ini tinggal ${stok[id]}. Satu ${data.unitNama} butuh ${butuh[id]}.`);
        window.setTimeout(() => setTolak(null), 700);
        return;
      }
      setPesan(null);
      setPot((prev) => ({ ...prev, [id]: true }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sudah, pot, stok, butuh, data.unitNama, tandaiSalah]
  );

  /** Pot penuh → kurangi stok, tambah hitungan, kosongkan pot. */
  const kunciPot = () => {
    setStok((prev) => {
      const next = { ...prev };
      data.resep.forEach((r) => {
        next[r.bahanId] -= r.jumlah;
      });
      return next;
    });
    setJadi((n) => n + 1);
    setPot({});
    setPesan(null);
  };

  const selesai = () => {
    if (sudah) return;
    if (jadi === data.jawaban) {
      selesaikan();
    } else if (jadi < data.jawaban) {
      tandaiSalah();
      setPesan("Bahannya masih cukup untuk satu lagi. Periksa lagi bakinya.");
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
      <PapanDnd onLepas={onLepas} kunci={sudah}>
        <Meja>
          <Raya jalan={sudah} />

          {/* Soal cerita — ditulis seperti catatan, bukan seperti ujian. */}
          <p className="mb-4 rounded-tile border-l-4 border-nila bg-nila-lo/25 px-4 py-3 text-kecil leading-relaxed text-tinta-mid">
            {data.cerita}
          </p>

          {/* Rak hasil */}
          <div className="mb-4 flex items-center gap-3 rounded-tile border-2 border-kertas-deep bg-kertas p-3">
            <span className="label-spesimen shrink-0 text-tinta-soft">Sudah jadi</span>
            <div className="flex min-h-[2.75rem] flex-1 flex-wrap items-center gap-1.5">
              <AnimatePresence>
                {Array.from({ length: jadi }).map((_, i) => (
                  <motion.span
                    key={i}
                    initial={kurangiGerak ? false : { scale: 0.3, y: -18, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 420, damping: 20 }}
                    className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-daun/40 bg-daun-lo/40"
                  >
                    <Specimen id={data.unitSpesimen} size={26} />
                  </motion.span>
                ))}
              </AnimatePresence>
              {jadi === 0 && <span className="text-kecil text-tinta-faint">Belum ada</span>}
            </div>
            <span className="shrink-0 rounded-md bg-daun-lo/50 px-2.5 py-1 font-label text-kecil font-bold tabular-nums text-daun-hi">
              {jadi} {data.unitNama}
            </span>
          </div>

          {/* Unit yang sedang dibuat */}
          <LabelMeja>Sedang dibuat</LabelMeja>
          <div className="rounded-tile border-2 border-dashed border-nila/40 bg-nila-lo/15 p-3">
            <div
              className={cn(
                "mx-auto grid max-w-md items-stretch gap-2.5",
                data.resep.length === 2 ? "grid-cols-2" : "grid-cols-3"
              )}
            >
              {data.resep.map((r) => {
                const b = data.bahan.find((x) => x.id === r.bahanId);
                if (!b) return null;
                return (
                  <ZonaLepas
                    key={r.bahanId}
                    id={`slot:${r.bahanId}`}
                    label={`Tempat ${b.nama}, butuh ${r.jumlah} ${b.satuan}`}
                    terisi={Boolean(pot[r.bahanId])}
                    className="min-h-[6.5rem] flex-col gap-1 p-2"
                  >
                    {pot[r.bahanId] ? (
                      <motion.span
                        initial={kurangiGerak ? false : { scale: 0.4 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 460, damping: 20 }}
                        className="relative flex flex-col items-center gap-1"
                      >
                        <Specimen id={b.spesimen} size={34} label={b.nama} />
                        <Tanda jenis="benar" />
                      </motion.span>
                    ) : (
                      <span className="flex h-[2.125rem] items-center font-display text-judul font-extrabold text-tinta-faint">
                        +
                      </span>
                    )}
                    <span className="font-label text-mikro font-bold tabular-nums text-tinta-mid">
                      {r.jumlah} {b.satuan}
                    </span>
                    <span className="text-[0.625rem] leading-tight text-tinta-soft">{b.nama}</span>
                  </ZonaLepas>
                );
              })}
            </div>

            <AnimatePresence>
              {potPenuh && !sudah && (
                <motion.div
                  initial={kurangiGerak ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 flex justify-center"
                >
                  <button
                    type="button"
                    onClick={kunciPot}
                    className={cn(
                      "target-sentuh rounded-full border-2 border-daun-hi bg-daun px-7 font-display text-besar font-extrabold text-kertas-lo",
                      "shadow-angkat transition-all duration-cepat ease-pegas hover:-translate-y-0.5 hover:bg-daun-hi",
                      "active:translate-y-0.5 active:shadow-tekan",
                      !kurangiGerak && "animate-bounce-in"
                    )}
                  >
                    Satu {data.unitNama} jadi
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Baki bahan + stok */}
          <div className="mt-4 border-t-2 border-dashed border-kertas-deep pt-4">
            <LabelMeja>Bahan tersisa</LabelMeja>
            <div className="flex flex-wrap justify-center gap-2.5">
              {data.bahan.map((b) => {
                const habis = !cukup(b.id);
                const sudahMasuk = Boolean(pot[b.id]);
                return (
                  <div key={b.id} className="flex w-[5.5rem] flex-col items-center gap-1.5">
                    <BendaSeret
                      id={`bahan:${b.id}`}
                      label={`${b.nama}, tersisa ${stok[b.id]} ${b.satuan}`}
                      disabled={sudah || sudahMasuk}
                      className={cn(
                        "h-[4.25rem] w-[4.25rem]",
                        habis && "border-tanah/40 bg-tanah-lo/20",
                        tolak === b.id && !kurangiGerak && "animate-goyang"
                      )}
                    >
                      <Specimen id={b.spesimen} size={40} label={b.nama} />
                    </BendaSeret>
                    <span
                      className={cn(
                        "rounded-md px-1.5 py-0.5 font-label text-mikro font-bold tabular-nums",
                        habis ? "bg-tanah-lo/50 text-tanah-hi" : "bg-kertas-hi text-tinta-mid"
                      )}
                    >
                      {stok[b.id]} {b.satuan}
                    </span>
                    <span className="text-center text-[0.625rem] leading-tight text-tinta-soft">{b.nama}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <AnimatePresence>
            {pesan && !sudah && (
              <motion.p
                initial={kurangiGerak ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mx-auto mt-3 max-w-md rounded-tile border-2 border-tanah/30 bg-tanah-lo/25 px-4 py-2.5 text-center text-kecil text-tanah-hi"
              >
                {pesan}
              </motion.p>
            )}
          </AnimatePresence>

          {!sudah && !potPenuh && (
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={selesai}
                className={cn(
                  "target-sentuh rounded-full border-2 px-7 font-display text-besar font-extrabold transition-all duration-cepat ease-pegas",
                  bisaLagi
                    ? "border-kertas-deep bg-kertas-lo text-tinta-mid shadow-tile hover:-translate-y-0.5"
                    : "border-nila-hi bg-nila text-kertas-lo shadow-angkat hover:-translate-y-0.5 hover:bg-nila-hi active:translate-y-0.5 active:shadow-tekan"
                )}
              >
                Bahannya sudah habis
              </button>
            </div>
          )}
        </Meja>
      </PapanDnd>
    </Bingkai>
  );
}

/* ═══ 10 · Timbangan ═══════════════════════════════════════════ */

export function PapanTimbang({ data, onSelesai }: PropsMain<Timbang>) {
  const { petunjuk, salah, sudah, tandaiSalah, bukaPetunjuk, selesaikan } = useMain(onSelesai);
  const kurangiGerak = useReducedMotion();

  const beratKiri = data.kiri.jumlah * data.kiri.satuan;
  const [kanan, setKanan] = useState(0);
  const beratKanan = kanan * data.kanan.satuan;
  const selisih = beratKiri - beratKanan;

  /** Miring maksimal 11° — timbangan sungguhan tidak berputar penuh. */
  const miring = Math.max(-11, Math.min(11, selisih / (data.kanan.satuan * 0.9)));

  const onLepas = useCallback(
    (_itemId: string, zonaId: string) => {
      if (sudah || zonaId !== "pan-kanan") return;
      const berikut = kanan + 1;
      const sisa = beratKiri - berikut * data.kanan.satuan;
      setKanan(berikut);
      if (sisa === 0) selesaikan();
      else if (sisa < 0) tandaiSalah(); // kelebihan — sisi kanan jadi turun
    },
    [sudah, kanan, beratKiri, data.kanan.satuan, selesaikan, tandaiSalah]
  );

  const ambil = () => {
    if (sudah || kanan === 0) return;
    setKanan((n) => n - 1);
  };

  const seimbang = selisih === 0;

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
          {seimbang ? "Lurus" : selisih > 0 ? "Kiri lebih berat" : "Kanan lebih berat"}
        </span>
      }
    >
      <PapanDnd onLepas={onLepas} kunci={sudah}>
        <Meja>
          <Raya jalan={sudah} />

          <div className="relative mx-auto flex h-[15rem] w-full max-w-lg items-start justify-center">
            {/* Palang */}
            <motion.div
              animate={{ rotate: kurangiGerak ? 0 : miring }}
              transition={{ type: "spring", stiffness: 90, damping: 12 }}
              className="absolute top-8 z-10 h-2.5 w-[88%] origin-center rounded-full bg-tanah"
              style={{ boxShadow: "0 2px 0 0 #6A4129" }}
            >
              {(["kiri", "kanan"] as const).map((sisi) => {
                const kiri = sisi === "kiri";
                return (
                  <div
                    key={sisi}
                    className={cn("absolute top-1.5", kiri ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2")}
                  >
                    {/* Tali — dibalik rotasi supaya tetap tegak lurus. */}
                    <motion.div
                      animate={{ rotate: kurangiGerak ? 0 : -miring }}
                      transition={{ type: "spring", stiffness: 90, damping: 12 }}
                      className="flex origin-top flex-col items-center"
                    >
                      <span className="h-8 w-0.5 bg-tanah-hi" aria-hidden />
                      {kiri ? (
                        <div className="flex min-h-[5rem] w-[7.5rem] flex-col items-center gap-1 rounded-b-kartu rounded-t-md border-2 border-tanah/50 bg-tanah-lo/30 p-2">
                          <span className="flex flex-wrap justify-center gap-1">
                            {Array.from({ length: data.kiri.jumlah }).map((_, i) => (
                              <Specimen key={i} id={data.kiri.spesimen} size={24} label={data.kiri.nama} />
                            ))}
                          </span>
                          <span className="font-label text-mikro font-bold tabular-nums text-tanah-hi">
                            {data.kiri.jumlah} × {data.kiri.satuan} g
                          </span>
                        </div>
                      ) : (
                        <ZonaLepas
                          id="pan-kanan"
                          label={`Sisi kanan, berisi ${kanan} ${data.kanan.nama}`}
                          terisi={kanan > 0}
                          className="min-h-[5rem] w-[7.5rem] flex-col gap-1 rounded-b-kartu rounded-t-md p-2"
                        >
                          <span className="flex flex-wrap justify-center gap-1">
                            <AnimatePresence>
                              {Array.from({ length: kanan }).map((_, i) => (
                                <motion.span
                                  key={i}
                                  initial={kurangiGerak ? false : { scale: 0.3, y: -14 }}
                                  animate={{ scale: 1, y: 0 }}
                                  exit={{ scale: 0.3, opacity: 0 }}
                                  transition={{ type: "spring", stiffness: 460, damping: 20 }}
                                >
                                  <Specimen id={data.kanan.spesimen} size={24} label={data.kanan.nama} />
                                </motion.span>
                              ))}
                            </AnimatePresence>
                          </span>
                          <span className="font-label text-mikro font-bold tabular-nums text-tinta-mid">
                            {kanan > 0 ? `${kanan} × ${data.kanan.satuan} g` : "kosong"}
                          </span>
                        </ZonaLepas>
                      )}
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>

            {/* Tiang dan alas */}
            <span className="absolute top-8 h-[9rem] w-2.5 rounded-full bg-tanah-hi" aria-hidden />
            <span className="absolute top-[16.5rem] h-2 w-40 -translate-y-full rounded-full bg-tanah-hi" aria-hidden />
            <span
              className={cn(
                "absolute top-3 flex h-6 w-6 items-center justify-center rounded-full border-2 border-tanah-hi",
                seimbang ? "bg-daun" : "bg-kertas-lo"
              )}
              aria-hidden
            >
              {seimbang && !kurangiGerak && (
                <span className="absolute inset-0 animate-denyut-cincin rounded-full border-2 border-daun" />
              )}
            </span>
          </div>

          {/* Bacaan berat */}
          <div className="mx-auto mt-2 flex max-w-sm items-center justify-center gap-3">
            <span className="rounded-md bg-tanah-lo/40 px-2.5 py-1 font-label text-kecil font-bold tabular-nums text-tanah-hi">
              {beratKiri} g
            </span>
            <span
              className={cn(
                "font-display text-judul font-extrabold",
                seimbang ? "text-daun" : "text-tinta-faint"
              )}
            >
              {seimbang ? "=" : selisih > 0 ? ">" : "<"}
            </span>
            <span
              className={cn(
                "rounded-md px-2.5 py-1 font-label text-kecil font-bold tabular-nums",
                seimbang ? "bg-daun-lo/50 text-daun-hi" : "bg-kertas-hi text-tinta-mid"
              )}
            >
              {beratKanan} g
            </span>
          </div>

          <div className="mt-4 border-t-2 border-dashed border-kertas-deep pt-4">
            <LabelMeja>Seret ke sisi kanan</LabelMeja>
            <div className="flex items-center justify-center gap-3">
              <BendaSeret
                id="muatan"
                label={`${data.kanan.nama}, ${data.kanan.satuan} gram`}
                disabled={sudah}
                className="h-[4.25rem] w-[4.25rem]"
              >
                <Specimen id={data.kanan.spesimen} size={40} label={data.kanan.nama} />
              </BendaSeret>

              {kanan > 0 && !sudah && (
                <button
                  type="button"
                  onClick={ambil}
                  className={cn(
                    "target-sentuh rounded-full border-2 border-kertas-deep bg-kertas-lo px-4 font-display text-kecil font-bold text-tinta-mid",
                    "shadow-tile transition-all duration-cepat ease-pegas hover:-translate-y-0.5 active:translate-y-0.5"
                  )}
                >
                  Ambil satu
                </button>
              )}
            </div>
          </div>
        </Meja>
      </PapanDnd>
    </Bingkai>
  );
}
