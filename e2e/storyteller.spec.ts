import { test, expect } from '@playwright/test';

// Make sure your development server is running before starting the tests.
const APP_URL = 'http://localhost:5173';

test('should allow a user to create a story, recreate it and start over again', async ({ page }) => {
  // Access the app
  await page.goto(APP_URL);

  // Skip intro page
  await page.getByRole('button', { name: /Start/i }).click();

  // Fill out the 10 questions
  for (let i = 1; i <= 10; i++) {
    await expect(page.getByText(`Question ${i}`)).toBeVisible();

    await page.getByRole('textbox').fill(`Test answer ${i}`);
    await page.getByRole('button', { name: /Next/i }).click();
  }

  // Wait for the story to be generated
  await expect(page.getByTestId('loading')).toBeVisible();

  // Check that the story is displayed
  await expect(page.getByTestId('story-content')).toBeVisible({ timeout: 40000 });

  // Recreate the story
  await page.getByRole('button', { name: /Recreate/i }).click();

  // Wait for the story to be generated again
  await expect(page.getByTestId('loading')).toBeVisible();

  // Check that the story is displayed again
  await expect(page.getByTestId('story-content')).toBeVisible({ timeout: 40000 });

  // Start a new story
  await page.getByRole('button', { name: /Create new/i }).click();

  // Check that we are back to the first question
  await expect(page.getByText('Question 1')).toBeVisible();
});
