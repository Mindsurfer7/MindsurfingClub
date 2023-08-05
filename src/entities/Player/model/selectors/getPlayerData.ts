import { StateScheme } from 'App/providers/StoreProvider';

export const getPlayerProfile = (state: StateScheme) => {
  return state.Player.PlayerData;
};
export const getPlayerPoints = (state: StateScheme) => {
  return state.Player.PlayerData.points;
};
export const getHabits = (state: StateScheme) => {
  return state.Player.habits;
};
export const getTasks = (state: StateScheme) => {
  return state.Player.tasks;
};
export const getDailys = (state: StateScheme) => {
  return state.Player.daily;
};
export const getPlayerDataError = (state: StateScheme) => {
  return state.Player.error;
};
export const getCompletedTasks = (state: StateScheme) => {
  return state.Player.completedTasks;
};
