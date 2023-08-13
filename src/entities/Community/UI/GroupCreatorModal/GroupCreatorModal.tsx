import React, { Suspense } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './GroupCreatorModal.module.scss';
import Modal from 'shared/UI/Modal/Modal';
import Preloader from 'shared/UI/Preloader/Preloader';
import GroupCreator from '../GroupCreator/GroupCreator';
import { createGroup } from 'entities/Community/model/services/createGroup';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import Text from 'shared/UI/Text/Text';

interface GroupCreatorModalProps {
  className?: string;
  isVisible?: boolean;
  onClose?: () => void;
  APIcallback?: () => Promise<void>; //to pass all onChange functions with one object
  requestCallback?: () => any; //to pass all onChange functions with one object
}

export const GroupCreatorModal: React.FC<GroupCreatorModalProps> = (props) => {
  const { className, isVisible, onClose, APIcallback, requestCallback } = props;
  const dispatch = useAppDispatch();
  console.log('mount');

  const onCreateGroup = () => {
    dispatch(createGroup());
  };

  return (
    <Modal
      isVisible={isVisible}
      onClose={onClose}
      className={classNames(cls.GroupCreatorModal, {}, [className as string])}
      lazy
    >
      <Text title="ХУЙ" />
      <Suspense fallback={<Preloader />}>
        <GroupCreator
          createGroup={onCreateGroup}
          //requestData={requestCallback}
          onClose={onClose}
        />
      </Suspense>
    </Modal>
  );
};
