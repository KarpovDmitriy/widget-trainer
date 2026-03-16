import countries from 'i18n-iso-countries';
import englishLocale from 'i18n-iso-countries/langs/en.json';
import ISO6391 from 'iso-639-1';
import { DateTime } from 'luxon';

countries.registerLocale(englishLocale);

export interface SelectOption {
  readonly value: string;
  readonly label: string;
}

const countriesObj = countries.getNames('en', { select: 'official' });
export const countryOptions: SelectOption[] = Object.entries(countriesObj)
  .map(([code, name]) => ({
    value: code,
    label: name,
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

export const languageOptions: SelectOption[] = ISO6391.getAllCodes()
  .map((code) => ({
    value: code,
    label: ISO6391.getName(code),
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

const allTimezones: string[] = Intl.supportedValuesOf('timeZone');

export const timezoneOptions: SelectOption[] = allTimezones
  .map((zone: string): SelectOption => {
    const dt = DateTime.now().setZone(zone);
    const offset = dt.toFormat('ZZ');

    return {
      value: zone,
      label: `(GMT${offset}) ${zone.replace(/_/g, ' ')}`,
    };
  })
  .sort((a, b) => a.label.localeCompare(b.label));
