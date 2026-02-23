import type React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <p>User main page. Session history will be here.</p>
      <Link to="/">← Back to home</Link>
    </div>
  );
};

export default Dashboard;
