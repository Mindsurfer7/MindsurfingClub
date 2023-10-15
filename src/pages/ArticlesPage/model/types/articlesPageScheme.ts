import { error } from '../../../../shared/UI/Text/Text.stories';
import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleViewType } from 'entities/Article';
import { ArticleSortField, ArticleType } from 'entities/Article/types/article';
import { SortOrder } from 'shared/types';

export interface ArticlesPageScheme extends EntityState<Article> {
  isLoading: boolean;
  error: string | undefined;

  view: ArticleViewType;

  //pagination
  hasMore: boolean;
  limit?: number;
  page: number;

  //filters
  order: SortOrder;
  sort: ArticleSortField;
  search: string;
  type: ArticleType;

  _inited: boolean;
}
