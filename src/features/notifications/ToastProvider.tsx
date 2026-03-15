import React, { type ReactNode, useCallback, useState } from 'react';
import { ToastContext } from './ToastContext';
import type { IToast, ToastType } from './types';

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const removeToast = useCallback((id: number): void => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (message: string, type: ToastType = 'info'): void => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        removeToast(id);
      }, 4000);
    },
    [removeToast],
  );

  return <ToastContext.Provider value={{ addToast, removeToast, toasts }}>{children}</ToastContext.Provider>;
};
