import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './LoginForm.module.scss';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import Input from 'shared/UI/Input/Input';

interface LoginFormProps {
  className?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ className }) => {
  return (
    <div className={classNames(cls.LoginForm, {}, [className as string])}>
      <div className={cls.input1}>
        <Input
          className={cls.input}
          type="text"
          placeholder="login"
          autoFocus
        />
      </div>
      <div className={cls.input2}>
        {' '}
        <Input className={cls.input} type="text" placeholder="password" />
      </div>

      <Button
        className={cls.btn}
        //   {theme={ButtonTheme.OUTLINE}}
      >
        Login
      </Button>
    </div>
  );
};

export default LoginForm;
