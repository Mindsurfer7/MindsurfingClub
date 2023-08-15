import React, { Suspense } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './GroupCreatorModal.module.scss';
import Modal from 'shared/UI/Modal/Modal';
import Preloader from 'shared/UI/Preloader/Preloader';
import GroupCreator from '../GroupCreator/GroupCreator';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';

interface GroupCreatorModalProps {
  className?: string;
  isVisible: boolean;
  onClose?: () => void;
  APIcallback: () => Promise<void>;
  requestCallback?: () => any;
}

export const GroupCreatorModal: React.FC<GroupCreatorModalProps> = (props) => {
  const { className, isVisible, onClose, APIcallback, requestCallback } = props;
  const dispatch = useAppDispatch();

  return (
    <>
      {' '}
      <Modal
        isVisible={isVisible}
        onClose={onClose}
        className={classNames(cls.GroupCreatorModal, {}, [className as string])}
        lazy
      >
        <Suspense fallback={<Preloader />}>
          <GroupCreator
            createGroup={APIcallback}
            //requestData={requestCallback}
            onClose={onClose}
          />
        </Suspense>
      </Modal>
    </>
  );
};
