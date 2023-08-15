export interface ChallengeScheme {
  challenges: Challenge[];
  isLoading: boolean;
  error: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  communityID: string;
  tags?: string[];
  participants: string[];
  startDate: string;
  endDate: string;
  executionType: string;
  points: number;
}
