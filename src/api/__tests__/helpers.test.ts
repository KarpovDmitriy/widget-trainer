import { processAuthError, processPostgrestError } from '@api/helpers';
import { SYSTEM_ERROR } from '@shared/Constants/constants';
import type { AuthError, PostgrestError } from '@supabase/supabase-js';
import { beforeEach, describe, expect, it, vi } from 'vitest';

beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {});
});

describe('processAuthError', () => {
  const makeAuthError = (status: number, message: string, code?: string): AuthError =>
    ({ status, message, code }) as unknown as AuthError;

  it('returns message for regular 400 error (invalid credentials)', () => {
    const error = makeAuthError(400, 'Invalid login credentials');
    expect(processAuthError(error)).toBe('Invalid login credentials');
  });

  it('returns message for 422 error (weak password)', () => {
    const error = makeAuthError(422, 'Password should be at least 8 characters');
    expect(processAuthError(error)).toBe('Password should be at least 8 characters');
  });

  it('returns SYSTEM_ERROR for server error (status >= 500)', () => {
    const error = makeAuthError(500, 'Internal server error');
    expect(processAuthError(error)).toBe(SYSTEM_ERROR);
  });

  it('returns SYSTEM_ERROR for rate limit (429)', () => {
    const error = makeAuthError(429, 'Too many requests');
    expect(processAuthError(error)).toBe(SYSTEM_ERROR);
  });

  it('returns SYSTEM_ERROR for network failure (Fetch error)', () => {
    const error = makeAuthError(0, 'Fetch error');
    expect(processAuthError(error)).toBe(SYSTEM_ERROR);
  });

  it('returns unknown_auth_error string when message is empty', () => {
    const error = makeAuthError(400, '', 'some_code');
    expect(processAuthError(error)).toContain('unknown_auth_error');
  });
});

describe('processPostgrestError', () => {
  const makePostgrestError = (code: string, message: string): PostgrestError =>
    ({ code, message, details: '', hint: '' }) as PostgrestError;

  it('returns message for regular DB error', () => {
    const error = makePostgrestError('23505', 'duplicate key value');
    expect(processPostgrestError(error)).toBe('duplicate key value');
  });

  it('returns SYSTEM_ERROR for permission errors (42xxx)', () => {
    const error = makePostgrestError('42501', 'permission denied');
    expect(processPostgrestError(error)).toBe(SYSTEM_ERROR);
  });

  it('returns SYSTEM_ERROR for PGRST116 (not found)', () => {
    const error = makePostgrestError('PGRST116', 'not found');
    expect(processPostgrestError(error)).toBe(SYSTEM_ERROR);
  });
});
