import React, { Suspense, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TaskDisplayModal.module.scss';
import Modal from 'shared/UI/Modal/Modal';
import Preloader from 'shared/UI/Preloader/Preloader';
import TaskInfoDisplay from '../TaskInfoDisplay/TaskInfoDisplay';
import TaskCreator from 'entities/TaskTracker/UI/TaskCreator/TaskCreator';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { setNewInitialState } from 'entities/TaskTracker';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { updateTaskData } from 'entities/Player';
import { clearInputs } from 'entities/TaskTracker/model/slice/TaskTrackerSlice';
import { Subtask } from 'entities/TaskTracker/types/taskTracker';

interface TaskCreatorModalProps {
  className?: string;
  isVisible?: boolean;
  onClose?: () => void;
  APIcallback?: () => Promise<void>; //to pass all onChange functions with one object
  requestCallback?: () => any; //to pass all onChange functions with one object
  taskType: 'task' | 'daily' | 'habit';
  difficulty: number;
  description: string;
  title: string;
  isDone: boolean;
  tags?: string[];
  subtasks?: Subtask[];
  id: string;
}

export const TaskDisplayModal: React.FC<TaskCreatorModalProps> = (props) => {
  const {
    id,
    className,
    title,
    description,
    difficulty,
    subtasks,
    tags,
    taskType,
    isVisible,
    onClose,
    APIcallback,
    requestCallback,
  } = props;
  const [editMode, setEditMode] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      setNewInitialState({
        title,
        description,
        difficulty,
        tags: tags || [],
        id,
      }),
    );
  });

  const onUpdateTask = async () => {
    await dispatch(updateTaskData({ id, taskType }));
  };
  const onRequest = async () => {};

  const onCloseWithClearInputs = () => {
    dispatch(clearInputs());
    onClose?.();
  };

  return (
    <Modal
      isVisible={isVisible}
      onClose={onCloseWithClearInputs}
      className={classNames(cls.TaskCreatorModal, {}, [className as string])}
      lazy
    >
      <Suspense fallback={<Preloader />}>
        <Button
          onClick={() => setEditMode(!editMode)}
          className={cls.editBtn}
          theme={ButtonTheme.OUTLINE}
        >
          Edit
        </Button>
        {editMode ? (
          <TaskCreator
            onClose={onClose}
            requestData={onRequest}
            createTask={onUpdateTask}
          />
        ) : (
          <TaskInfoDisplay {...props} />
        )}
      </Suspense>
    </Modal>
  );
};
