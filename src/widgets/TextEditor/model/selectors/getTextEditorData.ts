import { StateScheme } from 'App/providers/StoreProvider';

export const getTextEditorValue = (state: StateScheme) =>
  state?.TextEditor?.text;
export const getArticleIsPublished = (state: StateScheme) =>
  state?.TextEditor?.isPublished;
