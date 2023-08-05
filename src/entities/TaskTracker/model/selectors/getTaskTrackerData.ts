import { StateScheme } from 'App/providers/StoreProvider';

export const getTaskTrackerData = (state: StateScheme) => {
  return state.TaskTracker;
};
export const getShowCompleted = (state: StateScheme) => {
  return state.TaskTracker.showCompleted;
};
export const getDifficulty = (state: StateScheme) => {
  return state.TaskTracker.difficulty;
};
