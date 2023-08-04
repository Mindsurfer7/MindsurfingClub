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
  habits: Habit[];
  tasks: Task[];
  error?: string;
}

export type Habit = {
  id: number; // ID or any unique identifier
  description: string;
  difficulty: number;
  isDone: boolean;
  title: string;
};

// Type for the Task entity
export type Task = {
  id: number; // ID or any unique identifier
  description: string;
  difficulty: string; // Assuming the difficulty can be represented as a string
  isDone: boolean;
  tags: string[]; // Array of tags
  title: string;
};
