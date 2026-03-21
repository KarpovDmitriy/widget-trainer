import { SYSTEM_ERROR } from '@shared/Constants/constants';
import type { AuthError, PostgrestError } from '@supabase/supabase-js';
import i18next from 'i18next';
import { type ParseKeys } from 'i18next';
import { useToastStore } from '@s/toast.store';

export const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export const processAuthError = (error: AuthError): string | null => {
  const { status, message, code } = error;
  const { addToast } = useToastStore.getState();
  const t = (key: ParseKeys): string => i18next.t(key);

  const isSystemError =
    !status ||
    status >= 500 ||
    status === 429 ||
    status === 401 ||
    message === 'Fetch error' ||
    (status === 400 && (message.includes('configuration') || message.includes('provider')));

  if (isSystemError) {
    let systemMsg = t('auth.apiErrors.systemError');

    if (status === 429) {
      systemMsg = t('auth.apiErrors.tooManyAttempts');
    } else if (message === 'Fetch error') {
      systemMsg = t('auth.apiErrors.unknown');
    } else if (status && status >= 500) {
      systemMsg = t('auth.apiErrors.systemError');
    }

    addToast(systemMsg, 'error');
    return SYSTEM_ERROR;
  }

  if (status === 422 || status === 400) {
    if (message.includes('already registered')) {
      return t('auth.apiErrors.alreadyRegistered');
    }
    if (message.includes('weak_password') || message.includes('at least 6 characters')) {
      return t('auth.apiErrors.weakPassword');
    }
    if (message.includes('Invalid login credentials')) {
      return t('auth.apiErrors.invalidCredentials');
    }
  }

  if (!message) {
    const systemMsg = `${t('auth.apiErrors.unknown')}: ${status} ${code}`;
    addToast(systemMsg, 'error');
    return systemMsg;
  }

  return message || t('auth.apiErrors.unknown');
};

export const processPostgrestError = (error: PostgrestError): string | null => {
  const { code, message } = error;
  const { addToast } = useToastStore.getState();
  const t = (key: ParseKeys): string => i18next.t(key);

  const isSystemError =
    code.startsWith('42') || // Syntax/Permission Errors
    code.startsWith('5') || // Server error
    message === 'Fetch error';

  if (isSystemError) {
    const systemMsg = t('auth.apiErrors.systemError');
    addToast(systemMsg, 'error');
    return SYSTEM_ERROR;
  }

  if (code === 'PGRST116') {
    const systemMsg = t('auth.apiErrors.unknown');
    addToast(systemMsg, 'error');
    return SYSTEM_ERROR;
  }

  addToast(message, 'error');
  return message;
};
