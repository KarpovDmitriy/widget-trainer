import type { UserData } from '@data/userDefaults';
import { useSelectOptions } from '@utils/useSelectOptions';
import { useTranslation } from 'react-i18next';
import styles from '../Profile.module.css';

interface ProfileOverviewProps {
  profileData: UserData;
}

const ProfileOverview: React.FC<ProfileOverviewProps> = ({ profileData }): React.JSX.Element => {
  const { t } = useTranslation();

  const { displayCountry, displayLanguage, displayTimezone } = useSelectOptions(profileData);

  const notSpecified = t('profile.overview.placeholders.notSpecified');

  const infoItems = [
    {
      label: t('profile.overview.labels.fullName'),
      value: `${profileData.firstName} ${profileData.lastName}`.trim() || notSpecified,
    },
    { label: t('profile.overview.labels.company'), value: profileData.company || notSpecified },
    { label: t('profile.overview.labels.phone'), value: profileData.phone || notSpecified },
    { label: t('profile.overview.labels.site'), value: profileData.site || notSpecified },
    { label: t('profile.overview.labels.country'), value: displayCountry },
    { label: t('profile.overview.labels.language'), value: displayLanguage },
    { label: t('profile.overview.labels.timezone'), value: displayTimezone },
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
