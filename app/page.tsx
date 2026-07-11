/**
 * Landing page — root route
 * Evaluator entry point per lidm-2026.md FR-LIDM-001.
 * Communicates innovation claim within 30 seconds (AC-LIDM-001).
 */

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "INQUIS · Belajar Sains & Peduli Lingkungan",
  description:
    "Platform pembelajaran inkuiri berbasis sains untuk anak usia 5–7 tahun. Kembangkan kemampuan berpikir ilmiah dan kepedulian pada lingkungan melalui eksplorasi yang menyenangkan.",
};

const STATS = [
  { n: "4", label: "Dunia Belajar" },
  { n: "20", label: "Aktivitas Inkuiri" },
  { n: "5", label: "Keterampilan Sains" },
];

const INQUIRY_SKILLS = [
  { emoji: "👀", label: "Amati" },
  { emoji: "❓", label: "Tanya" },
  { emoji: "🔮", label: "Prediksi" },
  { emoji: "🔬", label: "Jelajahi" },
  { emoji: "💡", label: "Simpulkan" },
];

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 p-6 text-center">
      {/* Hero */}
      <div className="mb-8 space-y-4">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-inquis-sky to-inquis-ocean shadow-2xl shadow-inquis-sky/40">
          <span className="font-display text-4xl font-bold text-white">Q</span>
        </div>
        <div>
          <h1 className="font-display text-5xl font-bold text-gray-900 tracking-tight">INQUIS</h1>
          <p className="mt-1 text-xl font-bold text-inquis-ocean">Belajar Sains, Peduli Bumi</p>
        </div>
        <p className="mx-auto max-w-lg text-base leading-relaxed text-gray-600">
          Platform pembelajaran inkuiri untuk anak usia{" "}
          <strong className="text-gray-800">5–7 tahun</strong>. Kembangkan kemampuan
          berpikir ilmiah dan kepedulian terhadap lingkungan melalui eksplorasi yang
          menyenangkan dan terstruktur.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 flex flex-wrap justify-center gap-4">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-white/80 bg-white/70 px-5 py-3 text-center shadow-sm backdrop-blur-sm"
          >
            <p className="font-display text-3xl font-bold text-inquis-sky">{s.n}</p>
            <p className="text-xs font-semibold text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Inquiry cycle preview */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {INQUIRY_SKILLS.map((s) => (
          <span
            key={s.label}
            className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-white/70 px-3 py-1.5 text-sm font-semibold text-gray-700 shadow-sm"
          >
            <span aria-hidden>{s.emoji}</span>
            {s.label}
          </span>
        ))}
      </div>

      {/* Primary CTA — Demo Mode */}
      <Link
        href="/demo"
        className="mb-4 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-inquis-grass to-emerald-500 px-10 py-5 text-xl font-bold text-white shadow-xl shadow-emerald-500/30 transition-all duration-200 hover:scale-105 hover:shadow-2xl active:scale-95"
      >
        🎮 Coba Mode Demo · LIDM 2026
      </Link>

      {/* Role CTAs */}
      <div className="mb-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/login?role=child"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-2xl bg-primary/90 px-6 py-3 font-bold text-white shadow-md transition-all hover:scale-105 hover:bg-primary active:scale-95"
        >
          🧒 Masuk sebagai Anak
        </Link>
        <Link
          href="/login?role=teacher"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-2xl border border-primary/30 bg-white/70 px-6 py-3 font-bold text-primary shadow-sm transition-all hover:scale-105 hover:bg-white active:scale-95"
        >
          👩‍🏫 Guru
        </Link>
        <Link
          href="/login?role=parent"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-2xl border border-inquis-sun/40 bg-inquis-sun/10 px-6 py-3 font-bold text-amber-800 shadow-sm transition-all hover:scale-105 active:scale-95"
        >
          👨‍👩‍👧 Orang Tua
        </Link>
      </div>

      <Link
        href="/about"
        className="mb-6 text-sm font-semibold text-primary hover:underline"
      >
        📖 Pelajari Metode Inkuiri →
      </Link>

      {/* Tagline */}
      <p className="text-xs text-gray-400">
        INQUIS · Lomba Inovasi Digital Mahasiswa 2026 · Inovasi Pembelajaran Digital
      </p>
    </main>
  );
}
