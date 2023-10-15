import { StateScheme } from 'App/providers/StoreProvider';

export const getCommentText = (state: StateScheme) =>
  state.AddComment?.text ?? '';
export const getCommentError = (state: StateScheme) => state.AddComment?.error;
