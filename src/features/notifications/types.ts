export type ToastType = 'success' | 'error' | 'info';

export interface IToast {
  id: number;
  message: string;
  type: ToastType;
}

export interface ToastContextType {
  addToast: (message: string, type?: ToastType) => void;
  removeToast: (id: number) => void;
  toasts: IToast[];
}
