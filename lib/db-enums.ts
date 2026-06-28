/**
 * Database enum values — mirrors Prisma schema.
 * Used instead of @prisma/client enums when Prisma client can't be generated.
 */

export const ActivityStatus = {
  NOT_STARTED: "NOT_STARTED",
  IN_PROGRESS:  "IN_PROGRESS",
  COMPLETED:    "COMPLETED",
} as const;
export type ActivityStatus = (typeof ActivityStatus)[keyof typeof ActivityStatus];

export const WorldStatus = {
  LOCKED:      "LOCKED",
  UNLOCKED:    "UNLOCKED",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED:   "COMPLETED",
  MASTERED:    "MASTERED",
} as const;
export type WorldStatus = (typeof WorldStatus)[keyof typeof WorldStatus];

export const ScaffoldLevel = {
  NONE:          "NONE",
  HINT_1:        "HINT_1",
  HINT_2:        "HINT_2",
  HINT_3:        "HINT_3",
  ANSWER_REVEAL: "ANSWER_REVEAL",
} as const;
export type ScaffoldLevel = (typeof ScaffoldLevel)[keyof typeof ScaffoldLevel];

export const Role = {
  CHILD:   "CHILD",
  TEACHER: "TEACHER",
  PARENT:  "PARENT",
  ADMIN:   "ADMIN",
} as const;
export type Role = (typeof Role)[keyof typeof Role];
