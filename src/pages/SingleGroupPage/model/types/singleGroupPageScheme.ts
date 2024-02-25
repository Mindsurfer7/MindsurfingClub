import { ArticleType } from 'entities/Article/types/article';
import type { PostType } from 'entities/Post';

export interface SingleGroupPageScheme {
  isLoading: boolean;
  error: string;
  posts: PostType[];
  articles: ArticleType[];
  //   _inited: boolean;
}
