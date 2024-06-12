import React, { useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TasksWrapper.module.scss';
import {
  getCompletedTasks,
  getFilteredTasks,
  getIsFilterApplied,
  getPlayerIsLoading,
  getTasks,
} from 'entities/Player/model/selectors/getPlayerData';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { TaskCreatorModal } from '../TaskCreatorModal/TaskCreatorModal';
import { createNewTask } from 'entities/Player/model/services/createNewTask';
import { requestTasks } from 'entities/Player/model/services/requestTasks';
import { removeTask } from 'entities/Player/model/services/removeTask';
import SingleEndeavor from 'entities/TaskTracker/UI/SingleEndeavor/SingleEndeavor';
import { getShowCompleted } from 'entities/TaskTracker/model/selectors/getTaskTrackerData';
import { requestCompleted } from 'entities/Player/model/services/requestCompleted';
import { useTranslation } from 'react-i18next';
import { setSubtaskIsDone } from 'entities/Player/model/services/tasks/setSubtaskIsDone';
import LoaderIOS from 'shared/UI/Preloader/LoaderIOS';

interface TasksWrapperProps {
  className?: string;
}

const TasksWrapper: React.FC<TasksWrapperProps> = ({ className }) => {
  const tasks = useSelector(getTasks);
  const completed = useSelector(getShowCompleted);
  const CompletedTasks = useSelector(getCompletedTasks);
  const filteredTasks = useSelector(getFilteredTasks);
  const isFilterApplied = useSelector(getIsFilterApplied);
  const dispatch = useAppDispatch();
  const { t } = useTranslation('PlayerCard');
  const [isVisible, setVisibility] = useState(false);
  const isLoading = useSelector(getPlayerIsLoading);

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
                key={h.id}
                title={h.title}
                taskType="task"
                tags={h.tags}
                isDone={h.isDone}
                subtasks={h.subtasks}
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
      <div className={cls.header}>{t('myTasks')}</div>

      {isLoading ? (
        <LoaderIOS color="white" className={cls.loader} />
      ) : (
        <div className={cls.listWrapper}>
          {filteredTasks.length > 0
            ? filteredTasks.map((h) => {
                return (
                  <SingleEndeavor
                    id={h.id}
                    key={h.id}
                    tags={h.tags}
                    title={h.title}
                    taskType="task"
                    isDone={h.isDone}
                    subtasks={h.subtasks}
                    onRemove={onTaskRemove}
                    onRequest={onRequestTasks}
                    difficulty={h.difficulty}
                    description={h.description}
                  />
                );
              })
            : !isFilterApplied &&
              tasks.map((h) => {
                return (
                  <SingleEndeavor
                    id={h.id}
                    key={h.id}
                    tags={h.tags}
                    title={h.title}
                    taskType="task"
                    isDone={h.isDone}
                    subtasks={h.subtasks}
                    onRemove={onTaskRemove}
                    onRequest={onRequestTasks}
                    difficulty={h.difficulty}
                    description={h.description}
                  />
                );
              })}
        </div>
      )}
      <div className={cls.createBtn}>
        <Button
          onClick={onOpenModal}
          theme={ButtonTheme.OUTLINE}
          className={cls.addBtn}
        >
          {t('createNewTask')}
        </Button>
      </div>
    </div>
  );
};

export default TasksWrapper;
