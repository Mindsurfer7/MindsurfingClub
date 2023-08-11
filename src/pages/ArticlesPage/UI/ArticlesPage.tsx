import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
  className?: string;
}

const ArticlesPage: React.FC<ArticlesPageProps> = ({ className }) => {
  return (
    <div className={classNames(cls.ArticlesPage, {}, [className as string])}>
      s
    </div>
  );
};

export default ArticlesPage;
