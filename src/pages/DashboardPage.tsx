import type React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authLogout } from '@api/auth.api';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async (): Promise<void> => {
    const { error } = await authLogout();
    if (!error) {
      navigate('/login');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <p>User main page. Session history will be here.</p>
      <Link to="/">← Back to home</Link>
      <br />
      <br />
      <button type="button" onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
};
