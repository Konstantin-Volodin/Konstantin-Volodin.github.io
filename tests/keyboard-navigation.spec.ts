import { test, expect } from '@playwright/test';

test.describe('Keyboard Navigation Between Projects', () => {
  test('should navigate between projects using arrow keys in modal', async ({ page }) => {
    await page.goto('/');

    // Wait for projects to load
    await expect(page.locator('#Projects')).toBeVisible();
    
    // Get all project cards to ensure we have multiple projects for navigation
    const allCards = page.locator('[role="group"]');
    const projectCount = await allCards.count();
    
    // Skip test if we don't have multiple projects
    if (projectCount < 2) {
      test.skip(true, 'Need at least 2 projects for navigation test');
    }

    // Get the first project title for reference
    const firstProjectTitle = await allCards.first().locator('[id$="-title"]').textContent();
    
    // Click first project to open modal
    await allCards.first().click();

    // Verify modal is open
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    // Verify we're showing the first project
    const modalTitle = modal.locator('[id$="-header"]').first();
    await expect(modalTitle).toHaveText(firstProjectTitle || '');

    // Navigate to next project using right arrow
    await page.keyboard.press('ArrowRight');

    // Wait a moment for navigation to complete
    await page.waitForTimeout(200);

    // Verify the modal title changed (should show different project)
    const newModalTitle = await modalTitle.textContent();
    expect(newModalTitle).not.toBe(firstProjectTitle);

    // Navigate to previous project using left arrow
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(200);

    // Should be back to first project
    await expect(modalTitle).toHaveText(firstProjectTitle || '');

    // Test wrapping: if we're at the first project and press left arrow,
    // should wrap to last project
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(200);

    // Should show a different project (the last one)
    const wrappedTitle = await modalTitle.textContent();
    expect(wrappedTitle).not.toBe(firstProjectTitle);

    // Navigate back through all projects to verify wrapping works both ways
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(200);
    
    // Should be back to first project
    await expect(modalTitle).toHaveText(firstProjectTitle || '');
  });

  test('should not navigate when modal is closed', async ({ page }) => {
    await page.goto('/');

    // Wait for projects to load
    await expect(page.locator('#Projects')).toBeVisible();
    
    // Ensure no modal is open initially
    const modal = page.locator('[role="dialog"]');
    await expect(modal).not.toBeVisible();

    // Try arrow key navigation - should do nothing
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowLeft');

    // Modal should still not be visible
    await expect(modal).not.toBeVisible();
  });

  test('should handle URL state during keyboard navigation', async ({ page }) => {
    await page.goto('/');

    // Wait for projects to load
    await expect(page.locator('#Projects')).toBeVisible();
    
    const allCards = page.locator('[role="group"]');
    const projectCount = await allCards.count();
    
    if (projectCount < 2) {
      test.skip(true, 'Need at least 2 projects for URL state test');
    }

    // Click first project to open modal
    await allCards.first().click();

    // Verify URL contains project parameter
    await expect(page).toHaveURL(/[?&]project=/);
    const initialURL = page.url();

    // Navigate with arrow key
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(200);

    // URL should have changed
    const newURL = page.url();
    expect(newURL).not.toBe(initialURL);
    await expect(page).toHaveURL(/[?&]project=/);

    // Browser back should work
    await page.goBack();
    await page.waitForTimeout(200);

    // Should be back to previous project
    expect(page.url()).toBe(initialURL);

    // Modal should still be open with correct project
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();
  });
});