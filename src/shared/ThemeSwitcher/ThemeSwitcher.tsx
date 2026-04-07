import React from 'react';
import { useThemeStore } from '@s/theme.store';
import ui from './ThemeSwitcher.module.css';

export const ThemeSwitcher: React.FC = (): React.JSX.Element => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button type="button" onClick={toggleTheme} className={ui.themeBtn}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};
