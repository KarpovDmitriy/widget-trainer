import { create } from 'zustand';
import type { IToast, ToastType } from '@features/notifications/types';

interface ToastState {
  toasts: IToast[];
  addToast: (message: string, type?: ToastType, msec?: number) => void;
  removeToast: (id: number) => void;
  dismissToast: (id: number) => void;
}

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],

  addToast: (message, type = 'info', msec = 4000): void => {
    const id = Date.now();
    const newToast: IToast = { id, message, type, msec };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    setTimeout(() => {
      get().removeToast(id);
    }, msec);
  },

  removeToast: (id): void => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  dismissToast: (id): void => {
    set((state) => ({
      toasts: state.toasts.map((t) => (t.id === id ? { ...t, isExiting: true } : t)),
    }));
    setTimeout(() => {
      get().removeToast(id);
    }, 300);
  },
}));
