import { Subtask, TaskSubType } from 'entities/TaskTracker/types/taskTracker';
import { Biology } from '../UI/PlayerCard/Character/types';

export interface PlayerData {
  UID: string;
  coins: number;
  health: number;
  level: number;
  points: number;
  username: string;
  new: boolean | null;
}

export interface PlayerScheme {
  PlayerData: PlayerData;
  isLoading: boolean;
  isFilterApplied: boolean;
  notifications: string[];
  biology: Biology | null;
  allTags: string[];
  completedTasks: Task[];
  endeavorIsLoading: EndeavorIsLoading | null;
  habits: Habit[];
  filteredHabits: Habit[];
  filteredDaily: Daily[];
  filteredTasks: Task[];
  tasks: Task[];
  daily: Daily[];
  error?: string;
  today: Daily[] | Task[] | Habit[];
}

interface EndeavorIsLoading {
  id: string;
  pending: boolean;
}

export type Habit = {
  id: string; // ID or any unique identifier
  description: string;
  difficulty: number;
  isDone: boolean;
  tags: string[];
  title: string;
  taskSubType?: TaskSubType;
  step?: number;
  count?: number;
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
