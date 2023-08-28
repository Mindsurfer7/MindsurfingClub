import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ChallengeCard.module.scss';
import { takePart } from 'entities/Challenge/model/services/takePart';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import Text from 'shared/UI/Text/Text';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import AppLink from 'shared/UI/AppLink/AppLink';
import { AppRoutes } from 'shared/config/routesConfig/routesConfig';
import { Participant } from 'entities/Challenge/types/ChallengeScheme';
import { requestChallenges } from 'entities/Challenge/model/services/requestChallenges';
import { useSelector } from 'react-redux';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { useTranslation } from 'react-i18next';

interface ChallengeCardProps {
  className?: string;
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  tags?: string[];
  participants: Participant[];
}

//тут по идее должна быть таблица в которой по датам будут значения тру или фолс выполненния

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  className,
  title,
  startDate,
  endDate,
  description,
  participants,
  id,
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('SingleGroupPage');
  const userID = useSelector(getGoogleID);

  // let isParticipant;
  // if (participants.length > 0) {
  //   isParticipant = participants?.find((x) => x.ID === userID) || false;
  // }

  const isParticipant = participants?.find((x) => x.ID === userID) || false;

  const onTakePart = async () => {
    await dispatch(
      takePart({ chalID: id, startDate: startDate, endDate: endDate }),
    );
    dispatch(requestChallenges());
  };

  return (
    <div className={classNames(cls.ChallengeCard, {}, [className as string])}>
      <AppLink to={`${AppRoutes.Challenge}/${id}`}>
        {' '}
        <Text title={title} />
      </AppLink>
      {isParticipant ? (
        <Button theme={ButtonTheme.OUTLINE_GREEN}>{t('participant')}</Button>
      ) : (
        <Button theme={ButtonTheme.OUTLINE} onClick={onTakePart}>
          {t('takePart')}
        </Button>
      )}

      <Text text={description} className={cls.description} />
      {/* <div className={cls.participants}>
        {participants.map((p) => {
          return <span>{p.nickname}</span>;
        })}
      </div> */}
    </div>
  );
};

export default ChallengeCard;
