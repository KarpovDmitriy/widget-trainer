import { useToastStore } from '@s/toast.store';
import type { ToastContextType } from './types';

export const useToast = (): ToastContextType => {
  const addToast = useToastStore((s) => s.addToast);
  const removeToast = useToastStore((s) => s.removeToast);
  const toasts = useToastStore((s) => s.toasts);

  return {
    addToast,
    removeToast,
    toasts,
  };
};
