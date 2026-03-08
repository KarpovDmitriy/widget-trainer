import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import googleIcon from '@assets/icon-google.png';
import AuthInfo from '@features/auth/authInfo/AuthInfo';
import { zodResolver } from '@hookform/resolvers/zod';
import { authContent } from '@locales/en/auth';
import { type LoginFormData, loginSchema } from '@shared/Validation/schemas';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@s/auth.store';
import Button from '@src/shared/Button/Button';
import { ControlledInput } from '@src/shared/Controlled/ControlledInput';
import styles from './Login.module.css';

const INITIAL_LOGIN_DATA: LoginFormData = {
  email: '',
  password: '',
};

const Login: React.FC = (): React.JSX.Element => {
  const { login } = authContent;
  const navigate = useNavigate();
  const authLogin = useAuthStore((s) => s.login);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    try {
      setServerError(null);
      setIsSubmitting(true);
      await authLogin(data.email, data.password);
      navigate('/dashboard');
    } catch (err) {
      setServerError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
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

            <Button className={styles.loginBtn} type="submit" variant="primary" disabled={!isValid || isSubmitting}>
              {isSubmitting ? 'Signing in…' : login.submitBtn}
            </Button>

            {serverError && <p className={styles.serverError}>{serverError}</p>}
          </form>

          <div className={styles.signupLink}>
            Don&apos;t have an account?{' '}
            <Link to="/register" className={styles.signupAnchor}>
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
