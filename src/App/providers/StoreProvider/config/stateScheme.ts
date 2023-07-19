import { CounterScheme } from 'entities/Counter';
import { UserScheme } from 'entities/User';

export interface StateScheme {
  counter: CounterScheme;
  user: UserScheme;
}

export interface CounterState {
  value: number;
}
