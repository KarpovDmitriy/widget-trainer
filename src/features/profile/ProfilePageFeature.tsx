import React, { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@src/shared/Button/Button';
import { countryOptions } from '../../data/selectOptions';
import { INITIAL_USER_DATA, type UserData } from '../../data/userDefaults';
import { profileContent } from '../../locales/en/profile';
import styles from './Profile.module.css';
import ProfileEditForm from './profileEditForm/ProfileEditForm';
import ProfileOverview from './profileOverview/ProfileOverview';

type ProfileAction = { type: 'SET_ALL'; profile: UserData };

const profileReducer = (state: UserData, action: ProfileAction): UserData => {
  if (action.type === 'SET_ALL') {
    return action.profile;
  }
  return state;
};

const Profile: React.FC = () => {
  const [profileData, setProfileData] = useReducer(profileReducer, INITIAL_USER_DATA);
  const [activeTab, setActiveTab] = useState<'overview' | 'settings'>('overview');
  const navigate = useNavigate();
  const { nav, headers, notifications } = profileContent;

  const handleSave = (data: UserData): void => {
    setProfileData({ type: 'SET_ALL', profile: data });
    alert(notifications.success);
    setActiveTab('overview');
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
