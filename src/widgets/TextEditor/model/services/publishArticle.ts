import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import {
  getGoogleID,
  getGoogleProfile,
} from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { getTextEditorValue } from '../selectors/getTextEditorData';

export function extractFirstHtmlTagContent(htmlString: any) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  const firstElement = doc.body.firstChild;

  return (firstElement && firstElement.textContent) || null;
}

export const publishArticle = createAsyncThunk<any, void, ThunkConfig<any>>(
  'TextEditor/publishArticle',
  async (publicID, thunkAPI) => {
    const text = getTextEditorValue(thunkAPI.getState());
    const authorID = getGoogleID(thunkAPI.getState());
    const articlesRef = collection(GPT_DB, 'articles');

    const currentDate = new Date();

    const formattedDate = `${currentDate.getDate()}.${
      currentDate.getMonth() + 1
    }.${currentDate.getFullYear()}`;

    const article = {
      createdAt: formattedDate,
      img: 'https://textis.ru/wp-content/uploads/2015/03/28.png',
      publicID: '',
      authorID: authorID,
      title: extractFirstHtmlTagContent(text),
      type: ['ALL'],
      views: 0,
      blocks: [
        {
          paragraphs: [text],
          type: 'TEXT',
        },
      ],
    };

    try {
      const docRef = await addDoc(articlesRef, article);

      const updatedArticle = {
        ...article,
        id: docRef.id,
      };

      await updateDoc(doc(articlesRef, docRef.id), updatedArticle);

      console.log('article published');
    } catch (error) {
      console.error('Error creating article', error);
    }
  },
);
