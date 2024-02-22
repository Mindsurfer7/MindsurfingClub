import { useCallback, useRef, useState } from 'react';
import { useFixedSizeList } from './useVirt';
import React, { HTMLAttributeAnchorTarget } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticlesList.module.scss';
import { Article, ArticleViewType } from 'entities/Article/types/article';
import ArticleItem from '../../ArticleItem/ArticleItem';
import { ArticleItemSkeleton } from '../../ArticleItem/ArticleItemSkeleton';

interface ArticlesListProps {
  className?: string;
  articles: Article[] | undefined;
  isLoading: boolean;
  hasMore?: boolean;
  view?: ArticleViewType;
  target?: HTMLAttributeAnchorTarget;
}

const itemHeight = 280;
const containerHeight = 600;

//@ts-ignore
export const ArticlesList2: React.FC<ArticlesListProps> = ({
  className,
  articles,
  isLoading,
  target,
  hasMore,
  view = ArticleViewType.Square,
}) => {
  if (articles) {
    const listItems = articles;
    // const [listItems, setListItems] = useState(articles);
    const scrollElementRef = useRef<HTMLDivElement>(null);

    console.log(listItems);

    const { isScrolling, virtualItems, totalHeight } = useFixedSizeList({
      itemHeight: itemHeight,
      itemsCount: listItems ? listItems.length : 8,
      listHeight: containerHeight,
      getScrollElement: useCallback(() => scrollElementRef.current, []),
    });

    return (
      <div style={{ padding: '0 12px' }}>
        <h1>List</h1>
        <div style={{ marginBottom: 12 }}></div>
        <div
          ref={scrollElementRef}
          style={{
            height: containerHeight,
            overflow: 'auto',
            border: '1px solid lightgrey',
            position: 'relative',
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ height: totalHeight }}>
            {virtualItems.map((virtualItem) => {
              const item = listItems[virtualItem.index]!;

              return (
                <ArticleItem
                  article={articles[virtualItem.index]}
                  view={view}
                  className={cls.card}
                  target={target}
                  // style={style}
                  style={{
                    position: 'absolute',
                    top: 0,
                    transform: `translateY(${virtualItem.offsetTop}px)`,
                    height: itemHeight,
                    padding: '6px 12px',
                  }}
                  key={item.id}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};
