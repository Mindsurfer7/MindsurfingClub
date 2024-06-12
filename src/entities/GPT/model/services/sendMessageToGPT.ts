import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { GPTmessage } from 'entities/GPT/types/GPTScheme';
import { getMessages } from '../selectors/getGPTdata';

export const sendMessageToGPT = createAsyncThunk<
  GPTmessage[],
  any,
  ThunkConfig<any>
>('GPT/sendMessageToGPT', async (systemMessage, thunkAPI) => {
  const messages = getMessages(thunkAPI.getState());

  const APIrequestBody = {
    model: 'gpt-3.5-turbo',
    messages: systemMessage ? systemMessage : messages,
  };

  try {
    const response = await thunkAPI.extra.GPT_API.post<GPTmessage[]>(
      '',
      JSON.stringify(APIrequestBody),
    );

    if (!response.data) {
      throw new Error();
    }

    return response.data;
  } catch (e) {
    console.log(e);
    return thunkAPI.rejectWithValue('error');
  }
});
