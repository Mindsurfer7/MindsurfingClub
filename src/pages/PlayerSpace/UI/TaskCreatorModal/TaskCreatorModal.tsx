import React, { Suspense } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TaskCreatorModal.module.scss';
import Modal from 'shared/UI/Modal/Modal';
import Preloader from 'shared/UI/Preloader/Preloader';
import TaskCreator from 'entities/TaskTracker/UI/TaskCreator/TaskCreator';
import Text from 'shared/UI/Text/Text';
import { TaskType } from 'entities/Player/types/player';

interface TaskCreatorModalProps {
  className?: string;
  isVisible?: boolean;
  onClose?: () => void;
  taskType: TaskType;
  APIcallback: () => Promise<void>; //сабмит формы
  requestCallback: () => any; //чтобы запросить новый json с обновленными тасками
}

export const TaskCreatorModal: React.FC<TaskCreatorModalProps> = (props) => {
  const {
    className,
    isVisible,
    onClose,
    APIcallback,
    requestCallback,
    taskType,
  } = props;
  return (
    <Modal
      isVisible={isVisible}
      onClose={onClose}
      className={classNames(cls.TaskCreatorModal, {}, [className as string])}
      lazy
    >
      <Suspense fallback={<Preloader />}>
        <TaskCreator
          createTask={APIcallback}
          requestData={requestCallback}
          onClose={onClose}
          taskType={taskType}
        />
      </Suspense>
    </Modal>
  );
};
