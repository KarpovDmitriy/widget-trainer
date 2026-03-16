import React from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import styles from './LangSwitcher.module.css';

interface props {
  buttonClassName?: string;
  containerClassName?: string;
}

export const LangSwitcher: React.FC<props> = ({ buttonClassName, containerClassName }) => {
  const { i18n } = useTranslation();

  const currentLang = i18n.language.substring(0, 2);

  const changeLanguage = (lng: string): void => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={clsx(styles.langSwitcher, containerClassName)}>
      <button
        type="button"
        className={clsx(styles.langBtn, buttonClassName, { [styles.langBtnActive]: currentLang === 'en' })}
        onClick={() => changeLanguage('en')}
      >
        EN
      </button>
      <button
        type="button"
        className={clsx(styles.langBtn, buttonClassName, { [styles.langBtnActive]: currentLang === 'ru' })}
        onClick={() => changeLanguage('ru')}
      >
        RU
      </button>
    </div>
  );
};
