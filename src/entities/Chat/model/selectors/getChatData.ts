import { StateScheme } from 'App/providers/StoreProvider';

export const getChatMessage = (state: StateScheme) => {
  return state.Chat?.message;
};
export const getChatMessages = (state: StateScheme) => {
  return state.Chat?.messages;
};
