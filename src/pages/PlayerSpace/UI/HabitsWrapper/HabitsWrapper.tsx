import React, { useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './HabitsWrapper.module.scss';
import {
  getFilteredHabits,
  getHabits,
  getIsFilterApplied,
  getPlayerIsLoading,
} from 'entities/Player/model/selectors/getPlayerData';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { TaskCreatorModal } from '../TaskCreatorModal/TaskCreatorModal';
import { requestHabits } from 'entities/Player/model/services/requestHabits';
import { createNewHabit } from 'entities/Player/model/services/createNewHabit';
import { removeHabit } from 'entities/Player/model/services/removeHabit';
import SingleEndeavor from 'entities/TaskTracker/UI/SingleEndeavor/SingleEndeavor';
import { useTranslation } from 'react-i18next';
import { Icon } from 'shared/UI/Icon/Icon';
import loaderIOS from '../../../../shared/assets/icons/loader-ios.svg';
import LoaderIOS from 'shared/UI/Preloader/LoaderIOS';
interface HabitsWrapperProps {
  className?: string;
}

const HabitsWrapper: React.FC<HabitsWrapperProps> = ({ className }) => {
  const habits = useSelector(getHabits);
  const filteredHabits = useSelector(getFilteredHabits);
  const isFilterApplied = useSelector(getIsFilterApplied);
  const isLoading = useSelector(getPlayerIsLoading);
  const dispatch = useAppDispatch();
  const { t } = useTranslation('PlayerCard');
  const [isVisible, setVisibility] = useState(false);
  const onCloseModal = useCallback(() => {
    setVisibility(false);
  }, []);
  const onOpenModal = useCallback(() => {
    setVisibility(true);
  }, []);

  const onCreateNewHabit = async () => {
    await dispatch(createNewHabit());
  };
  const onRequestHabits = () => {
    dispatch(requestHabits());
  };
  const onRemoveHabit = async (id: string) => {
    await dispatch(removeHabit(id));
  };

  return (
    <div className={classNames(cls.HabitsWrapper, {}, [className as string])}>
      {isVisible && (
        <TaskCreatorModal
          onClose={onCloseModal}
          isVisible={isVisible}
          APIcallback={onCreateNewHabit}
          requestCallback={onRequestHabits}
        />
      )}

      <div className={cls.header}>{t('myHabits')}</div>
      {isLoading ? (
        <LoaderIOS color="white" className={cls.loader} />
      ) : (
        <div className={cls.listWrapper}>
          {filteredHabits.length > 0
            ? filteredHabits.map((h) => {
                return (
                  <SingleEndeavor
                    key={h.id}
                    taskType="habit"
                    title={h.title}
                    isDone={h.isDone}
                    tags={h.tags}
                    difficulty={h.difficulty}
                    description={h.description}
                    onRequest={onRequestHabits}
                    onRemove={onRemoveHabit}
                    id={h.id}
                  />
                );
              })
            : !isFilterApplied &&
              habits.map((h) => {
                return (
                  <SingleEndeavor
                    key={h.id}
                    taskType="habit"
                    title={h.title}
                    isDone={h.isDone}
                    tags={h.tags}
                    difficulty={h.difficulty}
                    description={h.description}
                    onRequest={onRequestHabits}
                    onRemove={onRemoveHabit}
                    id={h.id}
                    //@ts-ignore
                    taskSubType={h.subtype}
                    step={h.step}
                    //@ts-ignore

                    count={h.count}
                    // taskSubType={'reverse-count'}
                    // step={25}
                    // count={500}
                  />
                );
              })}
        </div>
      )}

      <div className={cls.createBtn}>
        <Button
          onClick={onOpenModal}
          theme={ButtonTheme.OUTLINE}
          className={cls.addBtn}
        >
          {t('createNewHabit')}
        </Button>
      </div>
    </div>
  );
};

export default HabitsWrapper;
