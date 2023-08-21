import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TaskInfoDisplay.module.scss';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import Text from 'shared/UI/Text/Text';

interface TaskInfoDisplayProps {
  className?: string;
  difficulty: number;
  description: string;
  title: string;
  isDone: boolean;
  tags?: string[];
  id: string;
}

const TaskInfoDisplay: React.FC<TaskInfoDisplayProps> = (props) => {
  const { difficulty, description, title, tags, isDone, className } = props;

  return (
    <div className={classNames(cls.TaskCreator, {}, [className as string])}>
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
        <div className={cls.tags}>
          Тэги:
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
