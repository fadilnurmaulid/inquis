/**
 * Pedagogy explainer — FR-LIDM-003
 * Embedded pedagogical rationale for LIDM evaluators.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Metode Inkuiri — INQUIS",
  description: "Bagaimana INQUIS mengembangkan berpikir ilmiah anak usia 5–7 tahun",
};

const INQUIRY_CYCLE = [
  { emoji: "👀", skill: "Amati", desc: "Mengamati pola, perbedaan, dan kemiripan" },
  { emoji: "❓", skill: "Tanya", desc: "Merumuskan pertanyaan dari pengamatan" },
  { emoji: "🔮", skill: "Prediksi", desc: "Menebak apa yang akan terjadi" },
  { emoji: "🔬", skill: "Jelajahi", desc: "Menguji ide dengan interaksi langsung" },
  { emoji: "💡", skill: "Kesimpulan", desc: "Menyimpulkan dari bukti pengamatan" },
];

const KURIKULUM_MAPPING = [
  { dimensi: "Bernalar Kritis", mapping: "Siklus inkuiri ilmiah di setiap aktivitas" },
  { dimensi: "Mandiri", mapping: "Anak mengendalikan sendiri, petunjuk progresif" },
  { dimensi: "Kreatif", mapping: "Eksplorasi bebas sebelum penilaian" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Metode Pembelajaran
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold text-gray-900">
            Inkuiri untuk Anak Usia 5–7 Tahun
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            INQUIS bukan worksheet digital. Platform ini dirancang untuk mengembangkan
            berpikir ilmiah melalui eksplorasi interaktif yang menyenangkan.
          </p>
        </div>

        {/* Problem statement */}
        <section className="mb-10 rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="font-display text-xl font-bold text-gray-800">Masalah yang Diatasi</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Pendidikan anak usia dini di Indonesia masih dominan rote learning — hafalan
            tanpa pemahaman konseptual. Penelitian menunjukkan anak usia 5–7 tahun
            justru berada di periode emas untuk mengembangkan kemampuan observasi,
            prediksi, dan penalaran ilmiah dasar.
          </p>
        </section>

        {/* Inquiry cycle */}
        <section className="mb-10">
          <h2 className="mb-6 font-display text-xl font-bold text-gray-800">
            Siklus Berpikir Ilmiah
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INQUIRY_CYCLE.map((item, i) => (
              <div
                key={item.skill}
                className="rounded-2xl border bg-white p-5 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-xl">
                    {item.emoji}
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">Langkah {i + 1}</p>
                    <p className="font-display font-bold text-gray-800">{item.skill}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Kurikulum Merdeka */}
        <section className="mb-10 rounded-3xl bg-gradient-to-r from-primary/10 to-blue-50 p-8">
          <h2 className="font-display text-xl font-bold text-gray-800">
            Keselarasan Kurikulum Merdeka
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Profil Pelajar Pancasila — dimensi yang paling relevan:
          </p>
          <ul className="mt-4 space-y-3">
            {KURIKULUM_MAPPING.map((item) => (
              <li key={item.dimensi} className="flex gap-3 rounded-xl bg-white/80 p-4">
                <span className="font-display font-bold text-primary">{item.dimensi}</span>
                <span className="text-sm text-muted-foreground">→ {item.mapping}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Innovation claim */}
        <section className="mb-10 rounded-3xl border-2 border-primary/20 bg-white p-8 text-center">
          <p className="text-4xl" aria-hidden>🚀</p>
          <h2 className="mt-3 font-display text-xl font-bold text-gray-800">
            Inovasi INQUIS
          </h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Integrasi metodologi pembelajaran inkuiri dengan aktivitas matematika dan sains
            untuk anak usia 5–7 tahun dalam lingkungan digital interaktif yang secara eksplisit
            mem-scaffold pengembangan keterampilan berpikir ilmiah — dengan assessment
            Independence Index yang mengukur kemandirian berpikir.
          </p>
        </section>

        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild variant="default" size="lg">
            <Link href="/demo">🎮 Coba Mode Demo</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">← Beranda</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
