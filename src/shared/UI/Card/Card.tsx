import { classNames } from 'shared/lib/classNames/classNames';
import { HTMLAttributes, memo, ReactNode } from 'react';
import cls from './Card.module.scss';

export enum CardTheme {
  NORMAL = 'normal',
  OUTLINED = 'outlined',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
  theme?: CardTheme;
  style?: React.CSSProperties;
}

export const Card = memo((props: CardProps) => {
  const {
    className,
    theme = CardTheme.NORMAL,
    children,
    style,
    ...otherProps
  } = props;

  return (
    <div
      style={style}
      className={classNames(cls.Card, {}, [className, cls[theme]])}
      {...otherProps}
    >
      {children}
    </div>
  );
});
