/**
 * Pedagogy explainer — FR-LIDM-003
 * For LIDM judges: explains the inquiry learning approach, Kurikulum Merdeka
 * alignment, and the innovation claim. Accessible from all roles.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Metode Inkuiri",
  description:
    "Bagaimana INQUIS mengembangkan berpikir ilmiah dan kepedulian lingkungan pada anak usia 5–7 tahun melalui inkuiri sains",
};

const INQUIRY_CYCLE = [
  { emoji: "👀", skill: "Amati",       step: 1, desc: "Mengamati pola, perbedaan, dan kemiripan pada alam sekitar", world: "Dunia 1–2" },
  { emoji: "❓", skill: "Tanya",       step: 2, desc: "Merumuskan pertanyaan tentang lingkungan dari hasil pengamatan sendiri", world: "Dunia 1–2" },
  { emoji: "🔮", skill: "Prediksi",    step: 3, desc: "Menebak apa yang akan terjadi pada tanaman, hewan, atau lingkungan berdasarkan bukti", world: "Dunia 3"   },
  { emoji: "🔬", skill: "Jelajahi",    step: 4, desc: "Menguji prediksi melalui interaksi langsung dengan objek belajar",world: "Dunia 2–4" },
  { emoji: "💡", skill: "Simpulkan",   step: 5, desc: "Menarik kesimpulan ilmiah dan langkah nyata untuk menjaga alam", world: "Dunia 4"   },
];

const WORLDS_OVERVIEW = [
  { emoji: "🦋", name: "Penjelajah Pola Alam",         desc: "Observasi & pengenalan pola pada daun, bunga, dan alam", color: "#60B8FF" },
  { emoji: "🐢", name: "Penjelajah Pemilahan",         desc: "Klasifikasi sampah, makhluk hidup, dan habitat hewan",   color: "#4ECB71" },
  { emoji: "🔮", name: "Penjelajah Prediksi Alam",     desc: "Hipotesis & prediksi berbasis sebab-akibat di alam",     color: "#FFD166" },
  { emoji: "🧪", name: "Ilmuwan Cilik Peduli Bumi",    desc: "Integrasi seluruh siklus inkuiri untuk menjaga lingkungan", color: "#9B8EFF" },
];

const KURIKULUM_MAPPING = [
  { dimensi: "Bernalar Kritis", icon: "🧠", mapping: "Siklus inkuiri 5 langkah di setiap aktivitas, anak didorong menyimpulkan sendiri" },
  { dimensi: "Mandiri",         icon: "💪", mapping: "Scaffolding progresif: petunjuk diberikan hanya saat diminta, anak mengendalikan proses" },
  { dimensi: "Kreatif",         icon: "✨", mapping: "Fase eksplorasi bebas sebelum tantangan formal, mendorong kreativitas solusi" },
  { dimensi: "Gotong Royong",   icon: "🤝", mapping: "Dirancang untuk mendukung pembelajaran kolaboratif dalam konteks kelas" },
  { dimensi: "Peduli Lingkungan", icon: "🌱", mapping: "Konten aktivitas dan kartu refleksi menanamkan kebiasaan menjaga alam sejak dini" },
];

const INNOVATION_TECH = [
  "Next.js 15 (App Router)", "TypeScript", "Supabase Auth + DB",
  "Prisma ORM", "Framer Motion", "Vercel Edge",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <div className="mx-auto max-w-3xl px-6 py-14">
        {/* Back */}
        <Link
          href="/"
          className="mb-8 inline-flex min-h-[40px] items-center gap-1.5 rounded-lg px-2 -ml-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-gray-100/70 hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Beranda
        </Link>

        {/* Hero */}
        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary mb-3">
            Metode Pembelajaran · LIDM 2026
          </p>
          <h1 className="font-display text-4xl font-bold text-gray-900 leading-tight">
            Inkuiri Ilmiah untuk Anak Peduli Lingkungan
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
            INQUIS bukan worksheet digital, platform ini merancang{" "}
            <strong className="text-gray-800">siklus berpikir ilmiah</strong>{" "}
            melalui eksplorasi alam yang menyenangkan dan terstruktur, sekaligus menumbuhkan
            kepedulian anak terhadap lingkungan sejak dini.
          </p>
        </div>

        {/* Problem statement */}
        <section className="mb-10 rounded-3xl bg-white p-8 shadow-sm border">
          <h2 className="font-display text-xl font-bold text-gray-800 mb-3">
            🔍 Masalah yang Diatasi
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Pendidikan anak usia dini di Indonesia masih dominan{" "}
            <em>rote learning</em>, hafalan tanpa pemahaman konseptual, dan kepedulian
            lingkungan jarang ditanamkan sejak usia dini. Penelitian menunjukkan anak usia
            5–7 tahun berada pada{" "}
            <strong className="text-gray-800">periode emas</strong> untuk mengembangkan
            kemampuan observasi, prediksi, dan penalaran ilmiah dasar (Piaget, 1952;
            Kurikulum Merdeka, 2022). INQUIS hadir sebagai solusi digital yang mengisi
            kesenjangan ini, sekaligus menanamkan kesadaran lingkungan melalui konteks
            belajar sehari-hari.
          </p>
        </section>

        {/* 4 Worlds Overview */}
        <section className="mb-10">
          <h2 className="font-display text-xl font-bold text-gray-800 mb-5">
            🗺️ 4 Dunia Belajar
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {WORLDS_OVERVIEW.map((w, i) => (
              <div
                key={w.name}
                className="flex items-center gap-3 rounded-2xl border bg-white p-4 shadow-sm"
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl shadow-sm"
                  style={{ background: `${w.color}33` }}
                  aria-hidden
                >
                  {w.emoji}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-400">Dunia {i + 1}</span>
                  </div>
                  <p className="font-display font-bold text-gray-800 text-sm">{w.name}</p>
                  <p className="text-xs text-muted-foreground">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Inquiry cycle */}
        <section className="mb-10">
          <h2 className="font-display text-xl font-bold text-gray-800 mb-5">
            🔬 Siklus Berpikir Ilmiah INQUIS
          </h2>
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-5 top-6 h-[calc(100%-48px)] w-0.5 bg-gradient-to-b from-primary/40 to-transparent" aria-hidden />
            <div className="space-y-3">
              {INQUIRY_CYCLE.map((item) => (
                <div key={item.skill} className="flex gap-4">
                  {/* Step bubble */}
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl z-10">
                      {item.emoji}
                    </div>
                  </div>
                  <div className="flex-1 rounded-2xl border bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-display font-bold text-gray-800">{item.skill}</p>
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-500">
                        Langkah {item.step} · {item.world}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Kurikulum Merdeka */}
        <section className="mb-10 rounded-3xl bg-gradient-to-r from-primary/10 to-blue-50 p-8">
          <h2 className="font-display text-xl font-bold text-gray-800 mb-2">
            📚 Keselarasan Kurikulum Merdeka
          </h2>
          <p className="text-sm text-muted-foreground mb-5">
            Profil Pelajar Pancasila, dimensi yang paling relevan dengan INQUIS:
          </p>
          <div className="space-y-3">
            {KURIKULUM_MAPPING.map((item) => (
              <div key={item.dimensi} className="flex gap-3 rounded-xl bg-white/80 p-4 shadow-sm">
                <span className="text-xl shrink-0" aria-hidden>{item.icon}</span>
                <div>
                  <span className="font-display font-bold text-primary">{item.dimensi}</span>
                  <p className="text-sm text-muted-foreground mt-0.5">{item.mapping}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Innovation claim */}
        <section className="mb-10 rounded-3xl border-2 border-primary/20 bg-white p-8 text-center shadow-sm">
          <div className="text-5xl mb-4" aria-hidden>🚀</div>
          <h2 className="font-display text-xl font-bold text-gray-800 mb-3">
            Inovasi INQUIS
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto mb-5">
            Integrasi metodologi pembelajaran inkuiri dengan aktivitas sains dan
            matematika bertema lingkungan untuk anak usia 5–7 tahun, dalam
            pengalaman digital interaktif yang secara eksplisit mem-<em>scaffold</em>{" "}
            pengembangan keterampilan berpikir ilmiah sekaligus kepedulian terhadap
            alam, dilengkapi{" "}
            <strong className="text-gray-800">Independence Index</strong> yang mengukur
            kemandirian berpikir setiap anak secara individual.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {INNOVATION_TECH.map((t) => (
              <span
                key={t}
                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* CTAs */}
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
