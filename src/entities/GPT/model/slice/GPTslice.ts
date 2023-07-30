import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GPTmessages, GPTscheme } from 'entities/GPT/types/GPTScheme';
import { sendMessageToGPT } from '../services/sendMessageToGPT';
// import { Profile, ProfileScheme } from '../types/profile';
// import { requestProfileData } from '../services/requestProfileData';
// import { updateProfileData } from '../services/updateProfileData';

const initialState: GPTscheme = {
  singleMessage: '',
  messages: [{ content: 'hello am an AI', role: 'assistant' }],
  isLoading: false,
  //   readonly: true,
  //   error: undefined,
  //   data: undefined,
};

export const GPTslice = createSlice({
  name: 'GPT',
  initialState,
  reducers: {
    setSingleMessage: (state, action: PayloadAction<string>) => {
      state.singleMessage = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = [
        ...state.messages,
        { content: action.payload, role: 'user' },
      ];
      state.singleMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageToGPT.pending, (state, action) => {
        // state.error = undefined;
        state.isLoading = true;
      })
      .addCase(sendMessageToGPT.fulfilled, (state, action) => {
        //: PayloadAction<GPTmessages[]>
        state.isLoading = false;
        console.log(action.payload + 'fulfilled');
        //@ts-ignore
        state.messages = action.payload; //response.data. choices. message .content
      })
      .addCase(sendMessageToGPT.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        // state.error = action.payload;
      });
  },
});

export const { setMessages, setSingleMessage } = GPTslice.actions;
export const { reducer: GPTReducer } = GPTslice;
