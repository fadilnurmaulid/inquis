/**
 * Unit tests — Activity definitions integrity
 */

import { describe, it, expect } from "vitest";
import { ALL_ACTIVITIES, getActivityDefinition } from "@/lib/activities/definitions";
import { WORLDS } from "@/types";

describe("Activity definitions", () => {
  it("defines all 20 activities across 4 worlds", () => {
    expect(Object.keys(ALL_ACTIVITIES)).toHaveLength(20);
  });

  it("each world has 5 activities", () => {
    for (const world of WORLDS) {
      for (let i = 1; i <= world.activityCount; i++) {
        const id = `activity-${world.number}-${i}`;
        expect(getActivityDefinition(id)).toBeDefined();
      }
    }
  });

  it("each activity has hints and reflection options", () => {
    for (const def of Object.values(ALL_ACTIVITIES)) {
      expect(def.hints).toHaveLength(3);
      expect(def.reflectionOptions.length).toBeGreaterThanOrEqual(2);
      expect(def.correctOptionId).toBeTruthy();
    }
  });
});
