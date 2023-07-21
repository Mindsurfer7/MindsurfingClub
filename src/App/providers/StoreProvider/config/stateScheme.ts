import { CounterScheme } from 'entities/Counter';
import { UserScheme } from 'entities/User';
import { LoginScheme } from 'features/AuthByUsername';

export interface StateScheme {
  counter: CounterScheme;
  LoginForm: LoginScheme;
  user: UserScheme;
}

export interface CounterState {
  value: number;
}
