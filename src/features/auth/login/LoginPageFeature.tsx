import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authLogin } from '@api/auth.api';
import googleIcon from '@assets/icon-google.png';
import AuthInfo from '@features/auth/authInfo/AuthInfo';
import { zodResolver } from '@hookform/resolvers/zod';
import { SYSTEM_ERROR } from '@shared/Constants/constants';
import { LangSwitcher } from '@shared/LangSwitcher/LangSwitcher';
import { ThemeSwitcher } from '@shared/ThemeSwitcher/ThemeSwitcher';
import { type LoginFormData, loginSchema } from '@shared/Validation/schemas';
import type { ParseKeys } from 'i18next';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Button from '@src/shared/Button/Button';
import { ControlledInput } from '@src/shared/Controlled/ControlledInput';
import styles from './Login.module.css';

const INITIAL_LOGIN_DATA: LoginFormData = {
  email: '',
  password: '',
};

const Login: React.FC = (): React.JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const loginLang = 'auth.login';
  const regLang = 'auth.register';

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: INITIAL_LOGIN_DATA,
    mode: 'onChange',
  });

  const onFormSubmit = async (data: LoginFormData): Promise<void> => {
    setApiError(null);
    setIsSubmitting(true);

    const { error } = await authLogin(data);

    if (!error) {
      navigate('/profile');
    } else if (error && error !== SYSTEM_ERROR) {
      setApiError(error);
    }
    setIsSubmitting(false);
  };

  const apiErrorMessage = t(apiError as ParseKeys);

  return (
    <div className={styles.loginPage}>
      <AuthInfo />
      <div className={styles.loginMain}>
        <div className={styles.authLangSwitcher}>
          <ThemeSwitcher />
          <LangSwitcher buttonClassName={styles.langBtn} containerClassName={styles.langSwitcher} />
        </div>
        <div className={styles.loginCard}>
          <h2>{t(`${loginLang}.title`)}</h2>

          <Button type="button" variant="secondary" className={styles.btnSignInGoogle}>
            <img src={googleIcon} alt="Google" width="18" />
            {t(`${loginLang}.googleBtn`)}
          </Button>

          <div className={styles.separator}>{t(`${loginLang}.separator`)}</div>

          <form onSubmit={handleSubmit(onFormSubmit)}>
            <ControlledInput
              name="email"
              control={control}
              label={t(`${loginLang}.form.email`)}
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
              label={t(`${loginLang}.form.password`)}
              type="password"
              placeholder="••••••••"
              extra={
                <Link to="/forgot-password" className={styles.forgotLink}>
                  {t(`${loginLang}.forgotPassword`)}
                </Link>
              }
              rules={{
                onChange: () => {
                  if (apiError) {
                    setApiError(null);
                  }
                },
              }}
            />

            <Button className={styles.loginBtn} type="submit" variant="primary" disabled={!isValid || isSubmitting}>
              {isSubmitting ? '...' : t(`${loginLang}.submitBtn`)}
            </Button>

            {apiError && <div className={styles.errorText}>{apiErrorMessage}</div>}
          </form>

          <div className={styles.signupLink}>
            {t(`${regLang}.subtitle`)}{' '}
            <Link to="/register" className={styles.signupAnchor}>
              {t(`${regLang}.title`)}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
