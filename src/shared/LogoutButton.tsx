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
      // 1. Выход из Supabase (удаляет сессию на сервере и в куках/локалсторе самой либы)
      const { error } = await authLogout();

      if (error) {
        console.error('Supabase logout error:', error);
        // Даже если ошибка на сервере, лучше почистить локальные данные для безопасности
      }

      // 2. Очистка Zustand стора (обнуляем profile: null)
      resetProfile();

      // 3. Полная очистка localStorage (удаляем твои кастомные флаги, темы и т.д.)
      localStorage.clear();

      // 4. Редирект на страницу логина
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
