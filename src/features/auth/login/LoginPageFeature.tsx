import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from '@src/shared/Button/Button';
import { isValidEmail, isValidPassword } from '@src/utils/validation';
import googleIcon from '../../../assets/icon-google.png';
import AuthInfo from '../../../features/auth/authInfo/AuthInfo';
import { authContent } from '../../../locales/en/auth';
import ui from '../../../shared/Button/Button.module.css';
import Field from '../../../shared/Field/Field';
import styles from './Login.module.css';

type LoginFormData = typeof INITIAL_LOGIN_DATA;

const INITIAL_LOGIN_DATA = {
  email: '',
  password: '',
};

const Login: React.FC = () => {
  const { login } = authContent;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    defaultValues: INITIAL_LOGIN_DATA,
    mode: 'onChange',
  });

  const onFormSubmit = (): void => {
    // TODO:
  };

  return (
    <div className={styles.loginPage}>
      <AuthInfo />
      <div className={styles.loginMain}>
        <div className={styles.loginCard}>
          <h2>{login.title}</h2>
          <button className={`${styles.btnSignInGoogle} ${ui.secondary}`} type="button">
            <img src={googleIcon} alt="Google" width="18" />
            {login.googleBtn}
          </button>

          <div className={styles.separator}>{login.separator}</div>

          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Field label="Email" error={errors.email?.message}>
              <input
                {...register('email', {
                  required: login.errors.email,
                  validate: (value) => isValidEmail(value) || login.errors.email,
                })}
                type="email"
                className={errors.email ? 'invalid' : ''}
                placeholder="example@domain.com"
              />
            </Field>

            <Field
              label="Password"
              error={errors.password?.message}
              extra={
                <Link to="/forgot-password" className={styles.forgotLink}>
                  {login.forgotPassword}
                </Link>
              }
            >
              <input
                {...register('password', {
                  required: login.errors.password,
                  validate: (value) => isValidPassword(value) || login.errors.password,
                })}
                type="password"
                className={errors.password ? 'invalid' : ''}
                placeholder="••••••••"
              />
            </Field>

            <Button className={styles.loginBtn} type="submit" variant="primary" disabled={!isValid}>
              {login.submitBtn}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
