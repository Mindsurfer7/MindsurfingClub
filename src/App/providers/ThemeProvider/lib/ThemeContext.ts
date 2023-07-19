import { createContext } from 'react';

export enum Theme {
  light = 'app_theme_light',
  dark = 'app_theme_dark',
}
//типизирует значения, которыми провайдер будет снабжать компоненты
export interface ThemeContextProps {
  theme?: Theme;
  setTheme?: (theme: Theme) => void; //??????????????
}

export const ThemeContext = createContext<ThemeContextProps>({});

export const LOCAL_STORAGE_THEME_KEY = 'theme';
