import { StateScheme } from 'App/providers/StoreProvider';

export const getWallPosts = (state: StateScheme) => {
  return state?.Wall?.posts;
};
export const getWallPostsIsLoading = (state: StateScheme) => {
  return state?.Wall?.isLoading;
};
export const getWallInited = (state: StateScheme) => {
  return state?.Wall?._inited;
};
