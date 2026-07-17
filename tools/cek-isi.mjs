/**
 * Penjalan asersi isi — pengganti sementara `npm test`.
 *
 * Berkas ini menjalankan asersi yang sama dengan
 * tests/unit/game-content.test.ts, tapi tanpa vitest: ia mentranspilasi
 * lib/game/content.ts dengan kompiler TypeScript lalu memeriksa datanya
 * langsung. Gunanya untuk lingkungan yang tidak bisa `npm install`.
 *
 * Ini BUKAN pengganti `npm test`. Setelah dependensi terpasang,
 * jalankan uji yang sebenarnya:
 *
 *   npm test
 *
 * Jalankan yang ini dengan:
 *
 *   node tools/cek-isi.mjs
 */

import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { dirname } from "node:path";
import Module from "node:module";

const require = createRequire(import.meta.url);
const ts = require("typescript");

function muat(file) {
  const src = readFileSync(file, "utf8");
  const js = ts.transpileModule(src, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const m = new Module(file);
  m.paths = Module._nodeModulePaths(dirname(file));
  m._compile(js, file);
  return m.exports;
}

const A = muat("./lib/game/content.ts").SEMUA_AKTIVITAS;

let gagal = 0;
const cek = (nama, ok, pesan) => {
  if (!ok) {
    gagal++;
    console.log(`  GAGAL  ${nama}${pesan ? " — " + pesan : ""}`);
  }
};

/* ── Katalog ─────────────────────────────────────────────────── */
cek("ada 20 aktivitas", A.length === 20, `ada ${A.length}`);
for (let w = 1; w <= 4; w++) {
  const d = A.filter((a) => a.worldNumber === w);
  cek(`dunia ${w} punya 5 aktivitas`, d.length === 5, `ada ${d.length}`);
  cek(`dunia ${w} bernomor 1..5`, JSON.stringify(d.map((a) => a.nomor)) === "[1,2,3,4,5]");
  cek(`dunia ${w} mencampur mesin`, new Set(d.map((a) => a.tantangan.kind)).size >= 2);
}
cek("kesepuluh mesin terpakai", new Set(A.map((a) => a.tantangan.kind)).size === 10);
cek("judul tidak ada yang kembar", new Set(A.map((a) => a.judul)).size === A.length);

/* ── Delapan tahap ───────────────────────────────────────────── */
for (const a of A) {
  cek(`${a.id} tujuan terisi`, a.tujuan.trim().length > 15);
  cek(`${a.id} pemantik terbuka`, a.pemantik.includes("?"));
  cek(`${a.id} eksplorasi >= 3 benda`, a.eksplorasi.benda.length >= 3);
  for (const b of a.eksplorasi.benda) cek(`${a.id} catatan benda terisi`, b.catatan.trim().length > 15);
  cek(`${a.id} prediksi punya jawaban`, a.prediksi.pilihan.some((p) => p.id === a.prediksi.sesuaiId));
  cek(`${a.id} refleksi >= 2 pilihan`, a.refleksi.pilihan.length >= 2);
  cek(`${a.id} penguatan terisi`, a.penguatan.trim().length > 25);
  cek(`${a.id} aksi karakter terisi`, a.karakter.aksi.trim().length > 25);
  cek(`${a.id} punya 3 petunjuk`, a.tantangan.petunjuk.length === 3);
  cek(`${a.id} petunjuk berbeda-beda`, new Set(a.tantangan.petunjuk).size === 3);
}

/* ── Aritmetika tiap papan ───────────────────────────────────── */
for (const a of A) {
  const t = a.tantangan;
  const id = a.id;

  if (t.kind === "pola-isi") {
    const lubang = t.deret.filter((d) => d === "?").length;
    cek(`${id} jawaban sebanyak lubang`, t.jawaban.length === lubang, `${lubang} lubang vs ${t.jawaban.length} jawaban`);
    for (const j of t.jawaban) cek(`${id} jawaban ada di baki`, t.baki.includes(j), j);
  }

  if (t.kind === "pola-susun") for (const j of t.jawaban) cek(`${id} jawaban ada di baki`, t.baki.includes(j), j);

  if (t.kind === "beda-sendiri") cek(`${id} indeksBeda di dalam kisi`, t.indeksBeda >= 0 && t.indeksBeda < t.kisi.length);

  if (t.kind === "ingat-pola") {
    for (const u of t.urutan) cek(`${id} kartu urutan ada di baki`, t.baki.includes(u), u);
    cek(`${id} tempo hafalan wajar`, t.msPerKartu >= 500 && t.msPerKartu <= 2000, `${t.msPerKartu} ms`);
  }

  if (t.kind === "pilah-wadah") {
    const ids = t.wadah.map((w) => w.id);
    for (const b of t.benda) cek(`${id} wadahBenar ada`, ids.includes(b.wadahBenar), b.wadahBenar);
    for (const w of t.wadah) cek(`${id} wadah ${w.id} kebagian isi`, t.benda.some((b) => b.wadahBenar === w.id));
  }

  if (t.kind === "urut-deret") {
    const n = t.benda.map((b) => b.nilai);
    cek(`${id} nilai unik semua`, new Set(n).size === n.length);
  }

  if (t.kind === "lab-simulasi") {
    const idK = t.keadaan.map((k) => k.id);
    const idV = t.variabel.map((v) => v.id);
    cek(`${id} aturan terakhir tanpa syarat`, t.aturan[t.aturan.length - 1].syarat === undefined);
    for (const r of t.aturan) {
      cek(`${id} keadaanId ada`, idK.includes(r.keadaanId), r.keadaanId);
      for (const k of Object.keys(r.syarat ?? {})) cek(`${id} syarat menyebut variabel yang ada`, idV.includes(k), k);
    }
    for (const v of idV) cek(`${id} ujian menyebut ${v}`, Object.keys(t.ujian.kondisi).includes(v));
    for (const v of t.variabel) cek(`${id} nilai awal ${v.id} di rentang`, v.awal >= v.min && v.awal <= v.max);

    const nilai = (kondisi) => {
      for (const r of t.aturan) {
        if (!r.syarat) return r.keadaanId;
        const cocok = Object.entries(r.syarat).every(([k, [lo, hi]]) => {
          const v = kondisi[k];
          return v !== undefined && v >= lo && v <= hi;
        });
        if (cocok) return r.keadaanId;
      }
      return null;
    };
    const h = nilai(t.ujian.kondisi);
    cek(`${id} ujian menghasilkan keadaan`, h !== null && idK.includes(h), String(h));
  }

  if (t.kind === "garis-bilangan") {
    cek(`${id} target di luar yang teramati`, t.target > t.teramati);
    const jawab = t.mulai + t.langkah * t.target;
    cek(`${id} jawaban muat di penggaris`, jawab <= t.maks, `jawab ${jawab}, maks ${t.maks}`);
  }

  if (t.kind === "lab-takar") {
    const idB = t.bahan.map((b) => b.id);
    for (const r of t.resep) cek(`${id} bahan resep ada`, idB.includes(r.bahanId), r.bahanId);
    const bisa = Math.min(
      ...t.resep.map((r) => {
        const b = t.bahan.find((x) => x.id === r.bahanId);
        return Math.floor(b.tersedia / r.jumlah);
      })
    );
    cek(`${id} jawaban takar benar`, bisa === t.jawaban, `hitung ${bisa}, tertulis ${t.jawaban}`);
  }

  if (t.kind === "timbang") {
    const kiri = t.kiri.jumlah * t.kiri.satuan;
    const kanan = t.jawaban * t.kanan.satuan;
    cek(`${id} timbangan seimbang`, kiri === kanan, `${kiri} g vs ${kanan} g`);
  }
}

/* ── Bahasa ──────────────────────────────────────────────────── */
const EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/u;
const KERJA =
  /\b(taruh|letakkan|buang|pilah|pisahkan|siram|siramkan|kumpulkan|ajak|hitung|cari|simpan|pakai|tanam|lihat|tunjukkan|bawa|beri|isi|tutup|matikan|sapu|rawat|periksa|tempel|catat|biarkan|minta|perhatikan|amati|pungut|angkat|colek|tunggu|rendam|ukur|tambahkan|aduk|tanya|kurangi|coba|pilih|tampung|jangan)/i;

for (const a of A) {
  const teks = [
    a.judul,
    a.tujuan,
    a.pemantik,
    a.penguatan,
    a.karakter.judul,
    a.karakter.aksi,
    a.tantangan.perintah,
    ...a.tantangan.petunjuk,
    ...a.eksplorasi.benda.flatMap((b) => [b.label, b.catatan]),
    ...a.prediksi.pilihan.map((p) => p.label),
    ...a.refleksi.pilihan.map((p) => p.label),
  ];
  for (const s of teks) cek(`${a.id} bebas emoji`, !EMOJI.test(s), s.slice(0, 50));
  cek(`${a.id} aksi karakter menyuruh berbuat`, KERJA.test(a.karakter.aksi), a.karakter.aksi.slice(0, 60));
}

/* ── Objek permainan bisa dibedakan ──────────────────────────── */
const SILUET = {
  "daun-hijau": "daun-segar",
  "daun-hijau-tua": "daun-segar",
  "daun-muda": "daun-muda",
  "daun-kering": "daun-kering",
  "daun-gugur": "daun-kering",
};
for (const a of A) {
  const t = a.tantangan;
  let s = [];
  if (t.kind === "pola-isi") s = [...t.deret.filter((d) => d !== "?"), ...t.baki];
  else if (t.kind === "pola-susun") s = [...t.contoh, ...t.baki];
  else if (t.kind === "beda-sendiri") s = [...t.kisi];
  else if (t.kind === "ingat-pola") s = [...t.baki];
  else if (t.kind === "pilah-wadah") s = t.benda.map((b) => b.spesimen);
  else if (t.kind === "urut-deret") s = t.benda.map((b) => b.spesimen);
  for (const daftar of [[...new Set(s)], [...new Set(a.eksplorasi.benda.map((b) => b.spesimen))]]) {
    const grup = {};
    daftar.forEach((id) => {
      const k = SILUET[id];
      if (k) (grup[k] = grup[k] ?? []).push(id);
    });
    Object.entries(grup).forEach(([k, ids]) =>
      cek(`${a.id} tidak menaruh dua benda bersiluet sama`, ids.length === 1, `${ids.join(" + ")} sama-sama "${k}"`)
    );
  }
}

console.log(
  gagal === 0
    ? `\n  LULUS — ${A.length} aktivitas, semua asersi isi terpenuhi.\n  Catatan: ini bukan pengganti "npm test". Jalankan uji sungguhan setelah npm install.\n`
    : `\n  ${gagal} asersi gagal.\n`
);
process.exit(gagal === 0 ? 0 : 1);
