import React, { useCallback, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleDetailsPage.module.scss';
import SingleArticle from 'entities/Article/UI/SingleArticle/UI/SingleArticle';
import { useNavigate, useParams } from 'react-router-dom';
import Text, { TextAlign } from 'shared/UI/Text/Text';
import { CommentList } from 'entities/Comment';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import {
  articleDetailsCommentsReducer,
  getArticleComments,
  setArticleID,
} from '../model/slice/ArticleDetailsCommentsSlice';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchCommentsByArticleId } from '../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { getCommentsIsLoading } from '../model/selectors/getCommentsData';
import AddCommentForm from 'features/AddComment/UI/AddCommentForm';
import { addCommentForArticle } from '../model/services/addCommentForArticle';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { useTranslation } from 'react-i18next';
import { RoutePath } from 'shared/config/routesConfig/routesConfig';
import { Page } from 'widgets/Page';
import { requestCommentsByArticleID } from '../model/services/fetchCommentsByArticleId/requestCommentsByArticleID';
import { addComment } from 'features/AddComment/model/services/addComment';
import { v4 } from 'uuid';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { getRecomendationsIsLoading } from '../model/selectors/getRecomendations';
import { ArticlesList } from 'entities/Article';
import {
  articleDetailsRecomendationsReducer,
  getArticleRecomendations,
} from '../model/slice/ArticleRecomendationsSlice';
import { requestArticleRecomendations } from '../model/services/requestArticleRecomendations';
import ArticleDetailsHeader from './ArticleDetailsHeader/ArticleDetailsHeader';
import { getArticleData } from 'entities/Article/model/selectors/getArticleData';

interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  ArticleComments: articleDetailsCommentsReducer,
  ArticleRecomendations: articleDetailsRecomendationsReducer,
};

const ArticleDetailsPage: React.FC<ArticleDetailsPageProps> = ({
  className,
}) => {
  const { articleID } = useParams<{ articleID: string }>();
  const comments = useSelector(getArticleComments.selectAll);
  const recs = useSelector(getArticleRecomendations.selectAll);
  const userID = useSelector(getGoogleID);
  const commentsAreLoading = useSelector(getCommentsIsLoading);
  const recsAreLoading = useSelector(getRecomendationsIsLoading);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  // useInitialEffect(() => {
  // dispatch(fetchCommentsByArticleId(articleID));

  // });

  useEffect(() => {
    if (articleID) {
      dispatch(requestCommentsByArticleID(articleID));
      dispatch(requestArticleRecomendations());
      dispatch(setArticleID(articleID));
    }
  }, [articleID]);

  const onCommentSend = useCallback(
    (text: string) => {
      if (!userID) {
        alert('Please, log in');
      }
      dispatch(addCommentForArticle(text)); //mock server
      dispatch(addComment({ ID: v4() })); //firebase server
    },
    [dispatch, userID],
  );

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
      <Page
        className={classNames(cls.ArticleDetailsPage, {}, [
          className as string,
        ])}
      >
        <ArticleDetailsHeader />
        <SingleArticle ID={articleID} className={cls.singleArticle} />
        <Text
          align={TextAlign.Center}
          title="Комментарии"
          className={cls.recTitle}
        />
        <AddCommentForm onSendComment={onCommentSend} />
        <CommentList isLoading={commentsAreLoading} comments={comments} />
        <Text
          align={TextAlign.Center}
          title="Рекомендации"
          className={cls.recTitle}
        />
        <ArticlesList
          articles={recs}
          target="_blank"
          isLoading={recsAreLoading ? true : false}
        />
      </Page>
    </DynamicModuleLoader>
  );
};

export default ArticleDetailsPage;
