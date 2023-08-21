import React, { memo, useEffect, useState } from 'react';
import cls from './PsyRoom.module.scss';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import Input from 'shared/UI/Input/Input';
import { useSelector } from 'react-redux';
import { create1stDialog } from 'entities/GPT';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { getGoogleIsLogged } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import {
  getDialogsList,
  getInputValue,
} from 'entities/GPT/model/selectors/getGPTdata';
import { requestConversations } from 'entities/GPT/model/services/requestConversations';
import {
  loadConversation,
  setInputValue,
} from 'entities/GPT/model/slice/GPTslice';
import AppLink from 'shared/UI/AppLink/AppLink';
import { v4 } from 'uuid';
import { createNewDialog } from 'entities/GPT/model/services/createNewDialog';
import { useTranslation } from 'react-i18next';
import CustomInput from 'shared/UI/CustomInput/CustomInput';

interface PsyRoomProps {
  className?: string;
}

export type dialogPayload = {
  ID: string;
  name: string;
};

const PsyRoom: React.FC<PsyRoomProps> = memo(({ className }) => {
  const isAuth = useSelector(getGoogleIsLogged);
  const inputValue = useSelector(getInputValue);
  const DialogsList = useSelector(getDialogsList);
  const [showInput, setShowInput] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation('PsyRoom');

  const onLoadDialog = (conversation: string) => {
    dispatch(loadConversation(conversation));
  };
  const onCreateDialog = async () => {
    const payload = {
      ID: v4(),
      name: inputValue,
    };
    await dispatch(create1stDialog(payload));
    dispatch(requestConversations());
  };
  const onCreateNewDialog = async () => {
    const payload = {
      ID: v4(),
      name: inputValue,
    };
    await dispatch(createNewDialog(payload));
    dispatch(requestConversations());
    setShowInput(false);
  };

  useEffect(() => {
    if (isAuth) {
      dispatch(requestConversations());
    }
  }, [isAuth]);

  if (!isAuth) {
    return (
      <div className={cls.ChatWindow}>
        <h2>{t('loginToUseService')}</h2>
      </div>
    );
  }

  const onInputChange = (value: string) => {
    dispatch(setInputValue(value));
  };

  return (
    <div className={cls.PsyRoom}>
      <div className={cls.dialogsList}>
        {DialogsList.length > 0 &&
          DialogsList.map((dialogObject: any) => {
            const conversationArray = dialogObject.dialogs;

            return (
              <div key={dialogObject.id} className={cls.dialogs}>
                {conversationArray.map((c: any) => (
                  <AppLink className={cls.dialog} to={`/conversation/${c.ID}`}>
                    <div
                      key={c.model}
                      onClick={() => onLoadDialog(c.dialogName)}
                    >
                      {c.dialogName}
                      {/* <TrashIcon className={cls.icon} /> */}
                    </div>
                  </AppLink>
                ))}
                <div className={cls.emptyDialogs}>
                  {showInput ? (
                    <div className={cls.buttons}>
                      <CustomInput
                        value={inputValue}
                        onChange={onInputChange}
                        placeholder={t('giveNamePlaceholder')}
                      ></CustomInput>
                      <Button
                        onClick={onCreateNewDialog}
                        theme={ButtonTheme.OUTLINE}
                      >
                        {t('submit')}
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => setShowInput(true)}
                      theme={ButtonTheme.OUTLINE}
                    >
                      {t('startNew')}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        {!DialogsList.length && (
          <div className={cls.emptyDialogs}>
            <h1>{t('noConversations')}</h1>
            {showInput ? (
              <div className={cls.buttons}>
                <Input
                  value={inputValue}
                  onChange={onInputChange}
                  placeholder={t('giveNamePlaceholder')}
                ></Input>
                <Button onClick={onCreateDialog} theme={ButtonTheme.OUTLINE}>
                  {t('submit')}
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setShowInput(true)}
                theme={ButtonTheme.OUTLINE}
              >
                {t('startFirst')}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

export default PsyRoom;
