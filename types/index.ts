/**
 * Shared TypeScript types for INQUIS
 * These are the domain types consumed across all modules.
 */

export type UserRole = "CHILD" | "TEACHER" | "PARENT" | "ADMIN";

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

export interface TeacherProfile {
  id: string;
  name: string;
  school?: string | null;
}

export interface ParentProfile {
  id: string;
  name: string;
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
  themeColor: string;
}

export const WORLDS: WorldDefinition[] = [
  {
    id: "world-1",
    number: 1,
    title: "Pattern Explorer",
    titleBahasa: "Penjelajah Pola",
    description: "Discover patterns and predict what comes next",
    primarySkill: "observe",
    secondarySkills: ["predict"],
    activityCount: 5,
    companionName: "Pola",
    themeColor: "#60B8FF",
  },
  {
    id: "world-2",
    number: 2,
    title: "Sorting Explorer",
    titleBahasa: "Penjelajah Pengurutan",
    description: "Sort and classify objects by their attributes",
    primarySkill: "observe",
    secondarySkills: ["question", "explore"],
    activityCount: 5,
    companionName: "Sori",
    themeColor: "#4ECB71",
  },
  {
    id: "world-3",
    number: 3,
    title: "Prediction Explorer",
    titleBahasa: "Penjelajah Prediksi",
    description: "Predict what will happen and test your ideas",
    primarySkill: "predict",
    secondarySkills: ["question", "explore"],
    activityCount: 5,
    companionName: "Predik",
    themeColor: "#FFD166",
  },
  {
    id: "world-4",
    number: 4,
    title: "Little Scientist",
    titleBahasa: "Ilmuwan Kecil",
    description: "Put all your skills together as a real scientist",
    primarySkill: "conclude",
    secondarySkills: ["observe", "question", "predict", "explore"],
    activityCount: 5,
    companionName: "Sains",
    themeColor: "#9B8EFF",
  },
];
