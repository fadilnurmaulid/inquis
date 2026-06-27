/**
 * Child home — World Map
 * Placeholder for the Dashboard/World Map feature module.
 */

import type { Metadata } from "next";

export const metadata: Metadata = { title: "Peta Dunia" };

export default function PlayHomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="font-display text-4xl font-bold text-inquis-ocean">
        🗺️ Peta Duniamu
      </h1>
      <p className="text-lg text-muted-foreground">
        World Map — coming in the Dashboard module
      </p>
    </main>
  );
}
