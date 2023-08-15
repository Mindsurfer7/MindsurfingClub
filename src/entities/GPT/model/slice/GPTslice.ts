import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GPTscheme } from 'entities/GPT/types/GPTScheme';
import { sendMessageToGPT } from '../services/sendMessageToGPT';
import { requestConversations } from '../services/requestConversations';
import { updateMessagesDB } from '../services/updateMessagesDB';
import { create1stDialog } from '../services/create1stDialog';

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
  InputValue: '',
  conversations: [],
};

export const GPTslice = createSlice({
  name: 'GPT',
  initialState,
  reducers: {
    setSingleMessage: (state, action: PayloadAction<string>) => {
      state.singleMessage = action.payload;
    },
    setInputValue: (state, action: PayloadAction<string>) => {
      state.InputValue = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = [
        ...state.messages,
        { content: action.payload, role: 'user' },
      ];
      state.singleMessage = '';
    },
    loadConversation: (state, action) => {
      const targetDialog = state.conversations[0].dialogs.find(
        (dialog: any) => dialog.ID === action.payload,
      );

      if (targetDialog) {
        state.messages = targetDialog.messages;
      }
      // let x = state.conversations.dialogs.filter((x: any) => {
      //   console.log(x.dialogName);

      //   return x.dialogName === action.payload;
      // });
      // console.log(x);

      // state.messages = state.conversations.dialogs.filter(
      //   (x: any) => x.dialogName === action.payload,
      // );
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
        console.log(action.payload);
        // state.DialogsState = 'exist';
        state.conversations = action.payload;

        //state.messages = state.conversations[0].dialogs[0].messages; //это возможно над в иной редюсер
        //state.conversations = state.conversations[0].dialogs[0].messages;

        state.isLoading = false;
      })
      .addCase(requestConversations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateMessagesDB.fulfilled, (state, action) => {
        console.log('successfully updated MessagesDB');
      })
      .addCase(create1stDialog.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(create1stDialog.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(create1stDialog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setMessages,
  setSingleMessage,
  loadConversation,
  setInputValue,
} = GPTslice.actions;
export const { reducer: GPTReducer } = GPTslice;

//: PayloadAction<GPTmessage[]>
