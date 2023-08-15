import { EntityState } from '@reduxjs/toolkit';
import { CommentType } from 'entities/Comment';

export interface ArticleDetailsCommentsScheme extends EntityState<CommentType> {
  isLoading?: boolean;
  error?: string;
}
