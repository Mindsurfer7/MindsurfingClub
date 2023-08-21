import { StateScheme } from 'App/providers/StoreProvider';

export const getChallengePageData = (state: StateScheme) => {
  return state.ChallengePage?.challengeData;
};
