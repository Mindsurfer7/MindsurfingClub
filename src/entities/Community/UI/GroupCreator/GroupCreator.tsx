import React, { useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './GroupCreator.module.scss';
import Textarea from 'shared/UI/Textarea/Textarea';
import { useSelector } from 'react-redux';
import {
  getDifficulty,
  getTags,
  getTaskTrackerData,
} from 'entities/TaskTracker/model/selectors/getTaskTrackerData';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';

import Input from 'shared/UI/Input/Input';

import { getAllTags } from 'entities/Player/model/selectors/getPlayerData';
import {
  getCommunityData,
  getGroupDescription,
  getGroupTitle,
} from 'entities/Community/model/selectors/getCommunityData';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { takePart } from 'entities/Challenge';
import {
  setDescription,
  setTitle,
} from 'entities/Community/model/slice/communitySlice';

interface GroupCreatorProps {
  className?: string;
  createGroup: () => void;
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
  const trackerData = useSelector(getTaskTrackerData);
  const allTags = useSelector(getAllTags);
  const tags = useSelector(getTags);
  const diffState = useSelector(getDifficulty);
  console.log('222222');
  const CommunityData = useSelector(getCommunityData);
  const description = useSelector(getGroupDescription);
  const title = useSelector(getGroupTitle);

  const isDifficultySelected = (
    buttonDifficulty: number,
    selectedDifficulty: number,
  ) => {
    return buttonDifficulty === selectedDifficulty;
  };

  // const onSetDiff = (value: number) => {
  //   dispatch(setDifficulty(value));
  // };

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
    dispatch(createGroup);
  };

  return (
    <div className={classNames(cls.TaskCreator, {}, [className as string])}>
      <div className={cls.description}>
        <Input
          value={title}
          placeholder={'Введите название'}
          onChange={(val) => onSetTitle(val)}
          className={cls.input}
        />
        <Textarea
          placeholder={'Опишите смысл объединения и цели'}
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
        Submit
      </Button>
    </div>
  );
};

export default GroupCreator;
