import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './error404.module.scss';
import Text from 'shared/UI/Text/Text';

interface Error404Props {
  className?: string;
}

const Error404: React.FC<Error404Props> = ({ className }) => {
  return (
    <div className={classNames(cls.Error404, {}, [className as string])}>
      <h1>Error 404</h1>
      <h2>Page Not Found</h2>
      <Text text="Если вы столкнулись с багом, опишите его, пожауйста, на почту bamboocymba@icloud.com" />
    </div>
  );
};

export default Error404;
