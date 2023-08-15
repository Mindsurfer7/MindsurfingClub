import { Challenge } from 'entities/Challenge/types/ChallengeScheme';

export interface CommunitiesScheme {
  groups: PublicScheme[];
  isLoading?: boolean;
  error?: string;
  // will be replaced, now its needed for form submitting
  community: PublicScheme | null;
  title: string;
  description: string;
  members?: string[];
  posterLink?: string;
  id?: string;
}
export interface PublicScheme {
  title: string;
  description: string;
  members: string[];
  posterLink?: string;
  challenges: Challenge[];
  id: string;
}
