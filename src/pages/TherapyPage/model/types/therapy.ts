import { GPTmessage } from 'entities/GPT';
import { error } from './../../../../entities/Profile/UI/ProfileCard/ProfileCard.stories';
export interface TherapyPageScheme {
  dysfunctionalInput: string;
  adaptiveInput: string;
  strategyInput: string;
  advice: string;
  isLoading: any;
  biasList: any;
  beliefs: any;
  error: any;
}

export interface Belief {
  adaptive: string;
  dysfunctional: string;
  id: string;
}
