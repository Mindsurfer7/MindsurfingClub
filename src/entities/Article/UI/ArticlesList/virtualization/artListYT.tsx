import React, { HTMLAttributeAnchorTarget, useCallback, useRef } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticlesList.module.scss';
import { Article, ArticleViewType } from 'entities/Article/types/article';
import ArticleItem from '../ArticleItem/ArticleItem';
import { ArticleItemSkeleton } from '../ArticleItem/ArticleItemSkeleton';
import Text from 'shared/UI/Text/Text';
import { useVirtualizer } from '@tanstack/react-virtual';
import { FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

interface ArticlesListProps {
  className?: string;
  articles: Article[];
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
  const articleContainerRef = React.useRef<HTMLDivElement>(null);
  //@ts-ignore
  const Row = ({ index, style }) => {
    // if (!articles[index]) {
    //   return <div className="">No Articles</div>;
    // }

    return (
      <ArticleItem
        article={articles[index]}
        view={view}
        className={cls.card}
        target={target}
        style={style}
      />
    );
  };

  const itemCount = hasMore ? articles.length + 1 : articles.length;

  const fff = () => {
    console.log('');
  };

  return (
    <InfiniteLoader
      isItemLoaded={(index) => index < articles!.length}
      itemCount={itemCount}
      loadMoreItems={fff} //we need callback to be called not from my hook? !!!!!!
    >
      {({ onItemsRendered, ref }) => (
        <FixedSizeList
          height={500}
          width={500}
          itemCount={itemCount}
          itemSize={120}
          onItemsRendered={onItemsRendered}
          ref={ref}
        >
          {Row}
        </FixedSizeList>
      )}
    </InfiniteLoader>
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
