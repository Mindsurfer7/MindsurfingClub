import { Subtask } from 'entities/TaskTracker/types/taskTracker';

export interface PlayerData {
  UID: string;
  coins: number;
  health: number;
  level: number;
  points: number;
  username: string;
  new: boolean;
}

export interface PlayerScheme {
  PlayerData: PlayerData;
  isLoading: boolean;
  isFilterApplied: boolean;
  notifications: string[];
  allTags: string[];
  completedTasks: Task[];
  habits: Habit[];
  filteredHabits: Habit[];
  filteredDaily: Daily[];
  filteredTasks: Task[];
  tasks: Task[];
  daily: Daily[];
  error?: string;
}

export type Habit = {
  id: string; // ID or any unique identifier
  description: string;
  difficulty: number;
  isDone: boolean;
  tags: string[];
  title: string;
};
export type Daily = {
  id: string; // ID or any unique identifier
  description: string;
  difficulty: number;
  isDoneTimestamp: Date;
  subtasks?: Subtask[];
  isDone: boolean;
  tags: string[];
  title: string;
};

// Type for the Task entity
export type Task = {
  id: string; // ID or any unique identifier
  description: string;
  difficulty: number; // Assuming the difficulty can be represented as a string
  isDone: boolean;
  subtasks?: Subtask[];
  tags: string[]; // Array of tags
  title: string;
};
