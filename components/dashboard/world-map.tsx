/**
 * WorldMap — DASH-003
 * Displays all four learning worlds with progress, lock state, and navigation.
 * Sequential unlock enforced visually (BR-LF-002, BR-DASH-002).
 */

"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { WorldCard } from "./world-card";
import type { WorldProgressSummary, ActivitySummary } from "@/lib/services/dashboard.service";

interface WorldMapProps {
  worlds: WorldProgressSummary[];
  nextRecommended: ActivitySummary | null;
  activeSession: ActivitySummary | null;
}

export function WorldMap({ worlds, nextRecommended, activeSession }: WorldMapProps) {
  const router = useRouter();

  function handleWorldClick(worldId: string) {
    router.push(`/play/world/${worldId}`);
  }

  // Which world should be highlighted as recommended
  const recommendedWorldId =
    activeSession?.worldId ?? nextRecommended?.worldId ?? null;

  return (
    <section aria-label="Peta Dunia Belajar" className="w-full">
      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {worlds.map((world) => (
          <motion.div
            key={world.worldId}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 20 } },
            }}
          >
            <WorldCard
              world={world}
              isRecommended={world.worldId === recommendedWorldId}
              onClick={() => handleWorldClick(world.worldId)}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
