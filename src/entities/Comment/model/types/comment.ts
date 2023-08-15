import { text } from './../../../../shared/UI/Text/Text.stories';
import { User } from 'entities/User';

export interface CommentType {
  id: string;
  user: User;
  text: string;
}
