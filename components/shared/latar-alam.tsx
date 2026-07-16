/**
 * Latar alam.
 *
 * Sepenuhnya CSS dan SVG sebaris: tanpa gambar, tanpa kanvas, tanpa
 * skrip. Semua gerakannya dijalankan compositor peramban (transform
 * dan opacity saja), jadi tidak ada satu pun bingkai yang dihabiskan
 * di utas utama — penting karena latar ini menyala di belakang papan
 * permainan yang sedang diseret jari anak.
 *
 * Posisi tidak diacak saat render. Angka-angkanya ditulis tangan di
 * larik di bawah, sebab Math.random() akan berbeda antara server dan
 * peramban dan memicu galat hidrasi.
 *
 * Seluruhnya diam kalau pengguna meminta gerakan dikurangi — aturan
 * itu ditegakkan di app/globals.css, bukan di sini.
 */

import { cn } from "@/lib/utils";

/* Awan: kiri, atas, lebar, lama, jeda, kepekatan. */
const AWAN = [
  { atas: 6, lebar: 148, lama: 78, jeda: 0, kabur: 0.5 },
  { atas: 15, lebar: 96, lama: 58, jeda: -22, kabur: 0.38 },
  { atas: 27, lebar: 122, lama: 92, jeda: -46, kabur: 0.3 },
] as const;

/* Daun gugur: kiri (%), lama, jeda, ukuran, rona. */
const DAUN = [
  { kiri: 8, lama: 15, jeda: 0, ukuran: 17, rona: "#3E8B54" },
  { kiri: 23, lama: 20, jeda: -6, ukuran: 13, rona: "#D9922E" },
  { kiri: 41, lama: 17, jeda: -11, ukuran: 15, rona: "#A8D8B4" },
  { kiri: 58, lama: 22, jeda: -3, ukuran: 12, rona: "#8C5A3C" },
  { kiri: 74, lama: 18, jeda: -14, ukuran: 16, rona: "#3E8B54" },
  { kiri: 89, lama: 24, jeda: -8, ukuran: 13, rona: "#D9922E" },
] as const;

function Daun({ warna, ukuran }: { warna: string; ukuran: number }) {
  return (
    <svg width={ukuran} height={ukuran} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 2c5 2.4 7 6.4 6.2 10.6C15.4 16.6 12.4 18.6 9 18c-4-.7-6.4-4-5.8-8C3.8 6.2 6.2 3.4 10 2Z"
        fill={warna}
        opacity={0.75}
      />
      <path d="M10 3.6v13.2" stroke="#1E3326" strokeOpacity={0.22} strokeWidth={0.9} strokeLinecap="round" />
    </svg>
  );
}

interface LatarAlamProps {
  /** "penuh" untuk halaman depan, "tenang" untuk di balik papan permainan. */
  ragam?: "penuh" | "tenang";
  className?: string;
}

export function LatarAlam({ ragam = "penuh", className }: LatarAlamProps) {
  const penuh = ragam === "penuh";

  return (
    <div className={cn("pointer-events-none fixed inset-0 -z-10 overflow-hidden", className)} aria-hidden>
      {/* Langit: dari biru pucat di atas ke kertas di bawah. */}
      <div className="absolute inset-0 bg-gradient-to-b from-langit-lo/45 via-kertas to-kertas" />

      {/* Cahaya matahari dari pojok kanan atas. */}
      <div
        className="absolute -right-24 -top-24 h-[26rem] w-[26rem] rounded-full opacity-45 blur-3xl"
        style={{ background: "radial-gradient(circle, #F6E0AE 0%, transparent 68%)" }}
      />

      {/* Awan hanyut. */}
      {AWAN.map((a, i) => (
        <div
          key={i}
          className="absolute animate-hanyut-awan"
          style={{
            top: `${a.atas}%`,
            width: a.lebar,
            animationDuration: `${a.lama}s`,
            animationDelay: `${a.jeda}s`,
            opacity: a.kabur,
          }}
        >
          <svg viewBox="0 0 120 44" fill="#FFFFFF">
            <ellipse cx="34" cy="28" rx="30" ry="15" />
            <ellipse cx="62" cy="20" rx="26" ry="19" />
            <ellipse cx="88" cy="29" rx="24" ry="14" />
          </svg>
        </div>
      ))}

      {/* Daun gugur — hanya di halaman yang lapang. */}
      {penuh &&
        DAUN.map((d, i) => (
          <div
            key={i}
            className="absolute top-0 animate-gugur-daun"
            style={{
              left: `${d.kiri}%`,
              animationDuration: `${d.lama}s`,
              animationDelay: `${d.jeda}s`,
            }}
          >
            <Daun warna={d.rona} ukuran={d.ukuran} />
          </div>
        ))}

      {/* Bukit berlapis — memberi kedalaman tanpa parallax yang mahal. */}
      <svg
        className="absolute inset-x-0 bottom-0 w-full"
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        style={{ height: penuh ? "34vh" : "22vh" }}
      >
        <path d="M0 118c150-34 260 22 420 8s250-58 400-42 260 62 420 44 200-32 200-32V220H0Z" fill="#A8D8B4" opacity={0.5} />
        <path d="M0 156c180-28 300 18 460 6s280-44 430-30 250 48 400 34 150-18 150-18V220H0Z" fill="#3E8B54" opacity={0.28} />
        <path d="M0 190c220-20 340 12 520 4s300-26 460-16 260 24 460 12V220H0Z" fill="#2C6B3F" opacity={0.2} />
      </svg>

      {/* Rumput di garis paling bawah. */}
      <svg
        className="absolute inset-x-0 bottom-0 h-6 w-full"
        viewBox="0 0 240 14"
        preserveAspectRatio="none"
        fill="#2C6B3F"
        opacity={0.28}
      >
        <path d="M0 14h240V9c-6 0-8-6-12-6s-6 5-11 5-7-7-12-7-7 6-12 6-6-5-11-5-8 7-13 7-6-6-11-6-7 5-12 5-7-6-12-6-6 6-11 6-8-5-13-5-6 6-11 6-7-7-12-7-6 5-11 5-8-6-13-6-6 6-11 6-7-5-12-5-7 6-12 6-6-6-11-6-8 5-13 5V14Z" />
      </svg>
    </div>
  );
}
