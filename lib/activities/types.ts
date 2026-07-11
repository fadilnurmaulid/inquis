/**
 * Activity Engine — shared types for all worlds.
 */

import type { ScientificSkill } from "@/types";

export type ActivityPhase =
  | "intro"
  | "explore"
  | "challenge"
  | "feedback"
  | "reflection"
  | "complete";

export type ChallengeType = "pick-one" | "sequence" | "sort-pair" | "predict" | "conclude";

export interface ExploreItem {
  id: string;
  emoji: string;
  label: string;
  color?: string;
  /** Optional relative visual size, for activities comparing size/height */
  visualScale?: "sm" | "md" | "lg";
}

export interface ChallengeOption {
  id: string;
  emoji: string;
  label?: string;
  color?: string;
  isCorrect?: boolean;
  /** Optional relative visual size, for activities comparing size/height */
  visualScale?: "sm" | "md" | "lg";
}

export interface ActivityDefinition {
  activityId: string;
  worldId: string;
  worldNumber: number;
  activityNumber: number;
  title: string;
  instruction: string;
  companionIntro: string;
  companionEncourage: string;
  explorePrompt: string;
  exploreItems: ExploreItem[];
  challengeType: ChallengeType;
  challengePrompt: string;
  options: ChallengeOption[];
  /** For sequence type — correct option id */
  correctOptionId: string;
  hints: [string, string, string];
  reflectionQuestion: string;
  reflectionOptions: { id: string; emoji: string; label: string }[];
  primarySkill: ScientificSkill;
}
