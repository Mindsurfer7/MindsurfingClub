import { create1stDialog } from './model/services/create1stDialog';
import { loadConversation } from 'entities/GPT/model/slice/GPTslice';
import { requestConversations } from 'entities/GPT/model/services/requestConversations';
import { sendMessageToGPT } from 'entities/GPT/model/services/sendMessageToGPT';
import { updateMessagesDB } from './model/services/updateMessagesDB';
import {
  getConversationID,
  getMessagesFromDBresponse,
} from './model/selectors/getFirestoreData';
import {
  getMessages,
  getSingleMessage,
  getDialogsList,
} from './model/selectors/getGPTdata';

export {
  getMessages,
  getSingleMessage,
  getMessagesFromDBresponse,
  getDialogsList,
  create1stDialog,
  updateMessagesDB,
  sendMessageToGPT,
  loadConversation,
  requestConversations,
};
export {
  setMessages,
  setSingleMessage,
  GPTReducer,
} from './model/slice/GPTslice';

export type { GPTmessage } from './types/GPTScheme';
