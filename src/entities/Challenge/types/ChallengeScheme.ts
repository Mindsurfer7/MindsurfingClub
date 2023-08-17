export interface ChallengeScheme {
  challenges: Challenge[];
  isLoading: boolean;
  showChallenges: boolean;
  challengeData: Challenge;
  error: string;
}

export interface Challenge {
  ID: string;
  title: string;
  description: string;
  communityID: string;
  tags?: string[];
  participantsID: Participant[];
  startDate?: string;
  endDate?: string;
  executionType?: string;
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
  day: Date;
}
