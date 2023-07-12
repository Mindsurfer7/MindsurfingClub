import React, { ButtonHTMLAttributes } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Button.module.scss";

export enum ThemeButton {
  Clear = "clear",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme: ThemeButton;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { className, children, theme, ...otherProps } = props;

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
