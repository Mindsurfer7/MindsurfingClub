import { StateScheme } from 'App/providers/StoreProvider';

export const getCommunityData = (state: StateScheme) => {
  return state.Community;
};
export const getGroupParticipants = (state: StateScheme) => {
  return state.Community.participants;
};
export const getGroupTitle = (state: StateScheme) => {
  return state.Community.title;
};
export const getGroupDescription = (state: StateScheme) => {
  return state.Community.desciption;
};
