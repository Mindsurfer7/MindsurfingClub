import React, { useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ChallengeCreator.module.scss';
import Textarea from 'shared/UI/Textarea/Textarea';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';

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
} from 'entities/Challenge';
import { resetChangedFields } from '../model/slice/ChallengeSlice';
import Input from 'shared/UI/Input/Input';
import CustomInput from 'shared/UI/CustomInput/CustomInput';

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
  const [titleError, setTitleError] = useState('');
  const [dateError, setDateError] = useState('');
  const { description, title, startDate, endDate, executionType, points } =
    useSelector(getChallengeData);

  useEffect(() => {
    if (title !== '') {
      setTitleError('');
    } else if (startDate && endDate !== '') {
      setDateError('');
    }
  }, [title, startDate, endDate]);

  ////////////////////////////////////////////////////////////////////////////////////////////

  const handleTitleChange = (value: string) => {
    dispatch(setChallengeTitle(value));
  };

  const handleDescriptionChange = (value: string) => {
    dispatch(setChallengeDescription(value));
  };

  const handleStartDateChange = (value: string) => {
    dispatch(setChallengeStartDate(value));
  };

  const handleEndDateChange = (value: string) => {
    dispatch(setChallengeEndDate(value));
  };

  const handleExecutionTypeChange = (value: string) => {
    dispatch(setChallengeExecutionType(value));
  };

  const handlePointsChange = (value: string) => {
    dispatch(setChallengePoints(Number(value)));
  };

  const handleSubmit = async (event: any) => {
    if (startDate === '' || endDate === '') {
      setDateError('Установите даты начала и конца');
    } else if (title === '') {
      setTitleError('Название необходимо задать');
    } else {
      event.preventDefault();
      await dispatch(createNewChallenge(communityID));
      onClose?.();
      requestData?.();
      dispatch(resetChangedFields());
    }
  };

  return (
    <div className={classNames(cls.TaskCreator, {}, [className as string])}>
      <div className={cls.title}>
        Название челленджа:
        <CustomInput
          textInput
          placeholder="Название"
          value={title}
          onChange={handleTitleChange}
        />
        {titleError && <div className={cls.error}>{titleError}</div>}
      </div>
      <div className={cls.descr}>
        Описание:
        <Textarea
          placeholder="Опишите смысл, правила и цели челленджа"
          name="description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div className={cls.dates}>
        <div className={cls.startDate}>
          Дата начала:
          <CustomInput
            placeholder="StartDate"
            DatePicker
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </div>
        <div className={cls.endDate}>
          Дата конца:
          <CustomInput
            placeholder="EndDate"
            type="date"
            DatePicker
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
      </div>
      {dateError && <div className={cls.error}>{dateError}</div>}
      {/* <div className={cls.timesAday}>
        Сколько раз в день выполнять:
        <Select
          placeholder="Select type"
          // la="executionType"
          value={executionType}
          onChange={handleExecutionTypeChange}
        >
          <option value="">Select</option>
          <option value="once">Once a day</option>
          <option value="twice">Twice a day</option>
          <option value="thrice">Thrice a day</option>
        </Select>
      </div> */}
      <div className={cls.points}>
        Количество очков за выполнение:
        <div className={cls.x}>
          <CustomInput
            placeholder="Points per Execution"
            type="number"
            numberInput
            name="points"
            //@ts-ignore
            value={points}
            onChange={handlePointsChange}
          />
          <Button
            className={cls.btn}
            theme={ButtonTheme.OUTLINE}
            onClick={handleSubmit}
          >
            Create Challenge
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCreator;
