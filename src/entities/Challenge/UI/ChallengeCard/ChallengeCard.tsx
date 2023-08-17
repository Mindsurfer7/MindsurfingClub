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
  console.log(id);

  const onTakePart = () => {
    dispatch(takePart({ chalID: id, startDate: startDate, endDate: endDate }));
  };

  //<AppLink to={`${AppRoutes.Challenge}/cdskjclwk`}>
  return (
    <div className={classNames(cls.ChallengeCard, {}, [className as string])}>
      <Text title={title} />
      <Text text={description} />
      <div className={cls.participants}>
        {participants.map((p) => {
          return <span>{p.nickname}</span>;
        })}
      </div>
      <Button theme={ButtonTheme.OUTLINE} onClick={onTakePart}>
        Take Part!
      </Button>
    </div>
  );
};

export default ChallengeCard;
