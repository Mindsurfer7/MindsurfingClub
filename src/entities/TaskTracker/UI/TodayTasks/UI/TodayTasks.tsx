import React, { useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TodayTasks.module.scss';
import { createNewTodayTask } from 'entities/TaskTracker/model/services/createNewTodayTask';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { useTranslation } from 'react-i18next';
import { TaskCreatorModal } from 'pages/PlayerSpace/UI/TaskCreatorModal/TaskCreatorModal';
import { useSelector } from 'react-redux';
import {
  getShowTodayTasks,
  getTodayTasks,
} from 'entities/TaskTracker/model/selectors/getTaskTrackerData';
import { requestTodayTasks } from 'entities/TaskTracker/model/services/requestTodayTasks';
import SingleEndeavor from '../../SingleEndeavor/SingleEndeavor';
import { removeTodayTask } from 'entities/TaskTracker/model/services/removeTodayTask';
import { setTodayIsDone } from 'entities/TaskTracker/model/services/setTodayIsDone';

interface TodayTasksProps {
  className?: string;
}

const TodayTasks: React.FC<TodayTasksProps> = ({ className }) => {
  const { t } = useTranslation('today');
  const [isVisible, setVisibility] = useState(false);
  const dispatch = useAppDispatch();
  const showTodayTasks = useSelector(getShowTodayTasks);
  const todayTasks = useSelector(getTodayTasks);

  useEffect(() => {
    dispatch(requestTodayTasks());
  }, [dispatch]);

  const onSubmitNewTask = async () => {
    await dispatch(createNewTodayTask());
  };
  const onRequestTasks = async () => {};

  const onDeleteTask = async (id: string) => {
    dispatch(removeTodayTask(id));
  };

  const onChangeVisibility = () => {
    setVisibility(!isVisible);
  };
  const onSetIsDone = async (id: string) => {
    dispatch(setTodayIsDone(id));
  };

  return (
    <div className={classNames(cls.TodayTasks, {}, [className as string])}>
      {isVisible && (
        <TaskCreatorModal
          onClose={onChangeVisibility}
          isVisible={isVisible}
          APIcallback={onSubmitNewTask}
          requestCallback={onRequestTasks}
        />
      )}
      <div className={cls.wrapper}>
        <div className={cls.tasksWrapper}>
          <div className={cls.header}>{t('MyTodayTasks')}</div>
          <div className={cls.tasks}>
            {todayTasks?.map((t) => {
              return (
                <SingleEndeavor
                  id={t.id}
                  key={t.id}
                  tags={t.tags}
                  title={t.title}
                  taskType="today"
                  isDone={t.isDone}
                  subtasks={t.subtasks}
                  onRemove={() => onDeleteTask(t.id)}
                  APIcallback={() => onSetIsDone(t.id)}
                  onRequest={onRequestTasks}
                  difficulty={t.difficulty}
                  description={t.description}
                />
              );
            })}
          </div>
          <div className={cls.footer}>
            <Button theme={ButtonTheme.OUTLINE} onClick={onChangeVisibility}>
              {t('createNewTask')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayTasks;
