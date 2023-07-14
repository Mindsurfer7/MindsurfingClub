import React, { ButtonHTMLAttributes } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./button.module.scss";

export enum ThemeButton {
  Clear = "clear",
  Unclear = "unclear",
  Outline = "outline",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ThemeButton;
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    className,
    children,
    theme = ThemeButton.Clear,
    ...otherProps
  } = props;

  return (
    <button
      className={classNames(cls.Button, { [cls[theme]]: true }, [
        className as string,
      ])}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
