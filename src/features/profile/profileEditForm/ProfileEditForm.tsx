import React from 'react';
import { type UserData } from '@data/userDefaults';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@shared/Button/Button';
import { ControlledInput } from '@shared/Controlled/ControlledInput';
import { ControlledSelect } from '@shared/Controlled/ControlledSelect';
import { type ProfileFormData, profileSchema } from '@shared/Validation/schemas';
import { useSelectOptions } from '@utils/useSelectOptions';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styles from '../Profile.module.css';

interface ProfileEditFormProps {
  initialValues: UserData;
  onSubmit: (data: UserData) => void;
  onCancel: () => void;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ initialValues, onSubmit }): React.JSX.Element => {
  const { t } = useTranslation();
  const { countryOptions, languageOptions, timezoneOptions } = useSelectOptions();
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialValues,
    mode: 'onChange',
  });

  const handleCancel = (): void => {
    reset(initialValues);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.row}>
        <ControlledInput name="firstName" control={control} label={t('profile.form.labels.firstName')} />
        <ControlledInput name="lastName" control={control} label={t('profile.form.labels.lastName')} />
      </div>

      <div className={styles.row}>
        <ControlledInput name="company" control={control} label={t('profile.form.labels.company')} />
        <ControlledInput name="site" control={control} label={t('profile.form.labels.site')} />
      </div>

      <div className={styles.row}>
        <ControlledInput name="phone" control={control} label={t('profile.form.labels.phone')} />
      </div>

      <div className={styles.selectWrapper}>
        <ControlledSelect
          name="country"
          control={control}
          label={t('profile.form.labels.country')}
          options={countryOptions}
        />
        <ControlledSelect
          name="language"
          control={control}
          label={t('profile.form.labels.language')}
          options={languageOptions}
        />
        <ControlledSelect
          name="timezone"
          control={control}
          label={t('profile.form.labels.timezone')}
          options={timezoneOptions}
        />
      </div>

      <div className={styles.formFooter}>
        <Button type="submit" variant="primary" disabled={!isValid || !isDirty}>
          {t('profile.form.buttons.save')}
        </Button>
        <Button type="button" variant="secondary" onClick={handleCancel}>
          {t('profile.form.buttons.cancel')}
        </Button>
      </div>
    </form>
  );
};

export default ProfileEditForm;
