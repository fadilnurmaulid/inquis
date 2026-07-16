/**
 * Aktivitas mode demo — /demo/main/[activityId]
 *
 * Mesin yang sama persis dengan mode main. Bedanya satu baris:
 * `simpan={null}`. Tidak ada basis data yang disentuh, tidak ada sesi
 * yang dibuat, tidak ada yang tersimpan. Muat ulang halaman dan
 * semuanya kembali dari nol — memang begitu yang diminta dari demo.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { aktivitasDunia, getAktivitas } from "@/lib/game/content";
import { WORLDS } from "@/types";
import { Mesin } from "@/components/game/mesin";
import { LatarAlam } from "@/components/shared/latar-alam";

interface PageProps {
  params: Promise<{ activityId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { activityId } = await params;
  const a = getAktivitas(activityId);
  return { title: a ? `${a.judul} · Coba dulu` : "Coba dulu" };
}

export default async function DemoActivityPage({ params }: PageProps) {
  const { activityId } = await params;
  const a = getAktivitas(activityId);
  if (!a) notFound();

  const world = WORLDS.find((w) => w.id === a.worldId);
  if (!world) notFound();

  const daftar = aktivitasDunia(a.worldId);
  const lanjut = daftar.find((x) => x.nomor === a.nomor + 1);

  return (
    <>
      <LatarAlam ragam="tenang" />
      <main className="min-h-screen pb-10">
        {/* Pita penanda: supaya tidak ada yang mengira kemajuannya tersimpan. */}
        <div className="border-b-2 border-matahari/30 bg-matahari-lo/40">
          <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 px-4 py-2 sm:px-6">
            <p className="label-spesimen text-tanah-hi">Mode coba · tidak tersimpan</p>
            <Link
              href="/demo/peta"
              className="inline-flex items-center gap-1 font-display text-mikro font-bold text-tanah-hi underline-offset-2 hover:underline"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              Daftar aktivitas
            </Link>
          </div>
        </div>

        <Mesin
          aktivitas={a}
          namaDunia={world.titleBahasa}
          warna={world.themeColor}
          teman={{ nama: world.companionName, spesimen: world.companionSpecimen }}
          simpan={null}
          jalanKembali="/demo/peta"
          basisAktivitas="/demo/main"
          berikutnya={lanjut ? { id: lanjut.id, judul: lanjut.judul } : null}
        />
      </main>
    </>
  );
}
