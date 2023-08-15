import React, { useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './HabitsWrapper.module.scss';
import {
  getFilteredHabits,
  getHabits,
  getIsFilterApplied,
} from 'entities/Player/model/selectors/getPlayerData';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import { TaskCreatorModal } from '../TaskCreatorModal/TaskCreatorModal';
import { requestHabits } from 'entities/Player/model/services/requestHabits';
import { createNewHabit } from 'entities/Player/model/services/createNewHabit';
import { removeHabit } from 'entities/Player/model/services/removeHabit';
import SingleEndeavor from 'entities/TaskTracker/UI/SingleEndeavor/SingleEndeavor';
interface HabitsWrapperProps {
  className?: string;
}

const HabitsWrapper: React.FC<HabitsWrapperProps> = ({ className }) => {
  const habits = useSelector(getHabits);
  const filteredHabits = useSelector(getFilteredHabits);
  const isFilterApplied = useSelector(getIsFilterApplied);
  const dispatch = useAppDispatch();
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
      <div className={cls.header}>My Habits</div>
      <div className={cls.listWrapper}>
        {filteredHabits.length > 0
          ? filteredHabits.map((h) => {
              return (
                <SingleEndeavor
                  key={h.id}
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
            })}
      </div>

      <div className={cls.createBtn}>
        <Button
          onClick={onOpenModal}
          theme={ButtonTheme.OUTLINE}
          className={cls.addBtn}
        >
          Create new habit
        </Button>
      </div>
    </div>
  );
};

export default HabitsWrapper;
