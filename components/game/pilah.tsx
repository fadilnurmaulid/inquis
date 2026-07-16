"use client";

/**
 * Papan Dunia 2 — memilah dan mengurutkan.
 *
 *   PilahWadah · menerapkan aturan kelompok pada benda satu per satu
 *   UrutDeret  · membandingkan berulang kali sampai semuanya berbaris
 *
 * Keduanya memakai seret-dan-lepas, tapi rasanya berbeda: memilah itu
 * memutuskan "masuk mana", mengurutkan itu memutuskan "sebelum siapa".
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Specimen, SPECIMEN_LABEL } from "@/components/illustrations/specimens";
import { BendaSeret, PapanDnd, ZonaLepas } from "@/components/game/dnd";
import { Bingkai, LabelMeja, Meja, Raya, Tanda, useBakiAcak, useMain, type PropsMain } from "@/components/game/umum";
import type { PilahWadah, UrutDeret } from "@/lib/game/types";
import { cn } from "@/lib/utils";

/* ═══ 5 · Pilah ke wadah ═══════════════════════════════════════ */

export function PapanPilahWadah({ data, onSelesai }: PropsMain<PilahWadah>) {
  const { petunjuk, salah, sudah, tandaiSalah, bukaPetunjuk, selesaikan } = useMain(onSelesai);
  const kurangiGerak = useReducedMotion();

  const benda = useBakiAcak(data.benda, data.benda.map((b) => b.id).join("|"));
  const [tempat, setTempat] = useState<Record<string, string>>({});
  const [tolak, setTolak] = useState<string | null>(null);

  const onLepas = useCallback(
    (itemId: string, zonaId: string) => {
      if (sudah || tempat[itemId]) return;
      const item = data.benda.find((b) => b.id === itemId);
      if (!item) return;
      if (item.wadahBenar === zonaId) {
        setTempat((prev) => ({ ...prev, [itemId]: zonaId }));
      } else {
        tandaiSalah();
        setTolak(itemId);
        window.setTimeout(() => setTolak(null), 700);
      }
    },
    [sudah, tempat, data.benda, tandaiSalah]
  );

  useEffect(() => {
    if (sudah) return;
    if (data.benda.every((b) => tempat[b.id])) selesaikan();
  }, [tempat, data.benda, sudah, selesaikan]);

  // Diambil dari `benda` (acakan berbenih), bukan data.benda: kalau urutan
  // asli data yang tampil, urutan penulisan konten ikut bocor ke anak.
  const sisa = benda.filter((b) => !tempat[b.id]);

  return (
    <Bingkai
      perintah={data.perintah}
      petunjuk={data.petunjuk}
      terbuka={petunjuk}
      onBuka={bukaPetunjuk}
      sudah={sudah}
      salah={salah}
      keterangan={
        !sudah ? (
          <span className="label-spesimen text-tinta-soft">Sisa {sisa.length} benda</span>
        ) : undefined
      }
    >
      <PapanDnd onLepas={onLepas} kunci={sudah}>
        <Meja>
          <Raya jalan={sudah} />

          {/* Wadah. Tinggi seragam lewat grid + items-stretch, bukan tinggi tetap. */}
          <div
            className={cn(
              "grid items-stretch gap-3",
              data.wadah.length === 2 ? "grid-cols-2" : "grid-cols-3"
            )}
          >
            {data.wadah.map((w) => {
              const isi = data.benda.filter((b) => tempat[b.id] === w.id);
              return (
                <ZonaLepas
                  key={w.id}
                  id={w.id}
                  label={w.nama}
                  terisi={isi.length > 0}
                  className="min-h-[10.5rem] flex-col justify-start gap-2 p-2.5 sm:min-h-[11.5rem] sm:p-3"
                >
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2"
                    style={{ borderColor: w.warna, backgroundColor: `${w.warna}1F` }}
                    aria-hidden
                  >
                    <Specimen id={w.spesimen} size={26} />
                  </span>
                  <span
                    className="font-display text-mikro font-bold leading-tight sm:text-kecil"
                    style={{ color: w.warna }}
                  >
                    {w.nama}
                  </span>

                  <span className="flex flex-1 flex-wrap content-start justify-center gap-1">
                    <AnimatePresence>
                      {isi.map((b) => (
                        <motion.span
                          key={b.id}
                          initial={kurangiGerak ? false : { scale: 0.4, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 460, damping: 20 }}
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-kertas-deep bg-kertas-lo"
                        >
                          <Specimen id={b.spesimen} size={22} label={SPECIMEN_LABEL[b.spesimen]} />
                        </motion.span>
                      ))}
                    </AnimatePresence>
                  </span>
                </ZonaLepas>
              );
            })}
          </div>

          <div className="mt-5 border-t-2 border-dashed border-kertas-deep pt-4">
            <LabelMeja>Belum dipilah</LabelMeja>
            <div className="flex min-h-[4.5rem] flex-wrap items-center justify-center gap-2.5">
              <AnimatePresence mode="popLayout">
                {sisa.map((b) => (
                  <motion.div
                    key={b.id}
                    layout={!kurangiGerak}
                    exit={kurangiGerak ? undefined : { scale: 0.4, opacity: 0 }}
                    className="relative"
                  >
                    <BendaSeret
                      id={b.id}
                      label={SPECIMEN_LABEL[b.spesimen]}
                      disabled={sudah}
                      className={cn(
                        "h-[4.25rem] w-[4.25rem]",
                        tolak === b.id && !kurangiGerak && "animate-goyang"
                      )}
                    >
                      <Specimen id={b.spesimen} size={42} label={SPECIMEN_LABEL[b.spesimen]} />
                    </BendaSeret>
                    {tolak === b.id && <Tanda jenis="salah" />}
                  </motion.div>
                ))}
              </AnimatePresence>
              {sisa.length === 0 && (
                <p className="text-kecil text-tinta-soft">Semua sudah masuk keranjangnya.</p>
              )}
            </div>
          </div>
        </Meja>
      </PapanDnd>
    </Bingkai>
  );
}

/* ═══ 6 · Urutkan ══════════════════════════════════════════════ */

export function PapanUrutDeret({ data, onSelesai }: PropsMain<UrutDeret>) {
  const { petunjuk, salah, sudah, tandaiSalah, bukaPetunjuk, selesaikan } = useMain(onSelesai);
  const kurangiGerak = useReducedMotion();

  const benar = useMemo(() => {
    const urut = [...data.benda].sort((a, b) => a.nilai - b.nilai);
    return (data.arah === "besar-kecil" ? urut.reverse() : urut).map((b) => b.id);
  }, [data.benda, data.arah]);

  const baki = useBakiAcak(data.benda, data.ciri + data.benda.length);

  const [slot, setSlot] = useState<(string | null)[]>(() => data.benda.map(() => null));
  const [salahDi, setSalahDi] = useState<number[]>([]);

  const onLepas = useCallback(
    (itemId: string, zonaId: string) => {
      if (sudah) return;
      const idx = Number(zonaId.replace("slot:", ""));
      setSalahDi([]);
      setSlot((prev) => {
        // Satu benda hanya boleh di satu tempat: cabut dulu dari slot lama.
        const next = prev.map((v) => (v === itemId ? null : v));
        next[idx] = itemId;
        return next;
      });
    },
    [sudah]
  );

  useEffect(() => {
    if (sudah || slot.some((s) => s === null)) return;
    const keliru = slot.map((s, i) => (s === benar[i] ? -1 : i)).filter((i) => i >= 0);
    if (keliru.length === 0) {
      selesaikan();
    } else {
      tandaiSalah();
      setSalahDi(keliru);
      const t = window.setTimeout(() => {
        setSlot((prev) => prev.map((v, i) => (keliru.includes(i) ? null : v)));
        setSalahDi([]);
      }, 780);
      return () => window.clearTimeout(t);
    }
  }, [slot, benar, sudah, selesaikan, tandaiSalah]);

  const cari = (id: string) => data.benda.find((b) => b.id === id);
  const terpakai = new Set(slot.filter(Boolean) as string[]);

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

          {/* Sumbu: memberi arti pada urutan kiri-ke-kanan. */}
          <div className="mb-3 flex items-center gap-2">
            <span className="label-spesimen shrink-0 text-tinta-soft">
              {data.arah === "kecil-besar" ? `Sedikit ${data.ciri}` : `Banyak ${data.ciri}`}
            </span>
            <span className="h-0.5 flex-1 rounded-full bg-gradient-to-r from-daun-lo via-matahari-lo to-tanah-lo" aria-hidden />
            <span className="label-spesimen shrink-0 text-tinta-soft">
              {data.arah === "kecil-besar" ? `Banyak ${data.ciri}` : `Sedikit ${data.ciri}`}
            </span>
          </div>

          <div className="tanpa-scrollbar flex justify-center overflow-x-auto pb-1">
            <div className="flex items-start gap-2 sm:gap-2.5">
              {slot.map((isi, i) => {
                const b = isi ? cari(isi) : undefined;
                const keliru = salahDi.includes(i);
                return (
                  <div key={i} className="flex w-[4.5rem] shrink-0 flex-col items-center gap-1.5 sm:w-[5rem]">
                    <ZonaLepas
                      id={`slot:${i}`}
                      label={`Tempat ke-${i + 1}`}
                      terisi={Boolean(isi)}
                      className={cn(
                        "h-[4.5rem] w-full sm:h-[5rem]",
                        keliru && !kurangiGerak && "animate-goyang"
                      )}
                    >
                      {b ? (
                        <span className="relative">
                          <Specimen id={b.spesimen} size={42} label={SPECIMEN_LABEL[b.spesimen]} />
                          {keliru && <Tanda jenis="salah" />}
                          {sudah && <Tanda jenis="benar" />}
                        </span>
                      ) : (
                        <span className="label-spesimen text-tinta-faint">{i + 1}</span>
                      )}
                    </ZonaLepas>
                    {/* Angkanya baru dibuka setelah benar — supaya anak
                        membandingkan lebih dulu, bukan membaca label. */}
                    <span className="h-4 text-center text-mikro font-semibold text-tinta-soft">
                      {sudah && b ? b.label : ""}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5 border-t-2 border-dashed border-kertas-deep pt-4">
            <LabelMeja>Baki</LabelMeja>
            <div className="flex flex-wrap justify-center gap-2.5">
              {baki.map((b) => (
                <BendaSeret
                  key={b.id}
                  id={b.id}
                  label={SPECIMEN_LABEL[b.spesimen]}
                  disabled={sudah}
                  kosong={terpakai.has(b.id)}
                  className="h-[4.25rem] w-[4.25rem]"
                >
                  <Specimen id={b.spesimen} size={42} label={SPECIMEN_LABEL[b.spesimen]} />
                </BendaSeret>
              ))}
            </div>
          </div>
        </Meja>
      </PapanDnd>
    </Bingkai>
  );
}
