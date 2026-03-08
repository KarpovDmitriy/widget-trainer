import type React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@s/auth.store';

const Dashboard: React.FC = () => {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = async (): Promise<void> => {
    await logout();
    navigate('/login');
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

export default Dashboard;
