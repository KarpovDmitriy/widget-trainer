import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import Field from '../../components/Field/Field';
import { countryOptions, languageOptions, timezoneOptions } from '../../data/selectOptions';
import { INITIAL_USER_DATA } from '../../data/userDefaults';
import { useForm } from '../../hooks/useForm';
import { profileContent } from '../../locales/en/profile';
import ui from '../../styles/UI.module.css';
import styles from './Profile.module.css';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { nav, headers, labels, actions, notifications } = profileContent;
  const [activeTab, setActiveTab] = useState<'overview' | 'settings'>('overview');

  const { formData, handleChange, handleSelectChange } = useForm(INITIAL_USER_DATA);

  const handleSave = (e: FormEvent): void => {
    e.preventDefault();
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
                {formData.firstName} {formData.lastName}
              </h1>
              <div className={styles.profileMeta}>
                <span>{formData.company}</span>
                <span>{countryOptions.find((o) => o.value === formData.country)?.label}</span>
                <span>{formData.email}</span>
              </div>
            </div>
          </div>
          <button onClick={() => navigate(-1)} className={ui.btnSocial} style={{ width: 'auto' }}>
            {nav.back}
          </button>
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
            <div className={styles.overviewContent}>
              {[
                { label: labels.fullName, value: `${formData.firstName} ${formData.lastName}` },
                { label: labels.company, value: formData.company },
                { label: labels.phone, value: formData.phone },
                { label: labels.site, value: formData.site },
                { label: labels.country, value: countryOptions.find((o) => o.value === formData.country)?.label },
                { label: labels.language, value: languageOptions.find((o) => o.value === formData.language)?.label },
                { label: labels.timezone, value: timezoneOptions.find((o) => o.value === formData.timezone)?.label },
              ].map((item, idx) => (
                <div className={styles.infoRow} key={idx}>
                  <div className={styles.infoLabel}>{item.label}</div>
                  <div className={styles.infoValue}>{item.value}</div>
                </div>
              ))}
            </div>
          ) : (
            <form onSubmit={handleSave}>
              <div className={styles.row}>
                <Field label={labels.firstName}>
                  <input name="firstName" value={formData.firstName} onChange={handleChange} />
                </Field>
                <Field label={labels.lastName}>
                  <input name="lastName" value={formData.lastName} onChange={handleChange} />
                </Field>
              </div>

              <Field label={labels.company}>
                <input name="company" value={formData.company} onChange={handleChange} />
              </Field>

              <div className={styles.row}>
                <Field label={labels.phone}>
                  <input name="phone" value={formData.phone} onChange={handleChange} />
                </Field>
                <Field label={labels.site}>
                  <input name="site" value={formData.site} onChange={handleChange} />
                </Field>
              </div>

              <div className={styles.selectWrapper}>
                <Field label={labels.country}>
                  <Select
                    classNamePrefix="custom-select"
                    className={styles.selectContainer}
                    options={countryOptions}
                    value={countryOptions.find((o) => o.value === formData.country)}
                    onChange={(val) => handleSelectChange(val, 'country')}
                  />
                </Field>
                <Field label={labels.language}>
                  <Select
                    classNamePrefix="custom-select"
                    className={styles.selectContainer}
                    options={languageOptions}
                    value={languageOptions.find((o) => o.value === formData.language)}
                    onChange={(val) => handleSelectChange(val, 'language')}
                  />
                </Field>
              </div>

              <div className={styles.formFooter}>
                <button type="submit" className={ui.btnPrimary} style={{ width: 'auto' }}>
                  {actions.save}
                </button>
                <button
                  type="button"
                  className={ui.btnSocial}
                  onClick={() => setActiveTab('overview')}
                  style={{ width: 'auto' }}
                >
                  {actions.cancel}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
