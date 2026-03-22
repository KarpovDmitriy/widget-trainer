export type ToastType = 'success' | 'error' | 'info';

export interface IToast {
  id: number;
  message: string;
  type: ToastType;
  msec?: number;
  isExiting?: boolean;
}

export interface ToastContextType {
  addToast: (message: string, type?: ToastType, msec?: number) => void;
  removeToast: (id: number) => void;
  toasts: IToast[];
}
