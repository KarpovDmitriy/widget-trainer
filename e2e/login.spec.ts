import { expect, test } from '@playwright/test';

test.describe('Login Page - Form Validation', (): void => {
  test.beforeEach(async ({ page }): Promise<void> => {
    await page.goto('/login');
  });

  test('should render login form with email and password fields', async ({ page }): Promise<void> => {
    await expect(page.getByRole('heading', { name: 'Log in' })).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign in with Google' })).toBeVisible();
    await expect(page.getByText('Or with email')).toBeVisible();
  });

  test('should have submit button disabled when fields are empty', async ({ page }): Promise<void> => {
    const submitBtn = page.getByRole('button', { name: 'Log in' }).last();
    await expect(submitBtn).toBeDisabled();
  });

  test('should show validation error for invalid email', async ({ page }): Promise<void> => {
    const emailInput = page.locator('input[name="email"]');
    await emailInput.fill('not-an-email');
    await emailInput.blur();

    await expect(page.getByText('Please enter a valid email')).toBeVisible();
  });

  test('should keep submit button disabled with invalid email', async ({ page }): Promise<void> => {
    await page.locator('input[name="email"]').fill('bad-email');
    await page.locator('input[name="password"]').fill('validpassword123');

    const submitBtn = page.getByRole('button', { name: 'Log in' }).last();
    await expect(submitBtn).toBeDisabled();
  });

  test('should enable submit button when both fields are valid', async ({ page }): Promise<void> => {
    await page.locator('input[name="email"]').fill('user@example.com');
    await page.locator('input[name="password"]').fill('password123');

    const submitBtn = page.getByRole('button', { name: 'Log in' }).last();
    await expect(submitBtn).toBeEnabled();
  });

  test('should have a link to the registration page', async ({ page }): Promise<void> => {
    const signUpLink = page.getByRole('link', { name: 'Sign Up' });
    await expect(signUpLink).toBeVisible();
    await signUpLink.click();
    await expect(page).toHaveURL('/register');
  });

  test('should have a Forgot Password link', async ({ page }): Promise<void> => {
    await expect(page.getByText('Forgot Password?')).toBeVisible();
  });
});
