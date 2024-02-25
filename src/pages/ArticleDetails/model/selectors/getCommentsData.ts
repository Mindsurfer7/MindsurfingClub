import type { StateScheme } from 'App/providers/StoreProvider';

export const getCommentsIsLoading = (state: StateScheme) =>
  state?.ArticleComments?.isLoading;
export const getCurrentArticleID = (state: StateScheme) =>
  state?.ArticleComments?.articleID;
