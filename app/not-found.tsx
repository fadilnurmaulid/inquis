/**
 * 404 Not Found — child-friendly, never exposes technical details.
 */

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Halaman Tidak Ditemukan" };

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-gradient-to-br from-sky-50 to-blue-100 p-8 text-center">
      {/* Illustration */}
      <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white/70 text-6xl shadow-sm">
        🔭
      </div>

      <div className="space-y-3">
        <h1 className="font-display text-3xl font-bold text-gray-800">
          Ups! Halaman Tidak Ditemukan
        </h1>
        <p className="mx-auto max-w-sm text-gray-500 leading-relaxed">
          Halaman ini seperti pola yang hilang, tidak ada di sini!
          Yuk kembali ke petualangan belajarmu.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex min-h-[48px] items-center gap-2 rounded-2xl bg-primary px-6 py-3
                     font-bold text-white shadow-md transition-all hover:scale-105 hover:bg-primary/90 active:scale-95"
        >
          🏠 Kembali ke Beranda
        </Link>
        <Link
          href="/play/home"
          className="inline-flex min-h-[48px] items-center gap-2 rounded-2xl border-2 border-primary/30
                     bg-white px-6 py-3 font-bold text-primary transition-all hover:scale-105 hover:bg-primary/5 active:scale-95"
        >
          🗺️ Peta Dunia
        </Link>
      </div>

      <p className="text-xs text-gray-400">INQUIS · LIDM 2026</p>
    </main>
  );
}
