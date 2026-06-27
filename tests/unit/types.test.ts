/**
 * Unit tests — type definitions and world constants (FND-021)
 */

import { describe, it, expect } from "vitest";
import { WORLDS } from "@/types";

describe("WORLDS constant", () => {
  it("has exactly 4 worlds", () => {
    expect(WORLDS).toHaveLength(4);
  });

  it("worlds are numbered 1–4 sequentially", () => {
    WORLDS.forEach((world, index) => {
      expect(world.number).toBe(index + 1);
    });
  });

  it("each world has 5 activities", () => {
    WORLDS.forEach((world) => {
      expect(world.activityCount).toBe(5);
    });
  });

  it("world IDs follow convention world-N", () => {
    WORLDS.forEach((world) => {
      expect(world.id).toBe(`world-${world.number}`);
    });
  });

  it("each world has a companion name", () => {
    WORLDS.forEach((world) => {
      expect(world.companionName).toBeTruthy();
    });
  });
});
