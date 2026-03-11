import { SYSTEM_ERROR } from '@shared/Constants/constants';
import type { AuthError, PostgrestError } from '@supabase/supabase-js';

export const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export const processAuthError = (error: AuthError): string | null => {
  const { status, message, code } = error;
  // TODO: TOAST: const { showToast } = useToastStore.getState();
  // TODO: add an i18n store and, depending on the language, retrieve systemMsg errors.

  const isSystemError =
    !status ||
    status >= 500 ||
    status === 429 ||
    status === 401 ||
    message === 'Fetch error' ||
    (status === 400 && (message.includes('configuration') || message.includes('provider')));

  if (isSystemError) {
    let systemMsg = 'A system error occurred';

    if (status === 429) {
      systemMsg = 'Too many attempts. Please wait.';
    } else if (message === 'Fetch error') {
      systemMsg = 'Network error. Check your connection.';
    } else if (status && status >= 500) {
      systemMsg = 'Server error. We are working on fixing it.';
    }

    // TODO: I18N: Translate systemMsg based on lang
    // TODO: TOAST: addToast(systemMsg, 'error')
    console.warn(`[System Auth Error]: ${systemMsg}`, {
      //TODO: remove console when toast system will be implemented
      message,
      systemMsg,
    });

    return SYSTEM_ERROR;
  }

  if (!message) {
    const systemMsg = `unknown_auth_error, status: ${status}, code: ${code}`;
    console.warn(`[System Auth Error]: ${systemMsg}`, {
      //TODO: remove console when toast system will be implemented
      systemMsg,
      message,
      code,
      status,
    });
    return systemMsg;
  }

  /*
  // 4. Errors that the component must handle (400, 401, 422)
  // - Invalid login credentials (400)
  // - User already registered (400/422)
  // - Weak password (422)
  // - Email not confirmed (400)
      TODO: add i18n store and take error message depending on language.
    */
  return message;
};

export const processPostgrestError = (error: PostgrestError): string | null => {
  const { code, message } = error;
  // TODO: TOAST: const { showToast } = useToastStore.getState();

  const isSystemError =
    code.startsWith('42') || // Syntax/Permission Errors
    code.startsWith('5') || // Server error
    message === 'Fetch error';

  if (isSystemError) {
    const systemMsg = 'Database error. Please try again later.';
    // TODO: TOAST: showToast(systemMsg, 'error')
    console.warn(`[System DB Error]: ${message}`, { code, message, systemMsg });
    return SYSTEM_ERROR;
  }

  if (code === 'PGRST116') {
    // TODO: TOAST: showToast(systemMsg, 'error')
    return SYSTEM_ERROR;
  }

  console.warn(`[DB Error]: ${message}`, { code });
  // TODO: Decide whether to send them to toasts or show them on the profile
  // TODO: TOAST: showToast(systemMsg, 'error')

  return message;
};
