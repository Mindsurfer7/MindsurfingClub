import React, { useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticlesPage.module.scss';
import { GroupCreatorModal } from 'entities/Community';
import { TaskCreatorModal } from 'pages/PlayerSpace/UI/TaskCreatorModal/TaskCreatorModal';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { requestTasks } from 'entities/Player/model/services/requestTasks';
import { createNewTask } from 'entities/Player/model/services/createNewTask';
import ArticleDetailsPage from 'pages/ArticleDetails/UI/ArticleDetailsPage';

interface ArticlesPageProps {
  className?: string;
}

const ArticlesPage: React.FC<ArticlesPageProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const onCreateNewTask = async () => {
    await dispatch(createNewTask());
  };

  const onCloseModal = useCallback(() => {
    // setVisibility(false);
  }, []);
  const onOpenModal = useCallback(() => {
    // setVisibility(true);
  }, []);

  const onRequestTasks = () => {
    dispatch(requestTasks());
  };

  return (
    <div className={classNames(cls.ArticlesPage, {}, [className as string])}>
      <ArticleDetailsPage />
      <TaskCreatorModal
        APIcallback={onCreateNewTask}
        requestCallback={onRequestTasks}
        onClose={onCloseModal}
      />
    </div>
  );
};

export default ArticlesPage;
