import { StateScheme } from 'App/providers/StoreProvider';

export const getTaskTrackerData = (state: StateScheme) => {
  return state.TaskTracker;
};
export const getTags = (state: StateScheme) => {
  return state.TaskTracker.tags;
};
export const getShowCompleted = (state: StateScheme) => {
  return state.TaskTracker.showCompleted;
};
export const getSelectedTag = (state: StateScheme) => {
  return state.TaskTracker.selectedTag;
};
export const getDifficulty = (state: StateScheme) => {
  return state.TaskTracker.difficulty;
};
export const getSubtaskTitle = (state: StateScheme) => {
  return state.TaskTracker.subtaskTitle;
};
export const getSubtasks = (state: StateScheme) => {
  return state.TaskTracker.subtasks;
};
