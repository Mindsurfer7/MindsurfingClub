import { StateScheme } from 'App/providers/StoreProvider';
import { ArticleSortField, ArticleType } from 'entities/Article/types/article';

export const getArtilcesPageData = (state: StateScheme) => {
  return state.ArticlesPage;
};
export const getArtilcesPageIsLoading = (state: StateScheme) => {
  return state.ArticlesPage?.isLoading;
};
export const getArtilcesPageLimit = (state: StateScheme) => {
  return state.ArticlesPage?.limit;
};
export const getArtilcesPageNum = (state: StateScheme) => {
  return state.ArticlesPage?.page || 1;
};
export const getArtilcesPageHasMore = (state: StateScheme) => {
  return state.ArticlesPage?.hasMore;
};
export const getArtilcesPageError = (state: StateScheme) => {
  return state.ArticlesPage?.error;
};
export const getArtilcesInited = (state: StateScheme) => {
  return state.ArticlesPage?._inited;
};
export const getArtilcesSearch = (state: StateScheme) => {
  return state.ArticlesPage?.search ?? '';
};
export const getArtilcesSort = (state: StateScheme) => {
  return state.ArticlesPage?.sort || ArticleSortField.VIEWS;
};
export const getArtilcesOrder = (state: StateScheme) => {
  return state.ArticlesPage?.order || 'desc';
};
export const getArticleType = (state: StateScheme) => {
  return state.ArticlesPage?.type ?? ArticleType.ALL;
};
export const getLastDocSnapshot = (state: StateScheme) => {
  return state.ArticlesPage?.lastDocSnapshot;
};
export const getArticleViewType = (state: StateScheme) => {
  return state.ArticlesPage?.view;
};
