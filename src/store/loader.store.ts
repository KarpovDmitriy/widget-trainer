import { create } from 'zustand';

interface LoaderState {
  isLoading: boolean;
  activeRequests: number;
  showLoader: () => void;
  hideLoader: () => void;
}

export const useLoaderStore = create<LoaderState>((set) => ({
  isLoading: false,
  activeRequests: 0,

  showLoader: (): void =>
    set((state) => ({
      activeRequests: state.activeRequests + 1,
      isLoading: true,
    })),

  hideLoader: (): void =>
    set((state) => {
      const nextRequests = Math.max(0, state.activeRequests - 1);
      const stillLoading = nextRequests > 0;

      return {
        activeRequests: nextRequests,
        isLoading: stillLoading,
      };
    }),
}));
