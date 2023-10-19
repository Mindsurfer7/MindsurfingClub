import React, { useCallback, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticlesPageFilters.module.scss';
import { ArticleViewSelector } from 'features/ArticleViewSelector';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import {
  getArticleType,
  getArtilcesOrder,
  getArtilcesPageData,
  getArtilcesSearch,
  getArtilcesSort,
} from 'pages/ArticlesPage/model/selectors/getArticlesPageData';
import { ArticleViewType } from 'entities/Article';
import {
  setOrder,
  setPage,
  setSearch,
  setSort,
  setType,
  setView,
} from 'pages/ArticlesPage/model/slice/articlePageSlice';
import { useTranslation } from 'react-i18next';
import { Card } from 'shared/UI/Card/Card';
import CustomInput from 'shared/UI/CustomInput/CustomInput';
import ArticleSortSelector from 'features/ArticleSortSelector/ArticleSortSelector';
import { SortOrder } from 'shared/types';
import { ArticleSortField, ArticleType } from 'entities/Article/types/article';
import { requestArticlesList } from 'pages/ArticlesPage/model/services/requestArticlesList';
import { useDebounce } from 'shared/lib/hooks/useDebounce';
import Tabs, { TabItem } from 'shared/UI/Tabs/Tabs';
import ArticleTypeTabs from 'features/ArticleTypeTabs/ArticleTypeTabs';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { useNavigate } from 'react-router-dom';
import { requestArticlesFirebaseTEST } from 'pages/ArticlesPage/model/services/firebaseTestArticlesRequest';

interface ArticlesPageFiltersProps {
  className?: string;
}

const ArticlesPageFilters: React.FC<ArticlesPageFiltersProps> = ({
  className,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('articles');
  const articlesPageData = useSelector(getArtilcesPageData);
  const search = useSelector(getArtilcesSearch);
  const sort = useSelector(getArtilcesSort);
  const order = useSelector(getArtilcesOrder);
  const type = useSelector(getArticleType);
  const navigate = useNavigate();

  const requestData = useCallback(() => {
    // dispatch(requestArticlesList({ replace: true }));
    dispatch(requestArticlesFirebaseTEST(''));
  }, [dispatch]);

  const debouncedRequestData = useDebounce(requestData, 500);

  const onViewChange = useCallback(
    (view: ArticleViewType) => {
      dispatch(setView(view));
    },
    [dispatch],
  );

  const onSortChange = useCallback(
    (sort: ArticleSortField) => {
      dispatch(setSort(sort));
      dispatch(setPage(1));
      requestData();
    },
    [dispatch, requestData],
  );
  const onOrderChange = useCallback(
    (order: SortOrder) => {
      dispatch(setOrder(order));
      dispatch(setPage(1));
      requestData();
    },
    [dispatch, requestData],
  );
  const onSearchChange = useCallback(
    (value: string) => {
      dispatch(setSearch(value));
      dispatch(setPage(1));
      debouncedRequestData();
    },
    [dispatch, debouncedRequestData],
  );

  const onTypeChange = useCallback(
    (value: ArticleType) => {
      dispatch(setType(value));
      dispatch(setPage(1));
      debouncedRequestData();
    },
    [dispatch, debouncedRequestData],
  );

  const onCreateArticle = () => {
    navigate('/textEditor');
  };

  return (
    <div
      className={classNames(cls.ArticlesPageFilters, {}, [className as string])}
    >
      <div className={cls.SortWrap}>
        <ArticleSortSelector
          order={order}
          sort={sort}
          onChangeOrder={onOrderChange}
          onChangeSort={onSortChange}
        />

        <Button onClick={onCreateArticle} theme={ButtonTheme.OUTLINE}>
          Написать статью
        </Button>
        <ArticleViewSelector
          view={articlesPageData?.view}
          onViewClick={onViewChange}
        />
      </div>

      <Card className={cls.Search}>
        <CustomInput
          placeholder={t('Search')}
          className={cls.searchInput}
          value={search}
          onChange={onSearchChange}
        />
      </Card>

      <ArticleTypeTabs value={type} onChangeType={onTypeChange} />
    </div>
  );
};

export default ArticlesPageFilters;
