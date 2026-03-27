import { authContent } from '@locales/en/auth';
import { commonContent } from '@locales/en/common';
import { headerContent } from '@locales/en/header';
import { profileContent } from '@locales/en/profile';
import 'i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    returnNull: false;
    resources: {
      translation: typeof authContent & typeof profileContent & typeof headerContent & typeof commonContent;
    };
  }
}

export {};
