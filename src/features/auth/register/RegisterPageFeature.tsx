import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthInfo from '@features/auth/authInfo/AuthInfo';
import { zodResolver } from '@hookform/resolvers/zod';
import { authContent } from '@locales/en/auth';
import { type RegisterFormData, registerSchema } from '@shared/Validation/schemas';
import { useForm } from 'react-hook-form';
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
  const navigate = useNavigate();
  const { register: content } = authContent;

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
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
            <ControlledInput name="username" control={control} label="Username" placeholder="John Doe" />

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
            />

            <ControlledInput
              name="confirmPassword"
              control={control}
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
            />

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
