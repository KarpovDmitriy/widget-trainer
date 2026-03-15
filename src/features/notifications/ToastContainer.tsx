import React from 'react';
import { createPortal } from 'react-dom';
import styles from './Toast.module.css';
import { ToastItem } from './ToastItem';
import { useToast } from './useToast';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) {
    return null;
  }

  return createPortal(
    <div className={styles.container}>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>,
    document.body,
  );
};
