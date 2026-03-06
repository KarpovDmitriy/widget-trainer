import React from 'react';
import type { ReactNode } from 'react';
import styles from './Field.module.css';

interface FieldProps {
  label: string;
  error?: string | boolean;
  children: ReactNode;
  extra?: ReactNode;
}

const Field: React.FC<FieldProps> = ({ label, error, children, extra }) => {
  const errorMessage = typeof error === 'string' ? error : '';

  return (
    <div className={styles.inputGroup}>
      <div className={styles.labelRow}>
        <label className={styles.label}>{label}</label>
        {extra && <div className={styles.extra}>{extra}</div>}
      </div>

      <div className={error ? styles.hasError : ''}>{children}</div>

      {errorMessage && <div className={styles.errorText}>{errorMessage}</div>}
    </div>
  );
};

export default Field;
