import { expect, test } from '@playwright/test';

test.describe('Landing Page', (): void => {
  test.beforeEach(async ({ page }): Promise<void> => {
    await page.goto('/');
  });

  test('should render hero section with title and description', async ({ page }): Promise<void> => {
    await expect(page.getByRole('heading', { name: 'Widget Trainer' })).toBeVisible();
    await expect(page.getByText('Interactive Trainer for Developers')).toBeVisible();
    await expect(page.getByText('A modern educational platform that transforms complex programming')).toBeVisible();
  });

  test('should display feature cards', async ({ page }): Promise<void> => {
    await expect(page.getByText('Available Tools')).toBeVisible();
    await expect(page.getByText('Dashboard:')).toBeVisible();
    await expect(page.getByText('Practice:')).toBeVisible();
    await expect(page.getByText('Library:')).toBeVisible();
  });

  test('should show Log in and Sign Up buttons for guests', async ({ page }): Promise<void> => {
    const loginBtn = page.getByRole('button', { name: 'Log in' });
    const signUpBtn = page.getByRole('button', { name: 'Sign Up' });

    await expect(loginBtn).toBeVisible();
    await expect(signUpBtn).toBeVisible();
  });

  test('should navigate to /login when Log in button is clicked', async ({ page }): Promise<void> => {
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page).toHaveURL('/login');
    await expect(page.getByRole('heading', { name: 'Log in' })).toBeVisible();
  });

  test('should navigate to /register when Sign Up button is clicked', async ({ page }): Promise<void> => {
    await page.getByRole('button', { name: 'Sign Up' }).click();
    await expect(page).toHaveURL('/register');
    await expect(page.getByRole('heading', { name: 'Sign Up' })).toBeVisible();
  });

  test('should display footer', async ({ page }): Promise<void> => {
    await expect(page.getByText('RSSchool')).toBeVisible();
  });
});
