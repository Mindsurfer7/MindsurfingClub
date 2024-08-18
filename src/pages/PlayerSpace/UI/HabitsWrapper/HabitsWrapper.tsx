import React, { useCallback, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './HabitsWrapper.module.scss';
import {
  getEndeavorIsLoading,
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
import { TaskType } from 'entities/Player/types/player';
interface HabitsWrapperProps {
  className?: string;
}

const HabitsWrapper: React.FC<HabitsWrapperProps> = ({ className }) => {
  const habits = useSelector(getHabits);
  const filteredHabits = useSelector(getFilteredHabits);
  const isFilterApplied = useSelector(getIsFilterApplied);
  const isLoading = useSelector(getPlayerIsLoading);
  const endeavorIsLoading = useSelector(getEndeavorIsLoading);
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
  const [lastRenderedIndex, setLastRenderedIndex] = useState(0);

  ////////   эт я пытался сделать анимацию для появления тасок, еще не закончил    ///////////

  const showElement = (index: number) => {
    setTimeout(() => {
      setLastRenderedIndex(index);
    }, index * 200); // Задержка 200 мс между элементами
  };

  useEffect(() => {
    setLastRenderedIndex(0); // Сброс индекса при изменении данных
  }, [filteredHabits, habits]);

  return (
    <div
      className={classNames(
        cls.HabitsWrapper,
        {
          //  [cls.loadingAnimation]: isLoading анимация мигания, пока мешается
        },
        [className as string],
      )}
    >
      {isVisible && (
        <TaskCreatorModal
          onClose={onCloseModal}
          isVisible={isVisible}
          APIcallback={onCreateNewHabit}
          requestCallback={onRequestHabits}
          taskType={TaskType.Habit}
        />
      )}

      <div className={cls.header}>{t('myHabits')}</div>

      {isLoading ? (
        <LoaderIOS color="white" className={cls.loader} />
      ) : (
        <div className={cls.listWrapper}>
          {filteredHabits.length > 0
            ? filteredHabits.map((h, ix) => {
                showElement(ix);
                //для фильтрованных вообще нет подтипа??? надо срочно переработать эту кринж фильтрацию1
                return (
                  <SingleEndeavor
                    key={h.id}
                    taskType="habit" //todo: use enum
                    title={h.title}
                    isDone={h.isDone}
                    tags={h.tags}
                    difficulty={h.difficulty}
                    description={h.description}
                    onRequest={onRequestHabits}
                    onRemove={onRemoveHabit}
                    isLoading={
                      endeavorIsLoading?.id === h.id
                        ? endeavorIsLoading?.pending
                        : false
                    }
                    id={h.id}
                    className={
                      ix > lastRenderedIndex ? cls.slideInFromLeft : ''
                    }
                    taskSubType={h.subtype}
                    step={h.step}
                    count={h.count}
                  />
                );
              })
            : !isFilterApplied &&
              habits.map((h) => {
                return (
                  <SingleEndeavor
                    key={h.id}
                    taskType="habit" //todo: use enum
                    title={h.title}
                    isDone={h.isDone}
                    tags={h.tags}
                    difficulty={h.difficulty}
                    description={h.description}
                    onRequest={onRequestHabits}
                    onRemove={onRemoveHabit}
                    id={h.id}
                    isLoading={
                      endeavorIsLoading?.id === h.id
                        ? endeavorIsLoading?.pending
                        : false
                    }
                    taskSubType={h.subtype}
                    step={h.step}
                    count={h.count}
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
