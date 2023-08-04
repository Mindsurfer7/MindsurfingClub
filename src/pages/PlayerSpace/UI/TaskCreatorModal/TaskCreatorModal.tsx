import React, { Suspense } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TaskCreatorModal.module.scss';
import Modal from 'shared/UI/Modal/Modal';
import Preloader from 'shared/UI/Preloader/Preloader';
import TaskCreator from 'entities/TaskTracker/UI/TaskCreator/TaskCreator';

interface TaskCreatorModalProps {
  className?: string;
  isVisible?: boolean;
  onClose?: () => void;
}

export const TaskCreatorModal: React.FC<TaskCreatorModalProps> = (props) => {
  const { className, isVisible, onClose } = props;
  return (
    <Modal
      isVisible={isVisible}
      onClose={onClose}
      className={classNames(cls.LoginModal, {}, [className as string])}
      lazy
    >
      <Suspense fallback={<Preloader />}>
        <TaskCreator />
      </Suspense>
    </Modal>
  );
};
