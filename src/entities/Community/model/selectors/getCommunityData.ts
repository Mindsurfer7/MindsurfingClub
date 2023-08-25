import { StateScheme } from 'App/providers/StoreProvider';

export const getCommunityData = (state: StateScheme) => {
  return state.Community.groups;
};
export const getClubsAreLoading = (state: StateScheme) => {
  return state.Community.isLoading;
};
export const getSinglePublicData = (state: StateScheme) => {
  return state.Community.community;
};

export const getGroupParticipants = (state: StateScheme) => {
  return state.Community.members;
};
export const getGroupTitle = (state: StateScheme) => {
  return state.Community.title;
};
export const getGroupDescription = (state: StateScheme) => {
  return state.Community.description;
};
export const getGroupPoster = (state: StateScheme) => {
  return state.Community.posterLink;
};
