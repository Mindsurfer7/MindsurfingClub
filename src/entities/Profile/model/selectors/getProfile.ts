import { StateScheme } from 'App/providers/StoreProvider';

export const getProfileUsername = (state: StateScheme) => {
  state?.profile?.data?.username || '';
};
export const getProfileData = (state: StateScheme) => {
  return state?.profile?.data || '';
};
export const getProfileError = (state: StateScheme) => {
  state?.profile?.error;
};
export const getProfileIsLoading = (state: StateScheme) => {
  state?.profile?.isLoading;
};
