import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Field from '../../components/Field/Field';
import HeaderAuth from '../../components/HeaderAuth/HeaderAuth';
import { useForm } from '../../hooks/useForm';
import { authContent } from '../../locales/en/auth';
import ui from '../../styles/UI.module.css';
import styles from './Register.module.css';

const INITIAL_REGISTER_DATA = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = authContent;

  const { formData, handleChange } = useForm(INITIAL_REGISTER_DATA);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isPasswordValid = formData.password.length >= 8;
  const passwordsMatch = formData.password === formData.confirmPassword;
  const isUsernameValid = formData.username.trim().length >= 3;

  const isFormValid = isUsernameValid && isEmailValid && isPasswordValid && passwordsMatch;

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (isFormValid) {
      navigate('/login');
    }
  };

  return (
    <div className={styles.authPage}>
      <HeaderAuth />
      <div className={styles.authMain}>
        <div className={styles.authCard}>
          <h2>{register.title}</h2>
          <div className={styles.subtitle}>
            {register.subtitle}{' '}
            <Link to="/login" className={styles.link}>
              {register.signInLink}
            </Link>
          </div>

          <form onSubmit={handleSubmit}>
            <Field label="Username" error={formData.username && !isUsernameValid ? register.errors.username : ''}>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={formData.username && !isUsernameValid ? 'invalid' : ''}
                placeholder="John Doe"
              />
            </Field>

            <Field label="Email" error={formData.email && !isEmailValid ? register.errors.email : ''}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={formData.email && !isEmailValid ? 'invalid' : ''}
                placeholder="example@domain.com"
              />
            </Field>

            <Field label="Password" error={formData.password && !isPasswordValid ? register.errors.password : ''}>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={formData.password && !isPasswordValid ? 'invalid' : ''}
                placeholder="••••••••"
              />
            </Field>

            <Field
              label="Confirm Password"
              error={formData.confirmPassword && !passwordsMatch ? register.errors.confirmPassword : ''}
            >
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={formData.confirmPassword && !passwordsMatch ? 'invalid' : ''}
                placeholder="••••••••"
              />
            </Field>

            <button type="submit" className={ui.btnPrimary} disabled={!isFormValid}>
              {register.submitBtn}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
