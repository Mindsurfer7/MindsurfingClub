import React, { useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './PersonalChallengeDashboard.module.scss';
import { Challenge } from 'entities/Challenge/types/ChallengeScheme';
import Text from 'shared/UI/Text/Text';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { setChallengeIsDone } from 'entities/Challenge/model/services/setChallengeIsDone';
import { toast } from 'react-toastify';

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
  const [isDone, setIsDone] = useState(false); //по факту над делать запрос на сервак и искать конкретное значение по дате
  const theChellenge = challenges.find((x) => x.id === ID);
  const onDone = async () => {
    if (theChellenge) {
      await dispatch(setChallengeIsDone(theChellenge.id));
      setIsDone(true);
      toast.success(`Ежедневный челлендж выполнен!`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };
  return (
    <div
      className={classNames(cls.PersonalChallengeDashboard, {}, [
        className as string,
      ])}
    >
      <Text title={theChellenge?.title} />
      <Text text={theChellenge?.description} />
      <Text text={'Начало: ' + theChellenge?.startDate} />
      <Text text={'Конец: ' + theChellenge?.endDate} />

      {!isDone ? (
        <Button onClick={onDone} theme={ButtonTheme.OUTLINE}>
          Я Выполнил!
        </Button>
      ) : (
        <Button theme={ButtonTheme.OUTLINE} className={cls.btnDone}>
          Выполнено
        </Button>
      )}
    </div>
  );
};

export default PersonalChallengeDashboard;
