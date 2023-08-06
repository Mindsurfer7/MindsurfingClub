import React, { Suspense } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TaskDisplayModal.module.scss';
import Modal from 'shared/UI/Modal/Modal';
import Preloader from 'shared/UI/Preloader/Preloader';
import TaskInfoDisplay from '../TaskInfoDisplay/TaskInfoDisplay';

interface TaskCreatorModalProps {
  className?: string;
  isVisible?: boolean;
  onClose?: () => void;
  APIcallback?: () => Promise<void>; //to pass all onChange functions with one object
  requestCallback?: () => any; //to pass all onChange functions with one object
  isHabit?: boolean;
  isTask?: boolean;
  isDaily?: boolean;
  difficulty: number;
  description: string;
  title: string;
  isDone: boolean;
  tags?: string[];
  id: string;
}

export const TaskDisplayModal: React.FC<TaskCreatorModalProps> = (props) => {
  const { className, isVisible, onClose, APIcallback, requestCallback } = props;
  return (
    <Modal
      isVisible={isVisible}
      onClose={onClose}
      className={classNames(cls.TaskCreatorModal, {}, [className as string])}
      lazy
    >
      <Suspense fallback={<Preloader />}>
        <TaskInfoDisplay
          {...props}
          //createTask={APIcallback}
          //requestData={requestCallback}
          // onClose={onClose}
        />
      </Suspense>
    </Modal>
  );
};
