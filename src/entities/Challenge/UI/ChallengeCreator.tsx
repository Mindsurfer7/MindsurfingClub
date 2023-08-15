import React, { useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ChallengeCreator.module.scss';
import Textarea from 'shared/UI/Textarea/Textarea';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';

import Input from 'shared/UI/Input/Input';

import {
  getGroupDescription,
  getGroupTitle,
} from 'entities/Community/model/selectors/getCommunityData';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { createNewChallenge, takePart } from 'entities/Challenge';
import {
  clearGroupModalInputs,
  setDescription,
  setTitle,
} from 'entities/Community';

interface ChallengeCreatorProps {
  className?: string;
  communityID: string;
  //createChallenge: () => Promise<void>;
  requestData?: () => any;
  onClose?: () => void;
}

const ChallengeCreator: React.FC<ChallengeCreatorProps> = ({
  className,
  requestData,
  communityID,
  onClose,
}) => {
  const dispatch = useAppDispatch();

  const description = useSelector(getGroupDescription);
  const title = useSelector(getGroupTitle);

  const onSetTitle = (value: string) => {
    dispatch(setTitle(value));
  };
  const onSetDescription = (value: string) => {
    dispatch(setDescription(value));
  };

  const onCreateChallenge = async () => {
    await dispatch(createNewChallenge(communityID));
    requestData?.();
    dispatch(clearGroupModalInputs());
    onClose?.();
  };

  ////////////////////////////////////////////////////////////////////////////////////////////

  // const handleInputChange = (event: any) => {
  //   const { name, value } = event.target;
  //   switch (name) {
  //     case 'title':
  //       dispatch(setChallengeTitle(value));
  //       break;
  //     case 'description':
  //       dispatch(setChallengeDescription(value));
  //       break;
  //     case 'startDate':
  //       dispatch(setChallengeStartDate(value));
  //       break;
  //     case 'endDate':
  //       dispatch(setChallengeEndDate(value));
  //       break;
  //     case 'executionType':
  //       dispatch(setChallengeExecutionType(value));
  //       break;
  //     case 'points':
  //       dispatch(setChallengePoints(Number(value)));
  //       break;
  //     default:
  //       break;
  //   }
  // };

  return (
    <div className={classNames(cls.TaskCreator, {}, [className as string])}>
      {/* <div className={cls.description}>
        <Input
          value={title}
          placeholder={'Введите название'}
          onChange={(val) => onSetTitle(val)}
          className={cls.input}
        />
        <Textarea
          placeholder={'Опишите смысл челленджа, правила и цели'}
          value={description}
          onChange={onSetDescription}
          className={cls.textarea}
        />{' '}
      </div>

      <Button
        className={cls.btn}
        onClick={onCreateChallenge}
        theme={ButtonTheme.OUTLINE}
      >
        Submit
      </Button> */}
    </div>
  );
};

export default ChallengeCreator;
