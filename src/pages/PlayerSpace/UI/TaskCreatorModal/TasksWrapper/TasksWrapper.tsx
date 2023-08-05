import React, { useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TasksWrapper.module.scss';
import {
  getCompletedTasks,
  getDailys,
  getHabits,
  getTasks,
} from 'entities/Player/model/selectors/getPlayerData';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import SingleHabit from 'entities/TaskTracker/UI/SingleEndeavor/SingleEndeavor';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { TaskCreatorModal } from '../TaskCreatorModal';
import { createNewDaily } from 'entities/Player/model/services/createNewDaily';
import { requestDailyz } from 'entities/Player/model/services/requestDailyz';
import { createNewTask } from 'entities/Player/model/services/createNewTask';
import { requestTasks } from 'entities/Player/model/services/requestTasks';
import { removeTask } from 'entities/Player/model/services/removeTask';
import SingleEndeavor from 'entities/TaskTracker/UI/SingleEndeavor/SingleEndeavor';
import { getShowCompleted } from 'entities/TaskTracker/model/selectors/getTaskTrackerData';
import { requestCompleted } from 'entities/Player/model/services/requestCompleted';

interface TasksWrapperProps {
  className?: string;
}

const TasksWrapper: React.FC<TasksWrapperProps> = ({ className }) => {
  const tasks = useSelector(getTasks);
  const completed = useSelector(getShowCompleted);
  const CompletedTasks = useSelector(getCompletedTasks);
  const dispatch = useAppDispatch();
  const [isVisible, setVisibility] = useState(false);

  const onCloseModal = useCallback(() => {
    setVisibility(false);
  }, []);
  const onOpenModal = useCallback(() => {
    setVisibility(true);
  }, []);

  const onCreateNewTask = async () => {
    await dispatch(createNewTask());
  };
  const onTaskRemove = async (id: string) => {
    await dispatch(removeTask(id));
  };
  const onRequestTasks = () => {
    dispatch(requestTasks());
    dispatch(requestCompleted());
  };

  if (completed) {
    return (
      <div className={cls.TasksWrapper}>
        <div className={cls.listWrapper}>
          <div className={cls.header}>My Tasks</div>
          {CompletedTasks.map((h) => {
            return (
              <SingleEndeavor
                id={h.id}
                title={h.title}
                isTask={true}
                isDone={h.isDone}
                onRemove={onTaskRemove}
                onRequest={onRequestTasks}
                difficulty={h.difficulty}
                description={h.description}
              />
            );
          })}
        </div>
      </div>
    );

    //show compl array CompletedTasks
  }

  return (
    <div className={classNames(cls.TasksWrapper, {}, [className as string])}>
      {isVisible && (
        <TaskCreatorModal
          onClose={onCloseModal}
          isVisible={isVisible}
          APIcallback={onCreateNewTask}
          requestCallback={onRequestTasks}
        />
      )}
      <div className={cls.header}>My Tasks</div>

      <div className={cls.listWrapper}>
        {' '}
        {tasks.map((h) => {
          return (
            <SingleEndeavor
              id={h.id}
              title={h.title}
              isTask={true}
              isDone={h.isDone}
              onRemove={onTaskRemove}
              onRequest={onRequestTasks}
              difficulty={h.difficulty}
              description={h.description}
            />
          );
        })}
        <div className={cls.createBtn}>
          <Button
            onClick={onOpenModal}
            theme={ButtonTheme.OUTLINE}
            className={cls.addBtn}
          >
            Create new task
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TasksWrapper;
