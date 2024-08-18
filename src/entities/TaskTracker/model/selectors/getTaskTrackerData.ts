import type { StateScheme } from 'App/providers/StoreProvider';

export const getTaskTrackerData = (state: StateScheme) => {
  return state.TaskTracker;
};
export const getTags = (state: StateScheme) => {
  return state.TaskTracker.tags;
};
export const getShowCompleted = (state: StateScheme) => {
  return state.TaskTracker.showCompleted;
};
export const getShowTodayTasks = (state: StateScheme) => {
  return state.TaskTracker.ShowTodayTasks;
};
export const getSelectedTag = (state: StateScheme) => {
  return state.TaskTracker.selectedTag;
};
export const getDifficulty = (state: StateScheme) => {
  return state.TaskTracker.difficulty;
};

export const getSubtasks = (state: StateScheme) => {
  return state.TaskTracker.subtasks;
};

export const getTodayTasks = (state: StateScheme) => {
  return state.TaskTracker.todayTasks;
};
export const getSubType = (state: StateScheme) => {
  return state.TaskTracker.subtype;
};

export const getShowPrinciples = (state: StateScheme) => {
  return state.TaskTracker.showPrinciples;
};
export const getShowCharacter = (state: StateScheme) => {
  return state.TaskTracker.showCharacter;
};
export const getTranscribedVoice = (state: StateScheme) => {
  return state.TaskTracker.transcribedVoice;
};
export const getTaskTrackerIsLoading = (state: StateScheme) => {
  return state.TaskTracker.isLoading;
};
export const getTaskTrackerStep = (state: StateScheme) => {
  return state.TaskTracker.step;
};
export const getTaskTrackerCount = (state: StateScheme) => {
  return state.TaskTracker.count;
};
