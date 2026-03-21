import { processAuthError } from '@api/helpers';
import { SYSTEM_ERROR } from '@shared/Constants/constants';
import type { AuthResponse as SupabaseResponse, User } from '@supabase/supabase-js';
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
      return {
        user: null,
        error: processAuthError(error),
      };
    }

    if (!data || !data.user) {
      const errorMsg = 'Unknown error: user data missing';
      useToastStore.getState().addToast(errorMsg, 'error');
      return {
        user: null,
        error: errorMsg,
      };
    }

    if (successMsg) {
      useToastStore.getState().addToast(successMsg, 'success');
    }

    return {
      user: data.user,
      error: null,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Critical auth error';
    useToastStore.getState().addToast(errorMsg, 'error');
    return {
      user: null,
      error: SYSTEM_ERROR,
    };
  }
};

export const authLogin = async ({ email, password }: LoginPayload): Promise<AuthResult> => {
  return handleAuthRequest(() => supabase.auth.signInWithPassword({ email, password }), 'Successfully logged in!');
};

export const authRegister = async ({ email, password, username }: RegisterPayload): Promise<AuthResult> => {
  return handleAuthRequest(
    () =>
      supabase.auth.signUp({
        email,
        password,
        options: { data: { username } },
      }),
    'Account created successfully!',
  );
};

export const authLogout = async (): Promise<{ error: string | null }> => {
  const { addToast } = useToastStore.getState();
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return { error: processAuthError(error) };
    }
    return { error: null };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Critical logout error';
    addToast(errorMsg, 'error');
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
