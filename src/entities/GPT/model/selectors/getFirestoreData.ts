import { StateScheme } from 'App/providers/StoreProvider';

export const getMessagesFromDBresponse = (state: StateScheme) => {
  return state?.GPT?.conversations[0]?.messages;
};
export const getConversationID = (state: StateScheme) => {
  return state?.GPT?.conversations[0]?.id;
};
