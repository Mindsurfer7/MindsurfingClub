import React, { memo, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './PsyRoom.module.scss';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import Input from 'shared/UI/Input/Input';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import {
  GPTReducer,
  getMessages,
  getSingleMessage,
  setMessages,
  setSingleMessage,
} from 'entities/GPT';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { sendMessageToGPT } from 'entities/GPT/model/services/sendMessageToGPT';
import {
  loginWithGoogle,
  logoutWithGoogle,
} from 'features/AuthWithGoogle/model/services/loginWithGoogle';
import { googleLoginReducer } from 'features/AuthWithGoogle/model/slice/googleLoginSlice';
import { signOut } from 'firebase/auth';
import { authG } from 'index';
import { getGoogleProfile } from 'features/AuthWithGoogle';
import { getGoogleData } from 'features/AuthWithGoogle/model/selectors/getGoogleProfile';
//import PackageChecker from "tools/PackageChecker";

interface PsyRoomProps {
  className?: string;
}

const PsyRoom: React.FC<PsyRoomProps> = memo(({ className }) => {
  const messages = useSelector(getMessages);
  const singleMessage = useSelector(getSingleMessage);
  const account = useSelector(getGoogleProfile);
  const googleReducer = useSelector(getGoogleData);
  const dispatch = useAppDispatch();

  const handleChange = (value: string) => {
    dispatch(setSingleMessage(value));
  };

  const onSendtoGPT = () => {
    dispatch(setMessages(singleMessage));
    dispatch(sendMessageToGPT());
  };

  const initialReducers: ReducersList = {
    GPT: GPTReducer,
    GoogleProfile: googleLoginReducer,
  };

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
      <div className={classNames(cls.PsyRoom, {}, [className as string])}>
        <h1>Speak to specialist</h1>
        {account?.displayName}
        <div className={cls.chatWrapper}>
          {messages?.map((m) => (
            <div
              className={classNames(cls.message, {
                [cls.assistantMessage]: m.role === 'assistant',
                [cls.userMessage]: m.role === 'user',
              })}
            >
              {m.role + ': '}
              {m.content}
            </div>
          ))}
        </div>
        <div className={cls.send}>
          <Input
            onChange={handleChange}
            value={singleMessage}
            placeholder="descripe your problem here..."
          />
          <Button
            theme={ButtonTheme.OUTLINE}
            className={cls.sendBtn}
            onClick={onSendtoGPT}
          >
            send
          </Button>
        </div>
        <div className={cls.logBtns}></div>
      </div>
    </DynamicModuleLoader>
  );
});

export default PsyRoom;

// const onGoogleLogin = () => {
//   dispatch(loginWithGoogle());
// };
// const onGoogleLogout = () => {
//   dispatch(logoutWithGoogle());
// };
