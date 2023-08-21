import { StateScheme } from 'App/providers/StoreProvider';

export const getchallenges = (state: StateScheme) => {
  return state.Challenge.challenges;
};
export const getChallengesIsLoading = (state: StateScheme) => {
  return state.Challenge.isLoading;
};
export const getShowChallenges = (state: StateScheme) => {
  return state.Challenge.showChallenges;
};
export const getChallengeData = (state: StateScheme) => {
  return state.Challenge.challengeData;
};
