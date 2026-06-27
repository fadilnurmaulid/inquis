/**
 * Unit tests — shared utilities (FND-021)
 */

import { describe, it, expect } from "vitest";
import { cn, formatDuration, toPercent, capitalize, generateClassCode } from "@/lib/utils";

describe("cn()", () => {
  it("merges class names", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });

  it("resolves Tailwind conflicts (last wins)", () => {
    expect(cn("px-4", "px-8")).toBe("px-8");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "visible")).toBe("base visible");
  });
});

describe("formatDuration()", () => {
  it("formats seconds only", () => {
    expect(formatDuration(45)).toBe("45 detik");
  });

  it("formats minutes only", () => {
    expect(formatDuration(120)).toBe("2 menit");
  });

  it("formats minutes and seconds", () => {
    expect(formatDuration(125)).toBe("2 menit 5 detik");
  });

  it("handles zero", () => {
    expect(formatDuration(0)).toBe("0 detik");
  });
});

describe("toPercent()", () => {
  it("returns 0% for zero total", () => {
    expect(toPercent(5, 0)).toBe("0%");
  });

  it("calculates percentage correctly", () => {
    expect(toPercent(3, 4)).toBe("75%");
  });

  it("clamps at 100%", () => {
    expect(toPercent(10, 5)).toBe("100%");
  });
});

describe("capitalize()", () => {
  it("capitalizes first letter", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  it("lowercases rest", () => {
    expect(capitalize("HELLO")).toBe("Hello");
  });

  it("handles empty string", () => {
    expect(capitalize("")).toBe("");
  });
});

describe("generateClassCode()", () => {
  it("returns 6 characters", () => {
    expect(generateClassCode()).toHaveLength(6);
  });

  it("uses uppercase alphanumeric only", () => {
    const code = generateClassCode();
    expect(code).toMatch(/^[A-Z2-9]{6}$/);
  });
});
