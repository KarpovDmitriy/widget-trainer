import 'i18next';
import { authContent } from '../locales/en/auth';
import { headerContent } from '../locales/en/header';
import { libraryContent } from '../locales/en/library';
import { profileContent } from '../locales/en/profile';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    returnNull: false;
    resources: {
      translation: typeof authContent & typeof profileContent & typeof headerContent & typeof libraryContent;
    };
  }
}

export {};
