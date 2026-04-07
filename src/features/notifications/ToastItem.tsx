import React from 'react';
import type { ParseKeys } from 'i18next';
import { useTranslation } from 'react-i18next';
import styles from './Toast.module.css';
import { type IToast } from './types';

interface Props extends IToast {
  onClose: () => void;
}

const textIconMap: Record<IToast['type'], string> = {
  success: '✔',
  error: '✖',
  info: 'ℹ',
};

export const ToastItem: React.FC<Props> = ({ message, type, onClose, isExiting }) => {
  const { t, i18n } = useTranslation();

  const translatedMessage = i18n.exists(message) ? t(message as ParseKeys) : message;

  return (
    <div className={`${styles.toast} ${styles[type]} ${isExiting ? styles.toastExit : ''}`}>
      <span className={styles.icon}>{textIconMap[type]}</span>
      <span className={styles.message}>{translatedMessage}</span>
      <button onClick={onClose} className={styles.closeBtn}>
        &#10006;
      </button>
    </div>
  );
};
