import type { StateScheme } from 'App/providers/StoreProvider';

export const getProfilePagePosts = (state: StateScheme) => {
  return state?.ProfilePage?.posts;
};
export const getProfilePageError = (state: StateScheme) => {
  return state?.ProfilePage?.error;
};
export const getProfilePageReadonly = (state: StateScheme) => {
  return state?.ProfilePage?.readonly;
};
export const getProfilePageForm = (state: StateScheme) => {
  return state?.ProfilePage?.form;
};
export const getProfilePageProfile = (state: StateScheme) => {
  return state?.ProfilePage?.profile;
};
export const getProfilePageIsLoading = (state: StateScheme) => {
  return state?.ProfilePage?.isLoading;
};
