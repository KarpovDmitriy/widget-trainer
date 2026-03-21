import { create } from 'zustand';
import * as profileApi from '@api/profile.api';
import type { UserData } from '@data/userDefaults';
import { SYSTEM_ERROR } from '@shared/Constants/constants';
import { useToastStore } from './toast.store';

interface ProfileState {
  profile: UserData | null;
  isLoading: boolean;
  error: string | null;
  fetchProfile: (userId: string) => Promise<void>;
  saveProfile: (userId: string, data: UserData) => Promise<string | null>;
  reset: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  isLoading: false,
  error: null,

  fetchProfile: async (userId: string): Promise<void> => {
    set({ isLoading: true, error: null });

    const { data, error } = await profileApi.getProfile(userId);

    set({
      profile: data,
      error,
      isLoading: false,
    });

    if (error && error !== SYSTEM_ERROR) {
      useToastStore.getState().addToast(error, 'error');
    }
  },

  saveProfile: async (userId: string, profileData: UserData): Promise<string | null> => {
    set({ isLoading: true, error: null });

    const { data, error } = await profileApi.saveProfile(userId, profileData);

    set({
      profile: data,
      error,
      isLoading: false,
    });

    if (!error) {
      useToastStore.getState().addToast('profile.saveSuccess', 'success');
      return null;
    }

    return error;
  },

  reset: (): void => set({ profile: null, isLoading: false, error: null }),
}));
