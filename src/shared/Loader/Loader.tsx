import React from 'react';
import styles from './Loader.module.css';

export const Loader: React.FC = (): React.JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.bar} />
    </div>
  );
};
