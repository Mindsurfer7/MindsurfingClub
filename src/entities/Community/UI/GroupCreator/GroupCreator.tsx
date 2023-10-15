import React, { useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './GroupCreator.module.scss';
import Textarea from 'shared/UI/Textarea/Textarea';
import { useSelector } from 'react-redux';
import { getTags } from 'entities/TaskTracker/model/selectors/getTaskTrackerData';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import Input from 'shared/UI/Input/Input';
import {
  getCommunityData,
  getGroupDescription,
  getGroupTitle,
} from 'entities/Community/model/selectors/getCommunityData';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { takePart } from 'entities/Challenge';
import {
  clearGroupModalInputs,
  setDescription,
  setTitle,
} from 'entities/Community';
import { useTranslation } from 'react-i18next';
import CustomInput from 'shared/UI/CustomInput/CustomInput';

interface GroupCreatorProps {
  className?: string;
  createGroup: () => Promise<void>;
  requestData?: () => any;
  onClose?: () => void;
}

const GroupCreator: React.FC<GroupCreatorProps> = ({
  createGroup,
  className,
  requestData,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const tags = useSelector(getTags);
  const CommunityData = useSelector(getCommunityData);
  const description = useSelector(getGroupDescription);
  const title = useSelector(getGroupTitle);
  const { t } = useTranslation('SingleGroupPage');

  const onSubmit = async () => {
    //dispatch(setID(v4()));
    // await createNew(); //createTask
    // requestData();
    // dispatch(clearInputs());
    // onClose?.();
  };

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const onkeyDownToProps = (e: any) => {
    if (e.key === 'Enter') {
      setInputValue('');
      console.log(tags);
    }
  };

  const onSetTitle = (value: string) => {
    dispatch(setTitle(value));
  };
  const onSetDescription = (value: string) => {
    dispatch(setDescription(value));
  };

  const take = () => {
    dispatch(takePart('b1SfB0CSianTXhnfwXY2'));
  };
  const onCreateGroup = () => {
    createGroup();
    dispatch(clearGroupModalInputs());
    onClose?.();
  };

  return (
    <div className={classNames(cls.TaskCreator, {}, [className as string])}>
      <div className={cls.description}>
        <CustomInput
          value={title}
          placeholder={t('enterGroupName')}
          onChange={(val) => onSetTitle(val)}
          className={cls.input}
        />
        <Textarea
          placeholder={t('describeGroupPurpose')}
          value={description}
          onChange={onSetDescription}
          className={cls.textarea}
        />{' '}
      </div>

      <Button
        className={cls.btn}
        onClick={onCreateGroup}
        theme={ButtonTheme.OUTLINE}
      >
        {t('submit')}
      </Button>
    </div>
  );
};

export default GroupCreator;
