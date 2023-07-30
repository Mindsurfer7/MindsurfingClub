import { GoogleProfile } from 'entities/User/model/types/user';
import { StateScheme } from 'App/providers/StoreProvider';

export const getGoogleProfile = (state: StateScheme) => {
  return state.GoogleProfile?.account;
};
export const getGoogleData = (state: StateScheme) => {
  return state.GoogleProfile;
};
