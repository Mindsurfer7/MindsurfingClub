import React, { useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './PersonalChallengeDashboard.module.scss';
import { Challenge } from 'entities/Challenge/types/ChallengeScheme';
import Text from 'shared/UI/Text/Text';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { setChallengeIsDone } from 'entities/Challenge/model/services/setChallengeIsDone';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { requestChallengeByID } from 'pages/ChallengePage';
import { useSelector } from 'react-redux';
import { getChallengeData } from 'entities/Challenge/model/selectors/getChallengeData';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { checkIsDoneValue } from 'shared/lib/checkIsDoneValue/checkIsDoneValue';
import { useTranslation } from 'react-i18next';

interface PersonalChallengeDashboardProps {
  className?: string;
  challenges: Challenge[];
  ID: string;
}

const PersonalChallengeDashboard: React.FC<PersonalChallengeDashboardProps> = ({
  className,
  ID,
}) => {
  const dispatch = useAppDispatch();
  const theChellenge = useSelector(getChallengeData);
  const [isDoneTodayValue, setIsDoneTodayValue] = useState(false);
  const userID = useSelector(getGoogleID);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (theChellenge && userID) {
      setIsDoneTodayValue(checkIsDoneValue(theChellenge, userID));
    }
  }, [theChellenge, userID]);

  useEffect(() => {
    dispatch(requestChallengeByID(ID));
  }, [dispatch, ID]);

  const onDone = async () => {
    if (theChellenge) {
      await dispatch(setChallengeIsDone(theChellenge.id));
      dispatch(requestChallengeByID(ID));

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
  const onChallengeLinkClick = () => {
    navigate(
      `/communities/SingleGroup/${theChellenge.communityID}/Challenge/${theChellenge.id}`,
    );
  };

  return (
    <div
      className={classNames(cls.PersonalChallengeDashboard, {}, [
        className as string,
      ])}
    >
      <Button
        onClick={onChallengeLinkClick}
        theme={ButtonTheme.OUTLINE}
        className={cls.chalLinkBTN}
      >
        {t('Страница Испытания')}
      </Button>
      <Text title={theChellenge?.title} />
      <Text text={theChellenge?.description} />
      <Text text={'Начало: ' + theChellenge?.startDate} />
      <Text text={'Конец: ' + theChellenge?.endDate} />

      {!isDoneTodayValue ? (
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
