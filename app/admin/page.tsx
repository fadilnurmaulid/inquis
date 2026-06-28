/**
 * Admin dashboard — /admin
 * Coming soon placeholder for admin routes (product-vision.md).
 */

import type { Metadata } from "next";
import Link from "next/link";
import { requireRole, logout } from "@/lib/services/auth.service";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Panel Admin" };
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  await requireRole(["ADMIN"]);

  return (
    <main className="flex min-h-screen flex-col bg-gray-50 p-6 lg:p-10">
      <div className="mb-6 flex items-start justify-between gap-4">
        <PageHeader
          title="Panel Admin"
          description="Kelola konten dan analitik platform INQUIS"
        />
        <form action={logout}>
          <Button type="submit" variant="outline" size="sm">
            Keluar
          </Button>
        </form>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-6 rounded-2xl border bg-white p-10 text-center shadow-sm">
        <p className="text-5xl" aria-hidden>⚙️</p>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Segera Hadir</h2>
          <p className="max-w-md text-muted-foreground">
            Modul admin untuk manajemen konten, analitik, dan pengguna akan
            tersedia di pembaruan berikutnya.
          </p>
        </div>
        <ul className="text-left text-sm text-muted-foreground">
          <li>📊 /admin/analytics — Analitik platform</li>
          <li>📝 /admin/content — Manajemen konten</li>
        </ul>
        <Button asChild variant="outline">
          <Link href="/">← Kembali ke Beranda</Link>
        </Button>
      </div>
    </main>
  );
}
