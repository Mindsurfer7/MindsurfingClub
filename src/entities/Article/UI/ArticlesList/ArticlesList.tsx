import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticlesList.module.scss';
import { Article, ArticleViewType } from 'entities/Article/types/article';
import ArticleItem from '../ArticleItem/ArticleItem';
import { ArticleItemSkeleton } from '../ArticleItem/ArticleItemSkeleton';

interface ArticlesListProps {
  className?: string;
  articles: Article[];
  isLoading: boolean;
  view?: ArticleViewType;
}
const getSkeletons = (view: ArticleViewType) =>
  new Array(view === ArticleViewType.Square ? 9 : 3)
    .fill(0)
    .map((item, index) => (
      <ArticleItemSkeleton className={cls.card} key={index} view={view} />
    ));

const ArticlesList: React.FC<ArticlesListProps> = ({
  className,
  articles,
  isLoading,
  view = ArticleViewType.Rectangle,
}) => {
  const renderArticle = (article: Article) => (
    <ArticleItem
      article={article}
      view={view}
      className={cls.card}
      key={article.id}
    />
  );

  if (isLoading) {
    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        {getSkeletons(view)}
      </div>
    );
  }

  return (
    <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
      {articles.length > 0 ? articles.map(renderArticle) : null}
    </div>
  );
};

export default ArticlesList;
