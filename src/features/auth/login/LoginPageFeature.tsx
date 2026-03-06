import React from 'react';
import { Link } from 'react-router-dom';
import googleIcon from '@assets/icon-google.png';
import AuthInfo from '@features/auth/authInfo/AuthInfo';
import { zodResolver } from '@hookform/resolvers/zod';
import { authContent } from '@locales/en/auth';
import { type LoginFormData, loginSchema } from '@shared/Validation/schemas';
import { useForm } from 'react-hook-form';
import Button from '@src/shared/Button/Button';
import { ControlledInput } from '@src/shared/Controlled/ControlledInput';
import styles from './Login.module.css';

const INITIAL_LOGIN_DATA: LoginFormData = {
  email: '',
  password: '',
};

const Login: React.FC = (): React.JSX.Element => {
  const { login } = authContent;

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
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

          <Button type="button" variant="secondary" className={styles.btnSignInGoogle}>
            <img src={googleIcon} alt="Google" width="18" />
            {login.googleBtn}
          </Button>

          <div className={styles.separator}>{login.separator}</div>

          <form onSubmit={handleSubmit(onFormSubmit)}>
            <ControlledInput
              name="email"
              control={control}
              label="Email"
              type="email"
              placeholder="example@domain.com"
            />

            <ControlledInput
              name="password"
              control={control}
              label="Password"
              type="password"
              placeholder="••••••••"
              extra={
                <Link to="/forgot-password" className={styles.forgotLink}>
                  {login.forgotPassword}
                </Link>
              }
            />

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
