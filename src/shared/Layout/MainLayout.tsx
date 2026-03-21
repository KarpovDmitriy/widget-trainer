import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@features/header/Header';
import styles from './MainLayout.module.css';

export const MainLayout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};
