/**
 * Shared login page — FND-008
 * Demo login integrated naturally (no separate demo page required).
 * Teachers, parents, and children can log in here.
 */

import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Masuk — INQUIS",
  description: "Masuk ke INQUIS untuk mulai belajar",
};

interface LoginPageProps {
  searchParams: Promise<{ redirect?: string; role?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-inquis-sky to-inquis-ocean shadow-xl shadow-inquis-sky/30">
            <span className="font-display text-3xl font-bold text-white">Q</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-gray-900">INQUIS</h1>
          <p className="mt-1 text-sm font-medium text-gray-500">
            Belajar Sains dengan Bermain
          </p>
        </div>

        {/* Login form with integrated demo */}
        <LoginForm redirectTo={params.redirect} defaultRole={params.role} />

        {/* Footer links */}
        <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400">
          <Link href="/" className="hover:text-primary hover:underline">← Beranda</Link>
          <Link href="/about" className="hover:text-primary hover:underline">Metode Inkuiri</Link>
          <span>INQUIS · LIDM 2026</span>
        </div>
      </div>
    </main>
  );
}
