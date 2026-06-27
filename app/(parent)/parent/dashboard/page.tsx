/**
 * Parent dashboard placeholder
 */

import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard Orang Tua" };

export default function ParentDashboardPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Kemajuan Belajar Anak</h1>
      <p className="mt-2 text-muted-foreground">
        Parent dashboard — coming in a future module
      </p>
    </main>
  );
}
