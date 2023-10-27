import React, { useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleDetailsHeader.module.scss';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routesConfig/routesConfig';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import {
  getArticleData,
  getCanEditArticle,
} from 'entities/Article/model/selectors/getArticleData';
import { useSelector } from 'react-redux';

interface ArticleDetailsHeaderProps {
  className?: string;
}

const ArticleDetailsHeader: React.FC<ArticleDetailsHeaderProps> = ({
  className,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const article = useSelector(getArticleData);
  const userID = useSelector(getGoogleID);
  const canEdit = useSelector(getCanEditArticle);

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles);
  }, [navigate]);

  const onEditClick = useCallback(() => {
    navigate(`${RoutePath.articles}/${article?.id}/edit`);
    console.log(`${article?.id}/edit`);
  }, [navigate, article?.id]);

  return (
    <div
      className={classNames(cls.ArticleDetailsHeader, {}, [
        className as string,
      ])}
    >
      <Button onClick={onBackToList} theme={ButtonTheme.OUTLINE}>
        {t('Back to list')}
      </Button>
      {article?.authorID === userID && (
        <Button
          className={cls.editBtn}
          onClick={onEditClick}
          theme={ButtonTheme.OUTLINE}
        >
          {t('Edit')}
        </Button>
      )}
    </div>
  );
};

export default ArticleDetailsHeader;
