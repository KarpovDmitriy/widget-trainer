import type React from 'react';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Register Page</h1>
      <p>The new user registration form will be here.</p>
      <Link to="/">← Back to home</Link>
    </div>
  );
};

export default Register;
