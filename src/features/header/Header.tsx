import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LangSwitcher } from '@shared/LangSwitcher/LangSwitcher';
import { LogoutButton } from '@shared/LogoutButton';
import { ThemeSwitcher } from '@shared/ThemeSwitcher/ThemeSwitcher';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useProfileStore } from '@s/profile.store';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const profile = useProfileStore((state) => state.profile);

  const closeMenu = (): void => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  const toggleMenu = (): void => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    document.body.style.overflow = newState ? 'hidden' : '';
  };

  const navItems = [
    { path: '/dashboard', label: t('header.menu.dashboard') },
    { path: '/library', label: t('header.menu.library') },
    { path: '/profile', label: t('header.menu.profile') },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logoText} onClick={closeMenu}>
          <span>Widget Trainer</span>
        </Link>

        <nav className={clsx(styles.nav, { [styles.navOpen]: isMenuOpen })}>
          <div className={styles.navLinks}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={clsx(styles.navLink, {
                  [styles.navLinkActive]: pathname === item.path,
                })}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className={styles.mobileOnly}>
            <ThemeSwitcher />
            <LangSwitcher />
            <LogoutButton className={styles.logoutButton}>{t('header.user.signOut')}</LogoutButton>
          </div>
        </nav>

        <div className={styles.rightSection}>
          <ThemeSwitcher />
          <LangSwitcher />
          <div className={styles.userSection}>
            <div className={styles.avatar}>
              {profile?.firstName?.charAt(0) || 'U'}
              {profile?.lastName?.charAt(0) || 'P'}
            </div>
            <LogoutButton className={styles.logoutButton}>{t('header.user.signOut')}</LogoutButton>
          </div>
        </div>

        <button
          className={clsx(styles.burger, { [styles.burgerActive]: isMenuOpen })}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
