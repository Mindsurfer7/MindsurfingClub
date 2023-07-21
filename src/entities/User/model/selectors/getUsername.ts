import { StateScheme } from 'App/providers/StoreProvider';

export const getUsername = (state: StateScheme) => {
  return state.user.authData?.username;
};
