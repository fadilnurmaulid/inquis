/**
 * Child Profile page — /play/profile
 * Placeholder profile view. Full implementation in onboarding/profile module.
 * Referenced by ChildNav (FR-DASH-007 — navigation consistency).
 */

import type { Metadata } from "next";
import { requireRole } from "@/lib/services/auth.service";
import { getChildProfile } from "@/lib/services/auth.service";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { logout } from "@/lib/services/auth.service";

export const metadata: Metadata = { title: "Profilku" };

export default async function ChildProfilePage() {
  const user = await requireRole(["CHILD"]);
  const child = await getChildProfile(user.id);

  return (
    <main className="flex min-h-screen flex-col items-center gap-6 px-4 pb-24 pt-12 text-center">
      {/* Avatar placeholder */}
      <div
        className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-inquis-sky shadow-xl"
        aria-hidden
      >
        <span className="text-4xl">🧒</span>
      </div>

      <div className="space-y-1">
        <h1 className="font-display text-2xl font-bold text-gray-800">
          {child?.displayName ?? "Pelajar INQUIS"}
        </h1>
        <p className="text-sm text-gray-500">{child?.name}</p>
      </div>

      <p className="max-w-xs text-sm text-muted-foreground">
        Pengaturan profil lengkap akan tersedia di pembaruan berikutnya. 🚀
      </p>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Button asChild variant="outline" size="lg">
          <Link href="/play/home">← Kembali ke Peta</Link>
        </Button>
        <form action={logout}>
          <Button
            type="submit"
            variant="ghost"
            size="lg"
            className="w-full text-destructive hover:text-destructive"
          >
            Keluar
          </Button>
        </form>
      </div>
    </main>
  );
}
