import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LangSwitcher.module.css';

export const LangSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const currentLang = i18n.language.substring(0, 2);

  const changeLanguage = (lng: string): void => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={styles.langSwitcher}>
      <button
        type="button"
        className={`${styles.langBtn} ${currentLang === 'en' ? styles.langBtnActive : ''}`}
        onClick={() => changeLanguage('en')}
      >
        EN
      </button>
      <button
        type="button"
        className={`${styles.langBtn} ${currentLang === 'ru' ? styles.langBtnActive : ''}`}
        onClick={() => changeLanguage('ru')}
      >
        RU
      </button>
    </div>
  );
};
