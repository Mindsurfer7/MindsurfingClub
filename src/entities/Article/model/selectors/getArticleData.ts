import { StateScheme } from 'App/providers/StoreProvider';

export const getArticleData = (state: StateScheme) => {
  return state.Article?.data;
};
export const getArticleIsLoading = (state: StateScheme) => {
  return state.Article?.isLoading;
};
export const getArticleError = (state: StateScheme) => {
  return state.Article?.error;
};
