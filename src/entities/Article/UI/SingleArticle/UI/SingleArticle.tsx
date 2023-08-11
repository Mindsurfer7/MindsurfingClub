import React, { memo, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './SingleArticle.module.scss';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { ArticleReducer } from 'entities/Article/model/slice/ArticleSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { requestArticleByID } from 'entities/Article/model/services/requestArticleByID';

interface SingleArticleProps {
  className?: string;
  ID: string;
}

const reducers: ReducersList = {
  Article: ArticleReducer,
};

const SingleArticle: React.FC<SingleArticleProps> = memo(
  ({ className, ID }) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
      dispatch(requestArticleByID('ID'));
    }, [dispatch]);

    return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
        <div
          className={classNames(cls.SingleArticle, {}, [className as string])}
        >
          xxxxxxxxxxxxxxxxx
        </div>
      </DynamicModuleLoader>
    );
  },
);

export default SingleArticle;
