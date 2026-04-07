import { authLogin, authLogout, authRegister, onSessionChange } from '@api/auth.api';
import { SYSTEM_ERROR } from '@shared/Constants/constants';
import type { AuthError, User } from '@supabase/supabase-js';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockSignInWithPassword = vi.fn();
const mockSignUp = vi.fn();
const mockSignOut = vi.fn();
const mockOnAuthStateChange = vi.fn();

vi.mock('@src/lib/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: (...args: unknown[]): unknown => mockSignInWithPassword(...args),
      signUp: (...args: unknown[]): unknown => mockSignUp(...args),
      signOut: (...args: unknown[]): unknown => mockSignOut(...args),
      onAuthStateChange: (...args: unknown[]): unknown => mockOnAuthStateChange(...args),
    },
  },
}));

const FAKE_USER: User = {
  id: 'usr_test_123',
  email: 'test@example.com',
  app_metadata: {},
  user_metadata: { username: 'TestUser' },
  aud: 'authenticated',
  created_at: '2025-01-01T00:00:00Z',
} as User;

beforeEach(() => {
  vi.clearAllMocks();
  vi.spyOn(console, 'warn').mockImplementation(() => {});
});

describe('authLogin', () => {
  it('returns user on successful login', async () => {
    mockSignInWithPassword.mockResolvedValue({
      data: { user: FAKE_USER, session: {} },
      error: null,
    });

    const result = await authLogin({ email: 'test@example.com', password: '12345678' });

    expect(result.user).toEqual(FAKE_USER);
    expect(result.error).toBeNull();
  });

  it('returns error message for invalid credentials', async () => {
    mockSignInWithPassword.mockResolvedValue({
      data: { user: null, session: null },
      error: { status: 400, message: 'Invalid login credentials' } as AuthError,
    });

    const result = await authLogin({ email: 'wrong@test.com', password: 'wrong' });

    expect(result.user).toBeNull();
    expect(result.error).toBe('Invalid login credentials');
  });

  it('returns SYSTEM_ERROR when network throws', async () => {
    mockSignInWithPassword.mockRejectedValue(new Error('Network failure'));

    const result = await authLogin({ email: 'test@example.com', password: '12345678' });

    expect(result.error).toBe(SYSTEM_ERROR);
  });
});

describe('authRegister', () => {
  it('returns user on successful registration', async () => {
    mockSignUp.mockResolvedValue({
      data: { user: FAKE_USER, session: {} },
      error: null,
    });

    const result = await authRegister({ email: 'new@test.com', password: '12345678', username: 'New' });

    expect(result.user).toEqual(FAKE_USER);
    expect(result.error).toBeNull();
  });

  it('passes username in options.data', async () => {
    mockSignUp.mockResolvedValue({ data: { user: FAKE_USER, session: {} }, error: null });

    await authRegister({ email: 'new@test.com', password: '12345678', username: 'MyName' });

    expect(mockSignUp).toHaveBeenCalledWith(expect.objectContaining({ options: { data: { username: 'MyName' } } }));
  });

  it('returns error when email is taken', async () => {
    mockSignUp.mockResolvedValue({
      data: { user: null, session: null },
      error: { status: 400, message: 'User already registered' } as AuthError,
    });

    const result = await authRegister({ email: 'taken@test.com', password: '12345678', username: 'U' });

    expect(result.error).toBe('User already registered');
  });
});

describe('authLogout', () => {
  it('returns null error on successful logout', async () => {
    mockSignOut.mockResolvedValue({ error: null });
    const result = await authLogout();
    expect(result.error).toBeNull();
  });

  it('returns SYSTEM_ERROR on server failure', async () => {
    mockSignOut.mockResolvedValue({ error: { status: 500, message: 'Server error' } as AuthError });
    const result = await authLogout();
    expect(result.error).toBe(SYSTEM_ERROR);
  });
});

describe('onSessionChange', () => {
  it('returns unsubscribe function', () => {
    const mockUnsub = vi.fn();
    mockOnAuthStateChange.mockReturnValue({ data: { subscription: { unsubscribe: mockUnsub } } });

    const unsubscribe = onSessionChange(vi.fn());
    unsubscribe();

    expect(mockUnsub).toHaveBeenCalledOnce();
  });

  it('calls callback with user on SIGNED_IN', () => {
    mockOnAuthStateChange.mockImplementation((cb: (event: string, session: unknown) => void) => {
      cb('SIGNED_IN', { user: FAKE_USER });
      return { data: { subscription: { unsubscribe: vi.fn() } } };
    });

    const callback = vi.fn();
    onSessionChange(callback);

    expect(callback).toHaveBeenCalledWith(FAKE_USER);
  });
});
