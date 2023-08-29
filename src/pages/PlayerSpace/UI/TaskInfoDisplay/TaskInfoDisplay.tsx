import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TaskInfoDisplay.module.scss';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import Text from 'shared/UI/Text/Text';
import { Subtask } from 'entities/TaskTracker/types/taskTracker';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { setDailySubtaskIsDone } from 'entities/Player/model/services/daily/setDailySubtaskIsDone';

interface TaskInfoDisplayProps {
  className?: string;
  difficulty: number;
  description: string;
  title: string;
  isDone: boolean;
  tags?: string[];
  subtasks?: Subtask[];
  id: string;
}

const TaskInfoDisplay: React.FC<TaskInfoDisplayProps> = (props) => {
  const { difficulty, description, title, tags, isDone, className, subtasks } =
    props;
  console.log(subtasks);
  const dispatch = useAppDispatch();

  const onSetDailySubtaskIsDone = (taskID: string) => {
    dispatch(setDailySubtaskIsDone(taskID));
  };

  return (
    <div className={classNames(cls.TaskInfoDisplay, {}, [className as string])}>
      <div className={cls.setter}>
        <div className={cls.difficulty}>
          <Button
            theme={
              difficulty === 1 ? ButtonTheme.OUTLINE_GREEN : ButtonTheme.OUTLINE
            }
          >
            Easy
          </Button>
          <Button
            theme={
              difficulty === 2 ? ButtonTheme.OUTLINE_GREEN : ButtonTheme.OUTLINE
            }
          >
            Medium
          </Button>
          <Button
            theme={
              difficulty === 3 ? ButtonTheme.OUTLINE_GREEN : ButtonTheme.OUTLINE
            }
          >
            Hard
          </Button>
          <Button
            theme={
              difficulty === 4 ? ButtonTheme.OUTLINE_GREEN : ButtonTheme.OUTLINE
            }
          >
            Complex
          </Button>
        </div>
        <div className={cls.description}>
          <Text title={title} text={description} />
        </div>
        <div className={cls.subtasks}>
          {subtasks?.map((sub, i) => {
            console.log(subtasks);

            return (
              <div className={cls.sub}>
                <input
                  checked={sub.isDone}
                  type="checkbox"
                  onChange={() => onSetDailySubtaskIsDone(sub.id)}
                  className={cls.input}
                />
                <Text text={sub.title} />
              </div>
            );
          })}
        </div>

        <div className={cls.tags}>
          Тэги:{' '}
          {tags?.map((t) => (
            <span>{t + ', '}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskInfoDisplay;

// const dispatch = useAppDispatch();
// const trackerData = useSelector(getTaskTrackerData);
// const diffState = useSelector(getDifficulty);

// const isDifficultySelected = (
//   buttonDifficulty: number,
//   selectedDifficulty: number,
// ) => {
//   return buttonDifficulty === selectedDifficulty;
// };
