import { StateScheme } from 'App/providers/StoreProvider';

export const getUsername = (state: StateScheme) => {
  return state.user.authData?.username;
};
export const getUserAuthData = (state: StateScheme) => {
  return state.user.authData;
};
export const getUserInited = (state: StateScheme) => {
  return state.user.inited;
};
