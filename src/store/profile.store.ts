import { create } from 'zustand';
import * as profileApi from '@api/profile.api';
import type { UserData } from '@data/userDefaults';

//TODO:  import { useToastStore } from './toast.store';

interface ProfileState {
  profile: UserData | null;
  isLoading: boolean;
  error: string | null;
  fetchProfile: (userId: string) => Promise<void>;
  saveProfile: (userId: string, data: UserData) => Promise<void>;
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

    // TODO: TOAST: if (error && error !== SYSTEM_ERROR) useToastStore.getState().addToast(error, 'error');
  },

  saveProfile: async (userId: string, profileData: UserData): Promise<void> => {
    set({ isLoading: true, error: null });

    const { data, error } = await profileApi.saveProfile(userId, profileData);

    set({
      profile: data,
      error,
      isLoading: false,
    });

    if (!error) {
      // TODO: TOAST: useToastStore.getState().addToast('Profile successfully updated', 'success');
    } else {
      // TODO: TOAST: if (error !== SYSTEM_ERROR) useToastStore.getState().addToast(error, 'error');
      throw new Error(error); // Pass it on for local processing in the form
    }
  },

  reset: (): void => set({ profile: null, isLoading: false, error: null }),
}));
