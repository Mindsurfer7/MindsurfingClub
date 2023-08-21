export interface ChallengeScheme {
  challenges: Challenge[];
  isLoading: boolean;
  showChallenges: boolean;
  challengeData: Challenge;
  error: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  communityID: string;
  tags?: string[];
  participants: Participant[];
  startDate?: string;
  endDate?: string;
  executionType?: string;
  isFinished: boolean;
  points?: number;
}

export interface Participant {
  ID: string;
  points?: number;
  nickname: string;
  isDoneArray: isDoneObject[];
}

export interface isDoneObject {
  isDone: boolean;
  date: Date;
}
