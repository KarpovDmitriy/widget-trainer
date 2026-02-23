import type React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '4rem', margin: '0' }}>404</h1>
      <h2>Page not found</h2>
      <p>Unfortunately, the requested page does not exist.</p>
      <Link to="/" style={{ color: '#4f46e5', fontSize: '1.1rem' }}>
        ← Return to home
      </Link>
    </div>
  );
};

export default NotFound;
