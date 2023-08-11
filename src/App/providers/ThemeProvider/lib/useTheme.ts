import { useContext } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';

interface useThemeResult {
  switchTheme: () => void;
  theme: Theme;
}

export function useTheme(): useThemeResult {
  const { theme, setTheme } = useContext(ThemeContext);

  const switchTheme = () => {
    //const newTheme = theme === Theme.dark ? Theme.light : Theme.dark;

    let newTheme: Theme;

    switch (theme) {
      case Theme.dark:
        newTheme = Theme.light;
        break;
      case Theme.light:
        newTheme = Theme.purple;
        break;
      case Theme.purple:
        newTheme = Theme.blue;
        break;
      case Theme.blue:
        newTheme = Theme.dark;
        break;
      default:
        newTheme = Theme.dark;
    }

    setTheme?.(newTheme);

    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  };

  return {
    theme:
      theme ??
      (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) ??
      Theme.light,
    switchTheme,
  };
}
