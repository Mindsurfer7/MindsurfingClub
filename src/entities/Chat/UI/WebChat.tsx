import React, { useCallback, useEffect, useRef } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './WebChat.module.scss';
import Textarea from 'shared/UI/Textarea/Textarea';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { useTranslation } from 'react-i18next';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import {
  ChatReducer,
  clearMessage,
  setChatMessage,
} from '../model/slice/chatSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import {
  getChatMessage,
  getChatMessages,
} from '../model/selectors/getChatData';
import { sendMessage } from '../model/services/sendMessage';
import { requestChatMessages } from '../model/services/requestChatMessages';
import { setConnection } from '../model/services/setConnection';
import { getGoogleProfile } from 'features/AuthWithGoogle';

interface WebChatProps {
  className?: string;
  chatName: string;
}

const reducers: ReducersList = {
  Chat: ChatReducer,
};

const WebChat: React.FC<WebChatProps> = ({ className, chatName }) => {
  const dispatch = useAppDispatch();
  const message = useSelector(getChatMessage);
  const messages = useSelector(getChatMessages);
  const profile = useSelector(getGoogleProfile);

  // useEffect(() => {
  //   dispatch(requestChatMessages());
  // }, [dispatch]);

  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = dispatch(setConnection());

    // return unsubscribe()
  }, [dispatch]);

  const onTypeMessage = (value: string) => {
    dispatch(setChatMessage(value));
  };
  const onMessageSend = async () => {
    if (message) {
      await dispatch(sendMessage(message));
      dispatch(clearMessage());
    }
  };

  const { t } = useTranslation('chat');
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.WebChat, {}, [className as string])}>
        <div className={cls.header}>{`${chatName} Club Chat`}</div>
        <div className={cls.chatWrapper}>
          {messages?.map((mess, idx) => (
            <div
              key={idx}
              className={classNames(cls.message, {
                [cls.msg]: mess.username !== profile?.displayName,
                [cls.Mymsg]: mess.username === profile?.displayName,
              })}
            >
              {' '}
              <div className={cls.contentWrapper}>
                <span>{mess.username}</span>
                {mess.text}
              </div>
            </div>
          ))}
        </div>

        <div className={cls.send}>
          <Textarea
            className={cls.textarea}
            onChange={onTypeMessage}
            value={message}
            placeholder={t('say hello to your community')}
          />
          {/* <Input
          onChange={handleChange}
          value={singleMessage}
          placeholder="describe your problem here..."
        /> */}
          <Button
            theme={ButtonTheme.OUTLINE}
            className={cls.sendBtn}
            onClick={onMessageSend}
          >
            {t('send')}
          </Button>
        </div>
      </div>
    </DynamicModuleLoader>
  );
};

export default WebChat;

// const scrollToBottom = useCallback(() => {
//   if (messageContainerRef.current) {
//     const messageContainer = messageContainerRef.current;
//     const lastMessage = messageContainer.lastElementChild;

//     if (lastMessage) {
//       lastMessage.scrollIntoView({ behavior: 'smooth' });
//     }
//   }
// }, []);
