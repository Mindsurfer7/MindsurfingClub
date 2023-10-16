import { EntityState } from '@reduxjs/toolkit';
import { Article } from 'entities/Article';
import { CommentType } from 'entities/Comment';

export interface ArticleDetailsCommentsScheme extends EntityState<CommentType> {
  isLoading?: boolean;
  error?: string;
  data?: Article;
  articleID: string;
}
