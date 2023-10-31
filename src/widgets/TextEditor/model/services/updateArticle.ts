import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import {
  getGoogleID,
  getGoogleProfile,
} from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import {
  getArticleImageLink,
  getTextEditorValue,
} from '../selectors/getTextEditorData';
import { getArticleID } from 'entities/Article/model/selectors/getArticleData';
import { requestArticleByID } from 'entities/Article/model/services/firebaseAPI/requestArticleByID';

export function extractFirstHtmlTagContent(htmlString: any) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  const firstElement = doc.body.firstChild;

  return (firstElement && firstElement.textContent) || null;
}

export const updateArticle = createAsyncThunk<any, void, ThunkConfig<any>>(
  'TextEditor/updateArticle',
  async (publicID, thunkAPI) => {
    const text = getTextEditorValue(thunkAPI.getState());
    const authorID = getGoogleID(thunkAPI.getState());
    const articleID = getArticleID(thunkAPI.getState());
    const articlesRef = collection(GPT_DB, 'articles');
    const imageLink = getArticleImageLink(thunkAPI.getState());

    const currentDate = new Date();

    const formattedDate = `${currentDate.getDate()}.${
      currentDate.getMonth() + 1
    }.${currentDate.getFullYear()}`;

    const article = {
      createdAt: formattedDate,
      img: imageLink || 'https://textis.ru/wp-content/uploads/2015/03/28.png',
      publicID: '',
      authorID: authorID,
      title: extractFirstHtmlTagContent(text),
      type: ['ALL'],
      id: articleID,
      views: 0,
      blocks: [
        {
          paragraphs: [text],
          type: 'TEXT',
        },
      ],
    };

    try {
      await updateDoc(doc(articlesRef, articleID), article);
      if (articleID) {
        thunkAPI.dispatch(requestArticleByID(articleID));
      }

      console.log('article updated');
    } catch (error) {
      console.error('Error updating article', error);
    }
  },
);
