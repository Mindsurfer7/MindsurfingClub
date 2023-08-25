import React, { memo, useCallback, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './SingleArticle.module.scss';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { ArticleReducer } from 'entities/Article/model/slice/ArticleSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { requestArticleByID } from 'entities/Article/model/services/requestArticleByID';
import { useSelector } from 'react-redux';
import {
  getArticleData,
  getArticleError,
  getArticleIsLoading,
} from 'entities/Article/model/selectors/getArticleData';
import Skeleton from 'shared/UI/Skeleton/Skeleton';
import { Avatar } from 'shared/UI/Avatar/Avatar';
import Text, { TextSize } from 'shared/UI/Text/Text';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import CalendarIcon from 'shared/assets/icons/calendar-20-20.svg';
import { Icon } from 'shared/UI/Icon/Icon';
import ArticleTextBlock from '../../ArticleTextBlock/ArticleTextBlock';
import { ArticleBlock, ArticleBlockType } from 'entities/Article/types/article';
import ArticleCodeBlock from '../../ArticleCodeBlock/ArticleCodeBlock';
import ArticleImageBlock from '../../ArticleImageBlock/ArticleImageBlock';
import { fetchArticleById } from 'entities/Article/model/services/fetchArticleById';

interface SingleArticleProps {
  className?: string;
  ID: string;
}

const reducers: ReducersList = {
  Article: ArticleReducer,
};

const SingleArticle: React.FC<SingleArticleProps> = memo(
  ({ className, ID }) => {
    const isLoading = useSelector(getArticleIsLoading);

    const article = useSelector(getArticleData);
    const error = useSelector(getArticleError);
    const dispatch = useAppDispatch();

    useEffect(() => {
      if (PROJECT !== 'storybook') {
        dispatch(fetchArticleById(ID));
      }
    }, [dispatch, ID]);

    const renderBlock = useCallback((block: ArticleBlock) => {
      switch (block.type) {
        case ArticleBlockType.CODE:
          return (
            <ArticleCodeBlock
              key={block.id}
              block={block}
              className={cls.block}
            />
          );
        case ArticleBlockType.IMAGE:
          return (
            <ArticleImageBlock
              key={block.id}
              block={block}
              className={cls.block}
            />
          );
        case ArticleBlockType.TEXT:
          return (
            <ArticleTextBlock
              key={block.id}
              className={cls.block}
              block={block}
            />
          );
        default:
          return null;
      }
    }, []);

    let content;

    if (isLoading) {
      content = (
        <div>
          <Skeleton
            className={cls.avatar}
            width={200}
            height={200}
            border="50%"
          />
          <Skeleton className={cls.title} width={300} height={32} />
          <Skeleton className={cls.skeleton} width={600} height={24} />
          <Skeleton className={cls.skeleton} width="100%" height={200} />
          <Skeleton className={cls.skeleton} width="100%" height={200} />
        </div>
      );
    } else if (error) {
      content = (
        <>
          <div>err</div>;
        </>
      );
    } else {
      content = (
        <>
          <div className={cls.avatarWrapper}>
            <Avatar size={200} src={article?.img} className={cls.avatar} />
          </div>
          <Text
            className={cls.title}
            title={article?.title}
            text={article?.subtitle}
            size={TextSize.L}
          />

          <div className={cls.articleInfo}>
            <Icon className={cls.icon} Svg={EyeIcon} />
            <Text text={String(article?.views)} />
          </div>
          <div className={cls.articleInfo}>
            <Icon className={cls.icon} Svg={CalendarIcon} />
            <Text text={article?.createdAt} />
          </div>
          {article?.blocks.map(renderBlock)}
        </>
      );
    }

    return (
      <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
        <div
          className={classNames(cls.SingleArticle, {}, [className as string])}
        >
          {content}
        </div>
      </DynamicModuleLoader>
    );
  },
);

export default SingleArticle;
