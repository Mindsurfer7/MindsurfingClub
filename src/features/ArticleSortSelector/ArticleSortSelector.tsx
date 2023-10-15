import React, { useCallback, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleSortSelector.module.scss';
import { useTranslation } from 'react-i18next';
import { Select, SelectOption } from 'shared/UI/Select/Select';
import { ArticleSortField } from 'entities/Article/types/article';
import { SortOrder } from 'shared/types';

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeSort: (newSort: ArticleSortField) => void;
  onChangeOrder: (newOrder: SortOrder) => void;
}

const ArticleSortSelector: React.FC<ArticleSortSelectorProps> = ({
  className,
  order,
  sort,
  onChangeOrder,
  onChangeSort,
}) => {
  const { t } = useTranslation('artilcles');

  const changeSortHandler = useCallback(
    (newSort: string) => {
      onChangeSort(newSort as ArticleSortField);
    },
    [onChangeSort],
  );

  const changeOrderHandler = useCallback(
    (newOrder: string) => {
      onChangeOrder(newOrder as SortOrder);
    },
    [onChangeOrder],
  );

  const orderOptions = useMemo<SelectOption[]>(() => {
    return [
      {
        value: 'asc',
        content: t('ascending'),
      },
      {
        value: 'desc',
        content: t('descending'),
      },
    ];
  }, []);
  const sortFieldOptions = useMemo<SelectOption[]>(() => {
    return [
      {
        value: ArticleSortField.TITLE,
        content: t('title'),
      },
      {
        value: ArticleSortField.VIEWS,
        content: t('views'),
      },
      {
        value: ArticleSortField.CREATED,
        content: t('creationTime'),
      },
    ];
  }, []);

  return (
    <div
      className={classNames(cls.ArticleSortSelector, {}, [className as string])}
    >
      <Select
        label={t('sortBy')}
        options={sortFieldOptions}
        onChange={changeSortHandler}
      />
      <Select
        label={t('sortBy')}
        options={orderOptions}
        onChange={changeOrderHandler}
      />
    </div>
  );
};

export default ArticleSortSelector;
