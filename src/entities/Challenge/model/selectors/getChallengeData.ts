import { StateScheme } from 'App/providers/StoreProvider';

export const getchallenges = (state: StateScheme) => {
  return state.Challenge.challenges;
};
