import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogoutButton } from '@shared/LogoutButton';
import { useProfileStore } from '@s/profile.store';
import { headerContent } from '../../locales/en/header';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const { header } = headerContent;

  const profile = useProfileStore((state) => state.profile);
  const [currentLang, setCurrentLang] = useState<'en' | 'ru'>('en');

  const navItems = [
    { path: '/dashboard', label: header.menu.dashboard },
    { path: '/profile', label: header.menu.profile },
  ];

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoText}>
        {header.logo}
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
        <div className={styles.langSwitcher}>
          <button
            className={`${styles.langBtn} ${currentLang === 'en' ? styles.langBtnActive : ''}`}
            onClick={() => setCurrentLang('en')}
          >
            {header.languages.en}
          </button>
          <button
            className={`${styles.langBtn} ${currentLang === 'ru' ? styles.langBtnActive : ''}`}
            onClick={() => setCurrentLang('ru')}
          >
            {header.languages.ru}
          </button>
        </div>

        <div className={styles.userSection}>
          <div className={styles.avatar}>
            {profile?.firstName?.[0] || 'U'}
            {profile?.lastName?.[0] || 'P'}
          </div>
          <LogoutButton>{header.user.signOut}</LogoutButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
