import React, { memo } from 'react';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import cls from './Text.module.scss';
import { title } from 'process';

export enum TextTheme {
  PRIMARY = 'primary',
  ERROR = 'error',
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
  size?: TextSize;
}

export enum TextSize {
  M = 'size_m',
  L = 'size_l',
}

export enum TextAlign {
  Right = 'right',
  Left = 'left',
  Center = 'center',
}

const Text: React.FC<TextProps> = memo((props) => {
  const {
    align = TextAlign.Left,
    className,
    title,
    text,
    theme = TextTheme.PRIMARY,
  } = props;
  const mods: Mods = {
    [cls[theme]]: true,
    [cls[align]]: true,
  };
  return (
    <div className={classNames(cls.Text, mods, [className as string])}>
      {title && <p className={cls.title}>{title}</p>}
      {text && <p className={cls.text}>{text}</p>}
    </div>
  );
});

export default Text;
