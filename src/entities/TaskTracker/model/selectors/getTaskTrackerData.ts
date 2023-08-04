import { StateScheme } from 'App/providers/StoreProvider';

export const getTaskTrackerData = (state: StateScheme) => {
  return state.TaskTracker;
};
export const getDifficulty = (state: StateScheme) => {
  return state.TaskTracker.difficulty;
};
