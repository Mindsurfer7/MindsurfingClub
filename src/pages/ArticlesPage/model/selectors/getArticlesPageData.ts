import { StateScheme } from 'App/providers/StoreProvider';

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
  return state.ArticlesPage?.page;
};
export const getArtilcesPageHasMore = (state: StateScheme) => {
  return state.ArticlesPage?.hasMore;
};
