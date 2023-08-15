import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ChallengeCard.module.scss';
import { takePart } from 'entities/Challenge/model/services/takePart';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import Text from 'shared/UI/Text/Text';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import AppLink from 'shared/UI/AppLink/AppLink';
import { AppRoutes } from 'shared/config/routesConfig/routesConfig';

interface ChallengeCardProps {
  className?: string;
  id: string;
  title: string;
  description: string;
  tags?: string[];
  participants: string[];
}

//тут по идее должна быть таблица в которой по датам будут значения тру или фолс выполненния

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  className,
  title,
  description,
  participants,
  id,
}) => {
  const dispatch = useAppDispatch();

  const onTakePart = () => {
    dispatch(takePart(id));
  };

  return (
    <div className={classNames(cls.ChallengeCard, {}, [className as string])}>
      <AppLink to={`${AppRoutes.Challenge}/cdskjclwk`}>
        <Text title={title} />
        <Text text={description} />
        <Button theme={ButtonTheme.OUTLINE} onClick={onTakePart}>
          Take Part!
        </Button>
      </AppLink>
    </div>
  );
};

export default ChallengeCard;
