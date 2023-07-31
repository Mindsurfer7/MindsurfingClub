import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GPTmessage, GPTscheme } from 'entities/GPT/types/GPTScheme';
import { sendMessageToGPT } from '../services/sendMessageToGPT';
import { requestConversations } from '../services/requestConversations';
import { updateMessagesDB } from '../services/updateMessagesDB';
// import { Profile, ProfileScheme } from '../types/profile';
// import { requestProfileData } from '../services/requestProfileData';
// import { updateProfileData } from '../services/updateProfileData';

const initialState: GPTscheme = {
  singleMessage: '',
  messages: [
    {
      role: 'system',
      content:
        'answer like you are a cognitive-behavior psychotherapist trying to reframe disadaptive ideas of one who talk to you',
    },
  ],
  isLoading: false,
  conversations: [],
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
        state.isLoading = true;
      })
      .addCase(sendMessageToGPT.fulfilled, (state, action) => {
        state.isLoading = false;
        //@ts-ignore
        const assistantReply = action.payload.choices[0].message.content;

        state.messages = [
          ...state.messages,
          { content: assistantReply, role: 'assistant' },
        ];
        state.singleMessage = '';
      })
      .addCase(sendMessageToGPT.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(requestConversations.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(requestConversations.fulfilled, (state, action) => {
        state.conversations = action.payload;
        state.messages = state.conversations[0].messages;

        state.isLoading = false;
      })
      .addCase(requestConversations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateMessagesDB.fulfilled, (state, action) => {
        console.log('successfully updated MessagesDB');
      });
  },
});

export const { setMessages, setSingleMessage } = GPTslice.actions;
export const { reducer: GPTReducer } = GPTslice;

//: PayloadAction<GPTmessage[]>
