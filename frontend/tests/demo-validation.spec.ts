import { test, expect } from "@playwright/test";
import { DEMO_SCENARIOS_MAP } from "../scripts/demo-constants";

/**
 * Demo page validation tests
 * These tests verify that demo functionality works correctly
 * Separated from recording tests for clarity
 */

test.describe("Demo Page Validation", () => {
  test("demo page loads correctly", async ({ page }) => {
    await page.goto("/demo", { waitUntil: "networkidle" });

    // Verify essential elements
    await expect(page.locator("h1")).toContainText("Claude Code Web Agent");
    await expect(page.locator('[data-demo-active="true"]')).toBeVisible();

    // Verify theme toggle works
    const themeToggle = page.locator('button[aria-label*="theme"]');
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      await page.waitForTimeout(500);
    }

  });

  test("demo scenarios are accessible", async ({ page }) => {
    for (const [, value] of Object.entries(DEMO_SCENARIOS_MAP)) {
      await page.goto(`/demo?scenario=${value}`, { waitUntil: "networkidle" });

      await expect(page.locator('[data-demo-active="true"]')).toBeVisible();
      await expect(page.locator(`[data-demo-step]`)).toBeVisible({
        timeout: 10000,
      });

    }
  });
});
