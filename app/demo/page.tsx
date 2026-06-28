/**
 * Demo Mode launcher — FR-LIDM-002
 * One-click access for LIDM judges. Integrated flow, no setup required.
 * Naturally embedded demo launcher per brief instructions.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { DemoLoginSection } from "@/components/auth/demo-login-section";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Mode Demo — INQUIS",
  description: "Coba INQUIS langsung tanpa mendaftar — untuk juri LIDM 2026",
};

const DEMO_FLOW = [
  { step: 1, role: "Anak — Bima (Pemula)", desc: "Dunia 1 Aktivitas 1 → selesaikan siklus inkuiri lengkap" },
  { step: 2, role: "Anak — Rara (Lanjutan)", desc: "Lihat peta dunia dengan kemajuan dan pencapaian nyata" },
  { step: 3, role: "Guru — Bu Sari", desc: "Dashboard kelas dengan analitik berpikir ilmiah per siswa" },
  { step: 4, role: "Orang Tua — Pak Budi", desc: "Ringkasan kemajuan Rara dengan narasi yang mudah dipahami" },
];

export default function DemoPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 p-6">
      <div className="w-full max-w-lg space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-inquis-sky to-inquis-ocean shadow-2xl shadow-inquis-sky/40">
            <span className="font-display text-4xl font-bold text-white">Q</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-gray-900">Mode Demo INQUIS</h1>
          <p className="mt-2 text-gray-500">
            Klik untuk langsung masuk — tidak perlu mendaftar
          </p>
        </div>

        {/* Demo login buttons */}
        <DemoLoginSection />

        {/* Recommended flow */}
        <div className="rounded-2xl border border-white/60 bg-white/60 p-5 shadow-sm backdrop-blur-sm">
          <p className="mb-3 text-sm font-bold text-gray-800">
            Alur demo yang disarankan (10–15 menit):
          </p>
          <div className="space-y-2">
            {DEMO_FLOW.map(({ step, role, desc }) => (
              <div key={step} className="flex items-start gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                  {step}
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-700">{role}</p>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <Link href="/about" className="flex items-center gap-1 font-semibold text-primary hover:underline">
            📖 Metode Inkuiri <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link href="/" className="text-gray-500 hover:text-gray-700 hover:underline">
            ← Beranda
          </Link>
        </div>
      </div>
    </main>
  );
}
