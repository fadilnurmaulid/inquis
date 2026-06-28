"use client";

/**
 * DashboardEmpty — DASH-014
 * Empty state for new child with no progress.
 * Encouraging, child-friendly, action-oriented.
 */

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const ENCOURAGEMENTS = [
  { emoji: "👀", text: "Amati pola-pola seru" },
  { emoji: "🔮", text: "Buat prediksi ilmiah" },
  { emoji: "🔬", text: "Jelajahi seperti ilmuwan" },
  { emoji: "💡", text: "Temukan kesimpulanmu" },
];

export function DashboardEmpty() {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-6 rounded-3xl bg-white/70 p-8 text-center shadow-sm backdrop-blur-sm"
    >
      {/* Illustration */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="text-6xl"
        aria-hidden
      >
        🌱
      </motion.div>

      <div className="space-y-2">
        <h2 className="font-display text-2xl font-bold text-gray-800">
          Petualangan Menunggumu!
        </h2>
        <p className="text-gray-500 leading-relaxed">
          Ayo mulai dari Dunia 1 dan kembangkan{" "}
          <span className="font-semibold text-gray-700">berpikir ilmiahmu</span>{" "}
          bersama teman-teman baru!
        </p>
      </div>

      {/* What you'll learn */}
      <div className="grid grid-cols-2 gap-2 w-full">
        {ENCOURAGEMENTS.map((item) => (
          <div
            key={item.text}
            className="flex items-center gap-2 rounded-xl bg-primary/5 px-3 py-2.5 text-left"
          >
            <span className="text-xl" aria-hidden>
              {item.emoji}
            </span>
            <span className="text-xs font-semibold text-gray-700">
              {item.text}
            </span>
          </div>
        ))}
      </div>

      <Button
        variant="childPrimary"
        size="lg"
        onClick={() => router.push("/play/world/world-1")}
        className="px-10"
      >
        🚀 Mulai Petualangan
      </Button>

      <p className="text-xs text-gray-400">
        4 dunia · 20 aktivitas · Bersama karakter pendampingmu
      </p>
    </motion.div>
  );
}
