import { PostType } from 'entities/Post';

export interface WallScheme {
  isLoading: boolean;
  error: string;
  posts: PostType[];
  _inited: boolean;
}
