import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// interface LoaderState {
//   isLoading: boolean;
//   activeRequests: number;
//   showLoader: () => void;
//   hideLoader: () => void;
// }

// export const useLoaderStore = create<LoaderState>((set) => ({
//   isLoading: false,
//   activeRequests: 0,

//   showLoader: (): void =>
//     set((state) => ({
//       activeRequests: state.activeRequests + 1,
//       isLoading: true,
//     })),

//   hideLoader: (): void =>
//     set((state) => {
//       const nextRequests = Math.max(0, state.activeRequests - 1);
//       const stillLoading = nextRequests > 0;

//       return {
//         activeRequests: nextRequests,
//         isLoading: stillLoading,
//       };
//     }),
// }));

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
    // isAnyLoading2: (): boolean => {
    //   const state = get();
    //   const flagKeys = Object.keys(initialFlags) as Array<keyof LoaderFlags>;

    //   return flagKeys.some((key) => state[key]);
    // },
  })),
);
