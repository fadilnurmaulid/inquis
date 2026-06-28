/**
 * Demo Mode launcher — FR-LIDM-002
 * One-click access for LIDM judges without account setup.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { DemoLoginSection } from "@/components/auth/demo-login-section";

export const metadata: Metadata = {
  title: "Mode Demo — INQUIS",
  description: "Coba INQUIS langsung tanpa mendaftar",
};

export default function DemoPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 p-6">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary shadow-xl">
            <span className="font-display text-4xl font-bold text-white">Q</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-gray-900">Mode Demo INQUIS</h1>
          <p className="mt-2 text-muted-foreground">
            Pilih peran untuk langsung merasakan platform pembelajaran inkuiri
          </p>
        </div>

        <DemoLoginSection />

        <div className="space-y-3 rounded-2xl bg-white/70 p-5 text-sm text-muted-foreground shadow-sm">
          <p className="font-semibold text-gray-800">Alur demo yang disarankan (10 menit):</p>
          <ol className="list-inside list-decimal space-y-1">
            <li>Masuk sebagai <strong>Anak — Pemula</strong> → selesaikan 1 aktivitas Dunia 1</li>
            <li>Masuk sebagai <strong>Guru</strong> → lihat kemajuan kelas</li>
            <li>Masuk sebagai <strong>Orang Tua</strong> → pantau kemajuan Rara</li>
          </ol>
        </div>

        <div className="flex flex-wrap justify-center gap-3 text-sm">
          <Link href="/about" className="text-primary hover:underline">
            Pelajari Metode Inkuiri →
          </Link>
          <Link href="/" className="text-muted-foreground hover:underline">
            ← Beranda
          </Link>
        </div>
      </div>
    </main>
  );
}
