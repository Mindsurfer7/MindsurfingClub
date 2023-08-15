import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleDetailsPage.module.scss';
import SingleArticle from 'entities/Article/UI/SingleArticle/UI/SingleArticle';
import { useParams } from 'react-router-dom';
import Text from 'shared/UI/Text/Text';
import { CommentList } from 'entities/Comment';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import {
  articleDetailsCommentsReducer,
  getArticleComments,
} from '../model/slice/ArticleDetailsCommentsSlice';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchCommentsByArticleId } from '../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { getCommentsIsLoading } from '../model/selectors/getCommentsData';

interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  ArticleComments: articleDetailsCommentsReducer,
};

const ArticleDetailsPage: React.FC<ArticleDetailsPageProps> = ({
  className,
}) => {
  const { articleID } = useParams<{ articleID: string }>();
  const comments = useSelector(getArticleComments.selectAll);
  const isLoading = useSelector(getCommentsIsLoading);
  const dispatch = useAppDispatch();

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(articleID));
  });

  if (!articleID) {
    return (
      <div
        className={classNames(cls.ArticleDetailsPage, {}, [
          className as string,
        ])}
      >
        Sorry, but article wasnt found
      </div>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div
        className={classNames(cls.ArticleDetailsPage, {}, [
          className as string,
        ])}
      >
        <SingleArticle ID={articleID} />
        <Text title="Comments" />
        <CommentList
          isLoading={false} //БРЕД!
          comments={comments}
        />
      </div>
    </DynamicModuleLoader>
  );
};

export default ArticleDetailsPage;
