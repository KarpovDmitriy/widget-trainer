import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { countryOptions } from '@data/selectOptions';
import { INITIAL_USER_DATA, type UserData } from '@data/userDefaults';
import { profileContent } from '@locales/en/profile';
import { useAuthStore } from '@s/auth.store';
import { useProfileStore } from '@s/profile.store';
import Button from '@src/shared/Button/Button';
import styles from './Profile.module.css';
import ProfileEditForm from './profileEditForm/ProfileEditForm';
import ProfileOverview from './profileOverview/ProfileOverview';

const Profile: React.FC = () => {
  const profile = useProfileStore((s) => s.profile);
  const storeError = useProfileStore((s) => s.error);
  const saveProfile = useProfileStore((s) => s.saveProfile);
  const fetchProfile = useProfileStore((s) => s.fetchProfile);
  const { id: userId } = useAuthStore((s) => s.user) ?? {};

  const [activeTab, setActiveTab] = useState<'overview' | 'settings'>('overview');
  const navigate = useNavigate();
  const { nav, headers, notifications } = profileContent;

  const profileData: UserData = profile ?? INITIAL_USER_DATA;

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

    try {
      await saveProfile(userId, data);
      alert(notifications.success);
      setActiveTab('overview');
    } catch (err) {
      // TODO: replace with toast notification when global toast system is implemented
      alert((err as Error).message ?? '[Profile] failed to save profile');
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
                <span>{countryOptions.find((o) => o.value === profileData.country)?.label}</span>
                <span>{profileData.email}</span>
              </div>
            </div>
          </div>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            {nav.back}
          </Button>
        </div>

        <nav className={styles.profileNav}>
          <button
            className={`${styles.navLinkBtn} ${activeTab === 'overview' ? styles.active : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            {nav.overview}
          </button>
          <button
            className={`${styles.navLinkBtn} ${activeTab === 'settings' ? styles.active : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            {nav.settings}
          </button>
        </nav>
      </div>

      {/* TODO: remove this inline error once the global toast system is implemented */}
      {storeError && <p className={styles.storeError}>{storeError}</p>}

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3>{activeTab === 'overview' ? headers.details : headers.settings}</h3>
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
