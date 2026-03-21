import countries from 'i18n-iso-countries';
import englishLocale from 'i18n-iso-countries/langs/en.json';
import russianLocale from 'i18n-iso-countries/langs/ru.json';
import ISO6391 from 'iso-639-1';
import { DateTime } from 'luxon';

countries.registerLocale(englishLocale);
countries.registerLocale(russianLocale);

export interface SelectOption {
  readonly value: string;
  readonly label: string;
}

const getShortLang = (lang: string): string => {
  if (!lang) {
    return 'en';
  }
  return lang.split('-')[0];
};

export const getCountryOptions = (lang: string): SelectOption[] => {
  const shortLang = getShortLang(lang);
  const targetLang = ['en', 'ru'].includes(shortLang) ? shortLang : 'en';
  const countriesObj = countries.getNames(targetLang, { select: 'official' });

  return Object.entries(countriesObj)
    .map(([code, name]) => ({
      value: code,
      label: name,
    }))
    .sort((a, b) => a.label.localeCompare(b.label, targetLang));
};

export const getLanguageOptions = (lang: string): SelectOption[] => {
  const shortLang = lang.split('-')[0];

  return ISO6391.getAllCodes()
    .map((code) => {
      if (shortLang === 'en') {
        return {
          value: code,
          label: ISO6391.getName(code),
        };
      }

      try {
        const languageNames = new Intl.DisplayNames([shortLang], { type: 'language' });
        const localizedLabel = languageNames.of(code);
        return {
          value: code,
          label: localizedLabel
            ? localizedLabel.charAt(0).toUpperCase() + localizedLabel.slice(1)
            : ISO6391.getName(code),
        };
      } catch {
        return { value: code, label: ISO6391.getName(code) };
      }
    })
    .sort((a, b) => a.label.localeCompare(b.label, shortLang));
};

export const getTimezoneOptions = (lang: string): SelectOption[] => {
  const shortLang = lang.split('-')[0] || 'en';
  const allTimezones = Intl.supportedValuesOf('timeZone');

  const options = allTimezones.map((zone) => {
    const dt = DateTime.now().setZone(zone).setLocale(shortLang);
    const formatter = new Intl.DateTimeFormat(shortLang, { timeZone: zone, timeZoneName: 'longGeneric' });
    const zoneName =
      formatter.formatToParts(dt.toJSDate()).find((p) => p.type === 'timeZoneName')?.value ||
      zone.split('/').pop()?.replace(/_/g, ' ');

    return {
      value: zone,
      label: `(GMT${dt.toFormat('ZZ')}) ${zoneName}`,
      offset: dt.offset,
    };
  });

  return options
    .filter((v, i, a) => a.findIndex((t) => t.label === v.label) === i)
    .sort((a, b) => a.offset - b.offset || a.label.localeCompare(b.label, shortLang))
    .map(({ value, label }) => ({ value, label }));
};
