import React, { useCallback, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticlesPage.module.scss';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { ArticleViewType, ArticlesList } from 'entities/Article';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import {
  articlesPageReducer,
  getArticles,
  initState,
  setPage,
  setView,
} from '../model/slice/articlePageSlice';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { requestArticlesList } from '../model/services/requestArticlesList';
import { useSelector } from 'react-redux';
import {
  getArtilcesInited,
  getArtilcesPageData,
  getArtilcesPageError,
  getArtilcesPageHasMore,
  getArtilcesPageIsLoading,
  getArtilcesPageNum,
} from '../model/selectors/getArticlesPageData';
import { ArticleViewSelector } from 'features/ArticleViewSelector';
import { Page } from 'widgets/Page';
import { requestNextArticlesPage } from '../model/services/requestNextArticlesPage';
import { initArticlesPage } from '../model/services/initArticlesPage';
import ArticlesPageFilters from './ArticlesPageFilters/ArticlesPageFilters';
import { useSearchParams } from 'react-router-dom';
import { requestArticlesFirebaseTEST } from '../model/services/firebaseTestArticlesRequest';

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  ArticlesPage: articlesPageReducer,
};

const ArticlesPage: React.FC<ArticlesPageProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const articlesPageData = useSelector(getArtilcesPageData);
  const isLoading = useSelector(getArtilcesPageIsLoading);
  const articles = useSelector(getArticles.selectAll);
  const page = useSelector(getArtilcesPageNum);
  const hasMore = useSelector(getArtilcesPageHasMore);
  const error = useSelector(getArtilcesPageError);
  const inited = useSelector(getArtilcesInited);
  const [searchParams] = useSearchParams();

  // useInitialEffect(() => {
  //   dispatch(initArticlesPage(searchParams));
  // });

  useEffect(() => {
    dispatch(requestArticlesFirebaseTEST(''));
  }, []);

  const onLoadNextPart = useCallback(() => {
    dispatch(requestNextArticlesPage());
  }, [dispatch]);

  if (error) {
    return <span>sorry error</span>;
  }

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page
        onScrollEnd={onLoadNextPart}
        className={classNames(cls.ArticlesPage, {}, [className as string])}
      >
        <ArticlesPageFilters className={cls.pageFilters} />
        <ArticlesList
          //@ts-ignore
          isLoading={isLoading}
          className={cls.list}
          view={articlesPageData?.view}
          articles={articles}
        />
      </Page>
    </DynamicModuleLoader>
  );
};

export default ArticlesPage;
