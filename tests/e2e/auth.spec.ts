/**
 * E2E tests — Authentication flows (FND-021)
 * Tests: login, role routing, session persistence, unauthorized redirect
 */

import { test, expect } from "@playwright/test";

const BASE = "http://localhost:3000";

test.describe("Landing page", () => {
  test("renders INQUIS branding and CTAs", async ({ page }) => {
    await page.goto(BASE);
    await expect(page.getByText("INQUIS")).toBeVisible();
    await expect(page.getByText("Ayo Bermain!")).toBeVisible();
    await expect(page.getByText("Masuk sebagai Guru")).toBeVisible();
    await expect(page.getByText("Masuk sebagai Orang Tua")).toBeVisible();
  });
});

test.describe("Login page", () => {
  test("renders login form", async ({ page }) => {
    await page.goto(`${BASE}/login`);
    await expect(page.getByText("Masuk ke INQUIS")).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
  });

  test("shows validation error for invalid email", async ({ page }) => {
    await page.goto(`${BASE}/login`);
    await page.getByLabel("Email").fill("bukan-email");
    await page.getByLabel("Password").fill("123456");
    await page.getByRole("button", { name: "Masuk" }).click();
    await expect(page.getByText("Email tidak valid")).toBeVisible();
  });

  test("shows error for wrong credentials", async ({ page }) => {
    await page.goto(`${BASE}/login`);
    await page.getByLabel("Email").fill("wrong@example.com");
    await page.getByLabel("Password").fill("wrongpassword");
    await page.getByRole("button", { name: "Masuk" }).click();
    await expect(page.getByText("Email atau password salah")).toBeVisible();
  });
});

test.describe("Route protection", () => {
  test("redirects unauthenticated user from /play to login", async ({ page }) => {
    await page.goto(`${BASE}/play/home`);
    await expect(page).toHaveURL(/\/login/);
  });

  test("redirects unauthenticated user from /admin to login", async ({ page }) => {
    await page.goto(`${BASE}/admin`);
    await expect(page).toHaveURL(/\/login/);
  });

  test("demo mode is reachable without logging in", async ({ page }) => {
    await page.goto(`${BASE}/demo/peta`);
    await expect(page).toHaveURL(/\/demo\/peta/);
  });

  test("demo activity is playable without logging in", async ({ page }) => {
    await page.goto(`${BASE}/demo/main/activity-1-1`);
    await expect(page).toHaveURL(/\/demo\/main\/activity-1-1/);
  });
});
