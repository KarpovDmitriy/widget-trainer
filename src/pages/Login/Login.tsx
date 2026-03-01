import React from 'react';
import { Link } from 'react-router-dom';
import googleIcon from '../../assets/icon-google.png';
import Field from '../../components/Field/Field';
import HeaderAuth from '../../components/HeaderAuth/HeaderAuth';
import { useForm } from '../../hooks/useForm';
import { authContent } from '../../locales/en/auth';
import ui from '../../styles/UI.module.css';
import styles from './Login.module.css';

const INITIAL_LOGIN_DATA = {
  email: '',
  password: '',
};

const Login: React.FC = () => {
  const { login } = authContent;

  // Используем хук useForm
  const { formData, handleChange } = useForm(INITIAL_LOGIN_DATA);

  // Валидация на основе данных из хука
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isPasswordValid = formData.password.length >= 8;
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (isFormValid) {
      // Здесь будет логика авторизации
    }
  };

  return (
    <div className={styles.authPage}>
      <HeaderAuth />
      <div className={styles.authMain}>
        <div className={styles.authCard}>
          <h2>{login.title}</h2>
          <div className={ui.socialButtons}>
            <button className={`${ui.btnSocial} ${styles.btnSignInGoogle}`} type="button">
              <img src={googleIcon} alt="Google" width="18" />
              {login.googleBtn}
            </button>
          </div>

          <div className={styles.separator}>{login.separator}</div>

          <form onSubmit={handleSubmit}>
            <Field label="Email" error={formData.email && !isEmailValid ? login.errors.email : ''}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={formData.email && !isEmailValid ? 'invalid' : ''}
                placeholder="example@domain.com"
              />
            </Field>

            <Field
              label="Password"
              error={formData.password && !isPasswordValid ? login.errors.password : ''}
              extra={
                <Link to="/forgot-password" className={styles.forgotLink}>
                  {login.forgotPassword}
                </Link>
              }
            >
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={formData.password && !isPasswordValid ? 'invalid' : ''}
                placeholder="••••••••"
              />
            </Field>

            <button type="submit" className={ui.btnPrimary} disabled={!isFormValid}>
              {login.submitBtn}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
