import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from '@src/shared/Button/Button';
import { isValidEmail, isValidPassword, isValidUsername } from '@src/utils/validation';
import AuthInfo from '../../../features/auth/authInfo/AuthInfo';
import { authContent } from '../../../locales/en/auth';
import Field from '../../../shared/Field/Field';
import styles from './Register.module.css';

const INITIAL_REGISTER_DATA = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

type RegisterFormData = typeof INITIAL_REGISTER_DATA;

const RegisterPageFeature: React.FC = () => {
  const navigate = useNavigate();
  const { register: content } = authContent;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    defaultValues: INITIAL_REGISTER_DATA,
    mode: 'onChange',
  });

  const onFormSubmit = (): void => {
    navigate('/login');
  };

  return (
    <div className={styles.registerPage}>
      <AuthInfo />
      <div className={styles.registerMain}>
        <div className={styles.registerCard}>
          <h2>{content.title}</h2>
          <div className={styles.subtitle}>
            {content.subtitle}{' '}
            <Link to="/login" className={styles.link}>
              {content.signInLink}
            </Link>
          </div>

          <form onSubmit={handleSubmit(onFormSubmit)}>
            <Field label="Username" error={errors.username?.message}>
              <input
                {...register('username', {
                  required: content.errors.username,
                  validate: (val) => isValidUsername(val) || content.errors.username,
                })}
                className={errors.username ? 'invalid' : ''}
                placeholder="John Doe"
              />
            </Field>

            <Field label="Email" error={errors.email?.message}>
              <input
                type="email"
                {...register('email', {
                  required: content.errors.email,
                  validate: (val) => isValidEmail(val) || content.errors.email,
                })}
                className={errors.email ? 'invalid' : ''}
                placeholder="example@domain.com"
              />
            </Field>

            <Field label="Password" error={errors.password?.message}>
              <input
                type="password"
                {...register('password', {
                  required: content.errors.password,
                  validate: (val) => isValidPassword(val) || content.errors.password,
                })}
                className={errors.password ? 'invalid' : ''}
                placeholder="••••••••"
              />
            </Field>

            <Field label="Confirm Password" error={errors.confirmPassword?.message}>
              <input
                type="password"
                {...register('confirmPassword', {
                  required: content.errors.confirmPassword,

                  validate: (val) => val === getValues('password') || content.errors.confirmPassword,
                })}
                className={errors.confirmPassword ? 'invalid' : ''}
                placeholder="••••••••"
              />
            </Field>

            <Button className={styles.registerBtn} type="submit" variant="primary" disabled={!isValid}>
              {content.submitBtn}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPageFeature;
