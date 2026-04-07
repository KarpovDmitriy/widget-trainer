import { create } from 'zustand';

interface SoundStore {
  isSoundEnabled: boolean;
  toggleSound: () => void;
}

const STORAGE_KEY = 'soundEnabled';

const getSavedPreference = (): boolean => {
  const saved = localStorage.getItem(STORAGE_KEY);
  // Sound is ON by default
  return saved === null ? true : saved === 'true';
};

export const useSoundStore = create<SoundStore>(
  (set): SoundStore => ({
    isSoundEnabled: getSavedPreference(),

    toggleSound: (): void =>
      set((state) => {
        const next = !state.isSoundEnabled;
        localStorage.setItem(STORAGE_KEY, String(next));
        return { isSoundEnabled: next };
      }),
  }),
);
