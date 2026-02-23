import type React from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Login Page</h1>
      <p>The authorization form will be here.</p>
      <Link to="/">← Back to home</Link>
    </div>
  );
};

export default Login;
