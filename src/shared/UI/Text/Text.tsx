import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
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
}

//

const Text: React.FC<TextProps> = (props) => {
  const { className, title, text, theme = TextTheme.PRIMARY } = props;

  return (
    <div
      className={classNames(cls.Text, { [cls[theme]]: true }, [
        className as string,
      ])}
    >
      {title && <p className={cls.title}>{title}</p>}
      {text && <p className={cls.text}>{text}</p>}
    </div>
  );
};

export default Text;
