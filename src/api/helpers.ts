import { SYSTEM_ERROR } from '@shared/Constants/constants';
import type { AuthError, PostgrestError } from '@supabase/supabase-js';
import { i18CheckPath } from '@utils/zod-i18.typecheck';
import { useToastStore } from '@s/toast.store';

export const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export const processAuthError = (error: AuthError): string | null => {
  const { status, message, code } = error;
  const { addToast } = useToastStore.getState();

  const isSystemError =
    !status ||
    status >= 500 ||
    status === 429 ||
    status === 401 ||
    message === 'Fetch error' ||
    (status === 400 && (message.includes('configuration') || message.includes('provider')));

  if (isSystemError) {
    let systemMsg = i18CheckPath('auth.apiErrors.systemError');

    if (status === 429) {
      systemMsg = i18CheckPath('auth.apiErrors.tooManyAttempts');
    } else if (message === 'Fetch error') {
      systemMsg = i18CheckPath('auth.apiErrors.unknown');
    }

    addToast(systemMsg, 'error');
    return SYSTEM_ERROR;
  }

  if (status === 422 || status === 400) {
    if (message.includes('already registered')) {
      return i18CheckPath('auth.apiErrors.alreadyRegistered');
    }
    if (message.includes('weak_password') || message.includes('at least 6 characters')) {
      return i18CheckPath('auth.apiErrors.weakPassword');
    }
    if (message.includes('Invalid login credentials')) {
      return i18CheckPath('auth.apiErrors.invalidCredentials');
    }
  }

  if (!message) {
    const systemMsg = i18CheckPath('auth.apiErrors.unknown');
    addToast(systemMsg, 'error');
    return `${systemMsg}: ${status || ''} ${code || ''}`;
  }

  return message;
};

export const processPostgrestError = (error: PostgrestError): string | null => {
  const { code, message } = error;
  const { addToast } = useToastStore.getState();

  const isSystemError =
    code.startsWith('42') || // Syntax/Permission Errors
    code.startsWith('5') || // Server error
    message === 'Fetch error';

  if (isSystemError) {
    const systemMsg = i18CheckPath('auth.apiErrors.systemError');
    addToast(systemMsg, 'error');
    return SYSTEM_ERROR;
  }

  if (code === 'PGRST116') {
    const systemMsg = i18CheckPath('auth.apiErrors.unknown');
    addToast(systemMsg, 'error');
    return SYSTEM_ERROR;
  }

  addToast(message, 'error');
  return message;
};
