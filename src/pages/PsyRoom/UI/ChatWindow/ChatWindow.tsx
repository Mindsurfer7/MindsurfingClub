import React, { useCallback, useEffect, useRef } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ChatWindow.module.scss';
import Input from 'shared/UI/Input/Input';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { useSelector } from 'react-redux';
import {
  getMessages,
  loadConversation,
  sendMessageToGPT,
  setMessages,
  setSingleMessage,
  updateMessagesDB,
} from 'entities/GPT';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import {
  getIsWriting,
  getSingleMessage,
} from 'entities/GPT/model/selectors/getGPTdata';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Textarea from 'shared/UI/Textarea/Textarea';

interface ChatWindowProps {
  className?: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ className }) => {
  const messages = useSelector(getMessages);
  const singleMessage = useSelector(getSingleMessage);
  const dispatch = useAppDispatch();
  const isWriting = useSelector(getIsWriting);
  const location = useLocation();
  const pathname = location.pathname;

  const currentID = pathname.split('/').pop();
  console.log(currentID);

  const handleChange = (value: string) => {
    dispatch(setSingleMessage(value));
  };

  const onSendtoGPT = useCallback(() => {
    dispatch(setMessages(singleMessage));
    dispatch(sendMessageToGPT());
  }, [dispatch, singleMessage]);

  useEffect(() => {
    dispatch(loadConversation(currentID));
  }, []);

  useEffect(() => {
    dispatch(updateMessagesDB(currentID));
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
    <div className={classNames(cls.ChatWindow, {}, [className as string])}>
      <div className={cls.header}>
        {' '}
        <div className={cls.backlink}>
          <NavLink to={'/psyroom'}>Back to list</NavLink>
        </div>
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
        <Textarea
          className={cls.textarea}
          onChange={handleChange}
          value={singleMessage}
          placeholder="describe your problem here..."
        />
        {/* <Input
          onChange={handleChange}
          value={singleMessage}
          placeholder="describe your problem here..."
        /> */}
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
  );
};

export default ChatWindow;
