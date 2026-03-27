import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { INITIAL_USER_DATA, type UserData } from '@data/userDefaults';
import { SYSTEM_ERROR } from '@shared/Constants/constants';
import { useSelectOptions } from '@utils/useSelectOptions';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@s/auth.store';
import { useProfileStore } from '@s/profile.store';
import { useToastStore } from '@s/toast.store';
import Button from '@src/shared/Button/Button';
import styles from './Profile.module.css';
import ProfileEditForm from './profileEditForm/ProfileEditForm';
import ProfileOverview from './profileOverview/ProfileOverview';

const Profile: React.FC = () => {
  const { t } = useTranslation();

  const profile = useProfileStore((s) => s.profile);
  const saveProfile = useProfileStore((s) => s.saveProfile);
  const fetchProfile = useProfileStore((s) => s.fetchProfile);
  const { id: userId } = useAuthStore((s) => s.user) ?? {};

  const [activeTab, setActiveTab] = useState<'overview' | 'settings'>('overview');
  const navigate = useNavigate();
  const profileData: UserData = profile ?? INITIAL_USER_DATA;

  const { displayCountry } = useSelectOptions(profileData);

  useEffect(() => {
    if (!userId) {
      return;
    }
    void fetchProfile(userId);
  }, [fetchProfile, userId]);

  const handleSave = async (data: UserData): Promise<void> => {
    if (!userId) {
      return;
    }

    const error = await saveProfile(userId, data);

    if (!error) {
      setActiveTab('overview');
    } else {
      if (error !== SYSTEM_ERROR) {
        useToastStore.getState().addToast(error, 'error');
      }
    }
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <div className={styles.profileHeaderTop}>
          <div className={styles.profileInfo}>
            <div className={styles.profileDetails}>
              <h1>
                {profileData.firstName} {profileData.lastName}
              </h1>
              <div className={styles.profileMeta}>
                <span>{profileData.company}</span>
                <span>{displayCountry}</span>
                <span>{profileData.email}</span>
              </div>
            </div>
          </div>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            {t('profile.form.buttons.back')}
          </Button>
        </div>

        <nav className={styles.profileNav}>
          <button
            className={clsx(styles.navLinkBtn, { [styles.active]: activeTab === 'overview' })}
            onClick={() => setActiveTab('overview')}
          >
            {t('profile.header.tabs.overview')}
          </button>
          <button
            className={clsx(styles.navLinkBtn, { [styles.active]: activeTab === 'settings' })}
            onClick={() => setActiveTab('settings')}
          >
            {t('profile.header.tabs.settings')}
          </button>
        </nav>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3>
            {activeTab === 'overview' ? t('profile.overview.headers.details') : t('profile.form.headers.settings')}
          </h3>
        </div>
        <div className={styles.cardBody}>
          {activeTab === 'overview' ? (
            <ProfileOverview profileData={profileData} />
          ) : (
            <ProfileEditForm
              initialValues={profileData}
              onSubmit={handleSave}
              onCancel={() => setActiveTab('overview')}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
