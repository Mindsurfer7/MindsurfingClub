import { GoogleProfile } from 'entities/GoogleProfile';
import { PostType } from 'entities/Post';

export interface ProfilePageScheme {
  isLoading: boolean;
  posts: PostType[];
  error?: string;
  readonly: boolean;
  profile?: ProfileInterface;
  form?: ProfileInterface;
}

export interface ProfileInterface {
  photoURL?: string;
  UID?: string;
  coins?: number;
  health?: number;
  level?: number;
  points?: number;
  username: string;
}
