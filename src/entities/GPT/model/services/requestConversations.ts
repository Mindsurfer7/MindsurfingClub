import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { GPTmessage } from 'entities/GPT/types/GPTScheme';
import { getMessages } from '../selectors/getGPTdata';
import { collection, getDocs } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getMessagesFromDBresponse } from '../selectors/getFirestoreData';

export const requestConversations = createAsyncThunk<
  any,
  void,
  ThunkConfig<any>
>('GPT/requestConversations', async (_, thunkAPI) => {
  const conversationsRef = collection(GPT_DB, 'conversations');

  try {
    const response = await getDocs(conversationsRef);

    const filteredResponse = response.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    }); //массив в ктором 0 индекс - объект, в ктором айди стринг модель стринг и сообщения массив объектов

    console.log(filteredResponse);

    if (!response) {
      throw new Error();
    }

    return filteredResponse;
  } catch (e) {
    console.log(e);
    return thunkAPI.rejectWithValue('error');
  }
});
