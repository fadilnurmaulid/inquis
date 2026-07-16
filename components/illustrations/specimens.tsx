/**
 * Pustaka spesimen — seluruh objek yang bisa muncul di papan permainan.
 *
 * Menggantikan emoji sepenuhnya. Emoji tidak dipakai sebagai objek
 * gameplay karena bentuknya berbeda-beda di tiap perangkat, tidak bisa
 * diberi warna, tidak punya label yang stabil, dan membuat produk
 * terlihat seperti prototipe.
 *
 * Aturan gambar (dipatuhi semua ikon agar satu grid terlihat setara):
 *   • viewBox 0 0 40 40, objek mengisi ±32px di tengah.
 *   • Bidang datar, tanpa gradien dan tanpa bayangan.
 *   • Maksimal satu garis detail (urat/lipatan) per objek.
 *   • Semua warna diambil dari palet Jurnal Lapangan.
 *
 * Mengganti dengan artwork asli nanti: cukup timpa entri di
 * SPECIMEN_ART dengan elemen <image> yang menunjuk berkas di public/assets.
 * Kode permainan
 * hanya mengenal SpecimenId, tidak pernah menyentuh bentuknya.
 */

import type { JSX, SVGProps } from "react";

/* ── Palet lokal ilustrasi ─────────────────────────────────────── */
const C = {
  hijau: "#3E8B54",
  hijauTua: "#2C6B3F",
  hijauMuda: "#A8D8B4",
  kuning: "#D9922E",
  kuningMuda: "#F6E0AE",
  biru: "#2F7FA6",
  biruMuda: "#BEDFEE",
  ungu: "#6B5DD3",
  unguMuda: "#D2CCF7",
  tanah: "#8C5A3C",
  tanahTua: "#6A4129",
  tanahMuda: "#DEC6B2",
  kertas: "#F7F8F2",
  kertasTua: "#D3DBC4",
  tinta: "#1E3326",
  abu: "#8C9490",
  abuMuda: "#C9D2CB",
  merah: "#C4553D",
  pink: "#E8A0B8",
  urat: "rgba(247,248,242,0.5)",
  garis: "rgba(30,51,38,0.22)",
} as const;

/* ── Bentuk dasar yang dipakai berulang ────────────────────────── */

/** Daun berujung runcing, dipakai oleh semua varian daun. */
function Daun({ isi, urat = C.urat, miring = 0 }: { isi: string; urat?: string; miring?: number }) {
  return (
    <g transform={`rotate(${miring} 20 20)`}>
      <path d="M20 4C31 10.5 32.5 23 20 36C7.5 23 9 10.5 20 4Z" fill={isi} />
      <path d="M20 9V32" stroke={urat} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M20 16L14.5 12M20 16L25.5 12M20 24L14 19.5M20 24L26 19.5" stroke={urat} strokeWidth="1.2" strokeLinecap="round" />
    </g>
  );
}

/** Kelopak bunga sederhana mengelilingi inti. */
function Bunga({ kelopak, inti, jumlah = 6 }: { kelopak: string; inti: string; jumlah?: number }) {
  return (
    <g>
      {Array.from({ length: jumlah }, (_, i) => (
        <ellipse
          key={i}
          cx="20"
          cy="10.5"
          rx="4.6"
          ry="7.5"
          fill={kelopak}
          transform={`rotate(${(360 / jumlah) * i} 20 20)`}
        />
      ))}
      <circle cx="20" cy="20" r="5.4" fill={inti} />
    </g>
  );
}

/* ── Kumpulan gambar ───────────────────────────────────────────── */

const SPECIMEN_ART = {
  /* Daun & tumbuhan */
  "daun-hijau": () => <Daun isi={C.hijau} />,
  "daun-hijau-tua": () => <Daun isi={C.hijauTua} />,
  "daun-muda": () => <Daun isi={C.hijauMuda} urat="rgba(30,51,38,0.2)" />,
  "daun-kering": () => <Daun isi={C.kuning} miring={-14} />,
  "daun-gugur": () => <Daun isi={C.tanah} miring={22} />,
  "daun-maple": () => (
    <g>
      <path
        d="M20 4L23.4 11.4L28.8 8.4L27.4 15.2L34.5 14.6L29.8 19.8L36 23.4L28.8 25.4L31 31.4L23.8 29.4L22.6 36H17.4L16.2 29.4L9 31.4L11.2 25.4L4 23.4L10.2 19.8L5.5 14.6L12.6 15.2L11.2 8.4L16.6 11.4L20 4Z"
        fill={C.merah}
      />
      <path d="M20 34V18" stroke="rgba(247,248,242,0.45)" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  ),
  "daun-jarum": () => (
    <g stroke={C.hijauTua} strokeWidth="2.4" strokeLinecap="round">
      <path d="M20 36V8" />
      <path d="M20 14L12 8M20 14L28 8M20 22L11 17M20 22L29 17M20 30L13 26M20 30L27 26" strokeWidth="2" />
    </g>
  ),
  "daun-bulat": () => (
    <g>
      <circle cx="20" cy="18.5" r="12.5" fill={C.hijau} />
      <path d="M20 34V17" stroke={C.hijauTua} strokeWidth="2" strokeLinecap="round" />
      <path d="M20 24C15 22 13 18 13.5 13" stroke={C.urat} strokeWidth="1.4" strokeLinecap="round" fill="none" />
    </g>
  ),
  biji: () => (
    <g>
      <ellipse cx="20" cy="21" rx="8.5" ry="11" fill={C.tanah} />
      <path d="M20 12C24 15 25 21 22.5 29" stroke={C.tanahMuda} strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </g>
  ),
  tunas: () => (
    <g>
      <path d="M20 36V20" stroke={C.hijauTua} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M20 24C20 18.5 24 15 30 15C30 20.5 26 24 20 24Z" fill={C.hijau} />
      <path d="M20 27C20 22.5 16.5 19.5 11.5 19.5C11.5 24 15 27 20 27Z" fill={C.hijauMuda} />
    </g>
  ),
  pohon: () => (
    <g>
      <rect x="17.6" y="22" width="4.8" height="14" rx="2.4" fill={C.tanah} />
      <circle cx="20" cy="14" r="11" fill={C.hijau} />
      <circle cx="13" cy="18.5" r="6.5" fill={C.hijauTua} />
      <circle cx="27" cy="18.5" r="6" fill={C.hijauTua} />
    </g>
  ),
  "pohon-besar": () => (
    <g>
      <rect x="17" y="20" width="6" height="16" rx="3" fill={C.tanahTua} />
      <circle cx="20" cy="12" r="12" fill={C.hijauTua} />
      <circle cx="11.5" cy="18" r="7" fill={C.hijau} />
      <circle cx="28.5" cy="18" r="7" fill={C.hijau} />
    </g>
  ),
  semak: () => (
    <g>
      <circle cx="13" cy="24" r="7.5" fill={C.hijau} />
      <circle cx="27" cy="24" r="7.5" fill={C.hijau} />
      <circle cx="20" cy="19" r="8.5" fill={C.hijauTua} />
      <rect x="8" y="30" width="24" height="3" rx="1.5" fill={C.tanah} />
    </g>
  ),
  rumput: () => (
    <g stroke={C.hijau} strokeWidth="2.6" strokeLinecap="round" fill="none">
      <path d="M12 34C12 26 10 21 7 17" />
      <path d="M20 34C20 24 20 17 20 11" stroke={C.hijauTua} />
      <path d="M28 34C28 26 30 21 33 17" />
    </g>
  ),
  "bunga-matahari": () => <Bunga kelopak={C.kuning} inti={C.tanahTua} jumlah={10} />,
  "bunga-sakura": () => <Bunga kelopak={C.pink} inti={C.kuningMuda} jumlah={5} />,
  "bunga-tulip": () => (
    <g>
      <path d="M20 34V19" stroke={C.hijauTua} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M24 28C24 24.5 27.5 22 32 22C32 26 28.5 28 24 28Z" fill={C.hijau} />
      <path d="M12 8.5C12 15 15.5 20 20 20C24.5 20 28 15 28 8.5C25 10.5 24 13 24 13C24 13 22.5 8.5 20 6.5C17.5 8.5 16 13 16 13C16 13 15 10.5 12 8.5Z" fill={C.merah} />
    </g>
  ),
  kuncup: () => (
    <g>
      <path d="M20 34V22" stroke={C.hijauTua} strokeWidth="2.4" strokeLinecap="round" />
      <ellipse cx="20" cy="15" rx="6" ry="9" fill={C.hijauMuda} />
      <path d="M20 7C23.5 10 24 18 21.5 23.5" stroke={C.hijau} strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </g>
  ),
  "tanaman-subur": () => (
    <g>
      <path d="M9 36C9 33 12 31 20 31C28 31 31 33 31 36Z" fill={C.tanah} />
      <path d="M20 31V14" stroke={C.hijauTua} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M20 20C20 14.5 24 11 30.5 11C30.5 17 26.5 20 20 20Z" fill={C.hijau} />
      <path d="M20 25C20 20 16.5 17 10.5 17C10.5 22.5 14 25 20 25Z" fill={C.hijau} />
      <path d="M20 15C20 10 22.5 6.5 26 5C26.5 10 24 14 20 15Z" fill={C.hijauMuda} />
    </g>
  ),
  "tanaman-layu": () => (
    <g>
      <path d="M9 36C9 33 12 31 20 31C28 31 31 33 31 36Z" fill={C.tanahMuda} />
      <path d="M20 31C20 24 19 20 16 16" stroke={C.kuning} strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <path d="M16.5 19C13 21 9.5 20 7.5 16.5C11 14.5 14.5 15.5 16.5 19Z" fill={C.kuning} />
      <path d="M18.5 24C21.5 27 25.5 27 28.5 24.5C25.5 21.5 21 21.5 18.5 24Z" fill={C.tanah} />
    </g>
  ),
  pot: () => (
    <g>
      <path d="M8.5 14H31.5L28.5 34C28.3 35.2 27.3 36 26 36H14C12.7 36 11.7 35.2 11.5 34L8.5 14Z" fill={C.tanah} />
      <rect x="6" y="9" width="28" height="6" rx="3" fill={C.tanahTua} />
    </g>
  ),
  "pot-isi": () => (
    <g>
      <path d="M8.5 14H31.5L28.5 34C28.3 35.2 27.3 36 26 36H14C12.7 36 11.7 35.2 11.5 34L8.5 14Z" fill={C.tanah} />
      <rect x="6" y="9" width="28" height="6" rx="3" fill={C.tanahTua} />
      <path d="M20 9V2" stroke={C.hijauTua} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M20 7C20 3.5 23 1 27.5 1C27.5 5 24.5 7 20 7Z" fill={C.hijau} />
      <path d="M20 9C20 5.5 17 3 12.5 3C12.5 7 15.5 9 20 9Z" fill={C.hijauMuda} />
    </g>
  ),

  /* Sampah organik */
  "kulit-pisang": () => (
    <g>
      <path d="M11 8C11 21 17 30 30 32C31.5 32.2 32.5 30.8 31.8 29.5C26 19 22 13 19 7.5C18.2 6 15.5 5.5 14 6.5L11 8Z" fill={C.kuning} />
      <path d="M14 9C15 20 20 27 30 29.5" stroke={C.kuningMuda} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <circle cx="30.5" cy="31" r="2.6" fill={C.tanahTua} />
    </g>
  ),
  "sisa-apel": () => (
    <g>
      <path d="M20 9C24 9 26 12 26 15C26 20 24 25 22 31C21.5 32.5 18.5 32.5 18 31C16 25 14 20 14 15C14 12 16 9 20 9Z" fill={C.kertas} />
      <path d="M20 9V4" stroke={C.tanah} strokeWidth="2" strokeLinecap="round" />
      <path d="M21 6C24 4 27.5 5 28.5 8C25.5 9.5 22 8.5 21 6Z" fill={C.hijau} />
      <circle cx="18" cy="18" r="1.3" fill={C.tanahTua} />
      <circle cx="22" cy="21" r="1.3" fill={C.tanahTua} />
    </g>
  ),
  "sisa-sayur": () => (
    <g>
      <path d="M20 34C13 34 8 28 8 21C8 17 11 15 14 16C15 12 18 10 20 10C22 10 25 12 26 16C29 15 32 17 32 21C32 28 27 34 20 34Z" fill={C.hijau} />
      <path d="M20 32V16M20 22L14 18M20 26L26 21" stroke={C.hijauMuda} strokeWidth="1.6" strokeLinecap="round" />
    </g>
  ),
  "cangkang-telur": () => (
    <g>
      <path d="M8.5 24C8.5 15 13.5 6 20 6C26.5 6 31.5 15 31.5 24C31.5 26 31.2 27.8 30.6 29.4L26 25.5L21.5 30L16.5 25.5L11.5 30.2C9.6 28.4 8.5 26.4 8.5 24Z" fill={C.kertas} />
      <path d="M11.5 30.2L16.5 25.5L21.5 30L26 25.5L30.6 29.4C29 33.2 24.9 36 20 36C15.4 36 11.6 33.6 9.8 30.2H11.5Z" fill={C.kertasTua} />
    </g>
  ),
  "ampas-kopi": () => (
    <g>
      <path d="M9 20H31C31 29 27 35 20 35C13 35 9 29 9 20Z" fill={C.tanahTua} />
      <ellipse cx="20" cy="20" rx="11" ry="4" fill={C.tanah} />
      <circle cx="16" cy="19.5" r="1.3" fill={C.tanahTua} />
      <circle cx="23" cy="21" r="1.3" fill={C.tanahTua} />
      <circle cx="20" cy="18" r="1" fill={C.tanahTua} />
    </g>
  ),
  "kulit-jeruk": () => (
    <g>
      <path d="M20 6C28 6 34 13 34 21C34 22.5 32.5 23.5 31 23C27 21.5 23.5 21 20 21C16.5 21 13 21.5 9 23C7.5 23.5 6 22.5 6 21C6 13 12 6 20 6Z" fill={C.kuning} />
      <path d="M20 21V7M20 21C15 20 11 15 10 9M20 21C25 20 29 15 30 9" stroke={C.kuningMuda} strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </g>
  ),

  /* Sampah anorganik */
  "botol-plastik": () => (
    <g>
      <rect x="16.5" y="4" width="7" height="4" rx="1" fill={C.biru} />
      <path d="M16 8H24L26 13C26.6 14.4 27 15.9 27 17.4V32C27 34.2 25.2 36 23 36H17C14.8 36 13 34.2 13 32V17.4C13 15.9 13.4 14.4 14 13L16 8Z" fill={C.biruMuda} />
      <path d="M13 21H27" stroke={C.biru} strokeWidth="1.6" />
      <path d="M13 25H27" stroke={C.biru} strokeWidth="1.6" />
    </g>
  ),
  kaleng: () => (
    <g>
      <rect x="11" y="7" width="18" height="26" rx="3" fill={C.abuMuda} />
      <ellipse cx="20" cy="7.5" rx="9" ry="3" fill={C.abu} />
      <rect x="11" y="16" width="18" height="7" fill={C.merah} />
      <path d="M15 10.5V13M25 10.5V13" stroke={C.abu} strokeWidth="1.4" strokeLinecap="round" />
    </g>
  ),
  "kantong-plastik": () => (
    <g>
      <path d="M11 13H29L31 33C31.1 34.6 29.9 36 28.3 36H11.7C10.1 36 8.9 34.6 9 33L11 13Z" fill={C.biruMuda} />
      <path d="M15 13V9C15 6.2 17.2 4 20 4C22.8 4 25 6.2 25 9V13" stroke={C.biru} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M14 20L26 30M26 20L14 30" stroke={C.biru} strokeWidth="1.4" opacity="0.5" />
    </g>
  ),
  styrofoam: () => (
    <g>
      <path d="M7 15H33L30.5 31C30.3 32.7 28.9 34 27.2 34H12.8C11.1 34 9.7 32.7 9.5 31L7 15Z" fill={C.kertas} />
      <rect x="5" y="11" width="30" height="5" rx="2.5" fill={C.kertasTua} />
      <circle cx="15" cy="23" r="1.6" fill={C.kertasTua} />
      <circle cx="22" cy="26" r="1.6" fill={C.kertasTua} />
      <circle cx="26" cy="20" r="1.6" fill={C.kertasTua} />
    </g>
  ),
  "tutup-botol": () => (
    <g>
      <circle cx="20" cy="20" r="12" fill={C.merah} />
      <circle cx="20" cy="20" r="7.5" fill="rgba(247,248,242,0.35)" />
      {Array.from({ length: 12 }, (_, i) => (
        <rect key={i} x="19" y="6.5" width="2" height="4" rx="1" fill={C.merah} transform={`rotate(${i * 30} 20 20)`} />
      ))}
    </g>
  ),
  kardus: () => (
    <g>
      <path d="M6 14L20 8L34 14V30L20 36L6 30V14Z" fill={C.tanahMuda} />
      <path d="M6 14L20 20L34 14" stroke={C.tanah} strokeWidth="1.8" fill="none" />
      <path d="M20 20V36" stroke={C.tanah} strokeWidth="1.8" />
      <path d="M13 11L27 17" stroke={C.tanah} strokeWidth="1.4" opacity="0.7" />
    </g>
  ),
  kertas: () => (
    <g>
      <path d="M10 5H24L30 11V35H10V5Z" fill={C.kertas} stroke={C.kertasTua} strokeWidth="1.5" />
      <path d="M24 5V11H30" fill={C.kertasTua} />
      <path d="M14 17H26M14 22H26M14 27H21" stroke={C.abuMuda} strokeWidth="1.6" strokeLinecap="round" />
    </g>
  ),
  koran: () => (
    <g>
      <rect x="6" y="9" width="28" height="23" rx="2" fill={C.kertas} stroke={C.kertasTua} strokeWidth="1.5" />
      <rect x="9" y="12.5" width="12" height="8" rx="1" fill={C.abuMuda} />
      <path d="M23.5 13H31M23.5 17H31M23.5 21H31M9 24H31M9 28H24" stroke={C.abuMuda} strokeWidth="1.5" strokeLinecap="round" />
    </g>
  ),

  /* Alam */
  batu: () => (
    <g>
      <path d="M6 27L12 12L26 8L34 19L30 32H11L6 27Z" fill={C.abu} />
      <path d="M12 12L20 20L34 19M20 20L16 32" stroke={C.abuMuda} strokeWidth="1.5" fill="none" />
    </g>
  ),
  "tetes-air": () => (
    <g>
      <path d="M20 4C20 4 31 17.5 31 24.5C31 30.8 26.1 36 20 36C13.9 36 9 30.8 9 24.5C9 17.5 20 4 20 4Z" fill={C.biru} />
      <path d="M15 26C15 22.5 16.5 19.5 18.5 17" stroke={C.biruMuda} strokeWidth="2" strokeLinecap="round" fill="none" />
    </g>
  ),
  air: () => (
    <g>
      <path d="M5 16C9 12 13 12 17 16C21 20 25 20 29 16C33 12 35 12 35 16V32C35 33.1 34.1 34 33 34H7C5.9 34 5 33.1 5 32V16Z" fill={C.biru} />
      <path d="M5 24C9 20 13 20 17 24C21 28 25 28 29 24C33 20 35 20 35 24" stroke={C.biruMuda} strokeWidth="1.8" fill="none" />
    </g>
  ),
  matahari: () => (
    <g>
      <circle cx="20" cy="20" r="9" fill={C.kuning} />
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x="19" y="2.5" width="2.4" height="6" rx="1.2" fill={C.kuning} transform={`rotate(${i * 45} 20 20)`} />
      ))}
    </g>
  ),
  awan: () => (
    <g>
      <path d="M11 30C7.1 30 4 26.9 4 23C4 19.4 6.7 16.4 10.2 16.1C11.3 11.4 15.5 8 20.5 8C26 8 30.6 12.2 31.2 17.6C34 18.5 36 21.1 36 24.2C36 27.4 33.4 30 30.2 30H11Z" fill={C.kertas} stroke={C.kertasTua} strokeWidth="1.6" />
    </g>
  ),
  "awan-hujan": () => (
    <g>
      <path d="M11 25C7.7 25 5 22.3 5 19C5 16 7.3 13.5 10.2 13.1C11.2 9.1 14.8 6 19.2 6C24 6 28 9.6 28.5 14.2C31 15 32.8 17.3 32.8 20C32.8 22.8 30.6 25 27.8 25H11Z" fill={C.abuMuda} stroke={C.abu} strokeWidth="1.5" />
      <path d="M13 29V34M20 29V36M27 29V34" stroke={C.biru} strokeWidth="2.6" strokeLinecap="round" />
    </g>
  ),
  hujan: () => (
    <g stroke={C.biru} strokeWidth="2.8" strokeLinecap="round">
      <path d="M11 6V16M20 12V24M29 6V16M11 24V32M29 24V32" />
    </g>
  ),
  angin: () => (
    <g stroke={C.abu} strokeWidth="2.6" strokeLinecap="round" fill="none">
      <path d="M5 14H23C26 14 28 12 28 9.5C28 7 26 5 23.5 5C21.5 5 20 6.2 19.4 8" />
      <path d="M5 22H29C32 22 34 24 34 26.5C34 29 32 31 29.5 31C27.5 31 26 29.8 25.4 28" />
      <path d="M5 30H16" />
    </g>
  ),
  tanah: () => (
    <g>
      <path d="M4 16H36V32C36 34.2 34.2 36 32 36H8C5.8 36 4 34.2 4 32V16Z" fill={C.tanah} />
      <path d="M4 16C8 13 12 19 16 16C20 13 24 19 28 16C32 13 36 19 36 16" stroke={C.tanahTua} strokeWidth="2" fill="none" />
      <circle cx="13" cy="26" r="1.8" fill={C.tanahTua} />
      <circle cx="24" cy="29" r="1.8" fill={C.tanahTua} />
      <circle cx="29" cy="23" r="1.5" fill={C.tanahTua} />
    </g>
  ),
  kompos: () => (
    <g>
      <path d="M6 18H34L31.5 32C31.2 34.3 29.3 36 27 36H13C10.7 36 8.8 34.3 8.5 32L6 18Z" fill={C.tanahTua} />
      <ellipse cx="20" cy="18" rx="14" ry="4.5" fill={C.tanah} />
      <path d="M15 17C15 13.5 17.5 11 22 11C22 15 19.5 17 15 17Z" fill={C.hijau} />
      <circle cx="26" cy="17" r="2.4" fill={C.kuning} />
      <circle cx="13" cy="19" r="1.8" fill={C.kertas} />
    </g>
  ),

  /* Hewan */
  "kupu-kupu": () => (
    <g>
      <path d="M19 20C15 11 9 6 5 9C1.5 11.6 3.5 20 10 22C4 24 3 31 6.5 33C10.5 35.3 16 30 19 21Z" fill={C.ungu} />
      <path d="M21 20C25 11 31 6 35 9C38.5 11.6 36.5 20 30 22C36 24 37 31 33.5 33C29.5 35.3 24 30 21 21Z" fill={C.unguMuda} />
      <rect x="18.6" y="12" width="2.8" height="19" rx="1.4" fill={C.tinta} />
      <path d="M19 12L15 6M21 12L25 6" stroke={C.tinta} strokeWidth="1.6" strokeLinecap="round" />
    </g>
  ),
  burung: () => (
    <g>
      <path d="M8 26C8 18 13.5 12 21 12C28 12 33 16.5 33 23C33 29.5 27 34 20 34C13 34 8 31 8 26Z" fill={C.biru} />
      <path d="M14 22C18 18 24 18 29 21C26 27 20 29 14 26V22Z" fill={C.biruMuda} />
      <path d="M33 19L38 21L33 24" fill={C.biru} />
      <circle cx="27" cy="17" r="1.6" fill={C.kertas} />
      <path d="M12 30L7 34M18 34L15 34" stroke={C.kuning} strokeWidth="2" strokeLinecap="round" />
    </g>
  ),
  ikan: () => (
    <g>
      <path d="M6 20C10 13 17 10 24 12C29 13.5 32.5 16.5 34 20C32.5 23.5 29 26.5 24 28C17 30 10 27 6 20Z" fill={C.kuning} />
      <path d="M34 20L38 14V26L34 20Z" fill={C.kuning} />
      <path d="M20 11.5L22 5L27 12.5" fill={C.kuningMuda} />
      <circle cx="12" cy="19" r="1.8" fill={C.tinta} />
    </g>
  ),
  "kura-kura": () => (
    <g>
      <path d="M7 27C7 18.7 12.8 13 20 13C27.2 13 33 18.7 33 27H7Z" fill={C.hijauTua} />
      <path d="M20 13V27M13 15.5L11 27M27 15.5L29 27M9.5 21H30.5" stroke={C.hijauMuda} strokeWidth="1.5" />
      <circle cx="34" cy="25" r="3.4" fill={C.hijau} />
      <circle cx="35" cy="24" r="1" fill={C.tinta} />
      <rect x="10" y="27" width="4.5" height="5" rx="2.2" fill={C.hijau} />
      <rect x="25.5" y="27" width="4.5" height="5" rx="2.2" fill={C.hijau} />
    </g>
  ),
  lebah: () => (
    <g>
      <ellipse cx="20" cy="23" rx="10" ry="8" fill={C.kuning} />
      <path d="M15.5 16.2C16.8 20.5 16.8 25.5 15.5 29.8M22 15.4C23.6 20.4 23.6 25.6 22 30.6" stroke={C.tinta} strokeWidth="2.6" />
      <ellipse cx="14" cy="12" rx="6" ry="4" fill={C.biruMuda} opacity="0.85" transform="rotate(-25 14 12)" />
      <ellipse cx="25" cy="12" rx="6" ry="4" fill={C.biruMuda} opacity="0.85" transform="rotate(25 25 12)" />
      <circle cx="30.5" cy="21" r="3" fill={C.tinta} />
    </g>
  ),
  cacing: () => (
    <g>
      <path d="M8 30C8 25 14 25 14 20C14 15 8 15 8 10" stroke={C.pink} strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M14 20C14 15 20 15 24 18C28 21 32 20 32 14" stroke={C.pink} strokeWidth="6" strokeLinecap="round" fill="none" />
      <circle cx="32" cy="13" r="1.3" fill={C.tinta} />
    </g>
  ),
  siput: () => (
    <g>
      <path d="M6 30H24C24 30 22 24 24 19C25.5 15.2 30 15 30 15" stroke={C.kuning} strokeWidth="5" strokeLinecap="round" fill="none" />
      <circle cx="19" cy="21" r="10" fill={C.tanah} />
      <path d="M19 21C19 17 22 14.5 25 15.5C27.6 16.4 28 20 26 22.5C24 25 20.5 25 19 21Z" fill={C.tanahMuda} />
      <path d="M30 15V9M33 16.5L36 11" stroke={C.kuning} strokeWidth="2" strokeLinecap="round" />
    </g>
  ),

  /* Jejak & alat */
  "jejak-hewan": () => (
    <g fill={C.tanahTua}>
      <ellipse cx="20" cy="26" rx="7.5" ry="6.5" />
      <ellipse cx="11" cy="16" rx="3.2" ry="4.2" transform="rotate(-18 11 16)" />
      <ellipse cx="17" cy="11" rx="3.2" ry="4.4" />
      <ellipse cx="24" cy="11.5" rx="3.2" ry="4.4" />
      <ellipse cx="29.5" cy="17" rx="3.2" ry="4.2" transform="rotate(18 29.5 17)" />
    </g>
  ),
  "jejak-manusia": () => (
    <g fill={C.tanahTua}>
      <path d="M14 24C14 15 16.5 8 21 8C25 8 27 13 26 21C25.5 25 24.5 27 24 29C23.5 31.5 21 32 19 31C16 29.6 14 27.5 14 24Z" />
      <ellipse cx="19.5" cy="35" rx="4.6" ry="3" />
    </g>
  ),
  ember: () => (
    <g>
      <path d="M8 15H32L29 33C28.7 34.7 27.2 36 25.5 36H14.5C12.8 36 11.3 34.7 11 33L8 15Z" fill={C.biru} />
      <rect x="6" y="11" width="28" height="5" rx="2.5" fill={C.biru} />
      <path d="M12 11C12 6.5 15.6 3 20 3C24.4 3 28 6.5 28 11" stroke={C.abu} strokeWidth="2" fill="none" />
    </g>
  ),
  sekop: () => (
    <g>
      <rect x="18" y="4" width="4" height="18" rx="2" fill={C.tanah} />
      <rect x="14" y="3" width="12" height="4" rx="2" fill={C.tanahTua} />
      <path d="M11 21H29L26 33C25.4 34.8 23.7 36 21.8 36H18.2C16.3 36 14.6 34.8 14 33L11 21Z" fill={C.abu} />
    </g>
  ),
  "gelas-ukur": () => (
    <g>
      <path d="M12 5H28V29C28 33 24.4 36 20 36C15.6 36 12 33 12 29V5Z" fill={C.biruMuda} stroke={C.abu} strokeWidth="1.6" />
      <path d="M12 23C12 23 15 21 20 23C25 25 28 23 28 23V29C28 33 24.4 36 20 36C15.6 36 12 33 12 29V23Z" fill={C.biru} />
      <path d="M12 12H18M12 17H18" stroke={C.abu} strokeWidth="1.6" strokeLinecap="round" />
    </g>
  ),
  timbangan: () => (
    <g>
      <rect x="18" y="10" width="4" height="20" rx="2" fill={C.abu} />
      <rect x="10" y="30" width="20" height="4" rx="2" fill={C.abu} />
      <path d="M6 12H34" stroke={C.abu} strokeWidth="3" strokeLinecap="round" />
      <path d="M4 13C4 17 7 19 10 19C13 19 16 17 16 13" fill={C.abuMuda} />
      <path d="M24 13C24 17 27 19 30 19C33 19 36 17 36 13" fill={C.abuMuda} />
      <circle cx="20" cy="10" r="3.2" fill={C.tanah} />
    </g>
  ),
  "kaca-pembesar": () => (
    <g>
      <circle cx="17" cy="17" r="11" fill={C.biruMuda} stroke={C.abu} strokeWidth="2.6" />
      <path d="M25.5 25.5L35 35" stroke={C.tanah} strokeWidth="4.5" strokeLinecap="round" />
      <path d="M12 14C13 11.5 15 10 17.5 9.5" stroke={C.kertas} strokeWidth="2" strokeLinecap="round" fill="none" />
    </g>
  ),

  /* Bentuk geometri — untuk pola abstrak */
  lingkaran: () => <circle cx="20" cy="20" r="13" fill={C.biru} />,
  segitiga: () => <path d="M20 6L34 31H6L20 6Z" fill={C.kuning} />,
  kotak: () => <rect x="7" y="7" width="26" height="26" rx="3" fill={C.ungu} />,
  wajik: () => <path d="M20 5L33 20L20 35L7 20L20 5Z" fill={C.merah} />,
  bintang: () => (
    <path d="M20 4L24.6 15.2L36.5 16.2L27.5 24.1L30.2 35.8L20 29.5L9.8 35.8L12.5 24.1L3.5 16.2L15.4 15.2L20 4Z" fill={C.kuning} />
  ),
} as const;

export type SpecimenId = keyof typeof SPECIMEN_ART;

/** Nama Indonesia setiap spesimen — dipakai untuk label & pembaca layar. */
export const SPECIMEN_LABEL: Record<SpecimenId, string> = {
  "daun-hijau": "Daun hijau",
  "daun-hijau-tua": "Daun hijau tua",
  "daun-muda": "Daun muda",
  "daun-kering": "Daun kering",
  "daun-gugur": "Daun gugur",
  "daun-maple": "Daun maple",
  "daun-jarum": "Daun jarum",
  "daun-bulat": "Daun bulat",
  biji: "Biji",
  tunas: "Tunas",
  pohon: "Pohon",
  "pohon-besar": "Pohon besar",
  semak: "Semak",
  rumput: "Rumput",
  "bunga-matahari": "Bunga matahari",
  "bunga-sakura": "Bunga sakura",
  "bunga-tulip": "Bunga tulip",
  kuncup: "Kuncup bunga",
  "tanaman-subur": "Tanaman subur",
  "tanaman-layu": "Tanaman layu",
  pot: "Pot kosong",
  "pot-isi": "Pot berisi tanaman",
  "kulit-pisang": "Kulit pisang",
  "sisa-apel": "Sisa apel",
  "sisa-sayur": "Sisa sayur",
  "cangkang-telur": "Cangkang telur",
  "ampas-kopi": "Ampas kopi",
  "kulit-jeruk": "Kulit jeruk",
  "botol-plastik": "Botol plastik",
  kaleng: "Kaleng",
  "kantong-plastik": "Kantong plastik",
  styrofoam: "Wadah styrofoam",
  "tutup-botol": "Tutup botol",
  kardus: "Kardus",
  kertas: "Kertas",
  koran: "Koran bekas",
  batu: "Batu",
  "tetes-air": "Tetes air",
  air: "Air",
  matahari: "Matahari",
  awan: "Awan",
  "awan-hujan": "Awan hujan",
  hujan: "Hujan",
  angin: "Angin",
  tanah: "Tanah",
  kompos: "Kompos",
  "kupu-kupu": "Kupu-kupu",
  burung: "Burung",
  ikan: "Ikan",
  "kura-kura": "Kura-kura",
  lebah: "Lebah",
  cacing: "Cacing tanah",
  siput: "Siput",
  "jejak-hewan": "Jejak kaki hewan",
  "jejak-manusia": "Jejak kaki manusia",
  ember: "Ember",
  sekop: "Sekop",
  "gelas-ukur": "Gelas ukur",
  timbangan: "Timbangan",
  "kaca-pembesar": "Kaca pembesar",
  lingkaran: "Lingkaran",
  segitiga: "Segitiga",
  kotak: "Kotak",
  wajik: "Wajik",
  bintang: "Bintang",
};

export const ALL_SPECIMEN_IDS = Object.keys(SPECIMEN_ART) as SpecimenId[];

export function isSpecimenId(value: string): value is SpecimenId {
  return value in SPECIMEN_ART;
}

interface SpecimenProps extends Omit<SVGProps<SVGSVGElement>, "id"> {
  id: SpecimenId;
  size?: number;
  /**
   * Kosongkan untuk gambar dekoratif (label sudah ditulis di sebelahnya).
   * Isi untuk gambar yang berdiri sendiri.
   */
  label?: string;
}

export function Specimen({ id, size = 40, label, className, ...rest }: SpecimenProps): JSX.Element {
  const Art = SPECIMEN_ART[id];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      {...rest}
    >
      <Art />
    </svg>
  );
}
