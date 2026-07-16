/**
 * Halaman masuk — /login
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";
import { LatarAlam } from "@/components/shared/latar-alam";
import { Logo } from "@/components/brand/logo";

export const metadata: Metadata = {
  title: "Masuk",
  description: "Masuk untuk melanjutkan jurnal lapanganmu.",
};

interface PageProps {
  searchParams: Promise<{ redirect?: string }>;
}

export default async function LoginPage({ searchParams }: PageProps) {
  const { redirect } = await searchParams;

  return (
    <>
      <LatarAlam />
      <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 py-6 sm:px-6">
        <div className="mb-8 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="target-sentuh inline-flex items-center gap-1.5 rounded-full border-2 border-kertas-deep bg-kertas-lo px-3.5 font-display text-kecil font-bold text-tinta-mid shadow-tile transition-all duration-cepat ease-pegas hover:-translate-y-0.5 hover:border-tinta-faint active:translate-y-0.5 active:shadow-tekan"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Kembali
          </Link>
          <Logo size={30} />
        </div>

        <div className="mb-6 flex flex-col gap-1.5">
          <h1 className="font-display text-pekik font-extrabold text-tinta">Selamat datang lagi</h1>
          <p className="text-badan leading-relaxed text-tinta-mid">
            Masuk untuk melanjutkan dari tempat terakhirmu.
          </p>
        </div>

        <div className="rounded-kartu border-2 border-kertas-deep bg-kertas-lo/80 p-5 shadow-kertas">
          <LoginForm redirectTo={redirect} />
        </div>

        <p className="mt-5 text-center text-kecil text-tinta-mid">
          Belum punya akun?{" "}
          <Link href="/demo" className="font-semibold text-daun-hi underline underline-offset-2">
            Coba dulu tanpa masuk
          </Link>
          .
        </p>
      </main>
    </>
  );
}
