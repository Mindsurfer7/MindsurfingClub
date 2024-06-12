import type { Challenge } from './../../../../entities/Challenge/types/ChallengeScheme';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TherapyPageScheme } from '../types/therapy';
import { getBeliefsList } from '../services/getBeliefsList';
import { createNewBelief } from '../services/createNewBelief';
import { sendMessageToGPT } from 'entities/GPT';

const initialState: TherapyPageScheme = {
  isLoading: false,
  dysfunctionalInput: '',
  adaptiveInput: '',
  strategyInput: '',
  beliefs: [],
  biasList: [],
  advice: '',
  error: '',
};

export const TherapyPageSlice = createSlice({
  name: 'TherapyPage',
  initialState,
  reducers: {
    setDysfunctionalInput: (state, action: PayloadAction<string>) => {
      state.dysfunctionalInput = action.payload;
    },
    setAdaptiveInput: (state, action: PayloadAction<string>) => {
      state.adaptiveInput = action.payload;
    },
    setStrategyInput: (state, action: PayloadAction<string>) => {
      state.strategyInput = action.payload;
    },
    setBiasList: (state, action: PayloadAction<any>) => {
      state.biasList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBeliefsList.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getBeliefsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.beliefs = action.payload;
      })
      .addCase(getBeliefsList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(createNewBelief.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createNewBelief.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createNewBelief.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(sendMessageToGPT.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(sendMessageToGPT.fulfilled, (state, action) => {
        state.isLoading = false;
        //@ts-ignore
        const reply = action.payload.choices[0].message.content;
        state.advice = reply;
      })
      .addCase(sendMessageToGPT.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setDysfunctionalInput,
  setAdaptiveInput,
  setBiasList,
  setStrategyInput,
} = TherapyPageSlice.actions;
export const { reducer: TherapyPageReducer } = TherapyPageSlice;
