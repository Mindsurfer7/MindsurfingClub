import React, { ChangeEvent, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TaskCreator.module.scss';
import Textarea from 'shared/UI/Textarea/Textarea';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { useSelector } from 'react-redux';
import {
  getDifficulty,
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
  setSubtasks,
  setTags,
  setTitle,
} from 'entities/TaskTracker/model/slice/TaskTrackerSlice';
import { v4 } from 'uuid';
import { getAllTags } from 'entities/Player/model/selectors/getPlayerData';
import { Subtask } from 'entities/TaskTracker/types/taskTracker';
import CustomInput from 'shared/UI/CustomInput/CustomInput';

interface TaskCreatorProps {
  className?: string;
  createTask: () => Promise<void>;
  requestData: () => any;
  onClose?: () => void;
  subtasksFromDB?: Subtask[];
}

const TaskCreator: React.FC<TaskCreatorProps> = (props) => {
  const { createTask, className, requestData, onClose, subtasksFromDB } = props;

  const dispatch = useAppDispatch();
  const trackerData = useSelector(getTaskTrackerData);
  const allTags = useSelector(getAllTags);
  const tags = useSelector(getTags);
  const diffState = useSelector(getDifficulty);
  const subtasks = useSelector(getSubtasks);
  const [inputValue, setInputValue] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (subtasks && subtasks?.length > 0) {
      setIsChecked(true);
    }
  }, [dispatch, subtasks]);

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

  const onSetSubtaskTitle = (value: string, index: number) => {
    dispatch(setSubtaskTitle({ value: value, index: index }));
  };

  const onSetSubtask = () => {
    const subtask = {
      id: v4(),
      title: '',
      isDone: false,
    };
    dispatch(setSubtask(subtask));
  };

  const onChangeHandler = (value: string) => {
    dispatch(setTitle(value));
  };

  const onTaskSubmit = async () => {
    dispatch(setID(v4()));
    await createTask(); //createTask
    requestData();
    dispatch(clearInputs());
    onClose?.();
  };

  const handleInputChange = (value: string) => {
    //event: ChangeEvent<HTMLInputElement>
    setInputValue(value);
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
          <CustomInput
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
                  <div className={cls.subtaskNumber}>{i + 1}</div>
                  <CustomInput
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
            <CustomInput
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
