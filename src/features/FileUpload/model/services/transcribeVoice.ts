import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';

export const transcribeVoice = createAsyncThunk<
  string,
  Blob,
  ThunkConfig<string>
>('audio/transcribeVoice', async (blob, thunkAPI) => {
  try {
    const payload = new FormData();
    payload.append('model', 'whisper-1');
    payload.append('file', blob);

    const response = await thunkAPI.extra.GPT_Audio_API.post('', payload);

    return response.data.text;
  } catch (e: any) {
    return thunkAPI.rejectWithValue(`Failed to transcribe voice: ${e.message}`);
  }
});
