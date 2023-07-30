import { StateScheme } from 'App/providers/StoreProvider';

export const getMessages = (state: StateScheme) => {
  return state?.GPT?.messages;
};
export const getSingleMessage = (state: StateScheme) => {
  return state?.GPT?.singleMessage;
};
