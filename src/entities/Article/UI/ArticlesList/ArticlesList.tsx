import React, { HTMLAttributeAnchorTarget, useCallback, useRef } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticlesList.module.scss';
import { Article, ArticleViewType } from 'entities/Article/types/article';
import Text from 'shared/UI/Text/Text';
import { ArticleItemSkeleton } from '../ArticleItem/ArticleItemSkeleton';
import ArticleItem from '../ArticleItem/ArticleItem';

interface ArticlesListProps {
  className?: string;
  articles: Article[] | undefined;
  isLoading: boolean;
  hasMore?: boolean;
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
  hasMore,
  view = ArticleViewType.Square,
}) => {
  if (isLoading) {
    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        {getSkeletons(view)}
      </div>
    );
  }

  //blyatttt soooqa после скролла в самое дно скролл зачем то откидывается в середину страницы

  return (
    <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
      {articles && articles.length > 0
        ? articles.map((article: Article) => (
            <ArticleItem
              article={article}
              view={view}
              className={cls.card}
              key={article.id}
              target={target}
            />
          ))
        : null}
      {!hasMore && <Text title="All articles are loaded already" />}
      {hasMore && isLoading && getSkeletons(view)}
    </div>
  );
};

export default ArticlesList;

//                    SKELETONS AND NO ARTICLES FOUND CONDITIONS

//   if (!isLoading && !articles && articles.length) {
//   return (
//     <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
//       <Text title="No articles found" />
//     </div>
//   );
// }

// Я бы всем посоветовал пока забить на эту виртуализацию.
// Если на работе придется использовать, то тогда советую брать react-window.
// Где-то год назад Virtuoso была сырая. На работе использовал сперва Virtuoso.
//  Сперва работал норм. Потом в некоторых кейсах сбрасывал исключение.
//  Пришлось переписать на react-window. С ним проблемы нет. Для inifinite scrolling
//  можно использовать react-window-infinite-scroll. Только не забудьте сбрасывать кеш
//  если хотите refetch ить данные повторно.
//  Там github е в секции Advanced об этом написано.
//   Если это не делать infinite scroll перестанет срабатывать
