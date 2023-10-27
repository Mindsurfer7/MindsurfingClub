import { PostType } from 'entities/Post';

export interface SingleGroupPageScheme {
  isLoading: boolean;
  error: string;
  posts: PostType[];
  //   _inited: boolean;
}
