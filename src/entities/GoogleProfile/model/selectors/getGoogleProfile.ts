import type { StateScheme } from 'App/providers/StoreProvider';

export const getGoogleProfile = (state: StateScheme) => {
  return state.GoogleProfile?.account;
};
export const getGoogleAvatar = (state: StateScheme) => {
  return state.GoogleProfile?.account?.photoURL;
};
export const getGoogleNickname = (state: StateScheme) => {
  return state.GoogleProfile?.account?.displayName;
};
export const getGoogleData = (state: StateScheme) => {
  return state.GoogleProfile;
};
export const getGoogleIsLogged = (state: StateScheme) => {
  return state.GoogleProfile.isLogged;
};
export const getGoogleID = (state: StateScheme) => {
  return state.GoogleProfile.account?.uid;
};
