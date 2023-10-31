import { StateScheme } from 'App/providers/StoreProvider';

export const getTextEditorValue = (state: StateScheme) =>
  state?.TextEditor?.text;

export const getArticleIsPublished = (state: StateScheme) =>
  state?.TextEditor?.isPublished;

export const getArticleImageLink = (state: StateScheme) =>
  state?.TextEditor?.imageLink;

export const getTextEditorIsLoading = (state: StateScheme) =>
  state?.TextEditor?.isLoading;

export const getTextEditorPublicID = (state: StateScheme) =>
  state?.TextEditor?.publicID;

export const getTextEditorPublicOptions = (state: StateScheme) =>
  state?.TextEditor?.publicSelectOptions;

export const getSelectedArticleTypeOptions = (state: StateScheme) =>
  state?.TextEditor?.selectedArticleTypeOptions;

export const getAllArticleTypeOptions = (state: StateScheme) =>
  state?.TextEditor?.articleTypeOptions;
