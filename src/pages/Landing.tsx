import type React from 'react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Tandem - Home Page</h1>
      <p>Welcome! This is a landing page for guests.</p>

      <nav
        style={{
          marginTop: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          maxWidth: '300px',
        }}
      >
        <Link to="/login" style={linkStyle}>
          Login
        </Link>
        <Link to="/register" style={linkStyle}>
          Register
        </Link>
        <Link to="/dashboard" style={linkStyle}>
          Dashboard
        </Link>
        <Link to="/library" style={linkStyle}>
          Topic Library
        </Link>
        <Link to="/practice/example-topic" style={linkStyle}>
          Practice
        </Link>
        <Link to="/profile" style={linkStyle}>
          Profile
        </Link>
        <Link to="/some-unknown-page" style={linkStyle}>
          Non-existent page (404)
        </Link>
      </nav>
    </div>
  );
};

const linkStyle: React.CSSProperties = {
  display: 'block',
  padding: '0.6rem 1rem',
  backgroundColor: '#4f46e5',
  color: '#fff',
  textDecoration: 'none',
  borderRadius: '6px',
  textAlign: 'center',
  fontSize: '1rem',
  transition: 'background-color 0.2s',
};

export default Landing;
