import React, { memo, useCallback, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './LoginForm.module.scss';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import Input from 'shared/UI/Input/Input';
import { useDispatch, useSelector, useStore } from 'react-redux';
import {
  getLoginError,
  getLoginIsLoading,
  getLoginPassword,
  getLoginUsername,
  selectLogingState,
} from 'features/AuthByUsername/model/selectors/selectLoginState/selectLoginState';
import { loginByUsername } from 'features/AuthByUsername/model/services/LoginByUsername/loginByUsername';
import { disabled } from 'shared/UI/Button/Button.stories';
import Text, { TextTheme } from 'shared/UI/Text/Text';
import { ReduxStoreWithManager } from 'App/providers/StoreProvider';
import { setPassword, setUsername } from 'features/AuthByUsername';
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';

export interface LoginFormProps {
  className?: string;
}
//<Text text={loginData.error} theme={TextTheme.ERROR} />
const LoginForm: React.FC<LoginFormProps> = memo(({ className }) => {
  const dispatch = useDispatch();
  const store = useStore() as ReduxStoreWithManager;
  //const loginData = useSelector(selectLogingState);
  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginError);

  useEffect(() => {
    store.reducerManager.add('loginForm', loginReducer);

    return () => {
      console.log('unmount');

      store.reducerManager.remove('loginForm');
    };
  }, []);

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(setUsername(value));
    },
    [dispatch],
  );
  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(setPassword(value));
    },
    [dispatch],
  );
  const onLoginClick = useCallback(() => {
    dispatch(loginByUsername({ username, password }));
  }, [dispatch, username, password]);

  return (
    <div className={classNames(cls.LoginForm, {}, [className as string])}>
      <Text
        title="Log in your account to use the app"
        theme={TextTheme.PRIMARY}
      />
      <div className={cls.input1}>
        <Input
          className={cls.input}
          type="text"
          value={username}
          placeholder="login"
          onChange={onChangeUsername}
          autoFocus
        />
      </div>
      <div className={cls.input2}>
        <Input
          className={cls.input}
          value={password}
          type="text"
          placeholder="password"
          onChange={onChangePassword}
        />
      </div>
      <div className={cls.bottom}>
        <div className={cls.errorMessage}>
          {error && <Text text={error} theme={TextTheme.ERROR} />}
        </div>

        <Button
          onClick={onLoginClick}
          className={cls.btn}
          theme={ButtonTheme.OUTLINE}
          disabled={isLoading}
        >
          Login
        </Button>
      </div>
    </div>
  );
});

export default LoginForm;
