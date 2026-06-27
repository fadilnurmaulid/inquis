/**
 * Teacher Dashboard placeholder
 * Implemented fully in the teacher-panel module.
 */

import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard Guru" };

export default function TeacherDashboardPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Dashboard Guru</h1>
      <p className="mt-2 text-muted-foreground">
        Teacher dashboard — coming in the teacher-panel module
      </p>
    </main>
  );
}
