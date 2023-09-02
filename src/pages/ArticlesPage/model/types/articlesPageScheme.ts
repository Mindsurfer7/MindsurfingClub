import { error } from '../../../../shared/UI/Text/Text.stories';
import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleViewType } from 'entities/Article';

export interface ArticlesPageScheme extends EntityState<Article> {
  isLoading: boolean;
  error: string | undefined;

  view: ArticleViewType;
  hasMore: boolean;
  limit?: number;
  page: number;

  _inited: boolean;
}
