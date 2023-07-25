import React, { ButtonHTMLAttributes, memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './button.module.scss';
//import "../../../App/styles/variables/global.scss";

export enum ButtonTheme {
  CLEAR = 'clear',
  UNCLEAR = 'unclear',
  OUTLINE = 'outline',
  OUTLINE_DARK = 'outline-dark',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'background-inverted',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  square?: boolean;
  size?: string;
  disabled?: boolean;
}

export enum ButtonSize {
  M = 'size-m',
  L = 'size-l',
  XL = 'size-xl',
}

const Button: React.FC<ButtonProps> = memo((props) => {
  const {
    className,
    children,
    disabled,
    square,
    size = ButtonSize.M,
    theme = ButtonTheme.CLEAR,
    ...otherProps
  } = props;

  const mods: Record<string, boolean | undefined> = {
    [cls[theme]]: true,
    [cls.square]: square,
    [cls[size]]: true,
    [cls.disabled]: disabled,
  };

  return (
    <button
      disabled={disabled}
      className={classNames(cls.Button, mods, [className as string])}
      {...otherProps}
    >
      {children}
    </button>
  );
});

export default Button;
