import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LangSwitcher } from '@shared/LangSwitcher/LangSwitcher';
import { LogoutButton } from '@shared/LogoutButton';
import { useTranslation } from 'react-i18next';
import { useProfileStore } from '@s/profile.store';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const profile = useProfileStore((state) => state.profile);

  const navItems = [
    { path: '/dashboard', label: t('header.menu.dashboard') },
    { path: '/profile', label: t('header.menu.profile') },
  ];

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoText}>
        <span>Widget Trainer</span>
      </Link>

      <nav className={styles.nav}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`${styles.navLink} ${pathname === item.path ? styles.navLinkActive : ''}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className={styles.rightSection}>
        <LangSwitcher />

        <div className={styles.userSection}>
          <div className={styles.avatar}>
            {profile?.firstName?.charAt(0) || 'U'}
            {profile?.lastName?.charAt(0) || 'P'}
          </div>

          <LogoutButton>{t('header.user.signOut')}</LogoutButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
