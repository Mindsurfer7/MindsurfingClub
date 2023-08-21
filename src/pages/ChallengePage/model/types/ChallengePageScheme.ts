import { Challenge } from 'entities/Challenge';

export interface ChallengePageScheme {
  isLoading: boolean;
  challengeData: Challenge;
  error: string;
}
