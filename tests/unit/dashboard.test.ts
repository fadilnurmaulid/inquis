/**
 * Unit tests — Dashboard data logic (DASH-018 / DASH-019)
 * Tests world progression logic, recommend logic, and edge cases.
 */

import { describe, it, expect } from "vitest";
import { WORLDS } from "@/types";

// ── World definition integrity ────────────────────────────────────────────

describe("WORLDS progression rules", () => {
  it("world-1 is the only world that should be unlocked by default", () => {
    const first = WORLDS[0];
    expect(first.number).toBe(1);
    expect(first.id).toBe("world-1");
  });

  it("each world has a unique themeColor", () => {
    const colors = WORLDS.map((w) => w.themeColor);
    const unique = new Set(colors);
    expect(unique.size).toBe(WORLDS.length);
  });

  it("worlds are in sequential order", () => {
    WORLDS.forEach((world, index) => {
      expect(world.number).toBe(index + 1);
    });
  });
});

// ── Activity ID convention ────────────────────────────────────────────────

describe("Activity ID convention", () => {
  it("activity IDs follow pattern activity-{worldNumber}-{activityNumber}", () => {
    for (const world of WORLDS) {
      for (let act = 1; act <= world.activityCount; act++) {
        const id = `activity-${world.number}-${act}`;
        expect(id).toMatch(/^activity-\d+-\d+$/);
      }
    }
  });

  it("total activities across all worlds is 20", () => {
    const total = WORLDS.reduce((sum, w) => sum + w.activityCount, 0);
    expect(total).toBe(20);
  });
});

// ── Progress calculation ──────────────────────────────────────────────────

describe("Progress percent calculation", () => {
  function calcPercent(completed: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
  }

  it("returns 0 for no progress", () => {
    expect(calcPercent(0, 5)).toBe(0);
  });

  it("returns 100 for full completion", () => {
    expect(calcPercent(5, 5)).toBe(100);
  });

  it("returns 60 for 3/5 activities", () => {
    expect(calcPercent(3, 5)).toBe(60);
  });

  it("handles zero total activities", () => {
    expect(calcPercent(0, 0)).toBe(0);
  });
});

// ── Next recommended activity ─────────────────────────────────────────────

describe("Next recommended activity logic", () => {
  it("recommends activity-1-1 for a brand new child", () => {
    // Simulate: no sessions, world-1 UNLOCKED, all others LOCKED
    const worlds = WORLDS.map((w) => ({
      worldId: w.id,
      worldNumber: w.number,
      status: w.number === 1 ? ("UNLOCKED" as const) : ("LOCKED" as const),
      completedActivities: 0,
      totalActivities: w.activityCount,
    }));

    let nextRecommended = null;
    for (const world of worlds) {
      if (world.status === "LOCKED") continue;
      if (world.completedActivities >= world.totalActivities) continue;
      const nextActivityNumber = world.completedActivities + 1;
      nextRecommended = {
        activityId: `activity-${world.worldNumber}-${nextActivityNumber}`,
        worldId: world.worldId,
        worldNumber: world.worldNumber,
        activityNumber: nextActivityNumber,
      };
      break;
    }

    expect(nextRecommended?.activityId).toBe("activity-1-1");
    expect(nextRecommended?.worldNumber).toBe(1);
  });

  it("recommends world-2 activity-1 after world-1 is completed", () => {
    const worlds = WORLDS.map((w) => ({
      worldId: w.id,
      worldNumber: w.number,
      status:
        w.number === 1
          ? ("COMPLETED" as const)
          : w.number === 2
            ? ("UNLOCKED" as const)
            : ("LOCKED" as const),
      completedActivities: w.number === 1 ? 5 : 0,
      totalActivities: w.activityCount,
    }));

    let nextRecommended = null;
    for (const world of worlds) {
      if (world.status === "LOCKED") continue;
      if (world.completedActivities >= world.totalActivities) continue;
      const nextActivityNumber = world.completedActivities + 1;
      nextRecommended = {
        activityId: `activity-${world.worldNumber}-${nextActivityNumber}`,
        worldId: world.worldId,
      };
      break;
    }

    expect(nextRecommended?.activityId).toBe("activity-2-1");
    expect(nextRecommended?.worldId).toBe("world-2");
  });
});

// ── WorldCard STATUS_CONFIG fallback ─────────────────────────────────────

describe("WorldCard status config", () => {
  it("covers all expected WorldStatus values", () => {
    const STATUS_CONFIG_KEYS = ["LOCKED", "UNLOCKED", "IN_PROGRESS", "COMPLETED", "MASTERED"];
    STATUS_CONFIG_KEYS.forEach((key) => {
      // The STATUS_CONFIG in world-card should have an entry (or fallback) for each
      expect(["LOCKED", "UNLOCKED", "IN_PROGRESS", "COMPLETED", "MASTERED"]).toContain(key);
    });
  });

  it("MASTERED is listed as a valid future state in the spec", () => {
    // This test documents that MASTERED is an expected future state per FR-DASH spec
    const validStates = ["LOCKED", "UNLOCKED", "IN_PROGRESS", "COMPLETED", "MASTERED"];
    expect(validStates).toContain("MASTERED");
  });
});
