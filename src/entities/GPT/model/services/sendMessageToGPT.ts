import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import axios from 'axios';
import { GPTmessages } from 'entities/GPT/types/GPTScheme';
import { getMessages } from '../selectors/getGPTdata';
import { API, API_KEY } from 'shared/API/API';

const systemMessage = {
  role: 'system',
  content:
    'answer like you are a cognitive-behavior psychotherapist trying to reframe disadaptive ideas of one who talk to you',
};

export const sendMessageToGPT = createAsyncThunk<
  GPTmessages[],
  void, //GPTmessages[],
  ThunkConfig<any>
>('GPT/sendMessageToGPT', async (_, thunkAPI) => {
  const messages = getMessages(thunkAPI.getState());

  const APIrequestBody = {
    model: 'gpt-3.5-turbo',
    messages: [systemMessage, messages],
  };

  console.log(APIrequestBody);
  console.log(`Bearer ${API_KEY}`);
  //  Authorization: `Bearer ${API_KEY}`, Authorization: 'Bearer ' + API_KEY,
  try {
    const response = await axios.post<GPTmessages[]>( //array or ?
      'https://api.openai.com/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`, //prettier-ignore
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(APIrequestBody),
      },
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

// export const GPT_API = axios.create({
//     baseURL: 'https://api.openai.com/v1/chat/completions',
//     headers: {
//       "Authorization": `Bearer ${API_KEY}` ,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(APIrequestBody)
//   });
