import { StateScheme } from 'App/providers/StoreProvider';

export const getCommentsIsLoading = (state: StateScheme) =>
  state?.ArticleComments?.isLoading;
