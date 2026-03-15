import React from 'react';
import styles from './Toast.module.css';
import { type IToast } from './types';

interface Props extends IToast {
  onClose: () => void;
}

export const ToastItem: React.FC<Props> = ({ message, type, onClose }) => {
  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <span className={styles.message}>{message}</span>
      <button onClick={onClose} className={styles.closeBtn}>
        &times;
      </button>
    </div>
  );
};
