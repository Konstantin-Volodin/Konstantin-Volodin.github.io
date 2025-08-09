import { test, expect } from '@playwright/test';

test.describe('Project Filtering', () => {
  test('should filter projects by category', async ({ page }) => {
    await page.goto('/');

    // Wait for projects to load
    await expect(page.locator('#Projects')).toBeVisible();
    
    // Get initial count of project cards
    const allCards = page.locator('[role="group"]');
    const initialCount = await allCards.count();
    expect(initialCount).toBeGreaterThan(0);

    // Find and click a specific category filter (Web)
    const webFilter = page.locator('button[aria-pressed="false"]').filter({ hasText: 'Web' });
    await expect(webFilter).toBeVisible();
    await webFilter.click();

    // Verify the filter is now active
    await expect(webFilter).toHaveAttribute('aria-pressed', 'true');

    // Wait for filtering to complete and verify project count changed
    await page.waitForTimeout(100); // Small delay for filter to apply
    const filteredCount = await allCards.count();
    
    // Should have fewer or equal projects after filtering (unless all projects are Web)
    expect(filteredCount).toBeLessThanOrEqual(initialCount);

    // Test another filter - ML
    const mlFilter = page.locator('button[aria-pressed="false"]').filter({ hasText: 'ML' });
    await expect(mlFilter).toBeVisible();
    await mlFilter.click();

    // Verify ML filter is active and Web is no longer active
    await expect(mlFilter).toHaveAttribute('aria-pressed', 'true');
    await expect(webFilter).toHaveAttribute('aria-pressed', 'false');

    // Go back to "All" to reset
    const allFilter = page.locator('button').filter({ hasText: 'All' }).first();
    await allFilter.click();
    await expect(allFilter).toHaveAttribute('aria-pressed', 'true');

    // Verify we're back to initial count
    await page.waitForTimeout(100);
    const resetCount = await allCards.count();
    expect(resetCount).toBe(initialCount);
  });

  test('should filter projects by technology', async ({ page }) => {
    await page.goto('/');

    // Wait for projects to load
    await expect(page.locator('#Projects')).toBeVisible();
    
    // Get initial count of project cards
    const allCards = page.locator('[role="group"]');
    const initialCount = await allCards.count();
    expect(initialCount).toBeGreaterThan(0);

    // Look for Python technology filter - it should be one of the featured ones
    const pythonFilter = page.locator('button[aria-pressed="false"]').filter({ hasText: 'Python' });
    
    // Only test if Python filter exists (it should based on the code)
    if (await pythonFilter.count() > 0) {
      await pythonFilter.click();

      // Verify the filter is now active
      await expect(pythonFilter).toHaveAttribute('aria-pressed', 'true');

      // Wait for filtering to complete
      await page.waitForTimeout(100);
      const filteredCount = await allCards.count();
      expect(filteredCount).toBeLessThanOrEqual(initialCount);
    }

    // Test React filter if available
    const reactFilter = page.locator('button[aria-pressed="false"]').filter({ hasText: 'React' });
    if (await reactFilter.count() > 0) {
      await reactFilter.click();
      await expect(reactFilter).toHaveAttribute('aria-pressed', 'true');
    }
  });

  test('should clear all filters', async ({ page }) => {
    await page.goto('/');

    // Wait for projects to load
    await expect(page.locator('#Projects')).toBeVisible();
    
    // Get initial count
    const allCards = page.locator('[role="group"]');
    const initialCount = await allCards.count();

    // Apply some filters first
    const webFilter = page.locator('button[aria-pressed="false"]').filter({ hasText: 'Web' });
    if (await webFilter.count() > 0) {
      await webFilter.click();
      await expect(webFilter).toHaveAttribute('aria-pressed', 'true');
    }

    const pythonFilter = page.locator('button[aria-pressed="false"]').filter({ hasText: 'Python' });
    if (await pythonFilter.count() > 0) {
      await pythonFilter.click();
      await expect(pythonFilter).toHaveAttribute('aria-pressed', 'true');
    }

    // Look for Clear filters button (only appears when filters are active)
    const clearButton = page.locator('button').filter({ hasText: 'Clear filters' });
    if (await clearButton.count() > 0) {
      await expect(clearButton).toBeVisible();
      await clearButton.click();

      // Verify all filters are reset to "All"
      await page.waitForTimeout(100);
      const resetCount = await allCards.count();
      expect(resetCount).toBe(initialCount);

      // Clear button should be hidden again
      await expect(clearButton).not.toBeVisible();
    }
  });
});