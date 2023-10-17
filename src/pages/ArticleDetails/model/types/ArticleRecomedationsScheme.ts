import { error } from './../../../../shared/UI/Text/Text.stories';
import { EntityState } from '@reduxjs/toolkit';
import { Article } from 'entities/Article';

export interface ArticleDetailsRecomendationsScheme
  extends EntityState<Article> {
  isLoading?: boolean;
  error?: string;
}
