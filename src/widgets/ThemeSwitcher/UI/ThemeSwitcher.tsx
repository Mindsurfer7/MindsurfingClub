import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ThemeSwitcher.module.scss";
import { useTheme } from "App/providers/ThemeProvider";
import ThemeDark from "shared/assets/icons/theme-dark.svg";
import ThemeLight from "shared/assets/icons/theme-light.svg";
import { Theme } from "App/providers/ThemeProvider";
import Button, { ThemeButton } from "shared/UI/Button/Button";

interface ThemeSwitcherProps {
  className?: string | undefined;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ className }) => {
  const { theme, switchTheme } = useTheme();
  return (
    <Button
      theme={ThemeButton.Clear}
      //className={classNames(cls.ThemeSwitcher, {}, [className as string])}
      onClick={switchTheme}
    >
      {theme === Theme.dark ? <ThemeLight /> : <ThemeDark />}
    </Button>
  );
};

export default ThemeSwitcher;

{
  /* <div
className={classNames(cls.ThemeSwitcher, {}, [className as string])}
onClick={switchTheme}
>

Switch
</div> */
}
