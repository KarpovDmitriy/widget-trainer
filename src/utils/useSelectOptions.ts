import { useMemo } from 'react';
import { type SelectOption, getCountryOptions, getLanguageOptions, getTimezoneOptions } from '@data/selectOptions';
import { useTranslation } from 'react-i18next';

interface UseSelectOptionsReturn {
  countryOptions: SelectOption[];
  languageOptions: SelectOption[];
  timezoneOptions: SelectOption[];
  displayCountry: string;
  displayLanguage: string;
  displayTimezone: string;
}

interface ProfileDataInput {
  country?: string;
  language?: string;
  timezone?: string;
}

export const useSelectOptions = (profileData?: ProfileDataInput): UseSelectOptionsReturn => {
  const { i18n } = useTranslation();

  const countryOptions = useMemo(() => getCountryOptions(i18n.language), [i18n.language]);
  const languageOptions = useMemo(() => getLanguageOptions(i18n.language), [i18n.language]);
  const timezoneOptions = useMemo(() => getTimezoneOptions(i18n.language), [i18n.language]);

  const displayCountry = useMemo(
    () => countryOptions.find((o) => o.value === profileData?.country)?.label || profileData?.country || '',
    [countryOptions, profileData?.country],
  );

  const displayLanguage = useMemo(
    () => languageOptions.find((o) => o.value === profileData?.language)?.label || profileData?.language || '',
    [languageOptions, profileData?.language],
  );

  const displayTimezone = useMemo(
    () => timezoneOptions.find((o) => o.value === profileData?.timezone)?.label || profileData?.timezone || '',
    [timezoneOptions, profileData?.timezone],
  );

  return {
    countryOptions,
    languageOptions,
    timezoneOptions,
    displayCountry,
    displayLanguage,
    displayTimezone,
  };
};
