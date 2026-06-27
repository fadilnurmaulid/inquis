/**
 * World entry page — /play/world/[worldId]
 * Placeholder for the World 1–4 activity modules.
 * Validates worldId and enforces lock status before rendering.
 */

import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { requireRole } from "@/lib/services/auth.service";
import { prisma } from "@/lib/prisma";
import { WORLDS } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PageProps {
  params: Promise<{ worldId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { worldId } = await params;
  const world = WORLDS.find((w) => w.id === worldId);
  return { title: world?.titleBahasa ?? "Dunia" };
}

export default async function WorldPage({ params }: PageProps) {
  const { worldId } = await params;
  const world = WORLDS.find((w) => w.id === worldId);
  if (!world) notFound();

  const user = await requireRole(["CHILD"]);

  // Fetch child and check lock status
  const child = await prisma.child.findFirst({
    where: { user: { id: user.id } },
    select: { id: true },
  });
  if (!child) redirect("/play/home");

  const progress = await prisma.worldProgress.findUnique({
    where: { childId_worldId: { childId: child.id, worldId } },
    select: { status: true },
  });

  // Enforce lock rule (BR-LF-002)
  if (!progress || progress.status === "LOCKED") {
    redirect("/play/home");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <div
        className="flex h-24 w-24 items-center justify-center rounded-3xl shadow-xl"
        style={{ background: world.themeColor }}
      >
        <span className="font-display text-4xl font-bold text-white">{world.number}</span>
      </div>

      <div className="space-y-2">
        <h1 className="font-display text-3xl font-bold text-gray-800">{world.titleBahasa}</h1>
        <p className="text-gray-500">{world.description}</p>
      </div>

      <p className="text-sm text-muted-foreground">
        Aktivitas untuk dunia ini akan tersedia di modul World {world.number}.
      </p>

      <Button asChild variant="outline">
        <Link href="/play/home">← Kembali ke Peta</Link>
      </Button>
    </main>
  );
}
