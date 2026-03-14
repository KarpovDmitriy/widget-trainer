import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authLogout } from '@src/api/auth.api';
import { useProfileStore } from '@src/store/profile.store';
import Button from './Button/Button';

interface LogoutButtonProps {
  children: React.ReactNode;
  className?: string;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ children, className = '' }) => {
  const navigate = useNavigate();
  const resetProfile = useProfileStore((state) => state.reset);

  const handleLogout = async (): Promise<void> => {
    try {
      const { error } = await authLogout();
      if (error) {
        console.error('Supabase logout error:', error);
      }
      resetProfile();
      localStorage.clear();
      navigate('/login');
    } catch (err) {
      console.error('Unexpected error during logout process:', err);
    }
  };

  return (
    <Button variant="secondary" onClick={handleLogout} className={className} type="button">
      {children}
    </Button>
  );
};
