import React, { useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ChallengePage.module.scss';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { getchallenges } from 'entities/Challenge';
import type { Challenge } from 'entities/Challenge/types/ChallengeScheme';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import Text from 'shared/UI/Text/Text';
import { useTranslation } from 'react-i18next';
import { requestChallengeByID } from '../model/services/requestChallengeByID';
import { getChallengePageData } from '../model/selectors/getChallengePageData';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { ChallengePageReducer } from '../model/slice/challengePageSlice';
import { Page } from 'widgets/Page';

interface ChallengePageProps {
  className?: string;
}

const ChallengePage: React.FC<ChallengePageProps> = ({ className }) => {
  const { challengeID } = useParams();
  const dispatch = useAppDispatch();
  const { t } = useTranslation('ChallengePage');
  const theChallenge = useSelector(getChallengePageData);

  useEffect(() => {
    if (challengeID) {
      dispatch(requestChallengeByID(challengeID));
    }
  }, [dispatch, challengeID]);

  const scoreboard = theChallenge?.participants;
  // const days = theChallenge?.participants[0].isDoneArray;
  // theChallenge?.description;

  const reducers: ReducersList = {
    ChallengePage: ChallengePageReducer,
  };

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page
        className={classNames(cls.ChallengePage, {}, [className as string])}
      >
        <div className={cls.displayInfo}>
          <Text title={theChallenge?.title} />
          <span>
            {t('Points to earn for each day: ')} {theChallenge?.points}
          </span>
          <div className={cls.description}>
            {t('Description:')}
            {theChallenge?.description}
          </div>
          <div className={cls.dates}>
            <div className={cls.date}>
              {t('Start day: ')} {theChallenge?.startDate}
            </div>
            <div className={cls.date}>
              {t('End day:')} {theChallenge?.endDate}
            </div>
          </div>
        </div>
        <div className={cls.leaderboard}>
          <Text className={cls.title} title={t('Leaderboard')} />
          <div className={cls.tableWrapper}>
            {scoreboard?.map((x) => {
              return (
                <div className={cls.scoreboard}>
                  <div className={cls.user}>
                    <div className={cls.nickname}>{x.nickname}</div>

                    <div className={cls.points}>{x.points} INS</div>
                  </div>

                  <div className={cls.scoreWrapper}>
                    <div className={cls.div}>
                      <div className={cls.day}>{t('Day')}</div>
                      <div className={cls.isDone}>{t('IsDone')}</div>
                    </div>

                    {x.isDoneArray.map((value) => {
                      const date = new Date( //@ts-ignore
                        value.date.seconds * 1000 + //@ts-ignore
                          value.date.nanoseconds / 1000000,
                      );

                      const options = {
                        day: 'numeric',
                        month: 'numeric',
                        locale: 'ru-RU',
                      };
                      const formattedDate = date.toLocaleDateString(
                        'ru-RU', //@ts-ignore
                        options,
                      );
                      return (
                        <div className={cls.div}>
                          <div className={cls.day}>{formattedDate}</div>
                          <div className={cls.isDone}>
                            {value.isDone ? (
                              <input type="checkbox" checked />
                            ) : (
                              <input
                                type="checkbox"
                                className={cls.redCheckbox}
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Page>
    </DynamicModuleLoader>
  );
};

export default ChallengePage;
