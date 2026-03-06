import React from 'react';
import { useForm } from 'react-hook-form';
import { countryOptions, languageOptions, timezoneOptions } from '../../../data/selectOptions';
import { type UserData } from '../../../data/userDefaults';
import Button from '../../../shared/Button/Button';
import { ControlledInput } from '../../../shared/Controlled/ControlledInput';
import { ControlledSelect } from '../../../shared/Controlled/ControlledSelect';
import styles from '../Profile.module.css';

interface ProfileEditFormProps {
  initialValues: UserData;

  onSubmit: (data: UserData) => void;
  onCancel: () => void;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ initialValues, onSubmit }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<UserData>({
    defaultValues: initialValues,
    mode: 'onChange',
  });

  const handleCancel = (): void => {
    reset(initialValues);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.row}>
        <ControlledInput name="firstName" control={control} label="First Name" rules={{ required: 'Required' }} />
        <ControlledInput name="lastName" control={control} label="Last Name" rules={{ required: 'Required' }} />
      </div>

      <div className={styles.row}>
        <ControlledInput name="company" control={control} label="Company" />
        <ControlledInput name="site" control={control} label="Website" />
      </div>

      <div className={styles.row}>
        <ControlledInput name="phone" control={control} label="Phone" />
      </div>

      <div className={styles.selectWrapper}>
        <ControlledSelect
          name="country"
          control={control}
          label="Country"
          options={countryOptions}
          rules={{ required: 'Required' }}
        />
        <ControlledSelect name="language" control={control} label="Language" options={languageOptions} />
        <ControlledSelect name="timezone" control={control} label="TimeZone" options={timezoneOptions} />
      </div>

      <div className={styles.formFooter}>
        <Button type="submit" variant="primary" disabled={!isValid}>
          Save
        </Button>
        <Button type="button" variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ProfileEditForm;
