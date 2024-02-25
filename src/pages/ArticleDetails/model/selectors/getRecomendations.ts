import type { StateScheme } from 'App/providers/StoreProvider';

export const getRecomendationsIsLoading = (state: StateScheme) =>
  state?.ArticleRecomendations?.isLoading;
