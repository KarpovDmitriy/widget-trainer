import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@shared/Constants/paths';
import { LangSwitcher } from '@shared/LangSwitcher/LangSwitcher';
import { useTranslation } from 'react-i18next';
import Button from '@src/shared/Button/Button';
import { useAuthStore } from '@src/store/auth.store';
import ui from './Landing.module.css';

export const LandingPageFeature: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, isAuthInit } = useAuthStore();
  const isAuthenticated = !!user;
  const ICONS = ['📊', '🎯', '📚'];

  const features = t('landing.features', { returnObjects: true });

  if (!isAuthInit) {
    return null;
  }

  return (
    <div className={ui.landingContainer}>
      <header className={ui.header}>
        <h1 className={ui.logo}>{t('landing.title')}</h1>

        <LangSwitcher buttonClassName={ui.langBtn} containerClassName={ui.langSwitcher} />
      </header>

      <main className={ui.hero}>
        <h2 className={ui.title}>
          <p className={ui.gradientText}> {t('landing.subtitle')}</p>
        </h2>

        <p className={ui.description}>{t('landing.description')}</p>

        <div className={ui.actions}>
          {isAuthenticated ? (
            <Button variant="primary" onClick={() => navigate(PATHS.DASHBOARD)} className={ui.mainBtn}>
              {t('landing.buttonStart')}
            </Button>
          ) : (
            <div className={ui.guestActions}>
              <Button variant="primary" onClick={() => navigate(PATHS.LOGIN)} className={ui.authBtn}>
                {t('landing.buttonLogin')}
              </Button>
              <Button variant="primary" onClick={() => navigate(PATHS.REGISTER)} className={ui.authBtn}>
                {t('landing.buttonSignUp')}
              </Button>
            </div>
          )}
        </div>
      </main>

      <section className={ui.widgetsSection}>
        <h2 className={ui.sectionTitle}>{t('landing.instruments')}</h2>

        <div className={ui.widgetGrid}>
          {Array.isArray(features) &&
            features.map((feature, index) => (
              <div key={index} className={ui.widgetCard}>
                <div className={ui.iconBox}>{ICONS[index % ICONS.length]}</div>
                <h3>{feature.label}</h3>
                <p>{feature.text}</p>
              </div>
            ))}
        </div>
      </section>

      <footer className={ui.footer}>{t('landing.footer')}</footer>
    </div>
  );
};
