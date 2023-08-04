import { StateScheme } from 'App/providers/StoreProvider';

export const getPlayerProfile = (state: StateScheme) => {
  return state.Player.PlayerData;
};
export const getHabits = (state: StateScheme) => {
  return state.Player.habits;
};
export const getTasks = (state: StateScheme) => {
  return state.Player.tasks;
};
