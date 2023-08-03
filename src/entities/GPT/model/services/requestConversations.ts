import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { GPTmessage } from 'entities/GPT/types/GPTScheme';
import { getMessages } from '../selectors/getGPTdata';
import { collection, getDocs } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getMessagesFromDBresponse } from '../selectors/getFirestoreData';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';

export const requestConversations = createAsyncThunk<
  any,
  void,
  ThunkConfig<any>
>('GPT/requestConversations', async (_, thunkAPI) => {
  const userID = getGoogleID(thunkAPI.getState());
  const conversationsRef = collection(GPT_DB, 'conversations');
  console.log(userID + 'id from selector in thunk');

  //ЕСЛИ Я ХОЧУ ЗАГРУЗИТЬ ДИАЛОГИ ТО Я ДОЛЖЕН ЗНАТЬ АЙДИ ДИАЛОГА
  //conversation[i] === myID

  try {
    const response = await getDocs(conversationsRef);

    const filteredResponse = response.docs
      .map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      })
      .filter((c) => c.id === userID); //массив в ктором 0 индекс - объект, в ктором айди стринг модель стринг и сообщения массив объектов

    console.log(filteredResponse);

    // if (filteredResponse.length === 0) {
    //   console.log('filteredResponse.length === 0');
    //   thunkAPI.dispatch(setDialogsState('zero'));
    // }

    if (!response) {
      throw new Error();
    }

    return filteredResponse;
  } catch (e) {
    console.log(e);
    return thunkAPI.rejectWithValue('error');
  }
});
