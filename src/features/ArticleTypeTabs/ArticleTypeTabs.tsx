import React, { useCallback, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleType } from 'entities/Article/types/article';
import Tabs, { TabItem } from 'shared/UI/Tabs/Tabs';

interface ArticleTypeTabsProps {
  className?: string;
  value: ArticleType;
  onChangeType: (type: ArticleType) => void;
}

const ArticleTypeTabs: React.FC<ArticleTypeTabsProps> = ({
  className,
  value,
  onChangeType,
}) => {
  const onTabClick = useCallback(
    (tab: TabItem) => {
      onChangeType(tab.value as ArticleType);
    },
    [onChangeType],
  );

  const typeTabs = useMemo<TabItem[]>(
    () => [
      {
        value: ArticleType.ALL,
        content: 'All articles',
      },
      {
        value: ArticleType.IT,
        content: 'IT',
      },
      {
        value: ArticleType.PSYCHOLOGY,
        content: 'psychology',
      },
      {
        value: ArticleType.SCIENCE,
        content: 'science',
      },
    ],
    [],
  );

  return (
    <Tabs
      onTabClick={onTabClick}
      tabs={typeTabs}
      value={value}
      className={classNames('', {}, [className as string])}
    />
  );
};

export default ArticleTypeTabs;
