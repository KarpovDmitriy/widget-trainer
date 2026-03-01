import React from 'react';
import styles from './Field.module.css';

interface FieldProps {
  label: string;
  error?: string | boolean | null;
  children: React.ReactNode;
  extra?: React.ReactNode;
}

const Field: React.FC<FieldProps> = ({ label, error, children, extra }) => (
  <div className={styles.inputGroup}>
    <div className={styles.labelRow}>
      <label className={styles.label}>{label}</label>
      {extra}
    </div>
    {children}
    {error && typeof error === 'string' && <div className={styles.errorText}>{error}</div>}
  </div>
);

export default Field;
