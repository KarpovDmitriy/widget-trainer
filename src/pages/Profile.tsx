import type React from 'react';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>User Profile</h1>
      <p>Profile settings and data will be here.</p>
      <Link to="/">← Back to home</Link>
    </div>
  );
};

export default Profile;
