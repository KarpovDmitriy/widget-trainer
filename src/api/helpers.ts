import { SYSTEM_ERROR } from '@shared/Constants/constants';
import type { AuthError, PostgrestError } from '@supabase/supabase-js';
import { i18CheckPath } from '@utils/zod-i18.typecheck';
import { useToastStore } from '@s/toast.store';

export const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export const processAuthError = (error: AuthError): string | null => {
  const { status, message, code } = error;
  const { addToast } = useToastStore.getState();

  if (isNetworkError(error)) {
    const systemMsg = i18CheckPath('common.errors.network');
    addToast(systemMsg, 'error');
    return SYSTEM_ERROR;
  }

  const isSystemError =
    !status ||
    status >= 500 ||
    status === 429 ||
    status === 401 ||
    message === 'Fetch error' ||
    (status === 400 && (message.includes('configuration') || message.includes('provider')));

  if (isSystemError) {
    let systemMsg = i18CheckPath('common.errors.server');

    if (status === 429) {
      systemMsg = i18CheckPath('common.errors.tooManyAttempts');
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
    const systemMsg = i18CheckPath('common.errors.unknown');
    addToast(systemMsg, 'error');
    return `${systemMsg}: ${status || ''} ${code || ''}`;
  }

  return message;
};

export const processPostgrestError = (error: PostgrestError, status: number): string | null => {
  const { code, message } = error;
  const { addToast } = useToastStore.getState();

  if (isNetworkError(error)) {
    const systemMsg = i18CheckPath('common.errors.network');
    addToast(systemMsg, 'error');
    return SYSTEM_ERROR;
  }

  const isServerError = code.startsWith('42') || code.startsWith('5') || status >= 500 || status === 429;

  if (isServerError) {
    let systemMsg = i18CheckPath('common.errors.server');
    if (status === 429) {
      systemMsg = i18CheckPath('common.errors.tooManyAttempts');
    }
    addToast(systemMsg, 'error');
    return SYSTEM_ERROR;
  }

  if (code === 'PGRST116') {
    const systemMsg = i18CheckPath('common.errors.unknown');
    addToast(systemMsg, 'error');
    return SYSTEM_ERROR;
  }

  return message;
};

function isNetworkError(error: PostgrestError | AuthError): boolean {
  const { code, message } = error;
  const lowerMessage = message?.toLowerCase() || '';

  return !code || lowerMessage.includes('fetch') || lowerMessage.includes('network');
}
