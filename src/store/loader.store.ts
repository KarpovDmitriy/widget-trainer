import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface LoaderFlags {
  isAuthLoading: boolean;
  isProfileLoading: boolean;
  isAppLoading: boolean;
}

interface LoaderAction {
  setLoading: (flags: Partial<LoaderFlags>) => void;
}

interface LoaderComputed {
  isAnyLoading: boolean;
}

type LoaderStore = LoaderFlags & LoaderAction & LoaderComputed;

const initialFlags: LoaderFlags = {
  isAuthLoading: false,
  isProfileLoading: false,
  isAppLoading: true,
};

const computeIsAnyLoading = (flags: LoaderFlags): boolean => {
  return Object.values(flags).some((x) => x);
};

const FLAG_KEYS = Object.keys(initialFlags) as Array<keyof LoaderFlags>;

export const useLoaderStore = create<LoaderStore>()(
  devtools((set) => ({
    ...initialFlags,
    isAnyLoading: computeIsAnyLoading(initialFlags),
    setLoading: (flags: Partial<LoaderFlags>): void => {
      set((state) => {
        const newState = { ...state, ...flags };
        const isAnyLoading = FLAG_KEYS.some((key) => newState[key]);

        return { ...newState, isAnyLoading };
      });
    },
  })),
);
