import React, {
  HTMLAttributeAnchorTarget,
  StyleHTMLAttributes,
  useCallback,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleItem.module.scss';
import {
  Article,
  ArticleBlockType,
  ArticleTextBlockType,
  ArticleViewType,
} from 'entities/Article/types/article';
import { Avatar } from 'shared/UI/Avatar/Avatar';
import Text from 'shared/UI/Text/Text';
import { Card } from 'shared/UI/Card/Card';
import ArticleTextBlock from '../ArticleTextBlock/ArticleTextBlock';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routesConfig/routesConfig';
import { Icon } from 'shared/UI/Icon/Icon';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import AppLink from 'shared/UI/AppLink/AppLink';

interface ArticleItemProps {
  className?: string;
  article: Article;
  view: ArticleViewType;
  target?: HTMLAttributeAnchorTarget;
  style?: React.CSSProperties;
}

const ArticleItem: React.FC<ArticleItemProps> = ({
  className,
  view,
  article,
  target,
  style,
}) => {
  const { t } = useTranslation();
  // const navigate = useNavigate(); функционал перенесен в апплинк

  // const onOpenArticle = useCallback(() => {
  //   navigate(RoutePath.SingleArticle + article.id);
  // }, [article.id, navigate]);

  const types = <Text text={article.type.join(', ')} className={cls.types} />;
  const views = (
    <>
      <Text text={String(article.views)} className={cls.views} />
      <Icon Svg={EyeIcon} />
    </>
  );

  if (view === ArticleViewType.Rectangle) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlockType;

    return (
      <div
        className={classNames(cls.ArticleItem, {}, [className, cls[view]])}
        style={style}
      >
        <Card className={cls.card}>
          <div className={cls.header}>
            <Avatar size={30} src={article.user?.avatar} />
            <Text text={article.user?.username} className={cls.username} />
            <Text text={article.createdAt} className={cls.date} />
          </div>
          <Text title={article.title} className={cls.title} />
          {types}
          <img src={article.img} className={cls.img} alt={article.title} />
          {textBlock && (
            <ArticleTextBlock block={textBlock} className={cls.textBlock} />
          )}
          <div className={cls.footer}>
            <AppLink to={RoutePath.SingleArticle + article.id} target={target}>
              {' '}
              <Button theme={ButtonTheme.OUTLINE}>
                {t('Читать далее...')}
              </Button>
            </AppLink>

            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <AppLink
      to={RoutePath.SingleArticle + article.id}
      target={target}
      className={classNames(cls.ArticleItem, {}, [className, cls[view]])}
    >
      <Card className={cls.card} style={style}>
        <div className={cls.imageWrapper}>
          <img alt={article.title} src={article.img} className={cls.img} />
          <Text text={article.createdAt} className={cls.date} />
        </div>
        <div className={cls.infoWrapper}>
          {types}
          {views}
        </div>
        <Text text={article.title} className={cls.title} />
      </Card>
    </AppLink>
  );
};

export default ArticleItem;
