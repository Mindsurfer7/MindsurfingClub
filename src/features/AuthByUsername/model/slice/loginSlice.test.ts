import { LoginScheme } from '../types/loginScheme';
import { loginReducer, setPassword, setUsername } from './loginSlice';

describe('loginSlice.test', () => {
  test('set username', () => {
    const state: DeepPartial<LoginScheme> = { username: '!' };
    expect(loginReducer(state as LoginScheme, setUsername('Virtual'))).toEqual({
      username: 'Virtual',
    });
  });
  test('set password', () => {
    const state: DeepPartial<LoginScheme> = { password: '!' };
    expect(loginReducer(state as LoginScheme, setPassword('777'))).toEqual({
      password: '777',
    });
  });
});
