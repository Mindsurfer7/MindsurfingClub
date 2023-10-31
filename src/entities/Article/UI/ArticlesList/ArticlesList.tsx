import React, { HTMLAttributeAnchorTarget } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticlesList.module.scss';
import { Article, ArticleViewType } from 'entities/Article/types/article';
import ArticleItem from '../ArticleItem/ArticleItem';
import { ArticleItemSkeleton } from '../ArticleItem/ArticleItemSkeleton';
import Text from 'shared/UI/Text/Text';

interface ArticlesListProps {
  className?: string;
  articles: Article[] | undefined;
  isLoading: boolean;
  view?: ArticleViewType;
  target?: HTMLAttributeAnchorTarget;
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
  target,
  view = ArticleViewType.Square,
}) => {
  const renderArticle = (article: Article) => (
    <ArticleItem
      article={article}
      view={view}
      className={cls.card}
      key={article.id}
      target={target}
    />
  );

  // if (!isLoading && articles.length) {
  //   return (
  //     <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
  //       <Text title="No articles found" />
  //     </div>
  //   );
  // }

  // if (isLoading) {
  //   return (
  //     <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
  //       {getSkeletons(view)}
  //     </div>
  //   );
  // }

  return (
    <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
      {articles && articles.length > 0 ? articles.map(renderArticle) : null}
      {isLoading && getSkeletons(view)}
    </div>
  );
};

export default ArticlesList;
