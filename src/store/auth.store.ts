import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  isAuthInit: boolean; // Did the first session check pass in Supabase?
}

interface AuthActions {
  setUser: (user: User | null) => void;
  setAuthInit: (value: boolean) => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      user: null,
      isAuthInit: false,

      setUser: (user): void => set({ user }, false, 'setUser'),
      setAuthInit: (isAuthInit): void => set({ isAuthInit }, false, 'setAuthInit'),
    }),
    { name: 'AuthStore', enabled: true, anonymousActionType: 'unknown' },
  ),
);
