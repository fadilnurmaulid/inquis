"use client";

/**
 * Mesin aktivitas.
 *
 * Enam layar membawa delapan tahap inkuiri. Urutannya tidak bisa
 * dilompati, dan tiap layar punya syarat pindahnya sendiri:
 *
 *   pembuka    → tujuan + pertanyaan pemantik
 *   eksplorasi → harus mengetuk semua benda dulu
 *   prediksi   → harus memilih satu; belum diberi tahu benar/salah
 *   eksperimen → papan permainan; prediksi baru dibuka setelah hasil keluar
 *   refleksi   → tidak ada jawaban salah
 *   penutup    → penguatan konsep + satu tindakan nyata
 *
 * Dua bug lama dijaga di sini:
 *
 * 1. Refleksi kosong sesudah papan seret. Penyebabnya papan dilepas
 *    saat animasi seret belum selesai. Karena itu papan dan umpan
 *    baliknya tinggal di layar "eksperimen" yang sama, di dalam satu
 *    blok ber-key tetap, dan hanya berpindah kalau anak menekan tombol.
 *
 * 2. "Main lagi" tidak mereset. Sekarang pemutaran ulang lewat navigasi
 *    (?replay=1) yang membuat sesi baru, dan induk memasang `key`
 *    sesi — seluruh mesin lahir kembali, tanpa sisa keadaan.
 */

import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Check, Map, RotateCcw } from "lucide-react";
import { Specimen, SPECIMEN_LABEL, type SpecimenId } from "@/components/illustrations/specimens";
import { Papan } from "@/components/game/papan";
import type { HasilMain } from "@/components/game/umum";
import { submitActivityCompletion } from "@/lib/services/activity-actions";
import { LAYAR, NAMA_TAHAP, TAHAP_DI_LAYAR, TAHAP_INKUIRI, type Aktivitas, type Layar } from "@/lib/game/types";
import { cn } from "@/lib/utils";

/* ── Masukan ───────────────────────────────────────────────────── */

/** Jika null, tidak ada yang disimpan — inilah wujud mode demo. */
export interface SimpanKe {
  sessionId: string;
  childId: string;
  worldId: string;
  worldNumber: number;
  activityNumber: number;
  primarySkill: string;
}

interface MesinProps {
  aktivitas: Aktivitas;
  namaDunia: string;
  warna: string;
  teman: { nama: string; spesimen: SpecimenId };
  simpan: SimpanKe | null;
  /** Tautan kembali — beda antara mode main dan mode demo. */
  jalanKembali: string;
  /** Awalan rute aktivitas: "/play/activity" saat main, "/demo/main" saat demo. */
  basisAktivitas: string;
  /** Aktivitas berikutnya, kalau ada. */
  berikutnya: { id: string; judul: string } | null;
  /** Sudah pernah diselesaikan dan bukan pemutaran ulang. */
  sudahPernah?: boolean;
}

/* ── Penunjuk tahap ────────────────────────────────────────────── */

function Penunjuk({ layar, warna }: { layar: Layar; warna: string }) {
  const tahapKini = TAHAP_DI_LAYAR[layar];
  const indeksLayar = LAYAR.indexOf(layar);

  return (
    <div className="flex flex-col items-center gap-2">
      <ol className="flex items-center gap-1.5" aria-label="Tahap inkuiri">
        {TAHAP_INKUIRI.map((t) => {
          const layarnya = LAYAR.find((l) => TAHAP_DI_LAYAR[l].includes(t))!;
          const posisi = LAYAR.indexOf(layarnya);
          const kini = tahapKini.includes(t);
          const lewat = posisi < indeksLayar;
          return (
            <li key={t}>
              <span
                aria-current={kini ? "step" : undefined}
                title={NAMA_TAHAP[t]}
                className={cn(
                  "block h-2 rounded-full transition-all duration-normal ease-halus",
                  kini ? "w-7" : "w-2",
                  !kini && !lewat && "bg-kertas-deep"
                )}
                style={kini || lewat ? { backgroundColor: warna, opacity: lewat ? 0.42 : 1 } : undefined}
              >
                <span className="sr-only">
                  {NAMA_TAHAP[t]}
                  {kini ? " — sedang berjalan" : lewat ? " — selesai" : ""}
                </span>
              </span>
            </li>
          );
        })}
      </ol>
      <p className="label-spesimen text-tinta-soft">{tahapKini.map((t) => NAMA_TAHAP[t]).join(" · ")}</p>
    </div>
  );
}

/* ── Teman pendamping ──────────────────────────────────────────── */

function Teman({
  teman,
  ucapan,
  warna,
}: {
  teman: { nama: string; spesimen: SpecimenId };
  ucapan: string;
  warna: string;
}) {
  const kurangiGerak = useReducedMotion();
  return (
    <div className="flex items-start gap-3">
      <span
        className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 bg-kertas-lo",
          !kurangiGerak && "animate-apung"
        )}
        style={{ borderColor: warna }}
      >
        <Specimen id={teman.spesimen} size={30} label={teman.nama} />
      </span>
      <div className="relative flex-1 rounded-kartu rounded-tl-sm border-2 border-kertas-deep bg-kertas-lo px-4 py-2.5 shadow-kertas">
        <p className="label-spesimen mb-1" style={{ color: warna }}>
          {teman.nama}
        </p>
        <p className="text-kecil leading-relaxed text-tinta-mid teks-seimbang">{ucapan}</p>
      </div>
    </div>
  );
}

/* ── Kartu pilihan ─────────────────────────────────────────────── */

function KartuPilihan({
  label,
  spesimen,
  dipilih,
  onKlik,
  warna,
  mati = false,
  tanda,
}: {
  label: string;
  spesimen: SpecimenId;
  dipilih: boolean;
  onKlik: () => void;
  warna: string;
  mati?: boolean;
  tanda?: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onKlik}
      disabled={mati}
      whileHover={mati ? undefined : { y: -3 }}
      whileTap={mati ? undefined : { scale: 0.97 }}
      aria-pressed={dipilih}
      className={cn(
        "relative flex min-h-[7.5rem] flex-col items-center justify-center gap-2 rounded-kartu border-2 p-3 text-center",
        "transition-colors duration-cepat",
        dipilih ? "shadow-angkat" : "border-kertas-deep bg-kertas-lo shadow-tile hover:border-tinta-faint",
        mati && !dipilih && "opacity-55"
      )}
      style={dipilih ? { borderColor: warna, backgroundColor: `${warna}1A` } : undefined}
    >
      <Specimen id={spesimen} size={38} label={SPECIMEN_LABEL[spesimen]} />
      <span className="font-display text-kecil font-bold leading-tight text-tinta teks-seimbang">{label}</span>
      {tanda && (
        <span className="label-spesimen absolute right-2 top-2 rounded px-1.5 py-0.5" style={{ backgroundColor: `${warna}26`, color: warna }}>
          {tanda}
        </span>
      )}
      {dipilih && (
        // Cincin biasa, bukan layoutId bersama: layoutId yang dipakai dua
        // layar berbeda ikut memicu kegagalan transisi yang sama.
        <motion.span
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 480, damping: 28 }}
          className="pointer-events-none absolute -inset-0.5 rounded-kartu border-2"
          style={{ borderColor: warna }}
          aria-hidden
        />
      )}
    </motion.button>
  );
}

/* ── Tombol utama ──────────────────────────────────────────────── */

function TombolUtama({
  children,
  onKlik,
  warna,
  mati = false,
  className,
}: {
  children: React.ReactNode;
  onKlik: () => void;
  warna: string;
  mati?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onKlik}
      disabled={mati}
      className={cn(
        "target-sentuh group relative overflow-hidden rounded-full border-2 px-8 font-display text-besar font-extrabold",
        "transition-all duration-cepat ease-pegas",
        mati
          ? "cursor-default border-kertas-deep bg-kertas text-tinta-faint"
          : "text-kertas-lo shadow-angkat hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-tekan",
        className
      )}
      style={mati ? undefined : { backgroundColor: warna, borderColor: warna }}
    >
      {children}
      {!mati && (
        <span
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-lambat ease-halus group-hover:translate-x-full"
          aria-hidden
        />
      )}
    </button>
  );
}

/* ── Kartu jurnal ──────────────────────────────────────────────── */

function Jurnal({
  label,
  warna,
  children,
  className,
}: {
  label: string;
  warna: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("kartu-kertas p-5", className)}>
      <p className="label-spesimen mb-2" style={{ color: warna }}>
        {label}
      </p>
      {children}
    </section>
  );
}

/* ── Mesin ─────────────────────────────────────────────────────── */

/**
 * Pembungkus tipis yang memegang nomor putaran.
 *
 * Di mode main, "Main lagi" berpindah halaman dan sesi baru menghasilkan
 * key baru dari induk. Di mode demo tidak ada halaman baru yang dituju,
 * jadi resetnya harus dikerjakan di sini: menaikkan `putaran` melahirkan
 * ulang seluruh isi mesin — termasuk papan permainan beserta keadaan
 * internalnya. Tanpa ini, "Main lagi" versi demo hanya akan mengosongkan
 * layar sambil menyisakan papan yang sudah terjawab.
 */
export function Mesin(props: MesinProps) {
  const [putaran, setPutaran] = useState(0);
  return <MesinDalam key={putaran} {...props} onUlang={() => setPutaran((n) => n + 1)} />;
}

function MesinDalam({
  aktivitas: a,
  namaDunia,
  warna,
  teman,
  simpan,
  jalanKembali,
  basisAktivitas,
  berikutnya,
  sudahPernah = false,
  onUlang,
}: MesinProps & { onUlang: () => void }) {
  const router = useRouter();
  const kurangiGerak = useReducedMotion();
  const [menyimpan, mulaiSimpan] = useTransition();

  const [layar, setLayar] = useState<Layar>(sudahPernah ? "penutup" : "pembuka");
  const [diamati, setDiamati] = useState<number[]>([]);
  const [terbuka, setTerbuka] = useState<number | null>(null);
  const [prediksiId, setPrediksiId] = useState<string | null>(null);
  const [hasil, setHasil] = useState<HasilMain | null>(null);
  const [refleksiId, setRefleksiId] = useState<string | null>(null);
  const [galat, setGalat] = useState<string | null>(null);
  const atas = useRef<HTMLDivElement>(null);
  const umpanBalik = useRef<HTMLDivElement>(null);

  // Di ponsel, umpan balik muncul di bawah papan — di luar layar.
  // Anak yang tidak melihatnya mengira permainannya macet.
  useEffect(() => {
    if (hasil) umpanBalik.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [hasil]);

  const pindah = useCallback((l: Layar) => {
    setLayar(l);
    atas.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const prediksi = a.prediksi.pilihan.find((p) => p.id === prediksiId);
  const prediksiTepat = prediksiId === a.prediksi.sesuaiId;

  const ucapan = useMemo<Record<Layar, string>>(
    () => ({
      pembuka: a.pemantik,
      eksplorasi: a.eksplorasi.ajakan,
      prediksi: "Tebak dulu, yuk. Nanti kita buktikan!",
      eksperimen: "Ayo buktikan tebakanmu!",
      refleksi: "Bagaimana caramu tadi?",
      penutup: a.karakter.aksi,
    }),
    [a]
  );

  /* Simpan sekali saja, saat refleksi dijawab. Di mode demo, dilewati. */
  const simpanJawaban = useCallback(
    (jawaban: string) => {
      if (!simpan) {
        pindah("penutup");
        return;
      }
      setGalat(null);
      mulaiSimpan(async () => {
        const r = await submitActivityCompletion({
          sessionId: simpan.sessionId,
          childId: simpan.childId,
          hintsUsed: hasil?.petunjuk ?? 0,
          reflectionResponse: jawaban,
          worldId: simpan.worldId,
          worldNumber: simpan.worldNumber,
          activityNumber: simpan.activityNumber,
          primarySkill: simpan.primarySkill,
        });
        if (r.success) {
          router.refresh();
          pindah("penutup");
        } else {
          setGalat(r.error ?? "Jawabanmu belum tersimpan. Coba tekan sekali lagi.");
        }
      });
    },
    [simpan, hasil, router, pindah]
  );

  const mainLagi = () => {
    if (simpan) router.push(`${basisAktivitas}/${a.id}?replay=1`);
    else onUlang();
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-10 pt-4 sm:px-6">
      <div ref={atas} className="scroll-mt-4" />

      {/* Kepala */}
      <header className="mb-5 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <Link
            href={jalanKembali}
            className={cn(
              "target-sentuh inline-flex items-center gap-1.5 rounded-full border-2 border-kertas-deep bg-kertas-lo px-3.5",
              "font-display text-kecil font-bold text-tinta-mid shadow-tile transition-all duration-cepat ease-pegas",
              "hover:-translate-y-0.5 hover:border-tinta-faint active:translate-y-0.5 active:shadow-tekan"
            )}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Kembali
          </Link>
          <p className="label-spesimen text-right text-tinta-soft">
            {namaDunia} · {a.nomor}
          </p>
        </div>
        <Penunjuk layar={layar} warna={warna} />
      </header>

      {/* Perpindahan layar TIDAK memakai AnimatePresence mode="wait".
          Dulu memakainya, dan itulah akar layar refleksi kosong: dengan
          mode="wait", layar baru menunggu animasi keluar layar lama
          selesai — sedangkan layar eksperimen berisi gestur seret dan
          animasi bersarang yang kadang tidak pernah melaporkan selesai.
          Refleksi pun tidak pernah dipasang. Sekarang: layar lama
          langsung dilepas, layar baru langsung dipasang dengan animasi
          masuknya sendiri. Tidak ada yang bisa menghalanginya tampil. */}
        <motion.div
          key={layar}
          initial={kurangiGerak ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-4"
        >
          {/* ══ Pembuka ══ */}
          {layar === "pembuka" && (
            <>
              <div className="text-center">
                <h1 className="font-display text-pekik font-extrabold text-tinta teks-seimbang">{a.judul}</h1>
              </div>

              {/* Pemantik adalah bintangnya. Tujuan tetap ada — tahap 1 —
                  tapi cukup satu baris kecil; anak enam tahun tidak membaca
                  dua kartu paragraf sebelum boleh main. */}
              <Jurnal label={NAMA_TAHAP.pemantik} warna={warna}>
                <p className="font-display text-judul font-extrabold leading-snug text-tinta teks-seimbang">
                  {a.pemantik}
                </p>
                <p className="mt-3 border-t-2 border-dashed border-kertas-deep pt-2.5 text-mikro leading-relaxed text-tinta-soft">
                  <span className="label-spesimen mr-1.5" style={{ color: warna }}>{NAMA_TAHAP.tujuan}</span>
                  {a.tujuan}
                </p>
              </Jurnal>

              <Teman teman={teman} ucapan="Kita cari tahu sama-sama, yuk!" warna={warna} />

              <div className="flex justify-center pt-1">
                <TombolUtama onKlik={() => pindah("eksplorasi")} warna={warna}>
                  Ayo lihat!
                </TombolUtama>
              </div>
            </>
          )}

          {/* ══ Eksplorasi ══ */}
          {layar === "eksplorasi" && (
            <>
              <Teman teman={teman} ucapan={ucapan.eksplorasi} warna={warna} />

              <div className="grid grid-cols-2 items-stretch gap-3 sm:grid-cols-4">
                {a.eksplorasi.benda.map((b, i) => {
                  const sudah = diamati.includes(i);
                  return (
                    <motion.button
                      key={i}
                      type="button"
                      onClick={() => {
                        setTerbuka(terbuka === i ? null : i);
                        setDiamati((prev) => (prev.includes(i) ? prev : [...prev, i]));
                      }}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.96 }}
                      aria-expanded={terbuka === i}
                      className={cn(
                        "relative flex min-h-[8rem] flex-col items-center justify-center gap-2 rounded-kartu border-2 p-3",
                        "transition-colors duration-cepat",
                        terbuka === i
                          ? "shadow-angkat"
                          : "border-kertas-deep bg-kertas-lo shadow-tile hover:border-tinta-faint"
                      )}
                      style={terbuka === i ? { borderColor: warna, backgroundColor: `${warna}14` } : undefined}
                    >
                      <span className={cn("block", !kurangiGerak && !sudah && "animate-apung")}>
                        <Specimen id={b.spesimen} size={46} label={b.label} />
                      </span>
                      <span className="font-display text-mikro font-bold leading-tight text-tinta">{b.label}</span>
                      {sudah && (
                        <span
                          className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full"
                          style={{ backgroundColor: warna }}
                          aria-hidden
                        >
                          <Check className="h-2.5 w-2.5 text-kertas-lo" strokeWidth={3.5} />
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {terbuka !== null && (
                  <motion.div
                    key={terbuka}
                    initial={kurangiGerak ? false : { opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <div className="kartu-kertas flex items-start gap-3 p-4">
                      <Specimen id={a.eksplorasi.benda[terbuka].spesimen} size={30} />
                      <p className="flex-1 text-kecil leading-relaxed text-tinta-mid">
                        {a.eksplorasi.benda[terbuka].catatan}
                      </p>
                    </div>
                  </motion.div>
                )}

              <div className="flex flex-col items-center gap-2 pt-1">
                <p className="label-spesimen text-tinta-soft">
                  {diamati.length}/{a.eksplorasi.benda.length} diamati
                </p>
                <TombolUtama
                  onKlik={() => pindah("prediksi")}
                  warna={warna}
                  mati={diamati.length < a.eksplorasi.benda.length}
                >
                  {diamati.length < a.eksplorasi.benda.length ? "Ketuk semua dulu" : "Lanjut!"}
                </TombolUtama>
              </div>
            </>
          )}

          {/* ══ Prediksi ══ */}
          {layar === "prediksi" && (
            <>
              <Jurnal label={NAMA_TAHAP.prediksi} warna={warna}>
                <p className="font-display text-besar font-bold leading-relaxed text-tinta teks-seimbang">
                  {a.prediksi.pertanyaan}
                </p>
              </Jurnal>

              <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-3">
                {a.prediksi.pilihan.map((p) => (
                  <KartuPilihan
                    key={p.id}
                    label={p.label}
                    spesimen={p.spesimen}
                    dipilih={prediksiId === p.id}
                    onKlik={() => setPrediksiId(p.id)}
                    warna={warna}
                  />
                ))}
              </div>

              <Teman teman={teman} ucapan={ucapan.prediksi} warna={warna} />

              <div className="flex justify-center pt-1">
                <TombolUtama onKlik={() => pindah("eksperimen")} warna={warna} mati={!prediksiId}>
                  {prediksiId ? "Ini tebakanku!" : "Pilih satu dulu"}
                </TombolUtama>
              </div>
            </>
          )}

          {/* ══ Eksperimen ══
              Papan dan umpan balik tinggal di blok yang sama. Papan tidak
              pernah dilepas di tengah animasi — di sinilah bug refleksi
              kosong dulu lahir. */}
          {layar === "eksperimen" && (
            <div key="eksperimen-grup" className="flex flex-col gap-4">
              <Papan data={a.tantangan} onSelesai={setHasil} />

              {hasil && (
                  <motion.div
                    ref={umpanBalik}
                    initial={kurangiGerak ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 320, damping: 26 }}
                    className="flex flex-col gap-4"
                  >
                    {/* Prediksi dibuka di sini — bukan sebelumnya. */}
                    <section
                      className="kartu-kertas p-5"
                      style={{ borderColor: prediksiTepat ? "#3E8B54" : "#D9922E" }}
                    >
                      <p
                        className="label-spesimen mb-2"
                        style={{ color: prediksiTepat ? "#2C6B3F" : "#B5761F" }}
                      >
                        {prediksiTepat ? "Tebakanmu cocok" : "Tebakanmu berbeda"}
                      </p>
                      <div className="flex items-start gap-3">
                        {prediksi && <Specimen id={prediksi.spesimen} size={34} />}
                        <p className="flex-1 text-kecil leading-relaxed text-tinta-mid">
                          {prediksiTepat ? (
                            <>
                              Tebakanmu <strong className="text-tinta">{prediksi?.label}</strong> — dan benar!
                              Kamu mengamati dulu, itu hebat.
                            </>
                          ) : (
                            <>
                              Tebakanmu <strong className="text-tinta">{prediksi?.label}</strong>, ternyata beda.
                              Tidak apa-apa — sekarang kamu jadi tahu!
                            </>
                          )}
                        </p>
                      </div>
                    </section>

                    <div className="flex justify-center">
                      <TombolUtama onKlik={() => pindah("refleksi")} warna={warna}>
                        Lanjut!
                      </TombolUtama>
                    </div>
                  </motion.div>
                )}
            </div>
          )}

          {/* ══ Refleksi ══ */}
          {layar === "refleksi" && (
            <>
              <Jurnal label={NAMA_TAHAP.refleksi} warna={warna}>
                <p className="font-display text-besar font-bold leading-relaxed text-tinta teks-seimbang">
                  {a.refleksi.pertanyaan}
                </p>
              </Jurnal>

              <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-3">
                {a.refleksi.pilihan.map((p) => (
                  <KartuPilihan
                    key={p.id}
                    label={p.label}
                    spesimen={p.spesimen}
                    dipilih={refleksiId === p.id}
                    onKlik={() => setRefleksiId(p.id)}
                    warna={warna}
                    mati={menyimpan}
                  />
                ))}
              </div>

              <Teman teman={teman} ucapan={ucapan.refleksi} warna={warna} />

              {galat && (
                <p className="rounded-tile border-2 border-tanah/40 bg-tanah-lo/25 px-4 py-2.5 text-center text-kecil text-tanah-hi">
                  {galat}
                </p>
              )}

              <div className="flex justify-center pt-1">
                <TombolUtama
                  onKlik={() => {
                    const p = a.refleksi.pilihan.find((x) => x.id === refleksiId);
                    if (p) simpanJawaban(p.label);
                  }}
                  warna={warna}
                  mati={!refleksiId || menyimpan}
                >
                  {menyimpan ? "Menyimpan…" : refleksiId ? "Ini jawabanku!" : "Pilih satu dulu"}
                </TombolUtama>
              </div>
            </>
          )}

          {/* ══ Penutup ══ */}
          {layar === "penutup" && (
            <>
              <div className="flex flex-col items-center gap-2 text-center">
                <motion.span
                  initial={kurangiGerak ? false : { scale: 0.5, rotate: -12 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full border-2"
                  style={{ borderColor: warna, backgroundColor: `${warna}1F` }}
                >
                  <Specimen id={teman.spesimen} size={38} label={teman.nama} />
                </motion.span>
                <h2 className="font-display text-judul font-extrabold text-tinta">Hore, selesai!</h2>
                {sudahPernah && (
                  <p className="text-kecil text-tinta-soft">Kamu sudah pernah menyelesaikan ini.</p>
                )}
              </div>

              <Jurnal label={NAMA_TAHAP.penguatan} warna={warna}>
                <p className="text-badan leading-relaxed text-tinta-mid teks-seimbang">{a.penguatan}</p>
              </Jurnal>

              <section className="kartu-kertas border-daun/40 bg-daun-lo/20 p-5">
                <p className="label-spesimen mb-2 text-daun-hi">{NAMA_TAHAP.karakter}</p>
                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-daun/40 bg-kertas-lo">
                    <Specimen id="tunas" size={26} />
                  </span>
                  <div className="flex-1">
                    <p className="font-display text-besar font-bold text-tinta">{a.karakter.judul}</p>
                    <p className="mt-1 text-kecil leading-relaxed text-tinta-mid teks-seimbang">{a.karakter.aksi}</p>
                  </div>
                </div>
              </section>

              <div className="flex flex-col items-center gap-3 pt-1">
                {berikutnya && (
                  <TombolUtama onKlik={() => router.push(`${basisAktivitas}/${berikutnya.id}`)} warna={warna}>
                    Lanjut: {berikutnya.judul}
                  </TombolUtama>
                )}
                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  <button
                    type="button"
                    onClick={mainLagi}
                    className={cn(
                      "target-sentuh inline-flex items-center gap-1.5 rounded-full border-2 border-kertas-deep bg-kertas-lo px-4",
                      "font-display text-kecil font-bold text-tinta-mid shadow-tile transition-all duration-cepat ease-pegas",
                      "hover:-translate-y-0.5 hover:border-tinta-faint active:translate-y-0.5 active:shadow-tekan"
                    )}
                  >
                    <RotateCcw className="h-4 w-4" aria-hidden />
                    Main lagi
                  </button>
                  <Link
                    href={jalanKembali}
                    className={cn(
                      "target-sentuh inline-flex items-center gap-1.5 rounded-full border-2 border-kertas-deep bg-kertas-lo px-4",
                      "font-display text-kecil font-bold text-tinta-mid shadow-tile transition-all duration-cepat ease-pegas",
                      "hover:-translate-y-0.5 hover:border-tinta-faint active:translate-y-0.5 active:shadow-tekan"
                    )}
                  >
                    <Map className="h-4 w-4" aria-hidden />
                    Kembali ke peta
                  </Link>
                </div>
              </div>
            </>
          )}
        </motion.div>
    </div>
  );
}
