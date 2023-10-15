import { Task } from 'entities/Player/types/player';
import { title } from './../../../shared/UI/Text/Text.stories';
import { Challenge } from 'entities/Challenge/types/ChallengeScheme';
export interface TaskTrackerScheme {
  showCompleted?: boolean;
  //challengeData: ChallengeData;
  selectedTag: string;
  description: string;
  difficulty: number;
  isLoading: boolean;
  title: string;
  isDone: boolean;
  subtasks?: Subtask[];
  ShowTodayTasks: boolean;
  todayTasks: Task[];
  habits?: [];
  tasks?: [];
  tags: string[];
  id: string;
  error?: string;
}

export interface Subtask {
  id: string;
  title: string;
  isDone: boolean;
}
