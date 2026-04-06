import { expect, test } from '@playwright/test';

test.describe('Register Page - Form Validation', (): void => {
  test.beforeEach(async ({ page }): Promise<void> => {
    await page.goto('/register');
  });

  test('should render register form with all required fields', async ({ page }): Promise<void> => {
    await expect(page.getByRole('heading', { name: 'Sign Up' })).toBeVisible();
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[name="confirmPassword"]')).toBeVisible();
  });

  test('should have submit button disabled when fields are empty', async ({ page }): Promise<void> => {
    const submitBtn = page.getByRole('button', { name: 'Submit' });
    await expect(submitBtn).toBeDisabled();
  });

  test('should show validation error for short username', async ({ page }): Promise<void> => {
    const usernameInput = page.locator('input[name="username"]');
    await usernameInput.fill('ab');
    await usernameInput.blur();

    await expect(page.getByText('Min. 3 characters')).toBeVisible();
  });

  test('should show validation error for invalid email', async ({ page }): Promise<void> => {
    const emailInput = page.locator('input[name="email"]');
    await emailInput.fill('invalid');
    await emailInput.blur();

    await expect(page.getByText('Enter a valid email')).toBeVisible();
  });

  test('should show validation error for short password', async ({ page }): Promise<void> => {
    const passwordInput = page.locator('input[name="password"]');
    await passwordInput.fill('short');
    await passwordInput.blur();

    await expect(page.getByText('Min. 8 characters')).toBeVisible();
  });

  test('should show validation error when passwords do not match', async ({ page }): Promise<void> => {
    await page.locator('input[name="username"]').fill('TestUser');
    await page.locator('input[name="email"]').fill('user@example.com');
    await page.locator('input[name="password"]').fill('password123');
    await page.locator('input[name="confirmPassword"]').fill('different456');
    await page.locator('input[name="confirmPassword"]').blur();

    await expect(page.getByText('Passwords must match')).toBeVisible();
  });

  test('should enable submit button when all fields are valid', async ({ page }): Promise<void> => {
    await page.locator('input[name="username"]').fill('TestUser');
    await page.locator('input[name="email"]').fill('user@example.com');
    await page.locator('input[name="password"]').fill('password123');
    await page.locator('input[name="confirmPassword"]').fill('password123');

    const submitBtn = page.getByRole('button', { name: 'Submit' });
    await expect(submitBtn).toBeEnabled();
  });

  test('should have a link to the login page', async ({ page }): Promise<void> => {
    await expect(page.getByText('Already have an account?')).toBeVisible();
    const signInLink = page.getByRole('link', { name: 'Sign in here' });
    await expect(signInLink).toBeVisible();
    await signInLink.click();
    await expect(page).toHaveURL('/login');
  });
});
