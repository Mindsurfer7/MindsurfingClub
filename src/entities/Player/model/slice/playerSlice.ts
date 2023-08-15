import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initializePlayer } from '../services/initializePlayer';
import { PlayerScheme } from 'entities/Player/types/player';
import { requestHabits } from '../services/requestHabits';
import { requestPlayerData } from '../services/requestPlayerData';
import { requestTasks } from '../services/requestTasks';
import { createNewDaily } from '../services/createNewDaily';
import { requestDailyz } from '../services/requestDailyz';
import { requestCompleted } from '../services/requestCompleted';
import { requestAllTags } from '../services/requestAllTags';
import { increasePoints } from '../services/increasePoints';
import { removeTask } from '../services/removeTask';

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
  allTags: [],
  notifications: [],
  isFilterApplied: false,
  isLoading: false,
  completedTasks: [],
  habits: [],
  filteredHabits: [],
  filteredDaily: [],
  filteredTasks: [],
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

      state.tasks = state.tasks.map((task) =>
        task.id === taskID ? { ...task, isDone: isDone } : task,
      );
    },
    displayTasksByTag: (state, action: PayloadAction<any>) => {
      state.isFilterApplied = true;

      state.filteredHabits = state.habits.filter((habit) =>
        habit.tags.includes(action.payload),
      );
      //filteredTasks
      state.filteredTasks = state.tasks.filter((task) =>
        task.tags.includes(action.payload),
      );

      state.filteredDaily = state.daily.filter((daily) =>
        daily.tags.includes(action.payload),
      );
    },
    clearTags: (state) => {
      state.filteredHabits = [];
      state.filteredTasks = [];
      state.filteredDaily = [];
      state.isFilterApplied = false;
    },
    cutTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestAllTags.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(requestAllTags.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allTags = action.payload;
      })
      .addCase(requestAllTags.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
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

        //let result = action.payload.map((t: any) => t.isDoneTimestamp.toDate());

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
      .addCase(increasePoints.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(increasePoints.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(increasePoints.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder.addCase(removeTask.fulfilled, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const {
  setIsDoneDaily,
  setIsDoneTasks,
  displayTasksByTag,
  clearTags,
  cutTask,
} = PlayerSlice.actions;
export const { reducer: PlayerReducer } = PlayerSlice;
