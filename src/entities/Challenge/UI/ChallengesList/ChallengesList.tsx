import React, { useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ChallengesList.module.scss';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { getChallengesByUserID } from 'entities/Challenge/model/services/getChellengesByUserID';
import { useSelector } from 'react-redux';
import { getchallenges } from 'entities/Challenge/model/selectors/getChallengeData';
import PersonalChallengeDashboard from '../PersonalChallengeDashboard/PersonalChallengeDashboard';

interface ChallengesListProps {
  className?: string;
  //userID: string;
}

const ChallengesList: React.FC<ChallengesListProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const challenges = useSelector(getchallenges);
  const [showDashboard, setShowDashboard] = useState(false);
  const [dashboardID, setDashboardID] = useState('');

  useEffect(() => {
    dispatch(getChallengesByUserID());
  }, [dispatch]);

  const onLoadChallenges = () => {
    dispatch(getChallengesByUserID());
  };

  const onShowDashboard = (id: string) => {
    console.log(id);

    setDashboardID(id);
    setShowDashboard(true);
  };
  const onHideDashboard = () => {
    setShowDashboard(false);
  };
  return (
    <div className={classNames(cls.ChallengesList, {}, [className as string])}>
      {showDashboard && <span onClick={onHideDashboard}>chal list</span>}
      {showDashboard ? (
        <PersonalChallengeDashboard ID={dashboardID} challenges={challenges} />
      ) : (
        <div className={cls.listWrapper}>
          {challenges.map((c) => {
            return (
              <div //@ts-ignore
                onClick={() => onShowDashboard(c.ID)}
                className={cls.chalTitle}
              >
                {c.title}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ChallengesList;
