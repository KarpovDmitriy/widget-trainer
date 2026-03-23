import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { authContent as authEn } from '../locales/en/auth';
import { headerContent as headerEn } from '../locales/en/header';
import { libraryContent as libraryEn } from '../locales/en/library';
import { profileContent as profileEn } from '../locales/en/profile';
import { authContent as authRu } from '../locales/ru/auth';
import { headerContent as headerRu } from '../locales/ru/header';
import { libraryContent as libraryRu } from '../locales/ru/library';
import { profileContent as profileRu } from '../locales/ru/profile';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          ...authEn,
          ...headerEn,
          ...profileEn,
          ...libraryEn,
        },
      },
      ru: {
        translation: {
          ...authRu,
          ...profileRu,
          ...headerRu,
          ...libraryRu,
        },
      },
    },
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export { i18n };
