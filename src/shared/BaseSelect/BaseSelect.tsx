import React from 'react';
import styles from './BaseSelect.module.css';

interface BaseSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

const BaseSelect: React.FC<BaseSelectProps> = ({ label, children, className, ...rest }) => {
  return (
    <div className={styles.field}>
      {label && <label className={styles.label}>{label}</label>}
      <select className={`${styles.select} ${className ?? ''}`} {...rest}>
        {children}
      </select>
    </div>
  );
};

export default BaseSelect;
