/**
 * Shared login page — FND-008
 * Teachers and parents use email/password.
 * Children use a simplified PIN flow (placeholder for now).
 */

import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Masuk — INQUIS",
  description: "Masuk ke INQUIS",
};

interface LoginPageProps {
  searchParams: Promise<{ redirect?: string; role?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 to-blue-100 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg">
            <span className="font-display text-3xl font-bold text-white">Q</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-gray-900">INQUIS</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Belajar Sains dengan Bermain
          </p>
        </div>

        {/* Login form */}
        <LoginForm redirectTo={params.redirect} defaultRole={params.role} />

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground">
          INQUIS — LIDM 2026 · Inovasi Pembelajaran Digital
        </p>
      </div>
    </main>
  );
}
