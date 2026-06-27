/**
 * Parent Dashboard — DASH-001
 * Properly wired placeholder showing child progress summary.
 */

import type { Metadata } from "next";
import { requireRole } from "@/lib/services/auth.service";
import { getParentProfile } from "@/lib/services/auth.service";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/shared/page-header";

export const metadata: Metadata = { title: "Dashboard Orang Tua" };
export const dynamic = "force-dynamic";

export default async function ParentDashboardPage() {
  const user = await requireRole(["PARENT", "ADMIN"]);
  const parent = await getParentProfile(user.id);

  const children = parent
    ? await prisma.child.findMany({
        where: { parents: { some: { parentId: parent.id } } },
        select: { id: true, displayName: true },
      })
    : [];

  return (
    <main className="p-6 lg:p-10">
      <PageHeader
        title={`Halo, ${parent?.name ?? "Orang Tua"}!`}
        description="Pantau kemajuan belajar anakmu di sini"
      />

      {children.length === 0 ? (
        <div className="mt-6 rounded-2xl border bg-white p-8 text-center text-muted-foreground shadow-sm">
          <p className="text-4xl">👧</p>
          <p className="mt-2 font-medium">Belum ada anak yang terhubung</p>
          <p className="text-sm">Minta guru untuk menghubungkan akun anakmu.</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {children.map((child) => (
            <div key={child.id} className="rounded-2xl border bg-white p-5 shadow-sm">
              <p className="font-display text-lg font-bold">{child.displayName}</p>
              <p className="text-sm text-muted-foreground">Detail kemajuan — modul Parent akan segera tersedia.</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
