import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { initializePlayer } from '../services/initializePlayer';
import { PlayerScheme } from 'entities/Player/types/player';
import { requestHabits } from '../services/requestHabits';
import { requestPlayerData } from '../services/requestPlayerData';
import { requestTasks } from '../services/requestTasks';
import { createNewDaily } from '../services/createNewDaily';
import { createNewTask } from '../services/createNewTask';
import { requestDailyz } from '../services/requestDailyz';
import { act } from 'react-dom/test-utils';
import { requestCompleted } from '../services/requestCompleted';
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
  completedTasks: [],
  habits: [],
  tasks: [],
  daily: [],
  error: '',
};

export const PlayerSlice = createSlice({
  name: 'Player',
  initialState,
  reducers: {
    setIsDoneDaily: (
      state,
      action: PayloadAction<{ taskID: string; isDone: boolean }>,
    ) => {
      const { taskID, isDone } = action.payload;
      console.log('reducer ' + ' ' + taskID + ' ' + isDone);

      const taskIndex = state.daily.findIndex((task) => task.id === taskID);
      if (taskIndex !== -1) {
        state.daily[taskIndex].isDone = isDone;
      }
    },
    setIsDoneTasks: (
      state,
      action: PayloadAction<{ taskID: string; isDone: boolean }>,
    ) => {
      const { taskID, isDone } = action.payload;
      console.log('reducer ' + ' ' + taskID + ' ' + isDone);

      const taskIndex = state.daily.findIndex((task) => task.id === taskID);
      if (taskIndex !== -1) {
        state.tasks[taskIndex].isDone = isDone;
      }
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
    builder
      .addCase(requestDailyz.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(requestDailyz.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);

        state.daily = action.payload;
      })
      .addCase(requestDailyz.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(requestCompleted.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(requestCompleted.fulfilled, (state, action) => {
        state.isLoading = false;

        state.completedTasks = action.payload;
      })
      .addCase(requestCompleted.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(createNewDaily.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createNewDaily.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.daily = action.payload;
      })
      .addCase(createNewDaily.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(createNewTask.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createNewTask.fulfilled, (state, action) => {
        state.isLoading = false;
        //tate.tasks = action.payload;
      })
      .addCase(createNewTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setIsDoneDaily, setIsDoneTasks } = PlayerSlice.actions;
export const { reducer: PlayerReducer } = PlayerSlice;
