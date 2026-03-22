import { processAuthError } from '@api/helpers';
import { SYSTEM_ERROR } from '@shared/Constants/constants';
import type { AuthResponse as SupabaseResponse, User } from '@supabase/supabase-js';
import { i18CheckPath } from '@utils/zod-i18.typecheck';
import { useToastStore } from '@s/toast.store';
import { supabase } from '@src/lib/supabase';

export interface LoginPayload {
  email: string;
  password: string;
}
export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}
export interface AuthResult {
  user: User | null;
  error: string | null;
}

const handleAuthRequest = async (
  request: () => Promise<SupabaseResponse>,
  successMsg?: string,
): Promise<AuthResult> => {
  try {
    const { data, error } = await request();

    if (error) {
      return { user: null, error: processAuthError(error) };
    }

    if (!data?.user) {
      const errorMsg = i18CheckPath('auth.apiErrors.unknown');
      useToastStore.getState().addToast(errorMsg, 'error');
      return { user: null, error: errorMsg };
    }

    if (successMsg) {
      useToastStore.getState().addToast(successMsg, 'success');
    }

    return { user: data.user, error: null };
  } catch {
    const errorMsg = i18CheckPath('auth.apiErrors.systemError');
    useToastStore.getState().addToast(errorMsg, 'error');
    return { user: null, error: SYSTEM_ERROR };
  }
};

export const authLogin = async (payload: LoginPayload): Promise<AuthResult> => {
  return handleAuthRequest(
    () => supabase.auth.signInWithPassword(payload),
    i18CheckPath('auth.apiErrors.loginSuccess'),
  );
};

export const authRegister = async ({ email, password, username }: RegisterPayload): Promise<AuthResult> => {
  return handleAuthRequest(
    () =>
      supabase.auth.signUp({
        email,
        password,
        options: { data: { username } },
      }),
    i18CheckPath('auth.apiErrors.registerSuccess'),
  );
};

export const authLogout = async (): Promise<{ error: string | null }> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return { error: processAuthError(error) };
    }
    return { error: null };
  } catch {
    useToastStore.getState().addToast(i18CheckPath('auth.apiErrors.systemError'), 'error');
    return { error: SYSTEM_ERROR };
  }
};

export const onSessionChange = (callback: (user: User | null) => void) => {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    console.warn({ _event, session });
    callback(session?.user ?? null);
  });
  return (): void => subscription.unsubscribe();
};
