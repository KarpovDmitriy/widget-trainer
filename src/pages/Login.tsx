import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import HeaderAuth from '../components/HeaderAuth';
import '../styles/Auth.css';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isPasswordValid = formData.password.length >= 8;
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = (e: ChangeEvent): void => {
    e.preventDefault();
  };

  return (
    <div className="auth-page">
      <HeaderAuth />
      <div className="auth-main">
        <div className="auth-card">
          <h2>Log in</h2>
          <div className="auth-subtitle">
            New Here?{' '}
            <Link
              to="/register"
              style={{
                color: '#0095E8',
                fontWeight: '600',
                textDecoration: 'none',
              }}
            >
              Create an Account
            </Link>
          </div>

          <div className="social-buttons">
            <button className="btn-social" type="button">
              <img src="src/assets/icon-google.png" alt="Google" width="18px" />
              Sign in with Google
            </button>
          </div>

          <div className="separator">Or with email</div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@domain.com"
                className={formData.email && !isEmailValid ? 'invalid' : ''}
                autoComplete="username"
                required
              />
              {formData.email && !isEmailValid && <div className="input-error">Please enter a valid email</div>}
            </div>

            <div className="input-group">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label>Password</label>
                <Link
                  to="/forgot-password"
                  style={{
                    fontSize: '12px',
                    color: '#0095E8',
                    textDecoration: 'none',
                  }}
                >
                  Forgot Password?
                </Link>
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={formData.password && !isPasswordValid ? 'invalid' : ''}
                autoComplete="current-password"
                required
              />
              {formData.password && !isPasswordValid && (
                <div className="input-error">At least 8 characters required</div>
              )}
            </div>

            <button type="submit" className="btn-primary" disabled={!isFormValid}>
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
