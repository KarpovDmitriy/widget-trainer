import React from 'react';
import { countryOptions, languageOptions, timezoneOptions } from '../../../data/selectOptions';
import type { UserData } from '../../../data/userDefaults';
import { profileContent } from '../../../locales/en/profile';
import styles from '../Profile.module.css';

interface ProfileOverviewProps {
  profileData: UserData;
}

const ProfileOverview: React.FC<ProfileOverviewProps> = ({ profileData }): React.JSX.Element => {
  const { labels } = profileContent;

  const getLabel = (options: { value: string; label: string }[], value: string): string =>
    options.find((o) => o.value === value)?.label || '—';

  const infoItems = [
    { label: labels.fullName, value: `${profileData.firstName} ${profileData.lastName}`.trim() || '—' },
    { label: labels.company, value: profileData.company || '—' },
    { label: labels.phone, value: profileData.phone || '—' },
    { label: labels.site, value: profileData.site || '—' },
    { label: labels.country, value: getLabel(countryOptions, profileData.country) },
    { label: labels.language, value: getLabel(languageOptions, profileData.language) },
    { label: labels.timezone, value: getLabel(timezoneOptions, profileData.timezone) },
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
