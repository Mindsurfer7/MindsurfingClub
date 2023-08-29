import React, { useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TaskCreator.module.scss';
import Textarea from 'shared/UI/Textarea/Textarea';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { useSelector } from 'react-redux';
import {
  getDifficulty,
  getSubtaskTitle,
  getSubtasks,
  getTags,
  getTaskTrackerData,
} from 'entities/TaskTracker/model/selectors/getTaskTrackerData';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import {
  clearInputs,
  setDescription,
  setDifficulty,
  setID,
  setSubtask,
  setSubtaskTitle,
  setTags,
  setTitle,
} from 'entities/TaskTracker/model/slice/TaskTrackerSlice';
import { v4 } from 'uuid';
import { getAllTags } from 'entities/Player/model/selectors/getPlayerData';

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
  const allTags = useSelector(getAllTags);
  const tags = useSelector(getTags);
  const diffState = useSelector(getDifficulty);
  const subtasks = useSelector(getSubtasks);
  const [inputValue, setInputValue] = useState('');
  const [isChecked, setIsChecked] = useState(false);

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

  const onSetSubtaskTitle = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    dispatch(setSubtaskTitle({ value: e.target.value, index: index }));
  };
  const onSetSubtask = () => {
    //value: string
    const subtask = {
      id: v4(),
      title: '',
      isDone: false,
    };

    dispatch(setSubtask(subtask));
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle(e.target.value));
  };

  const onTaskSubmit = async () => {
    dispatch(setID(v4()));
    await createTask(); //createTask
    requestData();
    dispatch(clearInputs());
    onClose?.();
  };

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
    }
  };

  const handleToggleChange = () => {
    setIsChecked(!isChecked);
    if (subtasks?.length === 0) {
      onSetSubtask();
    }
  };

  return (
    <div className={classNames(cls.TaskCreator, {}, [className as string])}>
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
        <div className={cls.titleWrapper}>
          <input
            value={trackerData.title}
            placeholder={'Введите название'}
            onChange={onChangeHandler}
            className={cls.input}
          />
          <label className={cls.switch}>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleToggleChange}
            />
            <span className={cls.sliderRound}></span>
          </label>
        </div>
        {isChecked && (
          <div className={cls.subtasks}>
            {subtasks?.map((sub, i) => {
              return (
                <div className={cls.sub}>
                  <input
                    value={sub.title}
                    placeholder={'Подзадача'}
                    onChange={(e) => onSetSubtaskTitle(e, i)}
                    className={cls.input}
                  />
                  <Button onClick={onSetSubtask} className={cls.plusButton}>
                    +
                  </Button>
                </div>
              );
            })}
          </div>
        )}
        <Textarea
          placeholder={'Введите описание привычки и мотивацию для привычки'}
          value={trackerData.description}
          onChange={onSetDescription}
          className={cls.textarea}
        />{' '}
      </div>
      <div className={cls.tags}>
        <div className={cls.Y}>
          <div className={cls.x}>
            <input
              value={inputValue}
              placeholder={'добавьте тэги'}
              onChange={handleInputChange}
              className={cls.tagInput}
              onKeyDown={onkeyDownToProps}
            />
          </div>
          <div className={cls.allTags}>
            {allTags.map((t) => {
              return (
                <Button
                  theme={ButtonTheme.OUTLINE}
                  onClick={() => dispatch(setTags([...tags, t]))}
                >
                  {t}
                </Button>
              );
            })}
          </div>
        </div>

        <div className={cls.footer}>
          <div className={cls.selectedTags}>
            Selected tags:
            <div className={cls.tagArray}>
              {tags.map((t) => (
                <div key={t} className={cls.singleTag}>
                  {t}
                </div>
              ))}
            </div>
          </div>

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
