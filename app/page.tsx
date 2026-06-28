/**
 * Landing page — root route
 * Evaluator entry point per lidm-2026.md FR-LIDM-001.
 */

import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 p-8 text-center">
      {/* Hero */}
      <div className="space-y-3">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-primary shadow-xl">
          <span className="font-display text-4xl font-bold text-white">Q</span>
        </div>
        <h1 className="font-display text-5xl font-bold text-gray-900">INQUIS</h1>
        <p className="text-xl font-medium text-inquis-ocean">
          Belajar Sains dengan Bermain
        </p>
        <p className="mx-auto max-w-lg text-muted-foreground">
          Platform pembelajaran inkuiri untuk anak usia 5–7 tahun. Kembangkan
          kemampuan berpikir ilmiah melalui eksplorasi yang menyenangkan.
        </p>
      </div>

      {/* Primary CTA — Demo Mode */}
      <Link
        href="/demo"
        className="rounded-2xl bg-gradient-to-r from-inquis-grass to-emerald-500 px-10 py-5 text-xl font-bold text-white shadow-lg transition-transform hover:scale-105"
      >
        🎮 Coba Mode Demo — 30 Detik!
      </Link>

      {/* Role CTAs */}
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/login?role=child"
          className="rounded-2xl bg-primary/90 px-6 py-3 font-bold text-white shadow-md transition-transform hover:scale-105"
        >
          🧒 Masuk sebagai Anak
        </Link>
        <Link
          href="/login?role=teacher"
          className="rounded-2xl bg-primary px-6 py-3 font-bold text-white shadow-md transition-transform hover:scale-105"
        >
          👩‍🏫 Masuk sebagai Guru
        </Link>
        <Link
          href="/login?role=parent"
          className="rounded-2xl bg-inquis-sun px-6 py-3 font-bold text-gray-800 shadow-md transition-transform hover:scale-105"
        >
          👨‍👩‍👧 Masuk sebagai Orang Tua
        </Link>
      </div>

      <Link
        href="/about"
        className="text-sm font-medium text-primary hover:underline"
      >
        📖 Pelajari Metode Inkuiri →
      </Link>

      <p className="text-xs text-muted-foreground">
        INQUIS · Lomba Inovasi Digital Mahasiswa 2026
      </p>
    </main>
  );
}
