"use client";

/**
 * SkillProgress — inquiry skill visualization for teacher dashboard (FR-TP-006).
 */

import { cn } from "@/lib/utils";

const SKILLS = [
  { key: "observe", label: "Amati", emoji: "👀", color: "bg-sky-400" },
  { key: "question", label: "Tanya", emoji: "❓", color: "bg-violet-400" },
  { key: "predict", label: "Prediksi", emoji: "🔮", color: "bg-amber-400" },
  { key: "explore", label: "Jelajahi", emoji: "🔬", color: "bg-emerald-400" },
  { key: "conclude", label: "Kesimpulan", emoji: "💡", color: "bg-rose-400" },
] as const;

export interface SkillAverages {
  observe: number;
  question: number;
  predict: number;
  explore: number;
  conclude: number;
}

interface SkillProgressProps {
  averages: SkillAverages;
  title?: string;
  compact?: boolean;
}

export function SkillProgress({ averages, title = "Keterampilan Inkuiri", compact = false }: SkillProgressProps) {
  return (
    <section className={cn("rounded-2xl border bg-white p-5 shadow-sm", compact && "p-4")}>
      <h3 className={cn("font-display font-bold text-gray-800", compact ? "text-sm" : "text-base")}>
        {title}
      </h3>
      <div className={cn("mt-4 space-y-3", compact && "mt-3 space-y-2")}>
        {SKILLS.map((skill) => {
          const value = averages[skill.key as keyof SkillAverages] ?? 0;
          return (
            <div key={skill.key}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-gray-700">
                  <span aria-hidden>{skill.emoji}</span>
                  {skill.label}
                </span>
                <span className="font-semibold text-gray-800">{Math.round(value)}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className={cn("h-full rounded-full transition-all duration-500", skill.color)}
                  style={{ width: `${Math.min(100, value)}%` }}
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

export function StudentSkillRow({ name, completedActivities, independenceAvg }: StudentSkillRowProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border bg-gray-50 px-4 py-3">
      <div>
        <p className="font-medium text-gray-800">{name}</p>
        <p className="text-xs text-muted-foreground">{completedActivities} aktivitas selesai</p>
      </div>
      <div className="text-right">
        <p className="font-display text-lg font-bold text-primary">
          {Math.round(independenceAvg * 100)}%
        </p>
        <p className="text-xs text-muted-foreground">Kemandirian</p>
      </div>
    </div>
  );
}
