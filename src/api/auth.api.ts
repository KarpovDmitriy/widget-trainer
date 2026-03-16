import { processAuthError } from '@api/helpers';
import { SYSTEM_ERROR } from '@shared/Constants/constants';
import type { AuthResponse as SupabaseResponse, User } from '@supabase/supabase-js';
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

const handleAuthRequest = async (request: () => Promise<SupabaseResponse>): Promise<AuthResult> => {
  try {
    const { data, error } = await request();

    if (error) {
      return {
        user: null,
        error: processAuthError(error),
      };
    }

    if (!data || !data.user) {
      // TODO: I18N: The 'errors.unknown' key can be returned here
      console.warn('[Auth No Error No user]:', data); //TODO: remove the console when toast system will be implemented.
      return {
        user: null,
        error: 'unknown_error',
      };
    }

    return {
      user: data.user,
      error: null,
    };
  } catch (err: unknown) {
    console.warn('[Auth API Catch]:', err); //TODO: remove the console when toast system will be implemented.
    // TODO: TOAST: addToast('Critical error', 'error')
    return {
      user: null,
      error: SYSTEM_ERROR,
    };
  }
};

export const authLogin = async ({ email, password }: LoginPayload): Promise<AuthResult> => {
  return handleAuthRequest(() => supabase.auth.signInWithPassword({ email, password }));
};

export const authRegister = async ({ email, password, username }: RegisterPayload): Promise<AuthResult> => {
  return handleAuthRequest(() =>
    supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    }),
  );
};

export const authLogout = async (): Promise<{ error: string | null }> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return { error: processAuthError(error) };
    }
    return { error: null };
  } catch (err: unknown) {
    console.warn('[Auth API Catch]:', err); //TODO: remove the console when toast system will be implemented.
    // TODO: TOAST: addToast('Critical error', 'error')
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
