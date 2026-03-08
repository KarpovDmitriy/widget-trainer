import { create } from 'zustand';
import * as authApi from '@api/auth.api';
import * as profileApi from '@api/profile.api';
import type { UserData } from '@data/userDefaults';
import type { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  profile: UserData | null;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  saveProfile: (data: UserData) => Promise<void>;
  clearError: () => void;
  setUser: (user: User | null) => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  profile: null,
  isLoading: true,
  error: null,

  initialize: async (): Promise<void> => {
    try {
      set({ isLoading: true, error: null });

      const user = await authApi.getCurrentUser();

      set({
        user,
        isLoading: false,
      });

      if (user) {
        const profile = await profileApi.getProfile(user.id);
        set({ profile });
      }
    } catch (err) {
      set({
        user: null,
        isLoading: false,
        error: (err as Error).message,
      });
    }
  },

  login: async (email: string, password: string): Promise<void> => {
    try {
      set({ isLoading: true, error: null });

      const result = await authApi.login({ email, password });

      set({
        user: result.user,
        isLoading: false,
      });

      alert(`[Auth] Logged in as ${result.user.user_metadata?.username ?? 'unknown'} (${email})`);

      const profile = await profileApi.getProfile(result.user.id);
      set({ profile });
    } catch (err) {
      set({
        isLoading: false,
        error: (err as Error).message,
      });

      throw err;
    }
  },

  register: async (username: string, email: string, password: string): Promise<void> => {
    try {
      set({ isLoading: true, error: null });

      const result = await authApi.register({ username, email, password });

      set({
        user: result.user,
        isLoading: false,
      });
    } catch (err) {
      set({
        isLoading: false,
        error: (err as Error).message,
      });

      throw err;
    }
  },

  logout: async (): Promise<void> => {
    const { user } = get();

    try {
      set({ isLoading: true, error: null });

      alert(`[Auth] User ${user?.email ?? 'unknown'} logged out`);

      await authApi.logout();

      set({
        user: null,
        profile: null,
        isLoading: false,
      });
    } catch (err) {
      set({
        isLoading: false,
        error: (err as Error).message,
      });

      throw err;
    }
  },

  fetchProfile: async (): Promise<void> => {
    const { user } = get();

    if (!user) {
      return;
    }

    try {
      const profile = await profileApi.getProfile(user.id);
      set({ profile });
    } catch (err) {
      set({
        error: (err as Error).message,
      });
    }
  },

  saveProfile: async (data: UserData): Promise<void> => {
    const { user } = get();

    if (!user) {
      return;
    }

    try {
      set({ error: null });

      const updated = await profileApi.saveProfile(user.id, data);

      set({
        profile: updated,
      });
    } catch (err) {
      set({
        error: (err as Error).message,
      });

      throw err;
    }
  },

  clearError: (): void => {
    set({ error: null });
  },

  setUser: (user: User | null): void => {
    set({ user });
  },
}));
