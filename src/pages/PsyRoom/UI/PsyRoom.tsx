import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
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
  getMessagesFromDBresponse,
  getSingleMessage,
  setMessages,
  setSingleMessage,
  updateMessagesDB,
} from 'entities/GPT';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { sendMessageToGPT } from 'entities/GPT/model/services/sendMessageToGPT';
import {
  loginWithGoogle,
  logoutWithGoogle,
} from 'features/AuthWithGoogle/model/services/loginWithGoogle';
import { googleLoginReducer } from 'features/AuthWithGoogle/model/slice/googleLoginSlice';
import { signOut } from 'firebase/auth';
import { getGoogleProfile } from 'features/AuthWithGoogle';
import { getGoogleData } from 'features/AuthWithGoogle/model/selectors/getGoogleProfile';
import { getIsWriting } from 'entities/GPT/model/selectors/getGPTdata';
import { requestConversations } from 'entities/GPT/model/services/requestConversations';
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
  const isWriting = useSelector(getIsWriting);

  const handleChange = (value: string) => {
    dispatch(setSingleMessage(value));
  };

  const onSendtoGPT = useCallback(() => {
    dispatch(setMessages(singleMessage));
    dispatch(sendMessageToGPT());
  }, [dispatch, singleMessage]);

  const initialReducers: ReducersList = {
    GPT: GPTReducer,
    GoogleProfile: googleLoginReducer,
  };

  useEffect(() => {
    dispatch(requestConversations());
  }, []);

  useEffect(() => {
    dispatch(updateMessagesDB());
  }, [messages]);

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === 'Enter') {
        onSendtoGPT();
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [onSendtoGPT]);

  ////////////////////////////////////////////
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (messageContainerRef.current) {
      const messageContainer = messageContainerRef.current;
      const lastMessage = messageContainer.lastElementChild;

      if (lastMessage) {
        lastMessage.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
      <div className={classNames(cls.PsyRoom, {}, [className as string])}>
        <div className={cls.header}>
          <div className={cls.XL}>
            <h1>Джипити Психотерапевт</h1>
          </div>

          <div className={cls.indicator}>
            {isWriting && <span>Psychotherapist is typing...</span>}
          </div>
        </div>

        <div className={cls.chatWrapper} ref={messageContainerRef}>
          {messages
            ?.filter((m) => m.role !== 'system')
            .map((m) => (
              <div
                key={m.content}
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
