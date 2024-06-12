import type { StateScheme } from 'App/providers/StoreProvider';

export const getTherapyState = (state: StateScheme) => {
  return state.TherapyPage;
};
export const getAdaptiveInput = (state: StateScheme) => {
  return state.TherapyPage.adaptiveInput;
};
export const getDysfunctionalInput = (state: StateScheme) => {
  return state.TherapyPage.dysfunctionalInput;
};
export const getBiasList = (state: StateScheme) => {
  return state.TherapyPage.biasList;
};
export const getTherapyPageIsLoading = (state: StateScheme) => {
  return state.TherapyPage.isLoading;
};
export const getBeliefAnalisis = (state: StateScheme) => {
  return state.TherapyPage.advice;
};
export const getStrategy = (state: StateScheme) => {
  return state.TherapyPage.strategyInput;
};
