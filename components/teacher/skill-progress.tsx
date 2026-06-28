"use client";

/**
 * SkillProgress + StudentSkillRow — teacher analytics components (FR-TP-006).
 * Visualises inquiry skill averages per class and per student.
 */

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const SKILLS = [
  { key: "observe",  label: "Amati",      emoji: "👀", colorClass: "bg-sky-400",    hex: "#38BDF8" },
  { key: "question", label: "Tanya",      emoji: "❓", colorClass: "bg-violet-400", hex: "#A78BFA" },
  { key: "predict",  label: "Prediksi",   emoji: "🔮", colorClass: "bg-amber-400",  hex: "#FBBF24" },
  { key: "explore",  label: "Jelajahi",   emoji: "🔬", colorClass: "bg-emerald-400",hex: "#34D399" },
  { key: "conclude", label: "Simpulkan",  emoji: "💡", colorClass: "bg-rose-400",   hex: "#F87171" },
] as const;

export interface SkillAverages {
  observe:  number;
  question: number;
  predict:  number;
  explore:  number;
  conclude: number;
}

interface SkillProgressProps {
  averages: SkillAverages;
  title?: string;
  compact?: boolean;
}

export function SkillProgress({
  averages,
  title = "Keterampilan Inkuiri",
  compact = false,
}: SkillProgressProps) {
  return (
    <section
      className={cn("rounded-2xl border bg-white shadow-sm", compact ? "p-4" : "p-5")}
      aria-label={title}
    >
      <h3 className={cn("font-display font-bold text-gray-800", compact ? "text-sm" : "text-base")}>
        {title}
      </h3>

      <div className={cn("mt-4 space-y-3", compact && "mt-3 space-y-2")}>
        {SKILLS.map((skill, i) => {
          const value = averages[skill.key as keyof SkillAverages] ?? 0;
          const pct = Math.min(100, Math.max(0, value));
          const level = pct >= 75 ? "Mahir" : pct >= 50 ? "Berkembang" : pct >= 25 ? "Mulai" : "Belum mulai";

          return (
            <div key={skill.key}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-gray-700 font-medium">
                  <span aria-hidden>{skill.emoji}</span>
                  {skill.label}
                </span>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-[10px] font-semibold px-1.5 py-0.5 rounded-full",
                    pct >= 75 ? "bg-emerald-100 text-emerald-700"
                      : pct >= 50 ? "bg-blue-100 text-blue-700"
                      : pct >= 25 ? "bg-amber-100 text-amber-700"
                      : "bg-gray-100 text-gray-500"
                  )}>
                    {level}
                  </span>
                  <span className="font-semibold text-gray-800 w-7 text-right">
                    {Math.round(value)}
                  </span>
                </div>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                <motion.div
                  className={cn("h-full rounded-full", skill.colorClass)}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

interface StudentSkillRowProps {
  name: string;
  completedActivities: number;
  independenceAvg: number;
}

export function StudentSkillRow({
  name,
  completedActivities,
  independenceAvg,
}: StudentSkillRowProps) {
  const pct = Math.round(independenceAvg * 100);
  const level = pct >= 80 ? "Sangat Mandiri" : pct >= 60 ? "Mandiri" : pct >= 40 ? "Berkembang" : "Mulai";

  return (
    <div className="flex items-center justify-between rounded-xl border-2 border-gray-100 bg-gray-50 px-4 py-3 transition-colors hover:border-primary/20 hover:bg-primary/5">
      <div className="flex items-center gap-3">
        {/* Avatar initial */}
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 font-display text-sm font-bold text-primary">
          {name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-gray-800">{name}</p>
          <p className="text-xs text-muted-foreground">
            {completedActivities} aktivitas selesai
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-display text-xl font-bold text-primary">{pct}%</p>
        <p className="text-[10px] font-semibold text-muted-foreground">{level}</p>
      </div>
    </div>
  );
}
