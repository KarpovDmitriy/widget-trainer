import React from 'react';
import type { ParseKeys } from 'i18next';
import { useTranslation } from 'react-i18next';
import styles from './Toast.module.css';
import { type IToast } from './types';

interface Props extends IToast {
  onClose: () => void;
}

export const ToastItem: React.FC<Props> = ({ message, type, onClose }) => {
  const { t, i18n } = useTranslation();

  message = i18n.exists(message) ? t(message as ParseKeys) : message;

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <span className={styles.message}>{message}</span>
      <button onClick={onClose} className={styles.closeBtn}>
        &times;
      </button>
    </div>
  );
};
