import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
}

const applyTheme = (theme: Theme): void => {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
};

const savedTheme = (localStorage.getItem('theme') as Theme) || 'light';
applyTheme(savedTheme);

export const useThemeStore = create<ThemeStore>(
  (set): ThemeStore => ({
    theme: savedTheme,

    toggleTheme: (): void =>
      set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
        return { theme: newTheme };
      }),
  }),
);
