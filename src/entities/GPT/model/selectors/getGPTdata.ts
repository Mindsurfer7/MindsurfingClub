import type { StateScheme } from 'App/providers/StoreProvider';

export const getMessages = (state: StateScheme) => {
  return state?.GPT?.messages;
};
export const getSingleMessage = (state: StateScheme) => {
  return state?.GPT?.singleMessage;
};
export const getIsWriting = (state: StateScheme) => {
  return state?.GPT?.isLoading;
};
export const getDialogsList = (state: StateScheme) => {
  return state?.GPT?.conversations;
};
export const getInputValue = (state: StateScheme) => {
  return state?.GPT?.InputValue;
};
