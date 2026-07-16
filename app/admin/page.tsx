/**
 * Panel admin — /admin
 *
 * Pintu operasional, bukan bagian dari pengalaman anak. Tidak ditautkan
 * dari mana pun di antarmuka publik dan hanya bisa dibuka oleh peran
 * ADMIN. Isinya sengaja sedikit: yang ada di sini benar-benar ada,
 * tidak ada janji fitur yang belum dikerjakan.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireRole, logout } from "@/lib/services/auth.service";
import { Logo } from "@/components/brand/logo";
import { SEMUA_AKTIVITAS } from "@/lib/game/content";
import { WORLDS } from "@/types";

export const metadata: Metadata = { title: "Panel Admin" };
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  await requireRole(["ADMIN"]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col px-4 py-6 sm:px-6">
      <header className="mb-8 flex items-center justify-between gap-3">
        <Logo size={30} />
        <form action={logout}>
          <button
            type="submit"
            className="target-sentuh inline-flex items-center rounded-full border-2 border-kertas-deep bg-kertas-lo px-4 font-display text-kecil font-bold text-tinta-mid shadow-tile transition-all duration-cepat ease-pegas hover:-translate-y-0.5 hover:border-tinta-faint active:translate-y-0.5 active:shadow-tekan"
          >
            Keluar
          </button>
        </form>
      </header>

      <div className="mb-6 flex flex-col gap-1.5">
        <p className="label-spesimen text-tinta-soft">Operasional</p>
        <h1 className="font-display text-pekik font-extrabold text-tinta">Panel admin</h1>
      </div>

      <section className="kartu-kertas mb-4 p-5">
        <p className="label-spesimen mb-3 text-tinta-soft">Isi yang terpasang</p>
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            { k: "Dunia", v: WORLDS.length },
            { k: "Aktivitas", v: SEMUA_AKTIVITAS.length },
            { k: "Jenis permainan", v: new Set(SEMUA_AKTIVITAS.map((a) => a.tantangan.kind)).size },
          ].map((x) => (
            <div key={x.k} className="rounded-tile border-2 border-kertas-deep bg-kertas p-3">
              <dt className="label-spesimen text-tinta-faint">{x.k}</dt>
              <dd className="font-label text-judul font-bold tabular-nums text-tinta">{x.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="mb-6 text-kecil leading-relaxed text-tinta-mid">
        Konten pembelajaran disimpan sebagai data di <code className="rounded bg-kertas-hi px-1.5 py-0.5 font-label text-mikro">lib/game/content.ts</code>,
        bukan di basis data. Menambah atau mengubah aktivitas dilakukan lewat berkas itu, dan uji di{" "}
        <code className="rounded bg-kertas-hi px-1.5 py-0.5 font-label text-mikro">tests/unit/game-content.test.ts</code>{" "}
        akan menolak aktivitas yang tahapnya tidak lengkap.
      </p>

      <Link
        href="/"
        className="target-sentuh inline-flex w-fit items-center gap-1.5 rounded-full border-2 border-kertas-deep bg-kertas-lo px-4 font-display text-kecil font-bold text-tinta-mid shadow-tile transition-all duration-cepat ease-pegas hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-tekan"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Kembali ke beranda
      </Link>
    </main>
  );
}
