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
}

export interface ChallengeOption {
  id: string;
  emoji: string;
  label?: string;
  color?: string;
  isCorrect?: boolean;
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
