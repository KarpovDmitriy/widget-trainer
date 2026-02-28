import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeaderAuth from '../components/HeaderAuth';
import '../styles/Auth.css';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isPasswordValid = formData.password.length >= 8;
  const passwordsMatch = formData.password === formData.confirmPassword;
  const isUsernameValid = formData.username.trim().length >= 3;

  const isFormValid = isUsernameValid && isEmailValid && isPasswordValid && passwordsMatch;

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (isFormValid) {
      setTimeout(() => navigate('/login'), 1500);
    }
  };

  return (
    <div className="auth-page">
      <HeaderAuth />
      <div className="auth-main">
        <div className="auth-card">
          <h2>Sign Up</h2>
          <div className="auth-subtitle">
            Already have an account?{' '}
            <Link
              to="/login"
              style={{
                color: '#0095E8',
                fontWeight: '600',
                textDecoration: 'none',
              }}
            >
              Sign in here
            </Link>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="John Doe"
                className={formData.username && !isUsernameValid ? 'invalid' : ''}
                autoComplete="username"
                required
              />
              {formData.username && !isUsernameValid && <div className="input-error">Min. 3 characters</div>}
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@domain.com"
                className={formData.email && !isEmailValid ? 'invalid' : ''}
                autoComplete="email"
                required
              />
              {formData.email && !isEmailValid && <div className="input-error">Enter a valid email</div>}
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min. 8 characters"
                className={formData.password && !isPasswordValid ? 'invalid' : ''}
                autoComplete="new-password"
                required
              />
              {formData.password && !isPasswordValid && <div className="input-error">Min. 8 characters</div>}
            </div>

            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={formData.confirmPassword && !passwordsMatch ? 'invalid' : ''}
                autoComplete="new-password"
                required
              />
              {formData.confirmPassword && !passwordsMatch && <div className="input-error">Passwords must match</div>}
            </div>

            <button type="submit" className="btn-primary" disabled={!isFormValid}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
