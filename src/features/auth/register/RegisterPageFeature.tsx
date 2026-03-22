import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authRegister } from '@api/auth.api';
import AuthInfo from '@features/auth/authInfo/AuthInfo';
import { zodResolver } from '@hookform/resolvers/zod';
import { SYSTEM_ERROR } from '@shared/Constants/constants';
import { LangSwitcher } from '@shared/LangSwitcher/LangSwitcher';
import { type RegisterFormData, registerSchema } from '@shared/Validation/schemas';
import type { ParseKeys } from 'i18next';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Button from '@src/shared/Button/Button';
import { ControlledInput } from '@src/shared/Controlled/ControlledInput';
import styles from './Register.module.css';

const INITIAL_REGISTER_DATA: RegisterFormData = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const RegisterPageFeature: React.FC = (): React.JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const regPath = 'auth.register';

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: INITIAL_REGISTER_DATA,
    mode: 'onChange',
  });

  const onFormSubmit = async (data: RegisterFormData): Promise<void> => {
    setApiError(null);
    setIsSubmitting(true);

    const { error } = await authRegister(data);

    if (!error) {
      navigate('/profile'); //TODO Что здесь написать ?
    } else if (error && error !== SYSTEM_ERROR) {
      setApiError(error);
    }
    setIsSubmitting(false);
  };

  const apiErrorMessage = t(apiError as ParseKeys);

  return (
    <div className={styles.registerPage}>
      <AuthInfo />
      <div className={styles.registerMain}>
        <div className={styles.authLangSwitcher}>
          <LangSwitcher buttonClassName={styles.langBtn} containerClassName={styles.langSwitcher} />
        </div>
        <div className={styles.registerCard}>
          <h2>{t(`${regPath}.title`)}</h2>
          <div className={styles.subtitle}>
            {t(`${regPath}.subtitle`)}{' '}
            <Link to="/login" className={styles.link}>
              {t(`${regPath}.signInLink`)}
            </Link>
          </div>

          <form onSubmit={handleSubmit(onFormSubmit)}>
            <ControlledInput
              name="username"
              control={control}
              label={t(`${regPath}.form.username`)}
              placeholder={t(`${regPath}.form.placeholderUsername`)}
              rules={{
                onChange: () => {
                  if (apiError) {
                    setApiError(null);
                  }
                },
              }}
            />

            <ControlledInput
              name="email"
              control={control}
              label={t(`${regPath}.form.email`)}
              type="email"
              placeholder="example@domain.com"
              rules={{
                onChange: () => {
                  if (apiError) {
                    setApiError(null);
                  }
                },
              }}
            />

            <ControlledInput
              name="password"
              control={control}
              label={t(`${regPath}.form.password`)}
              type="password"
              placeholder="••••••••"
              rules={{
                onChange: () => {
                  if (apiError) {
                    setApiError(null);
                  }
                },
              }}
            />

            <ControlledInput
              name="confirmPassword"
              control={control}
              label={t(`${regPath}.form.confirmPassword`)}
              type="password"
              placeholder="••••••••"
              rules={{
                onChange: () => {
                  if (apiError) {
                    setApiError(null);
                  }
                },
              }}
            />

            <Button className={styles.registerBtn} type="submit" variant="primary" disabled={!isValid || isSubmitting}>
              {isSubmitting ? '...' : t(`${regPath}.submitBtn`)}
            </Button>

            {apiError && <div className={styles.errorText}>{apiErrorMessage}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPageFeature;
