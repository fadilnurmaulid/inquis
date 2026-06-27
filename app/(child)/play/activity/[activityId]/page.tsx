/**
 * Activity page — /play/activity/[activityId]
 * Placeholder for the Activity Engine (implemented per-world spec).
 */

import type { Metadata } from "next";
import { requireRole } from "@/lib/services/auth.service";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PageProps {
  params: Promise<{ activityId: string }>;
}

export const metadata: Metadata = { title: "Aktivitas" };

export default async function ActivityPage({ params }: PageProps) {
  const { activityId } = await params;
  await requireRole(["CHILD"]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <span className="text-6xl" aria-hidden>🔬</span>
      <div className="space-y-2">
        <h1 className="font-display text-2xl font-bold text-gray-800">
          Aktivitas: {activityId}
        </h1>
        <p className="text-gray-500">
          Activity Engine akan diimplementasi di modul World masing-masing.
        </p>
      </div>
      <Button asChild variant="outline">
        <Link href="/play/home">← Kembali ke Peta</Link>
      </Button>
    </main>
  );
}
