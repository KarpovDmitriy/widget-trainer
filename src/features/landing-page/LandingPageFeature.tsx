import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@shared/Constants/paths';
import { LangSwitcher } from '@shared/LangSwitcher/LangSwitcher';
import { ThemeSwitcher } from '@shared/ThemeSwitcher/ThemeSwitcher';
import { useTranslation } from 'react-i18next';
import Button from '@src/shared/Button/Button';
import { useAuthStore } from '@src/store/auth.store';
import ui from './Landing.module.css';

export const LandingPageFeature: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, isAuthInit } = useAuthStore();
  const isAuthenticated = !!user;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const ICONS = ['📊', '🎯', '📚'];
  const STEP_ICONS = ['1️⃣', '2️⃣', '3️⃣'];
  const STAT_ICONS = ['📚', '❓', '👥'];

  const features = t('landing.features', { returnObjects: true });
  const steps = t('landing.steps', { returnObjects: true });
  const stats = t('landing.stats', { returnObjects: true });
  const faqs = t('landing.faqs', { returnObjects: true });

  const toggleFaq = (index: number): void => {
    setOpenFaq(openFaq === index ? null : index);
  };

  if (!isAuthInit) {
    return null;
  }

  return (
    <div className={ui.landingContainer}>
      <header className={ui.header}>
        <h1 className={ui.logo}>{t('landing.title')}</h1>

        <div className={ui.headerControls}>
          <ThemeSwitcher />
          <LangSwitcher buttonClassName={ui.langBtn} containerClassName={ui.langSwitcher} />
        </div>
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

      <section className={ui.howItWorksSection}>
        <h2 className={ui.sectionTitle}>{t('landing.howItWorks')}</h2>
        <div className={ui.stepsGrid}>
          {Array.isArray(steps) &&
            steps.map((step, index) => (
              <div key={index} className={ui.stepCard}>
                <div className={ui.stepNumber}>{STEP_ICONS[index]}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
        </div>
      </section>

      <section className={ui.statsSection}>
        <div className={ui.statsGrid}>
          {Array.isArray(stats) &&
            stats.map((stat, index) => (
              <div key={index} className={ui.statCard}>
                <span className={ui.statIcon}>{STAT_ICONS[index]}</span>
                <span className={ui.statValue}>{stat.value}</span>
                <span className={ui.statLabel}>{stat.label}</span>
              </div>
            ))}
        </div>
      </section>

      <section className={ui.faqSection}>
        <h2 className={ui.sectionTitle}>{t('landing.faqTitle')}</h2>
        <div className={ui.faqList}>
          {Array.isArray(faqs) &&
            faqs.map((faq, index) => (
              <div key={index} className={ui.faqItem}>
                <button
                  className={`${ui.faqQuestion} ${openFaq === index ? ui.faqOpen : ''}`}
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <span className={ui.faqArrow}>{openFaq === index ? '−' : '+'}</span>
                </button>
                {openFaq === index && <div className={ui.faqAnswer}>{faq.answer}</div>}
              </div>
            ))}
        </div>
      </section>

      <footer className={ui.footer}>{t('landing.footer')}</footer>
    </div>
  );
};
