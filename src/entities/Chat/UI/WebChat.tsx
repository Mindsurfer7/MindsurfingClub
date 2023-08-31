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
  clearChatData,
  clearMessage,
  setChatMessage,
} from '../model/slice/chatSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import {
  getChatIsIDExist,
  getChatMessage,
  getChatMessages,
} from '../model/selectors/getChatData';
import { sendMessage } from '../model/services/sendMessage';
import { requestChatMessages } from '../model/services/requestChatMessages';
import { setConnection } from '../model/services/setConnection';
import { getGoogleProfile } from 'features/AuthWithGoogle';
import { setNewClubChat } from '../model/services/setNewClubChat';
import { checkChatExistence } from '../model/services/checkChatIdExistence';
import { getGoogleIsLogged } from 'entities/GoogleProfile';

interface WebChatProps {
  className?: string;
  chatName: string;
  publicID: string | undefined;
}

const WebChat: React.FC<WebChatProps> = ({ className, chatName, publicID }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('chat');
  const message = useSelector(getChatMessage);
  const messages = useSelector(getChatMessages);
  const profile = useSelector(getGoogleProfile);
  const isLogged = useSelector(getGoogleIsLogged);
  const isIDExist = useSelector(getChatIsIDExist);

  // useEffect(() => {
  //   dispatch(requestChatMessages());
  // }, [dispatch]);

  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (publicID) {
      dispatch(checkChatExistence(publicID));
    }

    // return unsubscribe()  Я ПОКА НЕ ЗНАЮ КАК РЕАЛЗОВАТЬ ОТПИСКУ const unsubscribe = dispatch(setConnection(publicID));
    return () => {
      dispatch(clearChatData());
    };
  }, [dispatch, publicID]);

  const onTypeMessage = (value: string) => {
    dispatch(setChatMessage(value));
  };

  const onMessageSend = async () => {
    if (!isLogged) {
      alert('log in plz');
    }
    if (publicID) {
      await dispatch(sendMessage(publicID));
      dispatch(clearMessage());
    }
  };

  const onStartClubChat = () => {
    if (publicID) {
      dispatch(setNewClubChat(publicID));
    }
  };

  if (!isIDExist) {
    return (
      <div className={classNames(cls.WebChat, {}, [className as string])}>
        <Button onClick={onStartClubChat} theme={ButtonTheme.OUTLINE}>
          {' '}
          start a club chat
        </Button>
      </div>
    );
  }

  return (
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
