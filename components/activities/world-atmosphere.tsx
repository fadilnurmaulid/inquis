"use client";

/**
 * World atmosphere backgrounds — gives each world a distinct visual identity
 * beyond a color swap. Purely decorative, fixed/absolute positioned behind
 * gameplay content, low-opacity so it never competes with the activity
 * itself. No interaction, no layout impact — safe to add without touching
 * any gameplay logic.
 */

import { motion } from "framer-motion";

interface WorldAtmosphereProps {
  worldId: string;
}

// World 1 — Pattern Explorer: soft floating leaves drifting, breezy/natural
function AtmosphereWorld1() {
  const leaves = [
    { left: "8%", size: 22, delay: 0, duration: 14 },
    { left: "22%", size: 16, delay: 2.5, duration: 18 },
    { left: "68%", size: 20, delay: 1, duration: 16 },
    { left: "85%", size: 14, delay: 4, duration: 20 },
    { left: "45%", size: 18, delay: 3, duration: 15 },
  ];
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50 via-emerald-50/40 to-white" />
      {leaves.map((leaf, i) => (
        <motion.div
          key={i}
          className="absolute text-emerald-300/40"
          style={{ left: leaf.left, top: "-40px", fontSize: leaf.size }}
          animate={{ y: ["0vh", "110vh"], rotate: [0, 180, 360] }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          aria-hidden
        >
          🍃
        </motion.div>
      ))}
    </div>
  );
}

// World 2 — Sorting Explorer: gentle horizontal rhythm, grounded/orderly
function AtmosphereWorld2() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50 via-green-50/50 to-white" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-emerald-100/50 to-transparent" />
      {/* Subtle repeating dot rhythm evokes "sorting into rows" */}
      <div
        className="absolute inset-x-0 bottom-8 h-24 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #4ECB71 2px, transparent 2px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />
    </div>
  );
}

// World 3 — Prediction Explorer: sky atmosphere, drifting clouds, anticipatory
function AtmosphereWorld3() {
  const clouds = [
    { top: "8%", left: "-10%", size: 90, duration: 40, opacity: 0.5 },
    { top: "18%", left: "60%", size: 70, duration: 55, opacity: 0.4 },
    { top: "4%", left: "35%", size: 55, duration: 48, opacity: 0.35 },
  ];
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50 via-sky-50/60 to-white" />
      {clouds.map((c, i) => (
        <motion.div
          key={i}
          className="absolute text-sky-200/60"
          style={{ top: c.top, left: c.left, fontSize: c.size, opacity: c.opacity }}
          animate={{ x: ["0vw", "130vw"] }}
          transition={{ duration: c.duration, repeat: Infinity, ease: "linear" }}
          aria-hidden
        >
          ☁️
        </motion.div>
      ))}
    </div>
  );
}

// World 4 — Little Scientist: focused lab atmosphere, subtle sparkle, purposeful
function AtmosphereWorld4() {
  const sparkles = [
    { top: "12%", left: "10%", delay: 0 },
    { top: "70%", left: "85%", delay: 1.2 },
    { top: "30%", left: "90%", delay: 2.4 },
    { top: "85%", left: "15%", delay: 0.6 },
    { top: "50%", left: "5%", delay: 1.8 },
  ];
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-50 via-indigo-50/40 to-white" />
      {sparkles.map((s, i) => (
        <motion.div
          key={i}
          className="absolute text-violet-300/50"
          style={{ top: s.top, left: s.left }}
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.1, 0.8] }}
          transition={{
            duration: 2.4,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
}

const ATMOSPHERE_BY_WORLD: Record<string, React.ComponentType> = {
  "world-1": AtmosphereWorld1,
  "world-2": AtmosphereWorld2,
  "world-3": AtmosphereWorld3,
  "world-4": AtmosphereWorld4,
};

export function WorldAtmosphere({ worldId }: WorldAtmosphereProps) {
  const Atmosphere = ATMOSPHERE_BY_WORLD[worldId];
  if (!Atmosphere) return null;
  return <Atmosphere />;
}
