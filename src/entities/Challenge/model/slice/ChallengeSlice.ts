import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createNewChallenge } from '../services/createNewChallenge';
import {
  Challenge,
  ChallengeScheme,
} from 'entities/Challenge/types/ChallengeScheme';
import { requestChallenges } from '../services/requestChallenges';
import { getChallengesByUserID } from '../services/getChellengesByUserID';
import { requestChallengesByPublicID } from 'pages/SingleGroupPage';

const initialState: ChallengeScheme = {
  isLoading: false,
  showChallenges: false,
  challenges: [],
  challengeData: {
    id: '',
    communityID: '',
    title: '',
    isFinished: false,
    description: '',
    startDate: '',
    endDate: '',
    executionType: 'once',
    points: 10,
    participants: [],
  },
  error: '',
};

export const ChallengeSlice = createSlice({
  name: 'Challenges',
  initialState,
  reducers: {
    setShowChallenges: (state, action: PayloadAction<boolean>) => {
      state.showChallenges = action.payload;
    },
    setChallengeTitle: (state, action: PayloadAction<string>) => {
      state.challengeData.title = action.payload;
    },
    setChallengeDescription: (state, action: PayloadAction<string>) => {
      state.challengeData.description = action.payload;
    },
    setChallengeStartDate: (state, action: PayloadAction<string>) => {
      state.challengeData.startDate = action.payload;
    },
    setChallengeEndDate: (state, action: PayloadAction<string>) => {
      state.challengeData.endDate = action.payload;
    },
    setChallengeExecutionType: (state, action: PayloadAction<string>) => {
      state.challengeData.executionType = action.payload;
    },
    setChallengePoints: (state, action: PayloadAction<number>) => {
      state.challengeData.points = action.payload;
    },
    resetChangedFields: (state) => {
      state.challengeData.title = '';
      state.challengeData.description = '';
      state.challengeData.startDate = '';
      state.challengeData.endDate = '';
      state.challengeData.executionType = '';
      state.challengeData.points = 0;
    },
    setChallengeData: (state, action: PayloadAction<Challenge>) => {
      state.challengeData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewChallenge.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createNewChallenge.fulfilled, (state, action) => {
        state.isLoading = false;
        //state.allTags = action.payload;
      })
      .addCase(createNewChallenge.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(requestChallenges.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(requestChallenges.fulfilled, (state, action) => {
        state.isLoading = false;
        state.challenges = action.payload;
      })
      .addCase(requestChallenges.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getChallengesByUserID.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getChallengesByUserID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.challenges = action.payload;
      })
      .addCase(getChallengesByUserID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(requestChallengesByPublicID.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(requestChallengesByPublicID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.challenges = action.payload;
      })
      .addCase(requestChallengesByPublicID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setShowChallenges,
  setChallengeTitle,
  setChallengeDescription,
  setChallengeStartDate,
  setChallengeEndDate,
  setChallengeExecutionType,
  setChallengePoints,
  resetChangedFields,
  setChallengeData,
} = ChallengeSlice.actions;
export const { reducer: ChallengeReducer } = ChallengeSlice;
