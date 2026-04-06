import { expect, test } from '@playwright/test';

test.describe('Language Switcher', (): void => {
  test('should switch landing page content from English to Russian', async ({ page }): Promise<void> => {
    await page.goto('/');

    // Default - English content visible
    await expect(page.getByText('Interactive Trainer for Developers')).toBeVisible();
    await expect(page.getByText('Available Tools')).toBeVisible();

    // Click RU button
    await page.getByRole('button', { name: 'RU' }).click();

    // Russian content should appear
    await expect(page.getByText('Интерактивный тренажер для разработчиков')).toBeVisible();
    await expect(page.getByText('Доступные инструменты')).toBeVisible();
  });

  test('should switch back from Russian to English', async ({ page }): Promise<void> => {
    await page.goto('/');

    // Switch to Russian first
    await page.getByRole('button', { name: 'RU' }).click();
    await expect(page.getByText('Интерактивный тренажер для разработчиков')).toBeVisible();

    // Switch back to English
    await page.getByRole('button', { name: 'EN' }).click();
    await expect(page.getByText('Interactive Trainer for Developers')).toBeVisible();
    await expect(page.getByText('Available Tools')).toBeVisible();
  });

  test('should persist language choice when navigating to login page', async ({ page }): Promise<void> => {
    await page.goto('/');

    // Switch to Russian
    await page.getByRole('button', { name: 'RU' }).click();

    // Navigate to login - Russian button text is "Вход в систему"
    await page.getByRole('button', { name: 'Вход в систему' }).click();

    // Login page should be in Russian
    await expect(page.getByText('Или через email')).toBeVisible();
  });

  test('should switch language on the login page', async ({ page }): Promise<void> => {
    await page.goto('/login');

    // Default English
    await expect(page.getByText('Or with email')).toBeVisible();

    // Switch to Russian
    await page.getByRole('button', { name: 'RU' }).click();

    // Russian content
    await expect(page.getByText('Или через email')).toBeVisible();
  });
});
