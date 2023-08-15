import React, { useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticlesPage.module.scss';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import ArticleDetailsPage from 'pages/ArticleDetails/UI/ArticleDetailsPage';

interface ArticlesPageProps {
  className?: string;
}

const ArticlesPage: React.FC<ArticlesPageProps> = ({ className }) => {
  const dispatch = useAppDispatch();

  return (
    <div className={classNames(cls.ArticlesPage, {}, [className as string])}>
      <ArticleDetailsPage />
    </div>
  );
};

export default ArticlesPage;
