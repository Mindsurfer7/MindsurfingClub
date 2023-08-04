import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { initializePlayer } from '../services/initializePlayer';
import { PlayerScheme } from 'entities/Player/types/player';
import { requestHabits } from '../services/requestHabits';
import { requestPlayerData } from '../services/requestPlayerData';
import { requestTasks } from '../services/requestTasks';
// import { Profile, ProfileScheme } from '../types/profile';
// import { requestProfileData } from '../services/requestProfileData';
// import { updateProfileData } from '../services/updateProfileData';

const initialState: PlayerScheme = {
  PlayerData: {
    UID: 'userID',
    coins: 0,
    health: 100,
    level: 0,
    points: 10,
    username: 'username',
    new: true,
  },
  isLoading: false,
  habits: [],
  tasks: [],
  error: '',
};

export const PlayerSlice = createSlice({
  name: 'Player',
  initialState,
  reducers: {
    setSingleMessage: (state, action: PayloadAction<string>) => {
      //state.singleMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializePlayer.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(initializePlayer.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(initializePlayer.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(requestHabits.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(requestHabits.fulfilled, (state, action) => {
        state.isLoading = false;
        state.habits = action.payload;
      })
      .addCase(requestHabits.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(requestPlayerData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(requestPlayerData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.PlayerData = action.payload;
      })
      .addCase(requestPlayerData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(requestTasks.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(requestTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(requestTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {} = PlayerSlice.actions;
export const { reducer: PlayerReducer } = PlayerSlice;
