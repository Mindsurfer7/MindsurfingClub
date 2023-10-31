import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import {
  getGoogleID,
  getGoogleProfile,
} from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { getTextEditorValue } from 'widgets/TextEditor/model/selectors/getTextEditorData';
import { v4 } from 'uuid';
import { requestPostsByPublicID } from '../../../SingleGroupPage/model/services/requestPostsByPublicID';
import { requestPostsByUserID } from './requestPostsByUserID';

export const publishPostInProfile = createAsyncThunk<
  any,
  string,
  ThunkConfig<any>
>('Wall/publishPost', async (authorID, thunkAPI) => {
  const text = getTextEditorValue(thunkAPI.getState());
  // const authorID = getGoogleID(thunkAPI.getState());
  const postsRef = collection(GPT_DB, 'posts');

  const currentDate = new Date();

  const formattedDate = `${currentDate.getDate()}.${
    currentDate.getMonth() + 1
  }.${currentDate.getFullYear()}`;

  const post = {
    createdAt: formattedDate,
    img: 'https://textis.ru/wp-content/uploads/2015/03/28.png',
    publicID: '',
    authorID: authorID,
    views: 0,
    likes: [],
    blocks: [
      {
        paragraphs: [text],
        type: 'TEXT',
        id: v4(),
      },
    ],
  };

  try {
    const docRef = await addDoc(postsRef, post);

    const updatedPost = {
      ...post,
      id: docRef.id,
    };

    await updateDoc(doc(postsRef, docRef.id), updatedPost);

    thunkAPI.dispatch(requestPostsByUserID(authorID));

    console.log('post published');
  } catch (error) {
    console.error('Error creating post', error);
  }
});
