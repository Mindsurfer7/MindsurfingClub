import { Challenge } from 'entities/Challenge/types/ChallengeScheme';

export interface CommunitiesScheme {
  groups: PublicType[];
  isLoading?: boolean;
  error?: string;
  // will be replaced, now its needed for form submitting
  community: PublicType | null;
  title: string;
  description: string;
  members?: string[];
  posterLink?: string;
  id?: string;
  admin?: string;
  moderators?: Array<string>;
}
export interface PublicType {
  title: string;
  description: string;
  members: string[];
  posterLink?: string;
  challenges: Challenge[];
  id: string;
  admin?: string;
  moderators?: Array<string>;
}
