import type { SpecimenId } from "@/components/illustrations/specimens";

/**
 * Shared TypeScript types for INQUIS
 * These are the domain types consumed across all modules.
 */

export type UserRole = "CHILD" | "ADMIN";

export type WorldStatus = "LOCKED" | "UNLOCKED" | "IN_PROGRESS" | "COMPLETED";

export type ActivityStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export type ScaffoldLevel = "NONE" | "HINT_1" | "HINT_2" | "HINT_3" | "ANSWER_REVEAL";

// Scientific thinking skills from learning-framework.md
export type ScientificSkill = "observe" | "question" | "predict" | "explore" | "conclude";

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}

export interface ChildProfile {
  id: string;
  name: string;
  displayName: string;
  avatarUrl?: string | null;
}

export interface WorldProgressData {
  worldId: string;
  worldNumber: number;
  status: WorldStatus;
  completedActivities: number;
  totalActivities: number;
}

export interface ActivitySessionData {
  id: string;
  activityId: string;
  worldId: string;
  status: ActivityStatus;
  scaffoldLevel: ScaffoldLevel;
  reflectionCompleted: boolean;
  durationSeconds?: number | null;
}

export interface AssessmentData {
  observeScore: number;
  questionScore: number;
  predictScore: number;
  exploreScore: number;
  concludeScore: number;
  independenceIndex: number;
}

// World definitions — matched to learning-framework.md
export interface WorldDefinition {
  id: string;
  number: number;
  title: string;
  titleBahasa: string;
  description: string;
  primarySkill: ScientificSkill;
  secondarySkills: ScientificSkill[];
  activityCount: number;
  companionName: string;
  /** Wajah pendamping dunia — id spesimen, bukan emoji. */
  companionSpecimen: SpecimenId;
  themeColor: string;
}

export const WORLDS: WorldDefinition[] = [
  {
    id: "world-1",
    number: 1,
    title: "Pattern Explorer",
    titleBahasa: "Penjelajah Pola Alam",
    description: "Cari bagian yang berulang pada daun, bunga, dan jejak.",
    primarySkill: "observe",
    secondarySkills: ["predict"],
    activityCount: 5,
    companionName: "Kupi",
    companionSpecimen: "kupu-kupu",
    themeColor: "#3E8B54",
  },
  {
    id: "world-2",
    number: 2,
    title: "Sorting Explorer",
    titleBahasa: "Penjelajah Pemilahan",
    description: "Kelompokkan sampah dan makhluk hidup dengan satu aturan yang jelas.",
    primarySkill: "observe",
    secondarySkills: ["question", "explore"],
    activityCount: 5,
    companionName: "Kura",
    companionSpecimen: "kura-kura",
    themeColor: "#2F7FA6",
  },
  {
    id: "world-3",
    number: 3,
    title: "Prediction Explorer",
    titleBahasa: "Penjelajah Prediksi Alam",
    description: "Ubah satu hal, amati akibatnya, lalu tebak yang belum dicoba.",
    primarySkill: "predict",
    secondarySkills: ["question", "explore"],
    activityCount: 5,
    companionName: "Ciap",
    companionSpecimen: "burung",
    themeColor: "#D9922E",
  },
  {
    id: "world-4",
    number: 4,
    title: "Little Scientist",
    titleBahasa: "Ilmuwan Cilik Peduli Bumi",
    description: "Takar bahan, timbang, dan buat kompos sungguhan.",
    primarySkill: "conclude",
    secondarySkills: ["observe", "question", "predict", "explore"],
    activityCount: 5,
    companionName: "Lebi",
    companionSpecimen: "lebah",
    themeColor: "#6B5DD3",
  },
];
