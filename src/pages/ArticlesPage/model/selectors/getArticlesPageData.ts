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
