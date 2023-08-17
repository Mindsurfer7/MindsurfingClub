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
import {
  createNewChallenge,
  getChallengeData,
  setChallengeDescription,
  setChallengeEndDate,
  setChallengeExecutionType,
  setChallengePoints,
  setChallengeStartDate,
  setChallengeTitle,
  takePart,
} from 'entities/Challenge';
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

  const { description, title, startDate, endDate, executionType, points } =
    useSelector(getChallengeData);

  ////////////////////////////////////////////////////////////////////////////////////////////

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    switch (name) {
      case 'title':
        dispatch(setChallengeTitle(value));
        break;
      case 'description':
        dispatch(setChallengeDescription(value));
        break;
      case 'startDate':
        dispatch(setChallengeStartDate(value));
        break;
      case 'endDate':
        dispatch(setChallengeEndDate(value));
        break;
      case 'executionType':
        dispatch(setChallengeExecutionType(value));
        break;
      case 'points':
        dispatch(setChallengePoints(Number(value)));
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(createNewChallenge(communityID));
  };

  return (
    <div className={classNames(cls.TaskCreator, {}, [className as string])}>
      <form>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={description}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Start Date:
          <input
            type="date"
            name="startDate"
            value={startDate}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          End Date:
          <input
            type="date"
            name="endDate"
            value={endDate}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Execution Type:
          <select
            name="executionType"
            value={executionType}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            <option value="once">Once a day</option>
            <option value="twice">Twice a day</option>
            <option value="thrice">Thrice a day</option>
          </select>
        </label>
        <br />
        <label>
          Points per Execution:
          <input
            type="number"
            name="points"
            value={points}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <Button theme={ButtonTheme.OUTLINE} onClick={handleSubmit}>
          Create Challenge
        </Button>
      </form>
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
