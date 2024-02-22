import React, { HTMLAttributeAnchorTarget, useCallback, useRef } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticlesList.module.scss';
import { Article, ArticleViewType } from 'entities/Article/types/article';
import ArticleItem from '../../ArticleItem/ArticleItem';
import { ArticleItemSkeleton } from '../../ArticleItem/ArticleItemSkeleton';
import Text from 'shared/UI/Text/Text';
import { useVirtualizer } from '@tanstack/react-virtual';

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

// example https://tanstack.com/table/v8/docs/framework/react/examples/virtualized-columns

const ArticlesList: React.FC<ArticlesListProps> = ({
  className,
  articles,
  isLoading,
  target,
  hasMore,
  view = ArticleViewType.Square,
}) => {
  // To know whether there is a next page,
  //  you'll typically load one extra item for each page. So if you're displaying 5 items
  //   per page, you'd try to load 6 items for the last page. If you get that sixth item,
  //    you know you need to display a next page link.

  //just container for items
  const articleContainerRef = React.useRef<HTMLDivElement>(null);

  //we are using a slightly different virtualization strategy for columns (compared to virtual rows) in order to support dynamic row heights
  const virtualizer = useVirtualizer({
    count: articles ? articles.length : 0, //visibleColumns.length,
    estimateSize: useCallback((index) => 223, []), //estimate width of each column for accurate scrollbar dragging. index => visibleColumns[index].getSize(),
    getScrollElement: () => articleContainerRef.current,
    horizontal: true,
    overscan: 1, //how many columns to render on each side off screen each way (adjust this for performance)
  });

  const virtualArticles = virtualizer.getVirtualItems();

  const totalSize = virtualizer.getTotalSize();

  //   <div className="relative w-full" style={{ height: `${totalSize}p

  const renderArticle = (article: Article) => (
    <ArticleItem
      article={article}
      view={view}
      className={cls.card}
      key={article.id}
      target={target}
    />
  );

  return (
    <div
      ref={articleContainerRef}
      className={classNames(cls.ArticleList, {}, [className, cls[view]])}
      style={{
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        // overflow: 'hidden', //our scrollable table container
        position: 'relative', //needed for sticky header
        // height: '300px', //should be a fixed height
      }}
    >
      {articles &&
        virtualArticles?.map((virtualRow) => {
          return (
            <div
              className={cls.card}
              key={virtualRow.index}
              style={{
                // position: 'absolute',
                // top: 0,
                // left: 0,
                // width: '100%',
                width: '231px',
                maxHeight: '280px',
                // Positions the virtual elements at the right place in container.
                // height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <ArticleItem
                article={articles[virtualRow.index]}
                view={view}
                className={cls.card}
                // key={articles[virtualRow.index].id}
                target={target}
              />
            </div>
          );
        })}
      {/* {articles && articles.length > 0 ? articles.map(renderArticle) : null} */}
      {!hasMore && <Text title="All articles are loaded already" />}
      {hasMore && isLoading && getSkeletons(view)}
    </div>
  );
};

export default ArticlesList;

//                    SKELETONS AND NO ARTICLES FOUND

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

// Я бы всем посоветовал пока забить на эту виртуализацию.
// Если на работе придется использовать, то тогда советую брать react-window.
// Где-то год назад Virtuoso была сырая. На работе использовал сперва Virtuoso.
//  Сперва работал норм. Потом в некоторых кейсах сбрасывал исключение.
//  Пришлось переписать на react-window. С ним проблемы нет. Для inifinite scrolling
//  можно использовать react-window-infinite-scroll. Только не забудьте сбрасывать кеш
//  если хотите refetch ить данные повторно.
//  Там github е в секции Advanced об этом написано.
//   Если это не делать infinite scroll перестанет срабатывать
