import React, { useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TaskCreator.module.scss';
import Textarea from 'shared/UI/Textarea/Textarea';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { useSelector } from 'react-redux';
import {
  getDifficulty,
  getTags,
  getTaskTrackerData,
} from 'entities/TaskTracker/model/selectors/getTaskTrackerData';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import {
  clearInputs,
  setDescription,
  setDifficulty,
  setID,
  setTags,
  setTitle,
} from 'entities/TaskTracker/model/slice/TaskTrackerSlice';
import Input from 'shared/UI/Input/Input';
//@ts-ignore
import { v4 } from 'uuid';
import { createNewHabit } from 'entities/Player/model/services/createNewHabit';
import { requestHabits } from 'entities/Player/model/services/requestHabits';
import { requestDailyz } from 'entities/Player/model/services/requestDailyz';

interface TaskCreatorProps {
  className?: string;
  createTask: () => Promise<void>;
  requestData: () => any;
  onClose?: () => void;
}

const TaskCreator: React.FC<TaskCreatorProps> = ({
  createTask,
  className,
  requestData,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const trackerData = useSelector(getTaskTrackerData);
  const tags = useSelector(getTags);
  const diffState = useSelector(getDifficulty);

  const isDifficultySelected = (
    buttonDifficulty: number,
    selectedDifficulty: number,
  ) => {
    return buttonDifficulty === selectedDifficulty;
  };

  const onSetDiff = (value: number) => {
    dispatch(setDifficulty(value));
  };
  const onSetDescription = (value: string) => {
    dispatch(setDescription(value));
  };

  const onSetTitle = (value: string) => {
    dispatch(setTitle(value));
  };

  const onTaskSubmit = async () => {
    dispatch(setID(v4()));
    await createTask(); //createTask
    requestData();
    dispatch(clearInputs());
    onClose?.();
  };

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleTagAdd = () => {
    if (inputValue.trim() !== '') {
      dispatch(setTags([...tags, inputValue.trim()]));
    }
  };
  const onkeyDownToProps = (e: any) => {
    if (e.key === 'Enter') {
      handleTagAdd();
      setInputValue('');
      console.log(tags);
    }
  };

  return (
    <div className={classNames(cls.TaskCreator, {}, [className as string])}>
      <div className={cls.setter}>
        <div className={cls.difficulty}>
          <Button
            theme={
              isDifficultySelected(1, diffState)
                ? ButtonTheme.OUTLINE_GREEN
                : ButtonTheme.OUTLINE
            }
            onClick={() => onSetDiff(1)}
          >
            Easy
          </Button>
          <Button
            theme={
              isDifficultySelected(2, diffState)
                ? ButtonTheme.OUTLINE_GREEN
                : ButtonTheme.OUTLINE
            }
            onClick={() => onSetDiff(2)}
          >
            Medium
          </Button>
          <Button
            theme={
              isDifficultySelected(3, diffState)
                ? ButtonTheme.OUTLINE_GREEN
                : ButtonTheme.OUTLINE
            }
            onClick={() => onSetDiff(3)}
          >
            Hard
          </Button>
          <Button
            theme={
              isDifficultySelected(4, diffState)
                ? ButtonTheme.OUTLINE_GREEN
                : ButtonTheme.OUTLINE
            }
            onClick={() => onSetDiff(4)}
          >
            Complex
          </Button>
        </div>
        <div className={cls.description}>
          <Input
            value={trackerData.title}
            placeholder={'Введите название'}
            onChange={onSetTitle}
            className={cls.input}
          />
          <Textarea
            placeholder={'Введите описание привычки и мотивацию для привычки'}
            value={trackerData.description}
            onChange={onSetDescription}
            className={cls.textarea}
          />{' '}
        </div>
        <div className={cls.tags}>
          <div className={cls.x}>
            <input
              value={inputValue}
              placeholder={'добавьте тэги'}
              onChange={handleInputChange}
              className={cls.input2}
              onKeyDown={onkeyDownToProps}
            />
          </div>

          <div className={cls.tagArray}>
            {tags.map((t) => (
              <div key={t} className={cls.singleTag}>
                {t}
              </div>
            ))}
          </div>
        </div>
        <div className={cls.btn}>
          {' '}
          <Button
            className={cls.btn}
            onClick={onTaskSubmit}
            theme={ButtonTheme.OUTLINE}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskCreator;
