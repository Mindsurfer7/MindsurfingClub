import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './PersonalChallengeDashboard.module.scss';
import { Challenge } from 'entities/Challenge/types/ChallengeScheme';
import Text from 'shared/UI/Text/Text';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { setChallengeIsDone } from 'entities/Challenge/model/services/setChallengeIsDone';

interface PersonalChallengeDashboardProps {
  className?: string;
  challenges: Challenge[];
  ID: string;
}

const PersonalChallengeDashboard: React.FC<PersonalChallengeDashboardProps> = ({
  className,
  challenges,
  ID,
}) => {
  const dispatch = useAppDispatch();
  const theChellenge = challenges.find((x) => x.ID === ID);
  const onDone = () => {
    console.log(theChellenge?.ID);

    theChellenge && dispatch(setChallengeIsDone(theChellenge?.ID));
  };
  return (
    <div
      className={classNames(cls.PersonalChallengeDashboard, {}, [
        className as string,
      ])}
    >
      <Text title={theChellenge?.title} />
      <Text text={theChellenge?.description} />
      <Text text={theChellenge?.startDate} />
      <Text text={theChellenge?.endDate} />

      <Button onClick={onDone} theme={ButtonTheme.OUTLINE}>
        Done
      </Button>
    </div>
  );
};

export default PersonalChallengeDashboard;
