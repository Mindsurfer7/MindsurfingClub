import React, { useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ChallengePage.module.scss';
import { useSelector } from 'react-redux';
import { getTaskTrackerData } from 'entities/TaskTracker/model/selectors/getTaskTrackerData';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import {
  setChallengeDescription,
  setChallengeEndDate,
  setChallengeExecutionType,
  setChallengePoints,
  setChallengeStartDate,
  setChallengeTitle,
} from 'entities/Challenge';
import { createNewChallenge, getChallengeData } from 'entities/Challenge';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';

interface ChallengePageProps {
  className?: string;
}

const ChallengeForm = () => {
  const dispatch = useAppDispatch();
  const { description, title, startDate, endDate, executionType, points } =
    useSelector(getChallengeData);

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
  const userID = useSelector(getGoogleID);
  //@ts-ignore
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createNewChallenge('mockPublicID'));
  };

  return (
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
  );
};

const users = ['Mindsurfer', 'Reol', 'Amura'];
const list = [
  {
    id: 1,
    day: 'Day 1',
    morning: {
      User1: true,
      User2: false,
      User3: true,
    },
    evening: {
      User1: false,
      User2: true,
      User3: true,
    },
  },
  {
    id: 2,
    day: 'Day 2',
    morning: {
      User1: false,
      User2: true,
      User3: false,
    },
    evening: {
      User1: true,
      User2: true,
      User3: true,
    },
  },
  // Add more data as needed
];

const ChallengePage: React.FC<ChallengePageProps> = ({ className }) => {
  return (
    <div className={classNames(cls.ChallengePage, {}, [className as string])}>
      {users.map((u) => {
        return (
          <div className={cls.scoreboard}>
            <div className={cls.user}>{u}</div>
            <div className={cls.isDone}>isDone</div>
            <div className={cls.score}>score</div>
            <div className={cls.day}>day</div>
          </div>
        );
      })}
    </div>
  );
};

export default ChallengePage;

{
  /* <div className={cls.title}></div>
<div className={cls.description}></div>

<div className={cls.scoreboard}>
  {/* <div className={cls.user}>user</div> */
}

//   <div className={cls.userColumn}>
//     {users.map((user) => (
//       <div key={user} className={cls.user}>
//         {user}
//       </div>
//     ))}
//   </div>
//   <div className={cls.dataColumn}>
//     <div className={cls.day}>Day</div>
//     <div className={cls.score}>Score</div>
//     <div className={cls.isDone}>Is Done</div>
//   </div>
// </div>
// </div> */}
