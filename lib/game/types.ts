/**
 * Model data aktivitas.
 *
 * Struktur pembelajaran bukan sesuatu yang ditempel di atas permainan —
 * struktur itu *adalah* skemanya. Setiap aktivitas wajib mengisi kedelapan
 * tahap inkuiri matematis, karena kedelapannya adalah bidang wajib di
 * antarmuka `Aktivitas`:
 *
 *   1. tujuan      → Tujuan pembelajaran
 *   2. pemantik    → Pertanyaan pemantik
 *   3. eksplorasi  → Eksplorasi bebas (tanpa benar/salah)
 *   4. prediksi    → Prediksi (anak berkomitmen sebelum mencoba)
 *   5. tantangan   → Eksperimen (permainannya)
 *   6. refleksi    → Refleksi
 *   7. penguatan   → Penguatan konsep
 *   8. karakter    → Karakter peduli lingkungan
 *
 * Tidak mungkin menambah aktivitas yang melewatkan salah satu tahap:
 * TypeScript menolaknya. Uji di tests/unit/game-content.test.ts menjaga
 * agar isinya bermakna, bukan sekadar terisi.
 *
 * Catatan: modul ini murni data — tidak ada "use client" dan tidak ada
 * fungsi di dalam isi konten. Dengan begitu Server Component maupun
 * Client Component boleh meng-import-nya, dan tidak ada yang perlu
 * melewati batas serialisasi RSC.
 */

import type { SpecimenId } from "@/components/illustrations/specimens";
import type { ScientificSkill } from "@/types";

export type WorldId = "world-1" | "world-2" | "world-3" | "world-4";

/* ── Tahap ─────────────────────────────────────────────────────── */

/** Kedelapan tahap inkuiri, sesuai urutan pengalaman anak. */
export const TAHAP_INKUIRI = [
  "tujuan",
  "pemantik",
  "eksplorasi",
  "prediksi",
  "eksperimen",
  "refleksi",
  "penguatan",
  "karakter",
] as const;
export type TahapInkuiri = (typeof TAHAP_INKUIRI)[number];

/**
 * Layar yang benar-benar dilihat anak. Enam layar memuat delapan tahap:
 * "tujuan"+"pemantik" satu tarikan napas di awal, "penguatan"+"karakter"
 * satu tarikan napas di akhir. Menyendirikan keduanya berarti dua ketukan
 * tambahan tanpa isi baru — mahal untuk rentang perhatian usia 5–7.
 */
export const LAYAR = ["pembuka", "eksplorasi", "prediksi", "eksperimen", "refleksi", "penutup"] as const;
export type Layar = (typeof LAYAR)[number];

export const TAHAP_DI_LAYAR: Record<Layar, TahapInkuiri[]> = {
  pembuka: ["tujuan", "pemantik"],
  eksplorasi: ["eksplorasi"],
  prediksi: ["prediksi"],
  eksperimen: ["eksperimen"],
  refleksi: ["refleksi"],
  penutup: ["penguatan", "karakter"],
};

export const NAMA_TAHAP: Record<TahapInkuiri, string> = {
  tujuan: "Tujuan",
  pemantik: "Pertanyaan pemantik",
  eksplorasi: "Eksplorasi",
  prediksi: "Prediksi",
  eksperimen: "Eksperimen",
  refleksi: "Refleksi",
  penguatan: "Penguatan konsep",
  karakter: "Peduli lingkungan",
};

/* ── Bagian umum ───────────────────────────────────────────────── */

export interface Pilihan {
  id: string;
  label: string;
  spesimen: SpecimenId;
}

interface DasarTantangan {
  /** Kalimat perintah di atas papan. Pendek, kata kerja di depan. */
  perintah: string;
  /**
   * Tiga petunjuk berjenjang. Jenjangnya penting dan diuji:
   * [0] arahkan perhatian · [1] beri sebagian aturan · [2] tunjukkan langkah.
   * Tidak satu pun boleh langsung menyebut jawaban akhir.
   */
  petunjuk: [string, string, string];
}

/* ── Sepuluh mesin permainan ───────────────────────────────────── */

/** Isi lubang pada sebuah deret pola. Lubang boleh di mana saja, boleh lebih dari satu. */
export interface PolaIsi extends DasarTantangan {
  kind: "pola-isi";
  /** "?" menandai lubang yang harus diisi. */
  deret: (SpecimenId | "?")[];
  /** Isi baki di bawah papan. */
  baki: SpecimenId[];
  /** Jawaban tiap lubang, berurutan dari kiri. */
  jawaban: SpecimenId[];
  /** Aturan pola dalam huruf, mis. "AB AB AB". Dibuka saat penguatan. */
  aturan: string;
}

/** Menyusun sendiri satu pola utuh mengikuti aturan yang dicontohkan. */
export interface PolaSusun extends DasarTantangan {
  kind: "pola-susun";
  /** Bagian awal yang sudah terisi sebagai contoh. */
  contoh: SpecimenId[];
  /** Yang harus disusun anak. */
  jawaban: SpecimenId[];
  baki: SpecimenId[];
  aturan: string;
}

/** Menemukan satu benda yang melanggar aturan kelompok. */
export interface BedaSendiri extends DasarTantangan {
  kind: "beda-sendiri";
  kisi: SpecimenId[];
  indeksBeda: number;
  /** Kenapa dia berbeda — dibacakan saat berhasil. */
  alasan: string;
}

/** Mengingat urutan yang tampil sebentar, lalu menyusunnya kembali. */
export interface IngatPola extends DasarTantangan {
  kind: "ingat-pola";
  urutan: SpecimenId[];
  baki: SpecimenId[];
  /** Berapa lama urutan diperlihatkan, per kartu. */
  msPerKartu: number;
}

/** Memilah benda ke dalam beberapa wadah. */
export interface PilahWadah extends DasarTantangan {
  kind: "pilah-wadah";
  wadah: { id: string; nama: string; spesimen: SpecimenId; warna: string }[];
  benda: { id: string; spesimen: SpecimenId; wadahBenar: string }[];
}

/** Mengurutkan benda berdasarkan satu ciri terukur. */
export interface UrutDeret extends DasarTantangan {
  kind: "urut-deret";
  benda: { id: string; spesimen: SpecimenId; nilai: number; label: string }[];
  arah: "kecil-besar" | "besar-kecil";
  /** Nama cirinya, mis. "tinggi". Dipakai di label sumbu. */
  ciri: string;
  satuan: string;
}

/** Menggeser variabel, mengamati akibatnya, lalu memprediksi. */
export interface LabSimulasi extends DasarTantangan {
  kind: "lab-simulasi";
  variabel: {
    id: string;
    nama: string;
    min: number;
    max: number;
    awal: number;
    satuan: string;
    spesimen: SpecimenId;
  }[];
  keadaan: { id: string; nama: string; spesimen: SpecimenId; keterangan: string }[];
  /**
   * Tabel keputusan, dibaca dari atas. Aturan pertama yang semua
   * syaratnya terpenuhi menentukan keadaan. Aturan terakhir wajib tanpa
   * syarat agar selalu ada hasil (dijaga oleh uji).
   */
  aturan: { syarat?: Record<string, [number, number]>; keadaanId: string }[];
  /** Kondisi yang dikunci saat anak diminta memprediksi. */
  ujian: { kondisi: Record<string, number>; pertanyaan: string };
}

/** Memprediksi nilai ke-n dari pertumbuhan tetap, di atas penggaris. */
export interface GarisBilangan extends DasarTantangan {
  kind: "garis-bilangan";
  spesimen: SpecimenId;
  satuan: string;
  mulai: number;
  langkah: number;
  /** Berapa langkah yang sudah bisa diamati anak sebelum menebak. */
  teramati: number;
  target: number;
  maks: number;
  namaLangkah: string;
}

/** Menakar bahan menurut resep: berapa banyak yang bisa dibuat? */
export interface LabTakar extends DasarTantangan {
  kind: "lab-takar";
  cerita: string;
  unitNama: string;
  unitSpesimen: SpecimenId;
  /** Kebutuhan untuk satu unit. */
  resep: { bahanId: string; jumlah: number }[];
  bahan: { id: string; nama: string; spesimen: SpecimenId; tersedia: number; satuan: string }[];
  /** Berapa unit yang seharusnya jadi. Ditulis eksplisit agar bisa diuji. */
  jawaban: number;
}

/** Menyeimbangkan timbangan — membangun makna "sama dengan". */
export interface Timbang extends DasarTantangan {
  kind: "timbang";
  kiri: { spesimen: SpecimenId; nama: string; jumlah: number; satuan: number };
  kanan: { spesimen: SpecimenId; nama: string; satuan: number };
  /** Berapa benda yang harus ditambahkan di kanan agar setara. */
  jawaban: number;
}

export type Tantangan =
  | PolaIsi
  | PolaSusun
  | BedaSendiri
  | IngatPola
  | PilahWadah
  | UrutDeret
  | LabSimulasi
  | GarisBilangan
  | LabTakar
  | Timbang;

export type JenisTantangan = Tantangan["kind"];

export const NAMA_JENIS: Record<JenisTantangan, string> = {
  "pola-isi": "Lengkapi pola",
  "pola-susun": "Susun pola",
  "beda-sendiri": "Cari yang beda",
  "ingat-pola": "Ingat pola",
  "pilah-wadah": "Pilah",
  "urut-deret": "Urutkan",
  "lab-simulasi": "Simulasi",
  "garis-bilangan": "Garis bilangan",
  "lab-takar": "Takar bahan",
  timbang: "Timbangan",
};

/* ── Aktivitas ─────────────────────────────────────────────────── */

export interface Aktivitas {
  id: string;
  worldId: WorldId;
  worldNumber: number;
  nomor: number;
  judul: string;
  keterampilan: ScientificSkill;

  /** 1 — Tujuan. Ditulis dari sisi anak: "Kamu akan…". */
  tujuan: string;
  /** 2 — Pertanyaan pemantik. Terbuka, tidak bisa dijawab ya/tidak. */
  pemantik: string;
  /** 3 — Eksplorasi bebas. Tidak ada benar/salah di sini. */
  eksplorasi: {
    ajakan: string;
    benda: { spesimen: SpecimenId; label: string; catatan: string }[];
  };
  /** 4 — Prediksi. Direkam sebelum eksperimen, dibandingkan sesudahnya. */
  prediksi: {
    pertanyaan: string;
    pilihan: Pilihan[];
    /** Prediksi yang sesuai hasil percobaan. Dipakai untuk membandingkan, bukan menilai. */
    sesuaiId: string;
  };
  /** 5 — Eksperimen. */
  tantangan: Tantangan;
  /** 6 — Refleksi. Tidak ada jawaban salah. */
  refleksi: {
    pertanyaan: string;
    pilihan: Pilihan[];
  };
  /** 7 — Penguatan konsep. Menamai matematika yang baru saja dilakukan. */
  penguatan: string;
  /** 8 — Karakter peduli lingkungan. Satu tindakan nyata, bisa dilakukan hari ini. */
  karakter: { judul: string; aksi: string };
}
