import type { User } from '@supabase/supabase-js';
import { supabase } from '@src/lib/supabase';
import { AuthError, NetworkError } from './errors';

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
  user: User;
}

export const login = async (payload: LoginPayload): Promise<AuthResult> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });

    if (error) {
      throw new AuthError(error.message, error.code);
    }

    if (!data.user) {
      throw new AuthError('Login succeeded but no user returned');
    }

    return { user: data.user };
  } catch (err) {
    if (err instanceof AuthError) {
      throw err;
    }
    throw new NetworkError((err as Error).message);
  }
};

export const register = async (payload: RegisterPayload): Promise<AuthResult> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        data: { username: payload.username },
      },
    });

    if (error) {
      throw new AuthError(error.message, error.code);
    }

    if (!data.user) {
      throw new AuthError('Registration succeeded but no user returned');
    }

    return { user: data.user };
  } catch (err) {
    if (err instanceof AuthError) {
      throw err;
    }
    throw new NetworkError((err as Error).message);
  }
};

export const logout = async (): Promise<void> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new AuthError(error.message, error.code);
    }
  } catch (err) {
    if (err instanceof AuthError) {
      throw err;
    }
    throw new NetworkError((err as Error).message);
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      throw new AuthError(error.message, error.code);
    }

    return user;
  } catch (err) {
    if (err instanceof AuthError) {
      throw err;
    }
    throw new NetworkError((err as Error).message);
  }
};
