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
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('ChallengePage');
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
      setDateError(t('Set start and end dates'));
    } else if (title === '') {
      setTitleError(t('Title is required'));
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
        <span className={cls.titleText}>{t('challengeName')}</span>
        <CustomInput
          textInput
          placeholder="Название"
          value={title}
          onChange={handleTitleChange}
          className={cls.titleInput}
        />
        {titleError && <div className={cls.error}>{titleError}</div>}
      </div>
      <div className={cls.descr}>
        <Textarea
          placeholder="Опишите смысл, правила и цели челленджа"
          name="description"
          value={description}
          onChange={handleDescriptionChange}
          className={cls.textarea}
        />
      </div>
      <div className={cls.dates}>
        <div className={cls.startDate}>
          <CustomInput
            placeholder={t('Start Date')}
            DatePicker
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </div>
        <div className={cls.endDate}>
          <CustomInput
            placeholder={t('End Date')}
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
        <div className={cls.x}>
          <CustomInput
            placeholder={t('Points per Execution')}
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
            {t('Create Challenge')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCreator;
