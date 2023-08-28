import React, { useCallback } from 'react';
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
  setView,
} from '../model/slice/articlePageSlice';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { requestArticlesList } from '../model/services/requestArticlesList';
import { useSelector } from 'react-redux';
import {
  getArtilcesPageData,
  getArtilcesPageIsLoading,
} from '../model/selectors/getArticlesPageData';
import { ArticleViewSelector } from 'features/ArticleViewSelector';

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

  useInitialEffect(() => {
    dispatch(initState());
    dispatch(
      requestArticlesList({
        page: 1,
      }),
    );
  });

  const onViewChange = useCallback(
    (view: ArticleViewType) => {
      dispatch(setView(view));
    },
    [dispatch],
  );

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.ArticlesPage, {}, [className as string])}>
        <ArticleViewSelector
          view={articlesPageData?.view}
          onViewClick={onViewChange}
        />
        <ArticlesList
          //@ts-ignore
          isLoading={isLoading}
          view={articlesPageData?.view}
          articles={articles}
        />
      </div>
    </DynamicModuleLoader>
  );
};

export default ArticlesPage;
