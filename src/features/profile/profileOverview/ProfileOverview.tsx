import React from 'react';
import { countryOptions, languageOptions, timezoneOptions } from '@data/selectOptions';
import type { UserData } from '@data/userDefaults';
import { useTranslation } from 'react-i18next';
import styles from '../Profile.module.css';

interface ProfileOverviewProps {
  profileData: UserData;
}

const ProfileOverview: React.FC<ProfileOverviewProps> = ({ profileData }): React.JSX.Element => {
  const { t } = useTranslation();

  const notSpecified = t('profile.overview.placeholders.notSpecified');

  const getLabel = (options: { value: string; label: string }[], value: string): string =>
    options.find((o) => o.value === value)?.label || notSpecified;

  const infoItems = [
    {
      label: t('profile.overview.labels.fullName'),
      value: `${profileData.firstName} ${profileData.lastName}`.trim() || notSpecified,
    },
    { label: t('profile.overview.labels.company'), value: profileData.company || notSpecified },
    { label: t('profile.overview.labels.phone'), value: profileData.phone || notSpecified },
    { label: t('profile.overview.labels.site'), value: profileData.site || notSpecified },
    { label: t('profile.overview.labels.country'), value: getLabel(countryOptions, profileData.country) },
    { label: t('profile.overview.labels.language'), value: getLabel(languageOptions, profileData.language) },
    { label: t('profile.overview.labels.timezone'), value: getLabel(timezoneOptions, profileData.timezone) },
  ];

  return (
    <div className={styles.overviewContainer}>
      {infoItems.map((item, idx) => (
        <div className={styles.infoRow} key={idx}>
          <div className={styles.infoLabel}>{item.label}</div>
          <div className={styles.infoValue}>{item.value}</div>
        </div>
      ))}
    </div>
  );
};

export default ProfileOverview;
