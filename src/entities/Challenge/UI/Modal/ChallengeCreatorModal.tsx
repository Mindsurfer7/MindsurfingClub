import React, { Suspense } from 'react';
import Modal from 'shared/UI/Modal/Modal';
import Preloader from 'shared/UI/Preloader/Preloader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import ChallengeCreator from '../ChallengeCreator';

interface GroupCreatorModalProps {
  className?: string;
  isVisible?: boolean;
  communityID: string;
  onClose: () => void;
  // APIcallback: () => Promise<void>;
  requestCallback?: () => any;
}

export const ChallengeCreatorModal: React.FC<GroupCreatorModalProps> = (
  props,
) => {
  const { communityID, className, isVisible, onClose, requestCallback } = props;
  const dispatch = useAppDispatch();

  return (
    <>
      <Modal isVisible={isVisible} onClose={onClose} lazy>
        <Suspense fallback={<Preloader />}>
          <ChallengeCreator
            communityID={communityID}
            //createChallenge={APIcallback}
            requestData={requestCallback}
            onClose={onClose}
          />
        </Suspense>
      </Modal>
    </>
  );
};
