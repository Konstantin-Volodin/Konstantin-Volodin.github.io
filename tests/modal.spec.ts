import { test, expect } from '@playwright/test';

test.describe('Project Modals', () => {
  test('should open modal when clicking on a project card', async ({ page }) => {
    await page.goto('/');

    // Wait for projects to load
    await expect(page.locator('#Projects')).toBeVisible();
    
    // Find the first project card - they are clickable linkboxes with role="group"
    const firstProjectCard = page.locator('[role="group"]').first();
    await expect(firstProjectCard).toBeVisible();

    // Get the project name for verification
    const projectTitle = firstProjectCard.locator('[id$="-title"]').first();
    await expect(projectTitle).toBeVisible();
    const titleText = await projectTitle.textContent();

    // Click the project card to open modal
    await firstProjectCard.click();

    // Verify modal opens
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    // Verify modal contains the correct project title
    const modalTitle = modal.locator('[id$="-header"]').first();
    await expect(modalTitle).toBeVisible();
    await expect(modalTitle).toHaveText(titleText || '');

    // Verify modal close button works
    const closeButton = modal.locator('button[aria-label="Close"]');
    await expect(closeButton).toBeVisible();
    await closeButton.click();

    // Verify modal closes
    await expect(modal).not.toBeVisible();
  });

  test('should open modal via keyboard navigation', async ({ page }) => {
    await page.goto('/');

    // Wait for projects to load
    await expect(page.locator('#Projects')).toBeVisible();
    
    // Find the first project card
    const firstProjectCard = page.locator('[role="group"]').first();
    await expect(firstProjectCard).toBeVisible();

    // Focus the card and press Enter
    await firstProjectCard.focus();
    await page.keyboard.press('Enter');

    // Verify modal opens
    const modal = page.locator('[role="dialog"]');
    await expect(modal).toBeVisible();

    // Test Space key as well - close first
    await page.keyboard.press('Escape');
    await expect(modal).not.toBeVisible();

    // Focus and press Space
    await firstProjectCard.focus();
    await page.keyboard.press('Space');
    await expect(modal).toBeVisible();
  });
});