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
  showPrinciples: boolean;
  showCharacter: boolean;
  title: string;
  isDone: boolean;
  subtasks?: Subtask[];
  ShowTodayTasks: boolean;
  transcribedVoice: string;
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

export type TaskSubType = 'reverse-count' | 'classic'; // | any что в глову придет
