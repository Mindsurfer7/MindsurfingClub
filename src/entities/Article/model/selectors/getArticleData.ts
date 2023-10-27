import { createSelector } from '@reduxjs/toolkit';
import { StateScheme } from 'App/providers/StoreProvider';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';

export const getArticleData = (state: StateScheme) => {
  return state.Article?.data;
};
export const getArticleID = (state: StateScheme) => {
  return state.Article?.data?.id;
};
export const getArticleIsLoading = (state: StateScheme) => {
  return state.Article?.isLoading;
};
export const getArticleError = (state: StateScheme) => {
  return state.Article?.error;
};

export const getCanEditArticle = createSelector(
  getArticleData,
  getGoogleID,
  (article, userID) => {
    if (!article || !userID) {
      return false;
    }
    return article.authorID === userID;
  },
);
