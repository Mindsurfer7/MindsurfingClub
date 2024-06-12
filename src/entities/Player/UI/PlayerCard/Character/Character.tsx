import React, { ChangeEvent, useEffect, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Character.module.scss';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { setBiologyStats } from 'entities/Player/model/services/biology/setBiologyStats';
import { requestBiologyStats } from 'entities/Player/model/services/biology/requestBiologyStats';
import { analyzeActionWithAI } from 'entities/Player/model/services/biology/analyzeActionWithAI';
import Button, { ButtonTheme } from 'shared/UI/Button/Button';
import Input from 'shared/UI/Input/Input';
import CustomInput from 'shared/UI/CustomInput/CustomInput';
import { useSelector } from 'react-redux';
import {
  getPlayerIsLoading,
  getPlayersBiologyChanges,
  getPlayersBiologyLevels,
} from 'entities/Player/model/selectors/getPlayerData';
import Preloader from 'shared/UI/Preloader/Preloader';

interface CharacterProps {
  className?: string;
}
interface HormoneStatProps {
  name: string;
  level: number;
  change: number;
}

const HormoneStat: React.FC<HormoneStatProps> = ({
  name,
  level,
  change = 0,
}) => {
  const isIncreased = change > 0;
  const isDecreased = change < 0;
  return (
    <div key={name} className={cls.hormone}>
      <div className={cls.name}>{name}</div>
      <div className={cls.bar}>
        <div
          className={`${cls.fill} ${cls[name]}`}
          style={{ width: `${level}%` }}
        ></div>
      </div>
      <div className={cls.value}>{level}%</div>
      {isIncreased && (
        <span className={cls.change} style={{ color: '#2ecc71' }}>
          +{Math.abs(change)}%
        </span>
      )}
      {isDecreased && (
        <span className={cls.change} style={{ color: '#e74c3c' }}>
          -{Math.abs(change)}%
        </span>
      )}
    </div>
  );
};

const Character: React.FC<CharacterProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const [userAction, setUserAction] = useState('');
  const biology = useSelector(getPlayersBiologyLevels);
  const changes = useSelector(getPlayersBiologyChanges);
  const isLoading = useSelector(getPlayerIsLoading);

  useEffect(() => {
    // dispatch(setBiologyStats()); // do i need to set if doc doesnt exist?
    dispatch(requestBiologyStats());
  }, []);

  const onInputChange = (string: string) => {
    setUserAction(string);
  };

  const onActionSubmit = () => {
    dispatch(
      analyzeActionWithAI({
        action: userAction,
        time: 'morning',
        gender: 'мужчина',
      }),
    );
    setUserAction('');
  };

  return (
    <div className={classNames(cls.Character, {}, [className as string])}>
      <div className={cls.blocks}>
        <div className={cls.descriptionContainer}>
          <div className={cls.descriptionTitle}>
            Эвристический механизм вычисления состояния своей биологической
            системы
          </div>
          <div className={cls.buttons}>
            <Button theme={ButtonTheme.OUTLINE} onClick={onActionSubmit}>
              Утро
            </Button>
            <Button theme={ButtonTheme.OUTLINE} onClick={onActionSubmit}>
              Вечер
            </Button>
            <Button theme={ButtonTheme.OUTLINE} onClick={onActionSubmit}>
              День
            </Button>
          </div>
          {isLoading && <Preloader />}

          <div className={cls.description}>
            Искуственный интеллект на основе примерных данных высчитывает какие
            гормоны и нейромедиаторы былы повышены или понижены от конкретного
            действия, например, чашка кофе увеличивает адреналин, а медитация
            снижает кортизол. Исходя из этих действий можно получить
            рекомендацию о том, какие стоит предпринять дейстсвия для достижения
            баланса. Чтобы вечером быть спокойным и готовым ко сну, а утром быть
            бодрым и готовым к свершениям.
          </div>
          <span>
            Введите здесь действие, которое только что совершили, можно с
            уточнениями
          </span>
          <div className={cls.interface}>
            <CustomInput
              value={userAction}
              placeholder={'Введите действие'}
              onChange={onInputChange}
            />
            <Button theme={ButtonTheme.FILLED_GREEN} onClick={onActionSubmit}>
              Подтвердить
            </Button>
          </div>
        </div>
        <div className={cls.statcontainer}>
          {biology ? (
            Object.entries(biology)
              .sort((a, b) => a[0].localeCompare(b[0]))
              .map(([name, level]) => (
                <HormoneStat
                  name={name}
                  level={level}
                  key={name}
                  //@ts-ignore
                  change={changes[name]}
                />
              ))
          ) : (
            <Preloader />
          )}
        </div>
      </div>
    </div>
  );
};

export default Character;
