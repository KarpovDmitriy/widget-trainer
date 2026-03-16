import type React from 'react';
import { Link } from 'react-router-dom';

export const LibraryPage: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Topic Library</h1>
      <p>A list of practice topics will be here.</p>
      <Link to="/">← Back to home</Link>
    </div>
  );
};
