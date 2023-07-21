import React, { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './LoginForm.module.scss';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import Input from 'shared/UI/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPassword,
  setUsername,
} from 'features/AuthByUsername/model/slice/loginSlice';
import { selectLogingState } from 'features/AuthByUsername/model/selectors/selectLoginState/selectLoginState';
import { loginByUsername } from 'features/AuthByUsername/model/services/LoginByUsername/loginByUsername';
import { disabled } from 'shared/UI/Button/Button.stories';
import Text, { TextTheme } from 'shared/UI/Text/Text';

interface LoginFormProps {
  className?: string;
}
//<Text text={loginData.error} theme={TextTheme.ERROR} />
const LoginForm: React.FC<LoginFormProps> = memo(({ className }) => {
  const dispatch = useDispatch();
  const loginData = useSelector(selectLogingState);

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
    dispatch(loginByUsername(loginData));
  }, [dispatch, loginData.password, loginData.username]);

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
          value={loginData.username}
          placeholder="login"
          onChange={onChangeUsername}
          autoFocus
        />
      </div>
      <div className={cls.input2}>
        <Input
          className={cls.input}
          value={loginData.password}
          type="text"
          placeholder="password"
          onChange={onChangePassword}
        />
      </div>
      <div className={cls.bottom}>
        <div className={cls.errorMessage}>
          {loginData.error && (
            <Text text={loginData.error} theme={TextTheme.ERROR} />
          )}
        </div>

        <Button
          onClick={onLoginClick}
          className={cls.btn}
          theme={ButtonTheme.OUTLINE}
          disabled={loginData.isLoading}
        >
          Login
        </Button>
      </div>
    </div>
  );
});

export default LoginForm;
