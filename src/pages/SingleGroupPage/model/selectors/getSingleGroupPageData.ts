import type { StateScheme } from 'App/providers/StoreProvider';

export const getSingleGroupPageIsLoading = (state: StateScheme) => {
  return state?.SingleGroupPage?.isLoading;
};

export const getSingleGroupPagePosts = (state: StateScheme) => {
  return state?.SingleGroupPage?.posts;
};
export const getSingleGroupPageArticles = (state: StateScheme) => {
  return state?.SingleGroupPage?.articles;
};
