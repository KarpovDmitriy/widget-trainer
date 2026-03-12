import type React from 'react';
import { Link, useParams } from 'react-router-dom';

export const PracticePage: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Practice</h1>
      <p>
        Practice widget. Current topic: <strong>{topicId}</strong>
      </p>
      <Link to="/">← Back to home</Link>
    </div>
  );
};
