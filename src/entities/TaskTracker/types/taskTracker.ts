export interface TaskTrackerScheme {
  showCompleted?: boolean;
  description: string;
  difficulty: number;
  isLoading: boolean;
  title: string;
  isDone: boolean;
  habits?: [];
  tasks?: [];
  tags: string[];
  id: string;
  error: string;
}
