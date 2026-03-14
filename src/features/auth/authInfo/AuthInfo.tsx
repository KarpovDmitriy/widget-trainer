import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './AuthInfo.module.css';

// Типизируем структуру фичи для безопасности
interface Feature {
  label: string;
  text: string;
}

const HeaderAuth: React.FC = () => {
  const { t } = useTranslation();

  // ИСПРАВЛЕНО: заменен ключ .title на .features
  const features = t('auth.aside.features', { returnObjects: true }) as Feature[];

  return (
    <div className={styles.authAside}>
      <h1>{t('auth.aside.title')}</h1>
      <div className={styles.authAsideContent}>
        <h2>{t('auth.aside.subtitle')}</h2>
        <p className={styles.authAsideDescription}>{t('auth.aside.description')}</p>

        <ul className={styles.authAsideFeatures}>
          {/* Проверка Array.isArray важна, если перевод вдруг не загрузится */}
          {Array.isArray(features) &&
            features.map((feature, index) => (
              <li key={index}>
                <strong>{feature.label}</strong> {feature.text}
              </li>
            ))}
        </ul>
      </div>
      <div className={styles.authAsideFooter}>
        <span>{t('auth.aside.footer')}</span>
      </div>
    </div>
  );
};

export default HeaderAuth;
